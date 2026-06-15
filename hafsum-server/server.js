import express from 'express';
import cors from 'cors';
import { nanoid } from 'nanoid';
import { OAuth2Client } from 'google-auth-library';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

import { ENV, SHOP } from './config.js';
import { db, save } from './db.js';
import { priceCart } from './menu.js';
import { signToken, authRequired, adminRequired } from './auth.js';

const app = express();
app.use(cors());
app.use(express.json());

const googleClient = ENV.googleClientId ? new OAuth2Client(ENV.googleClientId) : null;
const VALID_STATUS = ['pending', 'accepted', 'rejected', 'preparing', 'ready', 'completed'];

/** Find-or-create a user record, returning the stored user. */
async function upsertUser({ email, name, picture, googleId }) {
  const lower = email.toLowerCase();
  let user = db.data.users.find((u) => u.email === lower);
  const isAdmin = ENV.adminGoogleEmails.includes(lower);
  if (!user) {
    user = { id: nanoid(10), email: lower, name, picture: picture || '', role: isAdmin ? 'admin' : 'customer', googleId, createdAt: Date.now() };
    db.data.users.push(user);
  } else {
    user.name = name || user.name;
    user.picture = picture || user.picture;
    if (isAdmin) user.role = 'admin'; // promotions via whitelist; never auto-demote
    user.googleId = googleId || user.googleId;
  }
  await save();
  return user;
}

const publicUser = (u) => ({ id: u.id, email: u.email, name: u.name, picture: u.picture, role: u.role });

// ---------------------------------------------------------------- health + config
app.get('/api/health', (_req, res) => res.json({ ok: true }));

// Lets the frontend discover what login methods this server offers.
app.get('/api/config', (_req, res) => {
  res.json({
    googleEnabled: Boolean(ENV.googleClientId),
    googleClientId: ENV.googleClientId,
    devLoginEnabled: ENV.allowDevLogin,
    shop: { name: SHOP.name, minOrder: SHOP.minOrder, gstRate: SHOP.gstRate },
  });
});

// ---------------------------------------------------------------- auth
// Customer login with a Google ID token (credential from Google Identity Services).
app.post('/api/auth/google', async (req, res) => {
  try {
    if (!googleClient) return res.status(400).json({ error: 'Google login is not configured on this server.' });
    const { credential } = req.body;
    const ticket = await googleClient.verifyIdToken({ idToken: credential, audience: ENV.googleClientId });
    const p = ticket.getPayload();
    const user = await upsertUser({ email: p.email, name: p.name, picture: p.picture, googleId: p.sub });
    res.json({ token: signToken(user), user: publicUser(user) });
  } catch (err) {
    console.error('google auth failed:', err.message);
    res.status(401).json({ error: 'Google sign-in could not be verified.' });
  }
});

// No-setup demo login so the whole flow is testable without a Google Client ID.
app.post('/api/auth/dev', async (req, res) => {
  if (!ENV.allowDevLogin) return res.status(403).json({ error: 'Dev login is disabled.' });
  const name = (req.body?.name || 'Demo Customer').toString().slice(0, 60);
  const email = (req.body?.email || 'demo@hafsum.test').toString().toLowerCase().slice(0, 80);
  const user = await upsertUser({ email, name, picture: '', googleId: '' });
  res.json({ token: signToken(user), user: publicUser(user) });
});

// Shop staff login with the configured admin email + password.
app.post('/api/admin/login', async (req, res) => {
  const email = (req.body?.email || '').toLowerCase();
  const password = req.body?.password || '';
  if (!ENV.adminPassword || email !== ENV.adminEmail || password !== ENV.adminPassword) {
    return res.status(401).json({ error: 'Incorrect shop email or password.' });
  }
  const user = await upsertUser({ email, name: 'Hafsum Shop', picture: '', googleId: '' });
  user.role = 'admin';
  await save();
  res.json({ token: signToken(user), user: publicUser(user) });
});

app.get('/api/me', authRequired, (req, res) => {
  const user = db.data.users.find((u) => u.id === req.user.sub);
  if (!user) return res.status(404).json({ error: 'Account not found.' });
  res.json({ user: publicUser(user) });
});

// ---------------------------------------------------------------- orders (customer)
app.post('/api/orders', authRequired, async (req, res) => {
  try {
    const { items, orderType, customer } = req.body || {};
    if (!['Delivery', 'Pickup'].includes(orderType)) {
      return res.status(400).json({ error: 'Please choose Delivery or Pickup.' });
    }
    const c = customer || {};
    if (!c.name?.trim() || !c.phone?.trim()) {
      return res.status(400).json({ error: 'Name and phone number are required.' });
    }
    if (orderType === 'Delivery' && !c.address?.trim()) {
      return res.status(400).json({ error: 'A delivery address is required for delivery orders.' });
    }

    const priced = priceCart(items);
    if (orderType === 'Delivery' && priced.subtotal < SHOP.minOrder) {
      return res.status(400).json({ error: `Minimum delivery order is Rs. ${SHOP.minOrder}.` });
    }

    const now = new Date();
    const stamp = now.toISOString().slice(2, 10).replace(/-/g, '');
    const order = {
      id: nanoid(12),
      userId: req.user.sub,
      number: `HAF-${stamp}-${Math.floor(1000 + Math.random() * 9000)}`,
      status: 'pending',
      orderType,
      customer: {
        name: c.name.trim(),
        phone: c.phone.trim(),
        address: (c.address || '').trim(),
        area: (c.area || '').trim(),
        notes: (c.notes || '').trim(),
      },
      ...priced,
      createdAt: now.getTime(),
      updatedAt: now.getTime(),
    };
    db.data.orders.push(order);
    await save();
    res.status(201).json({ order });
  } catch (err) {
    res.status(400).json({ error: err.message || 'Could not place your order.' });
  }
});

app.get('/api/orders', authRequired, (req, res) => {
  const orders = db.data.orders
    .filter((o) => o.userId === req.user.sub)
    .sort((a, b) => b.createdAt - a.createdAt);
  res.json({ orders });
});

app.get('/api/orders/:id', authRequired, (req, res) => {
  const order = db.data.orders.find((o) => o.id === req.params.id);
  if (!order) return res.status(404).json({ error: 'Order not found.' });
  if (order.userId !== req.user.sub && req.user.role !== 'admin') {
    return res.status(403).json({ error: 'This order belongs to another account.' });
  }
  res.json({ order });
});

// ---------------------------------------------------------------- orders (shop console)
app.get('/api/admin/orders', adminRequired, (req, res) => {
  const { status } = req.query;
  let orders = [...db.data.orders].sort((a, b) => b.createdAt - a.createdAt);
  if (status && VALID_STATUS.includes(status)) orders = orders.filter((o) => o.status === status);
  res.json({ orders });
});

app.patch('/api/admin/orders/:id', adminRequired, async (req, res) => {
  const order = db.data.orders.find((o) => o.id === req.params.id);
  if (!order) return res.status(404).json({ error: 'Order not found.' });
  const { status } = req.body || {};
  if (!VALID_STATUS.includes(status)) return res.status(400).json({ error: 'Invalid status.' });
  order.status = status;
  order.updatedAt = Date.now();
  await save();
  res.json({ order });
});

// Any unmatched /api route answers with JSON (never the SPA's HTML).
app.use('/api', (_req, res) => res.status(404).json({ error: 'Not found.' }));

// ---------------------------------------------------------------- serve the built frontend (production)
// In production we serve the React build from this same server, so the site is a
// single origin (no CORS), a single deploy, and a single domain/bill. The frontend's
// API calls are same-origin (`/api/...`), so nothing extra needs configuring.
// In dev this block is skipped automatically — Vite serves the UI on :5173 and proxies
// /api here — because hafsum-react/dist/ only exists after `npm run build`.
const distDir = fileURLToPath(new URL('../hafsum-react/dist', import.meta.url));
const indexHtml = path.join(distDir, 'index.html');
const servingFrontend = existsSync(indexHtml);

if (servingFrontend) {
  app.use(express.static(distDir));
  // SPA fallback: client-side routes (e.g. /menu, /orders/:id) have no file on disk,
  // so hand them index.html and let React Router take over.
  app.get('*', (_req, res) => res.sendFile(indexHtml));
}

app.listen(ENV.port, () => {
  console.log(`\n🍰 Hafsum order API on http://localhost:${ENV.port}`);
  console.log(`   Frontend:     ${servingFrontend ? 'served from hafsum-react/dist' : 'NOT built (dev mode — run Vite on :5173)'}`);
  console.log(`   Google login: ${ENV.googleClientId ? 'enabled' : 'OFF (using dev login)'}`);
  console.log(`   Dev login:    ${ENV.allowDevLogin ? 'enabled' : 'off'}`);
  console.log(`   Admin email:  ${ENV.adminEmail || '(not set)'}\n`);
});

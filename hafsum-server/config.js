import 'dotenv/config';

// Shop facts mirrored from hafsum-react/src/config.js — kept here so the server
// can stamp invoices independently of the frontend.
export const SHOP = {
  name: 'Hafsum Coffee & Cake',
  addressShort: 'Commercial Avenue, Sector A, Bahria Enclave, Islamabad',
  email: 'info@hufsum.co',
  mobileDisplay: '0333 627 6667',
  ntn: '5833227-3',
  gstRate: 0.05,
  minOrder: 500,
};

export const ENV = {
  port: Number(process.env.PORT) || 4000,
  // Where db.json lives. Leave blank to keep it next to the server (fine for a VPS).
  // On hosts with ephemeral disks (Render/Railway/Docker), point this at a mounted
  // volume so orders & accounts survive redeploys.
  dataDir: process.env.DATA_DIR || '',
  jwtSecret: (() => {
    if (process.env.JWT_SECRET) return process.env.JWT_SECRET;
    if (process.env.NODE_ENV === 'production') {
      throw new Error('JWT_SECRET must be set in production. Refusing to start with an insecure default.');
    }
    console.warn('⚠️  JWT_SECRET not set — using an insecure development-only secret. Set JWT_SECRET before deploying.');
    return 'dev-insecure-secret';
  })(),
  // Customer Google sign-in. Empty = Google login is OFF (the dev login still works).
  // Set this to a real OAuth Client ID from Google Cloud Console to turn it on. The
  // frontend reads this value from /api/config, so flipping it on needs no frontend
  // rebuild — just set GOOGLE_CLIENT_ID here and restart.
  googleClientId: process.env.GOOGLE_CLIENT_ID || '',
  allowDevLogin: String(process.env.ALLOW_DEV_LOGIN).toLowerCase() !== 'false',
  adminEmail: (process.env.ADMIN_EMAIL || '').toLowerCase(),
  adminPassword: process.env.ADMIN_PASSWORD || '',
  adminGoogleEmails: (process.env.ADMIN_GOOGLE_EMAILS || '')
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean),
};

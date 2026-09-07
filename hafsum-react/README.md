# Hafsum Coffee & Cake — React + Tailwind

The customer-facing side of the Hafsum website: a **React 19 + Vite 8 + Tailwind CSS v4**
single-page app with **React Router 7**. It's more than a marketing site — a full signed-in
ordering system backed by the [hafsum-server](../hafsum-server) API.

## What it does

- **Marketing / browse** — Home, Menu (search + category filters), About, Gallery
  (lightbox), Contact. Scroll-reveal animations, toasts, full responsive/accessibility
  support.
- **Accounts** — Google OAuth sign-in (plus a no-setup dev login for local testing/demos),
  with protected routes for anything order-related.
- **Ordering** — persistent cart (localStorage) → Checkout (GST calculated, minimum-order
  check) → order placed via the backend API → receipt-style invoice → Order Confirmation
  page with live status polling → full order history under Orders.
- **Admin console** — separate shop-staff login; view and advance all orders
  (`pending → accepted → preparing → ready → completed`).

## Run it

```bash
npm install
npm run dev        # dev server on http://localhost:5175, proxies /api → :4000
npm run build      # production build into dist/
npm run preview    # serve the production build
```

The order backend must also be running for login/checkout/admin to work — see
[hafsum-server/README.md](../hafsum-server/README.md).

## Structure

```
src/
  config.js              # shop config: WhatsApp number, phone, address, hours, apiUrl
  api.js                 # fetch wrapper for the order backend (auth token, JSON, errors)
  index.css              # Tailwind v4 @theme tokens + reveal/marquee keyframes
  main.jsx               # entry: Router + ServerConfigProvider + AuthProvider + CartProvider
  App.jsx                # routes, layout, skip link, scroll restoration, page-fade transition
  data/menu.js           # all 82 menu items (generated from Foodpanda listing)
  lib/invoice.js         # invoice number + GST/total math shared by checkout and receipt
  context/
    CartContext.jsx      # cart state + localStorage + toast
    AuthContext.jsx      # session (Google / dev / admin login), restores token on load
    ServerConfigContext.jsx # fetches /api/config at runtime (Google client ID, dev-login flag)
  components/
    Header.jsx, Footer.jsx, CartDrawer.jsx, MenuCard.jsx
    AccountMenu.jsx       # signed-in user menu (avatar, sign out)
    GoogleButton.jsx      # renders Google Identity Services sign-in button
    ProtectedRoute.jsx    # route guard for customer/admin-only pages
    InvoiceReceipt.jsx    # shared invoice UI (checkout + order confirmation)
    Toast.jsx, Reveal.jsx, Button.jsx, Section.jsx, Icons.jsx
  pages/
    Home.jsx, MenuPage.jsx, About.jsx, Gallery.jsx, Contact.jsx
    Login.jsx             # customer (Google/dev) + shop-staff login
    Checkout.jsx          # delivery details + invoice, submits the order
    OrderConfirmation.jsx # invoice + WhatsApp send options + live status polling
    Orders.jsx            # customer's order history
    Admin.jsx             # shop order console (accept/advance/reject)
public/assets/           # 82 menu photos + hero image
```

## Configuration

**WhatsApp ordering:** `whatsappNumber` in [src/config.js](src/config.js) is set to the
shop's WhatsApp Business number (`923336276667`, from their catalog/receipt). Checkout
places the order via the API and shows a receipt-style **order invoice** (items, 5% GST,
invoice number, NTN) which the customer can also send to that number on WhatsApp.

**Demo mode** (for client previews): `/menu?demo=cart` opens the cart pre-filled;
`/menu?demo=invoice` opens the checkout invoice directly.

**Backend URL / Google sign-in:** copy [`.env.example`](.env.example) to `.env` if you
need to override anything — normally nothing here needs to be set. `VITE_API_URL` is only
needed if the backend isn't reachable via the dev proxy (e.g. a separately hosted API).
`VITE_GOOGLE_CLIENT_ID` is only a build-time fallback; the Google Client ID is normally
served at runtime from the backend's `/api/config` (see
[hafsum-server/README.md](../hafsum-server/README.md)).

**Menu changes:** edit [src/data/menu.js](src/data/menu.js) — each item is
`{ id, name, desc, price, img }` grouped by category.

## Design system

Tailwind v4 theme tokens (in `index.css`): `cream`, `cream-deep`, `cream-card`,
`espresso`, `espresso-soft`, `brown`, `caramel`, `caramel-deep`, `gold`, `muted`,
`line` + `font-display` (Playfair Display) / `font-body` (Inter) +
`shadow-soft` / `shadow-lift` + `animate-marquee` / `animate-floaty`.

## Deploying

This app needs the Node backend (orders, login, admin), so it **cannot** go on a
static-only host (Netlify/Vercel/GitHub Pages) by itself. `hafsum-server` builds this app
and serves `dist/` itself as a single-origin deployment (SPA + API on one port, no CORS).
See [hafsum-server/DEPLOY.md](../hafsum-server/DEPLOY.md) for the full checklist and the
repo-root `render.yaml` / `Dockerfile` for ready-made deploy configs.

# Hafsum Coffee & Cake

The online ordering system for **Hafsum Coffee & Cake** (Bahria Enclave, Islamabad) — a
marketing website plus a full signed-in ordering flow and a shop-staff admin console.

## What's in this repo

- **[`hafsum-react/`](hafsum-react)** — the customer-facing site. React 19 + Vite +
  Tailwind CSS v4 + React Router 7. Home/Menu/About/Gallery/Contact, Google/dev login,
  cart, checkout with a receipt-style invoice, order tracking, and the admin console.
- **[`hafsum-server/`](hafsum-server)** — the Express API behind it. Accounts, order
  storage (`lowdb`, no database to install), and the endpoints the admin console uses to
  accept/advance orders.

## Quick start

Run the backend, then the frontend, in two terminals:

```bash
cd hafsum-server
npm install
copy .env.example .env      # PowerShell: cp .env.example .env
npm run dev                 # http://localhost:4000
```

```bash
cd hafsum-react
npm install
npm run dev                 # http://localhost:5175 (proxies /api → :4000)
```

Open **http://localhost:5175**. Sign in with **Continue as demo customer** to try the
ordering flow with no setup — see [`hafsum-server/README.md`](hafsum-server/README.md)
for shop-staff login and turning on real Google sign-in.

## Tech stack

React 19 · Vite · Tailwind CSS v4 · React Router 7 · Express · lowdb

## Deploying

This is a full-stack app (Node backend + persisted orders), so it needs a host that can
run a server — not a static-only host. `hafsum-server` builds and serves the frontend
itself as a single-origin deployment. See
[`hafsum-server/DEPLOY.md`](hafsum-server/DEPLOY.md) for the full checklist, and the
repo-root `render.yaml` / `Dockerfile` for ready-made deploy configs.

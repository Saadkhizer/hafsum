# Hafsum Order Backend

Small Node/Express API that powers the Hafsum website's checkout: it stores orders,
handles customer login (Google or a no-setup dev login) and shop-staff login, and
serves the shop's order console.

Data lives in a single `db.json` file (via lowdb) — no database to install.

## Run it

```bash
cd hafsum-server
npm install
copy .env.example .env      # PowerShell: cp .env.example .env
npm run dev                 # http://localhost:4000
```

Then start the frontend in another terminal:

```bash
cd hafsum-react
npm install
npm run dev                 # http://localhost:5175  (proxies /api → :4000)
```

### Logins out of the box
- **Customer:** click **Continue as demo customer** on `/login` (works with no setup).
- **Shop staff:** open `/login` → *Shop staff* tab → use `ADMIN_EMAIL` / `ADMIN_PASSWORD`
  from your `.env` (defaults: `shop@hafsum.co` / `hafsum-admin`). Lands on `/admin`.

## Turning on real Google sign-in

1. Go to <https://console.cloud.google.com/> and create (or pick) a project.
2. **APIs & Services → OAuth consent screen** → choose *External*, fill app name +
   support email, save. Add your own Google account under *Test users*.
3. **APIs & Services → Credentials → Create credentials → OAuth client ID**
   → Application type **Web application**.
4. Under **Authorized JavaScript origins** add:
   - `http://localhost:5175` (frontend dev server) and `http://localhost:4000` (this
     server also serves the built frontend on its own port)
   - (and your production URL later, e.g. `https://hafsum.co`)
5. Copy the **Client ID** (looks like `xxxxx.apps.googleusercontent.com`) and paste it
   into **one** place — `hafsum-server/.env` → `GOOGLE_CLIENT_ID=...`. The frontend
   reads it from `/api/config` at runtime, so there's nothing to set on the frontend
   and **no rebuild** to do. (The optional `VITE_GOOGLE_CLIENT_ID` in `hafsum-react/.env`
   is only a fallback for when the API can't be reached.)
6. Restart the server. The real **Sign in with Google** button now appears on `/login`.
   Sanity check: `GET /api/config` should show `"googleEnabled": true`.

To make a Google account shop staff, add its email to `ADMIN_GOOGLE_EMAILS` (comma list)
in `.env` — that account is auto-promoted to admin on next sign-in.

## Clearing test data

Orders and accounts persist in `db.json` between restarts (that's intended). To start
fresh — e.g. before a client demo — use one of:

```bash
npm run reset            # wipe everything: orders + accounts
npm run reset:orders     # clear orders only, keep customer/staff accounts
```

These overwrite `db.json` safely (they even repair it if it ever gets corrupted), so you
never need to hand-edit or delete the file. **Restart the server afterwards** so it loads
the clean data. Note: customers stay logged in their own browsers until they sign out
(their login lives in the browser's localStorage, not the server).

## API summary

| Method | Path                     | Who      | Purpose                              |
|--------|--------------------------|----------|--------------------------------------|
| GET    | `/api/config`            | anyone   | Which login methods are enabled      |
| POST   | `/api/auth/google`       | anyone   | Login with a Google credential       |
| POST   | `/api/auth/dev`          | anyone   | No-setup demo login                  |
| POST   | `/api/admin/login`       | anyone   | Shop staff email+password login      |
| GET    | `/api/me`                | user     | Current account                      |
| POST   | `/api/orders`            | user     | Place an order (totals re-priced)    |
| GET    | `/api/orders`            | user     | Caller's order history               |
| GET    | `/api/orders/:id`        | user     | One order (owner or admin)           |
| GET    | `/api/admin/orders`      | admin    | All orders (`?status=` filter)       |
| PATCH  | `/api/admin/orders/:id`  | admin    | Accept / reject / advance status     |

Order statuses: `pending → accepted → preparing → ready → completed` (or `rejected`).

## Notes
- The shop's existing eposmatic POS has no public API to push orders into, so this
  backend gives the shop its **own** order console instead. If eposmatic later exposes
  an API, `PATCH /api/admin/orders/:id` is the hook to forward accepted orders onward.
- Item prices/ids are imported straight from `hafsum-react/src/data/menu.js`, so the
  server always re-prices orders against the same menu the customer saw.
- **`JWT_SECRET` is required in production** — the server refuses to start with the
  insecure default if `NODE_ENV=production` and it isn't set. Set a long random string
  in `.env` (or your host's env vars) before deploying.
- Login endpoints (`/api/auth/google`, `/api/auth/dev`, `/api/admin/login`) are
  rate-limited (10 attempts / 15 min per IP) to slow down brute-force and spam. Dev-login
  emails can never be granted admin — only a Google-verified email on
  `ADMIN_GOOGLE_EMAILS` is, since dev login lets a visitor type any email with no proof
  of ownership.

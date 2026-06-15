# Deploying the Hafsum site

The site is **one Node service**. The Express server (`hafsum-server`) serves the
built React frontend (`hafsum-react/dist`) *and* the order API from the same origin —
so there's **one process, one domain, one bill, and no CORS to configure**. The
frontend talks to the API at the relative path `/api`, which resolves to the same
server automatically.

```
            ┌─────────────────────────── one server / one domain ───────────────────────────┐
  browser → │  GET /            → hafsum-react/dist/index.html  (React app)                  │
            │  GET /menu, ...    → index.html (React Router handles the route)               │
            │  GET/POST /api/... → JSON order API + shop console                             │
            │  data: db.json (orders + accounts) in DATA_DIR                                 │
            └────────────────────────────────────────────────────────────────────────────────┘
```

> Because the app stores state in `db.json`, it **cannot** go on a static-only host
> (Netlify/Vercel/GitHub Pages). Use a host that runs Node and keeps a disk: a small
> VPS, or a paid Render/Railway instance.

---

## 1. Environment variables

Set these on the host (or in `hafsum-server/.env` on a VPS). Copy
`hafsum-server/.env.example` as a starting point.

| Variable              | Production value                                   | Notes |
|-----------------------|----------------------------------------------------|-------|
| `PORT`                | *(host usually sets this)*                          | Render/Railway inject it. On a VPS, pick e.g. `4000`. |
| `DATA_DIR`            | a persistent path, e.g. `/var/data`                 | Where `db.json` lives. Point at a mounted disk/volume so orders survive redeploys. |
| `JWT_SECRET`          | a long random string                                | Sign-in tokens. **Must not change** after launch, or everyone is logged out. |
| `ALLOW_DEV_LOGIN`     | `false`                                             | Turns OFF the no-setup demo login. **Always false in production.** |
| `ADMIN_EMAIL`         | the shop's chosen login email                       | Shop-staff console login. |
| `ADMIN_PASSWORD`      | a strong password                                   | Pair with `ADMIN_EMAIL`. |
| `GOOGLE_CLIENT_ID`    | `xxxxx.apps.googleusercontent.com` *(when ready)*   | Leave blank to keep customer login off until the client provides it. See `README.md`. |
| `ADMIN_GOOGLE_EMAILS` | comma-separated emails *(optional)*                 | Google accounts auto-promoted to shop admin. |

Generate a secret quickly:

```bash
node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
```

---

## 2. Build & run (verify locally first)

From `hafsum-server`:

```bash
npm install            # server deps
npm run build:web      # installs + builds hafsum-react/dist
ALLOW_DEV_LOGIN=false npm start
```

Open <http://localhost:4000>. You should see the full site, and `/api/health`
returns `{"ok":true}`. (Without a build, the server runs API-only and prints
"Frontend: NOT built" — that's the dev setup, where Vite serves the UI on :5173.)

---

## 3. Pick a host

### Option A — Render (easiest, uses `render.yaml`)

1. Push this repo to GitHub (already done: `github.com/Saadkhizer/hafsum`).
2. Render dashboard → **New +** → **Blueprint** → pick this repo. It reads
   `render.yaml`: builds the frontend, starts the server, attaches a 1 GB disk at
   `/var/data`, and generates `JWT_SECRET`.
3. Fill the `sync:false` vars (`ADMIN_EMAIL`, `ADMIN_PASSWORD`, and later
   `GOOGLE_CLIENT_ID`) in the dashboard.
4. Deploy. Your URL is `https://hafsum.onrender.com` (or your custom domain).

Railway is the same idea: root directory `hafsum-server`, build
`npm install && npm run build:web`, start `npm start`, add a volume for `DATA_DIR`.

### Option B — Small VPS (full control)

```bash
# on the server (Ubuntu example)
git clone https://github.com/Saadkhizer/hafsum.git
cd hafsum/hafsum-server
cp .env.example .env          # then edit: secret, admin creds, DATA_DIR, ALLOW_DEV_LOGIN=false
npm install
npm run build:web
npm install -g pm2
pm2 start server.js --name hafsum
pm2 save && pm2 startup       # restart on reboot
```

Put a reverse proxy in front for HTTPS (Caddy is the least effort — automatic TLS):

```
# /etc/caddy/Caddyfile
hafsum.example.com {
    reverse_proxy localhost:4000
}
```

(or nginx with certbot if you prefer). Point the domain's DNS at the VPS first.

### Option C — Docker (any container host)

```bash
docker build -t hafsum .                       # run from the repo root
docker run -d -p 4000:4000 \
  --env-file hafsum-server/.env \
  -v hafsum-data:/data \
  --name hafsum hafsum
```

`DATA_DIR=/data` and a named volume are baked in, so `db.json` persists. Front it
with the same Caddy/nginx config as Option B for HTTPS.

---

## 4. After it's live

- [ ] **Wipe demo data** before the shop uses it: `npm run reset` (or `reset:orders`
      to keep accounts), then restart. On Docker: `docker exec hafsum npm run reset`.
- [ ] **Confirm `ALLOW_DEV_LOGIN=false`** — visit `/api/config`, `devLoginEnabled`
      should be `false`.
- [ ] **Test the shop login** at `/login` → *Shop staff* with `ADMIN_EMAIL` /
      `ADMIN_PASSWORD`; you should land on `/admin`.
- [ ] **When the client provides the Google Client ID:** set `GOOGLE_CLIENT_ID`
      (server only) and restart — the frontend reads it from `/api/config`, so **no
      rebuild is needed**. Then add the live URL to *Authorized JavaScript origins* in
      Google Cloud (see `README.md`). Verify at `/api/config`: `googleEnabled` is `true`.
- [ ] **Back up `db.json`** periodically (it holds real customer orders).

## 5. Shipping updates later

```bash
git pull
npm run build:web      # rebuild the frontend
# Render/Railway: redeploys automatically on push
# VPS:    pm2 restart hafsum
# Docker: docker build -t hafsum . && docker restart hafsum  (rebuild image)
```

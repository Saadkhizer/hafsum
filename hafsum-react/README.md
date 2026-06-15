# Hafsum Coffee & Cake — React + Tailwind

The Hafsum website rebuilt as a **React 19 + Vite 8 + Tailwind CSS v4** single-page app
with **React Router 7**. Feature-identical to the static version: five pages, scroll-reveal
animations, menu search & category filters, persistent cart, WhatsApp checkout, gallery
lightbox, toasts, and full responsive/accessibility support.

## Run it

```bash
npm install
npm run dev        # dev server on http://localhost:5173
npm run build      # production build into dist/
npm run preview    # serve the production build
```

## Structure

```
src/
  config.js              # shop config: WhatsApp number, phone, address, hours
  index.css              # Tailwind v4 @theme tokens + reveal/marquee keyframes
  main.jsx               # entry: Router + CartProvider
  App.jsx                # routes, layout, skip link, scroll restoration
  data/menu.js           # all 82 menu items (generated from Foodpanda listing)
  context/CartContext.jsx# cart state + localStorage + toast + WhatsApp checkout
  components/
    Header.jsx           # sticky nav, mobile menu, cart badge
    Footer.jsx           # dark footer
    CartDrawer.jsx       # slide-in cart with qty controls and checkout
    MenuCard.jsx         # product card with Add button
    Toast.jsx, Reveal.jsx, Button.jsx, Section.jsx, Icons.jsx
  pages/
    Home.jsx, MenuPage.jsx, About.jsx, Gallery.jsx, Contact.jsx
public/assets/           # 82 menu photos + hero image
```

## Configuration

**WhatsApp ordering:** `whatsappNumber` in [src/config.js](src/config.js) is set to the
shop's WhatsApp Business number (`923336276667`, from their catalog/receipt). Checkout
shows a receipt-style **order invoice** (items, 5% GST, invoice number, NTN) which the
customer sends to that number on WhatsApp; the cart clears once sent.

**Demo mode** (for client previews): `/menu?demo=cart` opens the cart pre-filled;
`/menu?demo=invoice` opens the checkout invoice directly.

**Menu changes:** edit [src/data/menu.js](src/data/menu.js) — each item is
`{ id, name, desc, price, img }` grouped by category.

## Design system

Tailwind v4 theme tokens (in `index.css`): `cream`, `cream-deep`, `cream-card`,
`espresso`, `espresso-soft`, `brown`, `caramel`, `caramel-deep`, `gold`, `muted`,
`line` + `font-display` (Playfair Display) / `font-body` (Inter) +
`shadow-soft` / `shadow-lift` + `animate-marquee` / `animate-floaty`.

## Deploying

`npm run build`, then host `dist/` on Netlify / Vercel / Cloudflare Pages.
Because it uses client-side routing, configure the host to rewrite all paths to
`/index.html` (Netlify: `/* /index.html 200` in `_redirects`; Vercel handles SPAs
automatically).

"""Generate menu/about/gallery/contact pages for the Hafsum site by reusing
the header, footer and cart drawer markup from index.html."""
import io, re, sys
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

index = open('hafsum-website/index.html', encoding='utf-8').read()

header = re.search(r'<!-- ======================= header =======================.*?</header>', index, re.S).group(0)
footer = re.search(r'<!-- ======================= footer =======================.*?</footer>', index, re.S).group(0)
drawer = re.search(r'<!-- ======================= cart drawer =======================.*?</aside>', index, re.S).group(0)

def shell(title, desc, active, main):
    h = header
    h = h.replace(' class="is-active" aria-current="page"', '')
    h = h.replace(f'<a href="{active}.html">', f'<a href="{active}.html" class="is-active" aria-current="page">')
    return f'''<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{title}</title>
  <meta name="description" content="{desc}">
  <link rel="icon" type="image/svg+xml" href='data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="%23B97E46" d="M4 8h13a3 3 0 0 1 3 3v1a4 4 0 0 1-4 4h-.4A6 6 0 0 1 10 20H9a6 6 0 0 1-6-6V9a1 1 0 0 1 1-1zm13 6h.5a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1H17zM7 2.5c1.5 1.2 1.5 2.3 0 3.5M11 2.5c1.5 1.2 1.5 2.3 0 3.5" stroke="%23B97E46" stroke-width="1.6" stroke-linecap="round" fill="none"/></svg>'>
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
<a class="skip-link" href="#main">Skip to content</a>

{h}

<main id="main">
{main}
</main>

{footer}

{drawer}

<script src="js/menu-data.js"></script>
<script src="js/main.js"></script>
</body>
</html>
'''

ARROW = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>'

# ---------------------------------------------------------------- menu
menu_main = '''
  <section class="page-hero">
    <div class="container reveal is-visible">
      <span class="kicker" style="justify-content:center;">Freshly brewed · freshly baked</span>
      <h1>Our Menu</h1>
      <p>Eighty-plus things to love — from a perfect espresso to slow-baked San Sebastian cheesecake. Add your favourites and order in a tap.</p>
    </div>
  </section>

  <div class="menu-toolbar">
    <div class="container menu-toolbar-inner">
      <div class="menu-tabs" id="menu-tabs" role="tablist" aria-label="Menu categories"></div>
      <div class="menu-search">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
        <input type="search" id="menu-search" placeholder="Search the menu…" aria-label="Search the menu">
      </div>
    </div>
  </div>

  <div class="container" id="menu-root" style="padding-bottom:80px;"><!-- rendered by JS --></div>
'''

# ---------------------------------------------------------------- about
about_main = '''
  <section class="page-hero">
    <div class="container reveal is-visible">
      <span class="kicker" style="justify-content:center;">Since day one, with love</span>
      <h1>Our Story</h1>
      <p>A cozy corner of Bahria Enclave where good coffee meets good people.</p>
    </div>
  </section>

  <section class="section--tight section">
    <div class="container split">
      <div class="reveal">
        <span class="kicker">How it started</span>
        <h2 class="section-title">From a home oven to Bahria Enclave's favourite café</h2>
        <p class="section-sub">Hafsum Coffee &amp; Cake was born from a simple belief — that a great day starts with a proper breakfast and an honest cup of coffee. What began as a passion for baking grew into one of the best breakfast cafés in Bahria Enclave, Islamabad.</p>
        <p class="section-sub">Today our counter carries everything from buttery croissants and hand-decorated cakes to cheesy pasta, lasagna and chicken bread — all made fresh, every day, in our own kitchen.</p>
      </div>
      <div class="split-photos reveal-stagger">
        <img src="assets/menu/san-sebastian-cheesecake.jpg" alt="San Sebastian cheesecake at Hafsum">
        <img src="assets/menu/cappuccino.jpg" alt="Cappuccino with latte art">
      </div>
    </div>
  </section>

  <section class="section section--deep">
    <div class="container">
      <div class="section-head section-head--center reveal">
        <span class="kicker">What we stand for</span>
        <h2 class="section-title">Three promises, every single day</h2>
      </div>
      <div class="grid-3 reveal-stagger">
        <article class="review-card">
          <span class="feature-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 8h13a3 3 0 0 1 3 3v1a4 4 0 0 1-4 4h-.4A6 6 0 0 1 10 20H9a6 6 0 0 1-6-6V9a1 1 0 0 1 1-1z"/><path d="M7 2.5c1.5 1.2 1.5 2.3 0 3.5M11 2.5c1.5 1.2 1.5 2.3 0 3.5"/></svg></span>
          <h3 style="font-size:21px; margin:0;">Specialty coffee, always</h3>
          <p style="color:var(--muted); font-size:15px; margin:0;">Seventeen ways to take your caffeine — espresso, mocha, caramel, hazelnut, Irish — each cup pulled with care, never rushed.</p>
        </article>
        <article class="review-card">
          <span class="feature-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3c1.5 2 4.5 2.5 4.5 5.5a4.5 4.5 0 0 1-9 0C7.5 5.5 10.5 5 12 3z"/><path d="M4 21h16M6 21v-4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v4"/></svg></span>
          <h3 style="font-size:21px; margin:0;">Baked fresh, never stored</h3>
          <p style="color:var(--muted); font-size:15px; margin:0;">Our cakes, croissants and eclairs come out of the oven the same day they reach your table. Customers say it tastes home-made — because it is.</p>
        </article>
        <article class="review-card">
          <span class="feature-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 21s-7-4.6-9.5-9A5.5 5.5 0 0 1 12 6.5 5.5 5.5 0 0 1 21.5 12c-2.5 4.4-9.5 9-9.5 9z"/></svg></span>
          <h3 style="font-size:21px; margin:0;">A place for the whole family</h3>
          <p style="color:var(--muted); font-size:15px; margin:0;">A warm, cozy ambiance built for slow mornings, study sessions and family evenings — with dine-in, takeaway and home delivery.</p>
        </article>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container split">
      <div class="split-photos reveal-stagger">
        <img src="assets/menu/4-pound-cake-fudge-flavor.jpg" alt="Customized fudge celebration cake">
        <img src="assets/menu/lotus-parfait.jpg" alt="Lotus parfait dessert">
      </div>
      <div class="reveal">
        <span class="kicker">Celebrations</span>
        <h2 class="section-title">Cakes made just for your moment</h2>
        <p class="section-sub">Birthdays, anniversaries, bridal showers — our kitchen takes custom cake orders with 24 hours' notice. Pick a flavour, tell us your theme, and we'll bake the centrepiece of your celebration.</p>
        <div class="hero-ctas">
          <a class="btn btn--primary" href="menu.html">Order a custom cake ''' + ARROW + '''</a>
          <a class="btn btn--ghost" href="contact.html">Ask us anything</a>
        </div>
      </div>
    </div>
  </section>

  <section class="section section--dark cta-band">
    <div class="container reveal">
      <h2>Come taste the <em>story</em> yourself</h2>
      <p>Babu Plaza, Commercial Avenue, Sector A, Bahria Enclave — open every day from 8 in the morning until midnight.</p>
      <div class="hero-ctas" style="justify-content:center;">
        <a class="btn btn--light" href="menu.html">Browse the menu</a>
        <a class="btn btn--ghost-light" href="contact.html">Plan your visit</a>
      </div>
    </div>
  </section>
'''

# ---------------------------------------------------------------- gallery
gallery_main = '''
  <section class="page-hero">
    <div class="container reveal is-visible">
      <span class="kicker" style="justify-content:center;">Feast your eyes first</span>
      <h1>Gallery</h1>
      <p>Every photo here is the real thing — shot straight from our counter in Bahria Enclave. Tap any picture for a closer look.</p>
    </div>
  </section>

  <section class="section--tight section">
    <div class="container">
      <div class="gallery-grid" id="gallery-grid"><!-- rendered by JS --></div>
    </div>
  </section>
'''

# ---------------------------------------------------------------- contact
contact_main = '''
  <section class="page-hero">
    <div class="container reveal is-visible">
      <span class="kicker" style="justify-content:center;">We'd love to see you</span>
      <h1>Visit &amp; Contact</h1>
      <p>Walk in for a slow morning coffee, call ahead for pickup, or get it delivered to your door.</p>
    </div>
  </section>

  <section class="section--tight section">
    <div class="container contact-grid">
      <div class="reveal">
        <div class="info-card">
          <h3><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/></svg> Where to find us</h3>
          <p>Babu Plaza, Plot No. 1, Commercial Avenue,<br>Sector A, Bahria Enclave, Islamabad</p>
          <p><a href="https://www.google.com/maps/dir/?api=1&amp;destination=33.6885545,73.2107943" target="_blank" rel="noopener">Get directions on Google Maps</a></p>
        </div>
        <div class="info-card">
          <h3><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg> Order &amp; inquiries</h3>
          <p>Call us at <a href="tel:+92518482520">+92 51 848 2520</a><br>
          or message us on <a href="https://www.instagram.com/hafsum.co/" target="_blank" rel="noopener">Instagram @hafsum.co</a></p>
          <p style="margin:0;">Custom cake orders need 24 hours' notice.</p>
        </div>
        <div class="info-card">
          <h3><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/></svg> Opening hours</h3>
          <table class="hours-table">
            <tr><td>Monday — Friday</td><td>8:00 AM – 12:00 AM</td></tr>
            <tr><td>Saturday</td><td>8:00 AM – 12:00 AM</td></tr>
            <tr><td>Sunday</td><td>8:00 AM – 12:00 AM</td></tr>
          </table>
        </div>
        <div class="info-card" style="margin-bottom:0;">
          <h3><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 7h13v10H3zM16 10h3l2 3v4h-5z"/><circle cx="7.5" cy="17" r="1.8"/><circle cx="17.5" cy="17" r="1.8"/></svg> Home delivery</h3>
          <p style="margin:0;">We deliver across Bahria Enclave — minimum order Rs. 500. Build your order from the <a href="menu.html">menu</a> and send it to us in one tap on WhatsApp.</p>
        </div>
      </div>
      <div class="reveal">
        <iframe class="map-frame" title="Map showing Hafsum Coffee and Cake at Babu Plaza, Bahria Enclave, Islamabad" loading="lazy" referrerpolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps?q=33.6885545,73.2107943&z=16&output=embed"></iframe>
      </div>
    </div>
  </section>

  <section class="section section--dark cta-band">
    <div class="container reveal">
      <h2>Craving something <em>right now</em>?</h2>
      <p>Your order is three taps away — browse, add, and send it to us on WhatsApp.</p>
      <div class="hero-ctas" style="justify-content:center;">
        <a class="btn btn--light" href="menu.html">Start an order</a>
      </div>
    </div>
  </section>
'''

pages = {
    'menu.html': ('Menu — Hafsum Coffee & Cake, Bahria Enclave Islamabad',
                  'Browse the full Hafsum Coffee & Cake menu — specialty coffee, fresh cakes, breakfast, sandwiches, desserts and more. Order for delivery or pickup in Bahria Enclave.',
                  'menu', menu_main),
    'about.html': ('Our Story — Hafsum Coffee & Cake',
                   "The story of Hafsum Coffee & Cake — Bahria Enclave's cozy, family-friendly café for specialty coffee, fresh bakes and all-day breakfast.",
                   'about', about_main),
    'gallery.html': ('Gallery — Hafsum Coffee & Cake',
                     'A look at what we bake and brew at Hafsum Coffee & Cake, Bahria Enclave — real photos of our coffee, cakes, breakfast and desserts.',
                     'gallery', gallery_main),
    'contact.html': ('Visit & Contact — Hafsum Coffee & Cake, Bahria Enclave',
                     'Find Hafsum Coffee & Cake at Babu Plaza, Sector A, Bahria Enclave, Islamabad. Open daily 8 AM to midnight. Dine-in, takeaway and home delivery.',
                     'contact', contact_main),
}

for fname, (title, desc, active, main) in pages.items():
    html = shell(title, desc, active, main)
    open(f'hafsum-website/{fname}', 'w', encoding='utf-8').write(html)
    print('wrote', fname, len(html), 'bytes')

import { Link } from 'react-router-dom';
import { ALL_ITEMS } from '../data/menu.js';
import { CONFIG } from '../config.js';
import Button from '../components/Button.jsx';
import MenuCard from '../components/MenuCard.jsx';
import Reveal from '../components/Reveal.jsx';
import { Kicker, SectionSub, SectionTitle, Stars } from '../components/Section.jsx';
import { ArrowRight, Cup, Heart, Oven, Pin, Star, Truck } from '../components/Icons.jsx';

const FEATURED_NAMES = [
  'Cappuccino', 'San Sebastian Cheesecake', 'Waffles', 'Red Velvet Cake',
  'Hot Grilled Chicken Panini Sandwich', 'Lotus Parfait', 'Pancakes', 'Hazelnut Latte',
];
const featured = [];
{
  const seen = new Set();
  for (const name of FEATURED_NAMES) {
    const item = ALL_ITEMS.find((it) => it.name === name && !seen.has(it.id));
    if (item) { featured.push(item); seen.add(item.id); }
  }
}

const CATEGORIES = [
  { img: '/assets/menu/caramel-latte.jpg', alt: 'Caramel latte with latte art', title: 'Coffee', sub: '17 brews' },
  { img: '/assets/menu/red-velvet-cake.jpg', alt: 'Red velvet cake slice', title: 'Cakes & Bakery', sub: '31 fresh bakes' },
  { img: '/assets/menu/pancakes.jpg', alt: 'Stack of pancakes with syrup', title: 'Breakfast', sub: 'All-day classics' },
  { img: '/assets/menu/hot-club-sandwich.jpg', alt: 'Hot club sandwich', title: 'From the Kitchen', sub: 'Sandwiches & more' },
];

const REVIEWS = [
  { name: 'Kiran', text: 'The chicken bread and marble cake were really fresh — as if they came straight out of the oven.' },
  { name: 'Hasanain', text: 'The lotus on the parfait was probably the best parfait I ever had.' },
  { name: 'Zaki', text: 'Salad was good and the rider was of excellent nature.' },
];

const MARQUEE = [
  'Specialty coffee', 'Fresh cakes daily', 'All-day breakfast',
  'Handcrafted desserts', 'Croissants & pastries', 'Dine-in · Takeaway · Delivery',
];

const FEATURES = [
  { Icon: Cup, title: 'Premium specialty coffee', sub: 'From a classic espresso to caramel and hazelnut lattes.' },
  { Icon: Oven, title: 'Baked fresh daily', sub: 'Cakes, croissants, eclairs and biscuits from our own oven.' },
  { Icon: Heart, title: 'Cozy & family-friendly', sub: 'Dine-in, takeaway, or home delivery across Bahria Enclave.' },
];

/** Hafsum opens 8:00 AM and closes at midnight, every day. */
function openStatus() {
  const hour = new Date().getHours();
  return hour >= 8
    ? { open: true, label: 'Open now', detail: 'till 12 AM' }
    : { open: false, label: 'Opens 8 AM', detail: 'see you soon' };
}

export default function Home() {
  const status = openStatus();

  return (
    <>
      {/* ============ hero ============ */}
      <section className="bg-cream pt-[78px]">
        {/* ---- full-bleed image, content overlaid directly (no card) ---- */}
        <div className="relative">
          <img
            src="/assets/menu/cappuccino.jpg"
            alt="A latte with heart art and fresh-roasted coffee beans at Hafsum Coffee & Cake"
            fetchPriority="high"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
          {/* legibility scrims — strongest on the left where the text sits */}
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-espresso/92 via-espresso/55 to-espresso/10" />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-espresso/85 via-transparent to-transparent md:from-espresso/20" />

          <div className="relative mx-auto flex min-h-[clamp(520px,72vh,720px)] max-w-7xl flex-col justify-end px-6 py-10 md:justify-center md:py-0">
            <div className="max-w-[560px]">
              <span className="inline-flex items-center gap-2 rounded-full border border-cream/25 bg-cream/10 px-3.5 py-1.5 text-[12.5px] font-semibold text-cream backdrop-blur-sm">
                <Star className="h-3.5 w-3.5 text-gold" /> 4.6 · Bahria Enclave&rsquo;s favourite café
              </span>

              <h1 className="mt-5 font-display text-[clamp(40px,6.4vw,72px)] font-semibold leading-[1.03] tracking-tight text-cream">
                Freshly brewed coffee, cakes baked every morning
              </h1>

              <p className="mt-4 max-w-[460px] text-[16px] leading-relaxed text-cream/85 md:text-[17px]">
                Enjoy a cozy, family-friendly corner of Bahria Enclave — specialty espresso, silky lattes
                and handcrafted cakes, made fresh daily in Islamabad.
              </p>

              <div className="mt-7 flex flex-wrap gap-3.5">
                <Button variant="light" to="/menu">Order now <ArrowRight className="h-[18px] w-[18px]" /></Button>
                <Button variant="ghostLight" to="/contact">Visit us</Button>
              </div>

              <div className="mt-6 inline-flex items-center gap-2 text-[13.5px] font-medium text-cream/85">
                <span className={`relative flex h-2 w-2 ${status.open ? 'text-success' : 'text-gold'}`}>
                  {status.open && (
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-70" />
                  )}
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-current" />
                </span>
                {status.label} <span className="text-cream/55">· {status.detail} · 8 AM–12 AM daily</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ marquee ============ */}
      <div className="overflow-hidden bg-espresso py-4 text-cream" aria-hidden="true">
        <div className="inline-flex animate-marquee whitespace-nowrap">
          {[...MARQUEE, ...MARQUEE].map((text, i) => (
            <span key={i} className="inline-flex items-center gap-6.5 pr-6.5 font-display text-[17px] italic tracking-wide">
              {text} <i className="h-1.5 w-1.5 flex-none rounded-full bg-gold" />
            </span>
          ))}
        </div>
      </div>

      {/* ============ categories ============ */}
      <section className="py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal className="mb-10 md:mb-12">
            <Kicker>What we bake &amp; brew</Kicker>
            <SectionTitle>A little something for every craving</SectionTitle>
          </Reveal>
          <Reveal stagger className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
            {CATEGORIES.map(({ img, alt, title, sub }) => (
              <Link
                key={title} to="/menu"
                className="group relative flex aspect-[3/3.6] items-end overflow-hidden rounded-2xl shadow-soft"
              >
                <img src={img} alt={alt} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-107" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C120B]/85 via-[#1C120B]/15 to-transparent" aria-hidden="true" />
                <div className="relative z-[1] w-full p-4 md:p-5.5 text-cream">
                  <h3 className="font-display text-[19px] font-semibold md:text-[22px]">{title}</h3>
                  <span className="inline-flex items-center gap-1.5 text-[12.5px] text-[#D9C8B2] md:text-[13px]">
                    {sub} <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ============ featured ============ */}
      <section className="bg-cream-deep py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal className="mb-10 text-center md:mb-12">
            <Kicker center>Customer favourites</Kicker>
            <SectionTitle>Most loved at Hafsum</SectionTitle>
            <SectionSub center>Straight from our counter — the cups and slices Bahria Enclave keeps coming back for.</SectionSub>
          </Reveal>
          <Reveal stagger className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:gap-6 lg:grid-cols-4">
            {featured.map((item) => <MenuCard key={item.id} item={item} tag={item.category} />)}
          </Reveal>
          <Reveal className="mt-10 text-center md:mt-11">
            <Button to="/menu">See the full menu <ArrowRight className="h-[18px] w-[18px]" /></Button>
          </Reveal>
        </div>
      </section>

      {/* ============ story ============ */}
      <section className="py-20 md:py-24">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 lg:grid-cols-2 lg:gap-16">
          <Reveal stagger className="order-2 grid grid-cols-2 gap-4 md:gap-4.5 lg:order-1">
            <img src="/assets/menu/waffles.jpg" alt="Waffles with fresh toppings" className="aspect-[3/4] w-full rounded-2xl object-cover shadow-soft" />
            <img src="/assets/menu/coffee-cake.jpg" alt="Coffee cake" className="mt-8 aspect-[3/4] w-full rounded-2xl object-cover shadow-soft md:mt-11" />
          </Reveal>
          <Reveal className="order-1 lg:order-2">
            <Kicker>Our story</Kicker>
            <SectionTitle>Baked with love, brewed with care</SectionTitle>
            <SectionSub>
              Hafsum Coffee &amp; Cake began with a simple idea — a warm, family-friendly corner in Bahria Enclave
              where premium specialty coffee meets cakes that taste like they came straight out of a home oven.
              Every croissant, parfait and pancake is made fresh, every single day.
            </SectionSub>
            <ul className="mt-7 grid gap-4.5">
              {FEATURES.map(({ Icon, title, sub }) => (
                <li key={title} className="flex items-start gap-4">
                  <span className="flex h-[46px] w-[46px] flex-none items-center justify-center rounded-[14px] bg-cream-deep text-caramel-deep">
                    <Icon className="h-[22px] w-[22px]" />
                  </span>
                  <div>
                    <strong className="block text-[16.5px]">{title}</strong>
                    <span className="text-[14.5px] text-muted">{sub}</span>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Button variant="ghost" to="/about">Read our story</Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ reviews ============ */}
      <section className="bg-cream-deep py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal className="mb-10 text-center md:mb-12">
            <Kicker center>Word on the street</Kicker>
            <SectionTitle>What our customers say</SectionTitle>
          </Reveal>
          <Reveal stagger className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-7 lg:grid-cols-3">
            {REVIEWS.map(({ name, text }) => (
              <article key={name} className="flex flex-col gap-4 rounded-2xl border border-line bg-cream-card p-7 transition-shadow duration-300 hover:shadow-lift md:p-7.5">
                <Stars />
                <blockquote className="flex-1 font-display text-[18.5px] italic leading-normal">&ldquo;{text}&rdquo;</blockquote>
                <footer className="text-sm text-muted"><strong className="font-semibold text-espresso">{name}</strong> · verified Foodpanda order</footer>
              </article>
            ))}
          </Reveal>
          <Reveal className="mt-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 rounded-2xl border border-line bg-cream-card px-7 py-6 text-center md:mt-11 md:px-8 md:py-6.5">
            <span className="font-display text-[40px] font-bold">4.6 ★</span>
            <p className="text-[14.5px] text-muted">Rated by <strong className="text-espresso">300+ customers</strong> on Foodpanda — and counting.</p>
            <Button variant="ghost" href={CONFIG.instagram} target="_blank" rel="noopener noreferrer">Follow us on Instagram</Button>
          </Reveal>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="bg-espresso py-20 md:py-24">
        <Reveal className="mx-auto max-w-[760px] px-6 text-center">
          <Kicker center dark>Come say hello</Kicker>
          <h2 className="mb-3 font-display text-[clamp(30px,4.6vw,50px)] font-semibold leading-[1.15] text-cream">
            Your table is <em className="text-gold">ready</em>, the coffee is <em className="text-gold">hot</em>
          </h2>
          <p className="text-[17px] text-[#CBB9A4]">
            Find us at Babu Plaza, Commercial Avenue, Sector A — or get your favourites delivered to your
            doorstep anywhere in Bahria Enclave.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3.5">
            <Button variant="light" to="/menu">Order now</Button>
            <Button variant="ghostLight" to="/contact">Get directions</Button>
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-7 gap-y-2.5 text-[13px] font-medium tracking-wide text-[#A8927A]">
            <span className="inline-flex items-center gap-2"><Pin className="h-4 w-4" /> Bahria Enclave, Islamabad</span>
            <span className="inline-flex items-center gap-2"><Cup className="h-4 w-4" /> Open 8 AM — 12 AM</span>
            <span className="inline-flex items-center gap-2"><Truck className="h-4 w-4" /> Dine-in · Takeaway · Delivery</span>
          </div>
        </Reveal>
      </section>
    </>
  );
}

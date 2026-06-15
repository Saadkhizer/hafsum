import { Link } from 'react-router-dom';
import { ALL_ITEMS } from '../data/menu.js';
import { CONFIG } from '../config.js';
import Button from '../components/Button.jsx';
import MenuCard from '../components/MenuCard.jsx';
import Reveal from '../components/Reveal.jsx';
import { Kicker, SectionSub, SectionTitle, Stars } from '../components/Section.jsx';
import { ArrowRight, Cup, Heart, Oven } from '../components/Icons.jsx';

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

export default function Home() {
  return (
    <>
      {/* ============ hero ============ */}
      <section className="relative overflow-hidden bg-cream pb-25 pt-[170px] max-[920px]:pb-[70px] max-[920px]:pt-[130px]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(1100px 500px at 85% -10%, rgba(216,169,91,.22), transparent 60%), radial-gradient(800px 420px at -10% 110%, rgba(185,126,70,.14), transparent 60%)',
          }}
        />
        <div className="relative mx-auto grid max-w-7xl grid-cols-[1.05fr_.95fr] items-center gap-14 px-6 max-[920px]:grid-cols-1 max-[920px]:gap-11">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-cream-card px-4.5 py-2 text-[13.5px] font-semibold text-espresso-soft shadow-soft">
              <span className="text-caramel">★</span> 4.6 rated · 300+ happy customers
            </span>
            <h1 className="my-5 font-display text-[clamp(42px,6.2vw,72px)] font-semibold leading-[1.1] tracking-tight">
              Where every <em className="text-caramel-deep">cup</em> meets a slice of{' '}
              <em className="text-caramel-deep">happiness</em>
            </h1>
            <p className="max-w-[520px] text-lg text-muted">
              Specialty coffee, fresh-from-the-oven cakes and the best all-day breakfast in Bahria Enclave —
              served in a cozy, family-friendly corner of Islamabad.
            </p>
            <div className="mt-8 flex flex-wrap gap-3.5">
              <Button to="/menu">Explore the menu <ArrowRight className="h-[18px] w-[18px]" /></Button>
              <Button variant="ghost" to="/contact">Visit us</Button>
            </div>
            <div className="mt-11 flex flex-wrap gap-7">
              {[['80+', 'menu items'], ['4.6★', 'customer rating'], ['8 AM', 'open daily till midnight']].map(([big, small]) => (
                <div key={small} className="min-w-[110px]">
                  <strong className="block font-display text-[27px] font-bold">{big}</strong>
                  <span className="text-[13.5px] text-muted">{small}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative max-[920px]:mx-auto max-[920px]:max-w-[460px]">
            <div className="aspect-[4/4.6] overflow-hidden rounded-b-[28px] rounded-t-[200px] shadow-lift">
              <img
                src="/assets/hero-listing.jpg"
                alt="Coffee and fresh bakes at Hafsum Coffee & Cake"
                fetchPriority="high"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute left-[-9%] top-[7%] flex animate-floaty items-center gap-3 rounded-2xl border border-line bg-cream-card p-3 pr-4.5 text-[13.5px] shadow-lift max-[920px]:left-[-4px]">
              <img src="/assets/menu/cappuccino.jpg" alt="" className="h-13 w-13 rounded-xl object-cover" />
              <div><strong className="block text-[14.5px]">Cappuccino</strong><span className="text-muted">Silky &amp; rich · Rs. 690</span></div>
            </div>
            <div className="absolute bottom-[6%] right-[-7%] flex animate-floaty items-center gap-3 rounded-2xl border border-line bg-cream-card p-3 pr-4.5 text-[13.5px] shadow-lift [animation-delay:1.2s] [animation-duration:8s] max-[920px]:right-[-4px]">
              <img src="/assets/menu/san-sebastian-cheesecake.jpg" alt="" className="h-13 w-13 rounded-xl object-cover" />
              <div><strong className="block text-[14.5px]">San Sebastian</strong><span className="text-muted">Slow-baked cheesecake</span></div>
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
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal className="mb-12">
            <Kicker>What we bake &amp; brew</Kicker>
            <SectionTitle>A little something for every craving</SectionTitle>
          </Reveal>
          <Reveal stagger className="grid grid-cols-4 gap-6 max-[1000px]:grid-cols-2 max-[600px]:grid-cols-1">
            {CATEGORIES.map(({ img, alt, title, sub }) => (
              <Link
                key={title} to="/menu"
                className="group relative flex aspect-[3/3.6] items-end overflow-hidden rounded-2xl shadow-soft"
              >
                <img src={img} alt={alt} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-107" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C120B]/82 via-transparent to-transparent" aria-hidden="true" />
                <div className="relative z-[1] w-full p-5.5 text-cream">
                  <h3 className="font-display text-[22px] font-semibold">{title}</h3>
                  <span className="inline-flex items-center gap-1.5 text-[13px] text-[#D9C8B2]">
                    {sub} <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ============ featured ============ */}
      <section className="bg-cream-deep py-24">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal className="mb-12 text-center">
            <Kicker center>Customer favourites</Kicker>
            <SectionTitle>Most loved at Hafsum</SectionTitle>
            <SectionSub center>Straight from our counter — the cups and slices Bahria Enclave keeps coming back for.</SectionSub>
          </Reveal>
          <Reveal stagger className="grid grid-cols-4 gap-6 max-[1000px]:grid-cols-2 max-[600px]:grid-cols-1">
            {featured.map((item) => <MenuCard key={item.id} item={item} tag={item.category} />)}
          </Reveal>
          <Reveal className="mt-11 text-center">
            <Button to="/menu">See the full menu <ArrowRight className="h-[18px] w-[18px]" /></Button>
          </Reveal>
        </div>
      </section>

      {/* ============ story ============ */}
      <section className="py-24">
        <div className="mx-auto grid max-w-7xl grid-cols-2 items-center gap-16 px-6 max-[920px]:grid-cols-1 max-[920px]:gap-11">
          <Reveal stagger className="grid grid-cols-2 gap-4.5">
            <img src="/assets/menu/waffles.jpg" alt="Waffles with fresh toppings" className="aspect-[3/4] w-full rounded-2xl object-cover shadow-soft" />
            <img src="/assets/menu/coffee-cake.jpg" alt="Coffee cake" className="mt-11 aspect-[3/4] w-full rounded-2xl object-cover shadow-soft" />
          </Reveal>
          <Reveal>
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
      <section className="bg-cream-deep py-24">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal className="mb-12 text-center">
            <Kicker center>Word on the street</Kicker>
            <SectionTitle>What our customers say</SectionTitle>
          </Reveal>
          <Reveal stagger className="grid grid-cols-3 gap-7 max-[1000px]:grid-cols-2 max-[600px]:grid-cols-1">
            {REVIEWS.map(({ name, text }) => (
              <article key={name} className="flex flex-col gap-4 rounded-2xl border border-line bg-cream-card p-7.5 transition-shadow duration-300 hover:shadow-lift">
                <Stars />
                <blockquote className="flex-1 font-display text-[18.5px] italic leading-normal">&ldquo;{text}&rdquo;</blockquote>
                <footer className="text-sm text-muted"><strong className="font-semibold text-espresso">{name}</strong> · verified Foodpanda order</footer>
              </article>
            ))}
          </Reveal>
          <Reveal className="mt-11 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 rounded-2xl border border-line bg-cream-card px-8 py-6.5">
            <span className="font-display text-[40px] font-bold">4.6 ★</span>
            <p className="text-[14.5px] text-muted">Rated by <strong className="text-espresso">300+ customers</strong> on Foodpanda — and counting.</p>
            <Button variant="ghost" href={CONFIG.instagram} target="_blank" rel="noopener noreferrer">Follow us on Instagram</Button>
          </Reveal>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="bg-espresso py-24">
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
          <p className="mt-7 text-sm tracking-wider text-[#A8927A]">
            OPEN DAILY · 8:00 AM — 12:00 AM · DINE-IN · TAKEAWAY · DELIVERY
          </p>
        </Reveal>
      </section>
    </>
  );
}

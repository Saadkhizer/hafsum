import Button from '../components/Button.jsx';
import Reveal from '../components/Reveal.jsx';
import { Kicker, SectionSub, SectionTitle } from '../components/Section.jsx';
import { ArrowRight, Cup, Heart, Oven } from '../components/Icons.jsx';

const VALUES = [
  {
    Icon: Cup,
    title: 'Specialty coffee, always',
    text: 'Seventeen ways to take your caffeine — espresso, mocha, caramel, hazelnut, Irish — each cup pulled with care, never rushed.',
  },
  {
    Icon: Oven,
    title: 'Baked fresh, never stored',
    text: 'Our cakes, croissants and eclairs come out of the oven the same day they reach your table. Customers say it tastes home-made — because it is.',
  },
  {
    Icon: Heart,
    title: 'A place for the whole family',
    text: 'A warm, cozy ambiance built for slow mornings, study sessions and family evenings — with dine-in, takeaway and home delivery.',
  },
];

export default function About() {
  return (
    <>
      <section className="pb-16 pt-[150px] text-center" style={{ background: 'radial-gradient(900px 380px at 50% -20%, rgba(216,169,91,.2), transparent 65%)' }}>
        <div className="mx-auto max-w-7xl px-6">
          <Kicker center>Since day one, with love</Kicker>
          <h1 className="mb-3 font-display text-[clamp(36px,5.4vw,58px)] font-semibold tracking-tight">Our Story</h1>
          <p className="mx-auto max-w-[540px] text-[17px] text-muted">
            A cozy corner of Bahria Enclave where good coffee meets good people.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto grid max-w-7xl grid-cols-2 items-center gap-16 px-6 max-[920px]:grid-cols-1 max-[920px]:gap-11">
          <Reveal>
            <Kicker>How it started</Kicker>
            <SectionTitle>From a home oven to Bahria Enclave&apos;s favourite café</SectionTitle>
            <SectionSub>
              Hafsum Coffee &amp; Cake was born from a simple belief — that a great day starts with a proper
              breakfast and an honest cup of coffee. What began as a passion for baking grew into one of the
              best breakfast cafés in Bahria Enclave, Islamabad.
            </SectionSub>
            <SectionSub>
              Today our counter carries everything from buttery croissants and hand-decorated cakes to cheesy
              pasta, lasagna and chicken bread — all made fresh, every day, in our own kitchen.
            </SectionSub>
          </Reveal>
          <Reveal stagger className="grid grid-cols-2 gap-4.5">
            <img src="/assets/menu/san-sebastian-cheesecake.jpg" alt="San Sebastian cheesecake at Hafsum" className="aspect-[3/4] w-full rounded-2xl object-cover shadow-soft" />
            <img src="/assets/menu/cappuccino.jpg" alt="Cappuccino with latte art" className="mt-11 aspect-[3/4] w-full rounded-2xl object-cover shadow-soft" />
          </Reveal>
        </div>
      </section>

      <section className="bg-cream-deep py-24">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal className="mb-12 text-center">
            <Kicker center>What we stand for</Kicker>
            <SectionTitle>Three promises, every single day</SectionTitle>
          </Reveal>
          <Reveal stagger className="grid grid-cols-3 gap-7 max-[1000px]:grid-cols-2 max-[600px]:grid-cols-1">
            {VALUES.map(({ Icon, title, text }) => (
              <article key={title} className="flex flex-col gap-4 rounded-2xl border border-line bg-cream-card p-7.5 transition-shadow duration-300 hover:shadow-lift">
                <span className="flex h-[46px] w-[46px] flex-none items-center justify-center rounded-[14px] bg-cream-deep text-caramel-deep">
                  <Icon className="h-[22px] w-[22px]" />
                </span>
                <h3 className="font-display text-[21px] font-semibold">{title}</h3>
                <p className="text-[15px] text-muted">{text}</p>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto grid max-w-7xl grid-cols-2 items-center gap-16 px-6 max-[920px]:grid-cols-1 max-[920px]:gap-11">
          <Reveal stagger className="grid grid-cols-2 gap-4.5">
            <img src="/assets/menu/4-pound-cake-fudge-flavor.jpg" alt="Customized fudge celebration cake" className="aspect-[3/4] w-full rounded-2xl object-cover shadow-soft" />
            <img src="/assets/menu/lotus-parfait.jpg" alt="Lotus parfait dessert" className="mt-11 aspect-[3/4] w-full rounded-2xl object-cover shadow-soft" />
          </Reveal>
          <Reveal>
            <Kicker>Celebrations</Kicker>
            <SectionTitle>Cakes made just for your moment</SectionTitle>
            <SectionSub>
              Birthdays, anniversaries, bridal showers — our kitchen takes custom cake orders with 24 hours&apos;
              notice. Pick a flavour, tell us your theme, and we&apos;ll bake the centrepiece of your celebration.
            </SectionSub>
            <div className="mt-8 flex flex-wrap gap-3.5">
              <Button to="/menu">Order a custom cake <ArrowRight className="h-[18px] w-[18px]" /></Button>
              <Button variant="ghost" to="/contact">Ask us anything</Button>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-espresso py-24">
        <Reveal className="mx-auto max-w-[760px] px-6 text-center">
          <h2 className="mb-3 font-display text-[clamp(30px,4.6vw,50px)] font-semibold leading-[1.15] text-cream">
            Come taste the <em className="text-gold">story</em> yourself
          </h2>
          <p className="text-[17px] text-[#CBB9A4]">
            Babu Plaza, Commercial Avenue, Sector A, Bahria Enclave — open every day from 8 in the morning
            until midnight.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3.5">
            <Button variant="light" to="/menu">Browse the menu</Button>
            <Button variant="ghostLight" to="/contact">Plan your visit</Button>
          </div>
        </Reveal>
      </section>
    </>
  );
}

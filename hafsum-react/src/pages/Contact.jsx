import { Link } from 'react-router-dom';
import { CONFIG } from '../config.js';
import Button from '../components/Button.jsx';
import Reveal from '../components/Reveal.jsx';
import { Kicker } from '../components/Section.jsx';
import { Clock, Phone, Pin, Truck } from '../components/Icons.jsx';

function InfoCard({ Icon, title, children }) {
  return (
    <div className="mb-5.5 rounded-2xl border border-line bg-cream-card p-7.5 last:mb-0">
      <h3 className="mb-3 flex items-center gap-3 font-display text-[21px] font-semibold">
        <Icon className="h-[22px] w-[22px] text-caramel-deep" /> {title}
      </h3>
      <div className="text-[15px] leading-relaxed text-muted">{children}</div>
    </div>
  );
}

const linkCls = 'border-b border-caramel font-semibold text-espresso transition-colors duration-200 hover:text-caramel-deep';

export default function Contact() {
  return (
    <>
      <section className="pb-16 pt-[150px] text-center" style={{ background: 'radial-gradient(900px 380px at 50% -20%, rgba(216,169,91,.2), transparent 65%)' }}>
        <div className="mx-auto max-w-7xl px-6">
          <Kicker center>We&apos;d love to see you</Kicker>
          <h1 className="mb-3 font-display text-[clamp(36px,5.4vw,58px)] font-semibold tracking-tight">Visit &amp; Contact</h1>
          <p className="mx-auto max-w-[540px] text-[17px] text-muted">
            Walk in for a slow morning coffee, call ahead for pickup, or get it delivered to your door.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto grid max-w-7xl grid-cols-[1fr_1.1fr] items-start gap-12 px-6 max-[920px]:grid-cols-1">
          <Reveal>
            <InfoCard Icon={Pin} title="Where to find us">
              <p>Babu Plaza, Plot No. 1, Commercial Avenue,<br />Sector A, Bahria Enclave, Islamabad</p>
              <p className="mt-3">
                <a className={linkCls} href={CONFIG.mapsDirections} target="_blank" rel="noopener noreferrer">
                  Get directions on Google Maps
                </a>
              </p>
            </InfoCard>
            <InfoCard Icon={Phone} title="Order & inquiries">
              <p>
                Call us at <a className={linkCls} href={CONFIG.phoneHref}>{CONFIG.phoneDisplay}</a><br />
                or message us on <a className={linkCls} href={CONFIG.instagram} target="_blank" rel="noopener noreferrer">Instagram @hafsum.co</a>
              </p>
              <p className="mt-3">Custom cake orders need 24 hours&apos; notice.</p>
            </InfoCard>
            <InfoCard Icon={Clock} title="Opening hours">
              <table className="w-full border-collapse text-[15px]">
                <tbody>
                  {[['Monday — Friday'], ['Saturday'], ['Sunday']].map(([day]) => (
                    <tr key={day}>
                      <td className="border-b border-dashed border-line py-2 last:border-0">{day}</td>
                      <td className="border-b border-dashed border-line py-2 text-right font-semibold text-espresso">8:00 AM – 12:00 AM</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </InfoCard>
            <InfoCard Icon={Truck} title="Home delivery">
              <p>
                We deliver across Bahria Enclave — minimum order Rs. {CONFIG.minOrder}. Build your order from
                the <Link className={linkCls} to="/menu">menu</Link> and send it to us in one tap on WhatsApp.
              </p>
            </InfoCard>
          </Reveal>
          <Reveal>
            <div className="relative min-h-[480px] overflow-hidden rounded-2xl bg-cream-deep shadow-soft">
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-8 text-center" aria-hidden="true">
                <Pin className="h-10 w-10 text-caramel-deep" />
                <p className="font-display text-xl font-semibold text-espresso">Babu Plaza, Sector A</p>
                <p className="max-w-[300px] text-sm text-muted">Commercial Avenue, Bahria Enclave, Islamabad</p>
                <a
                  className={linkCls}
                  href={CONFIG.mapsDirections}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open in Google Maps
                </a>
              </div>
              <iframe
                title="Map showing Hafsum Coffee and Cake at Babu Plaza, Bahria Enclave, Islamabad"
                src={CONFIG.mapsEmbed}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="relative min-h-[480px] w-full border-0 [filter:saturate(.9)_sepia(.08)]"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-espresso py-24">
        <Reveal className="mx-auto max-w-[760px] px-6 text-center">
          <h2 className="mb-3 font-display text-[clamp(30px,4.6vw,50px)] font-semibold leading-[1.15] text-cream">
            Craving something <em className="text-gold">right now</em>?
          </h2>
          <p className="text-[17px] text-[#CBB9A4]">
            Your order is three taps away — browse, add, and send it to us on WhatsApp.
          </p>
          <div className="mt-8 flex justify-center">
            <Button variant="light" to="/menu">Start an order</Button>
          </div>
        </Reveal>
      </section>
    </>
  );
}

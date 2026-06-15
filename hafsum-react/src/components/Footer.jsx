import { Link } from 'react-router-dom';
import { CONFIG } from '../config.js';
import { Brand } from './Header.jsx';
import { Clock, Instagram, Phone, Pin } from './Icons.jsx';

const EXPLORE = [
  { to: '/', label: 'Home' },
  { to: '/menu', label: 'Full Menu' },
  { to: '/about', label: 'Our Story' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/contact', label: 'Contact' },
];
const POPULAR = ['Specialty Coffee', 'Fresh Cakes', 'All-Day Breakfast', 'Sandwiches & Panini', 'Customized Cakes'];

export default function Footer() {
  return (
    <footer className="bg-espresso pt-18 text-[#CBB9A4]">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-[1.4fr_1fr_1fr_1.2fr] gap-11 pb-14 max-[920px]:grid-cols-2 max-[560px]:grid-cols-1">
          <div>
            <Brand light />
            <p className="mt-4.5 max-w-[300px] text-[14.5px]">
              Specialty coffee, fresh cakes and all-day breakfast in the heart of Bahria Enclave, Islamabad.
            </p>
            <div className="mt-5 flex gap-2.5">
              <a
                href={CONFIG.instagram} target="_blank" rel="noopener noreferrer" aria-label="Hafsum on Instagram"
                className="inline-flex h-[42px] w-[42px] items-center justify-center rounded-full border border-cream/25 transition-colors duration-200 hover:border-gold hover:bg-gold hover:text-espresso"
              >
                <Instagram className="h-[18px] w-[18px]" />
              </a>
              <a
                href={CONFIG.phoneHref} aria-label="Call Hafsum Coffee and Cake"
                className="inline-flex h-[42px] w-[42px] items-center justify-center rounded-full border border-cream/25 transition-colors duration-200 hover:border-gold hover:bg-gold hover:text-espresso"
              >
                <Phone className="h-[18px] w-[18px]" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="mb-4.5 font-display text-[17px] font-semibold text-cream">Explore</h4>
            <ul className="grid gap-2.5">
              {EXPLORE.map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="text-[14.5px] transition-colors duration-200 hover:text-cream">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4.5 font-display text-[17px] font-semibold text-cream">Popular</h4>
            <ul className="grid gap-2.5">
              {POPULAR.map((label) => (
                <li key={label}>
                  <Link to="/menu" className="text-[14.5px] transition-colors duration-200 hover:text-cream">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4.5 font-display text-[17px] font-semibold text-cream">Find us</h4>
            <address className="grid gap-3 text-[14.5px] not-italic">
              <span className="flex items-start gap-2.5">
                <Pin className="mt-[3px] h-[17px] w-[17px] flex-none text-gold" />
                {CONFIG.address}
              </span>
              <span className="flex items-start gap-2.5">
                <Phone className="mt-[3px] h-[17px] w-[17px] flex-none text-gold" />
                <a href={CONFIG.phoneHref} className="transition-colors duration-200 hover:text-cream">{CONFIG.phoneDisplay}</a>
              </span>
              <span className="flex items-start gap-2.5">
                <Clock className="mt-[3px] h-[17px] w-[17px] flex-none text-gold" />
                {CONFIG.hoursShort}
              </span>
            </address>
          </div>
        </div>

        <div className="flex flex-wrap justify-between gap-2.5 border-t border-cream/12 py-5.5 text-[13px]">
          <span>© 2026 Hafsum Coffee &amp; Cake. All rights reserved.</span>
          <span>Bahria Enclave, Islamabad, Pakistan</span>
        </div>
      </div>
    </footer>
  );
}

import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import AccountMenu from './AccountMenu.jsx';
import { Bag, Burger, Cup } from './Icons.jsx';

const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/menu', label: 'Menu' },
  { to: '/about', label: 'Our Story' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/contact', label: 'Contact' },
];

export function Brand({ light = false }) {
  return (
    <Link to="/" className="inline-flex items-center gap-3" aria-label="Hafsum Coffee and Cake — home">
      <Cup className={`h-10 w-10 flex-none ${light ? 'text-gold' : 'text-caramel-deep'}`} />
      <span className={`font-display text-[22px] font-bold ${light ? 'text-cream' : 'text-espresso'}`}>
        Hafsum
        <small className="block font-body text-[10px] font-semibold uppercase tracking-[0.32em] text-caramel-deep">
          Coffee &amp; Cake
        </small>
      </span>
    </Link>
  );
}

export default function Header() {
  const { count, openCart } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-cream/90 shadow-soft backdrop-blur-md' : ''
      }`}
    >
      <div className="mx-auto flex h-[78px] max-w-7xl items-center justify-between gap-6 px-6">
        <Brand />

        <nav aria-label="Main navigation">
          <ul
            className={`max-[920px]:fixed max-[920px]:inset-x-4 max-[920px]:top-[78px] max-[920px]:flex-col max-[920px]:items-stretch max-[920px]:rounded-2xl max-[920px]:border max-[920px]:border-line max-[920px]:bg-cream-card max-[920px]:p-3 max-[920px]:shadow-lift max-[920px]:transition-all max-[920px]:duration-300 ${
              menuOpen
                ? 'max-[920px]:pointer-events-auto max-[920px]:translate-y-0 max-[920px]:opacity-100'
                : 'max-[920px]:pointer-events-none max-[920px]:-translate-y-3 max-[920px]:opacity-0'
            } flex items-center gap-1.5`}
          >
            {LINKS.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={to === '/'}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `inline-block rounded-full px-4 py-2.5 text-[15px] font-medium transition-colors duration-200 max-[920px]:block max-[920px]:px-4.5 max-[920px]:py-3 ${
                      isActive
                        ? 'bg-espresso text-cream'
                        : 'text-espresso-soft hover:bg-cream-deep hover:text-espresso'
                    }`
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2.5">
          <AccountMenu />
          <button
            onClick={openCart}
            aria-label="Open your order tray"
            className="relative inline-flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border-[1.5px] border-line bg-cream-card text-espresso transition-all duration-200 hover:border-caramel hover:shadow-soft"
          >
            <Bag className="h-[21px] w-[21px]" />
            <span
              aria-live="polite"
              className={`absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-caramel px-[5px] text-[11px] font-bold text-white transition-transform duration-200 ${
                count > 0 ? 'scale-100' : 'scale-0'
              }`}
            >
              {count}
            </span>
          </button>
          <button
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            className="hidden h-12 w-12 cursor-pointer items-center justify-center rounded-full border-[1.5px] border-line bg-cream-card text-espresso max-[920px]:inline-flex"
          >
            <Burger className="h-[22px] w-[22px]" />
          </button>
        </div>
      </div>
    </header>
  );
}

import { useMemo, useState } from 'react';
import { MENU } from '../data/menu.js';
import MenuCard from '../components/MenuCard.jsx';
import Reveal from '../components/Reveal.jsx';
import { Kicker } from '../components/Section.jsx';
import { Search } from '../components/Icons.jsx';

const GROUPS = ['All', ...MENU.groups];

export default function MenuPage() {
  const [activeGroup, setActiveGroup] = useState('All');
  const [query, setQuery] = useState('');

  const sections = useMemo(() => {
    const q = query.trim().toLowerCase();
    return MENU.categories
      .filter((cat) => activeGroup === 'All' || cat.group === activeGroup)
      .map((cat) => ({
        ...cat,
        items: cat.items.filter(
          (it) => !q || it.name.toLowerCase().includes(q) || (it.desc || '').toLowerCase().includes(q)
        ),
      }))
      .filter((cat) => cat.items.length > 0);
  }, [activeGroup, query]);

  return (
    <>
      <section className="bg-cream pb-16 pt-[150px] text-center" style={{ background: 'radial-gradient(900px 380px at 50% -20%, rgba(216,169,91,.2), transparent 65%)' }}>
        <div className="mx-auto max-w-7xl px-6">
          <Kicker center>Freshly brewed · freshly baked</Kicker>
          <h1 className="mb-3 font-display text-[clamp(36px,5.4vw,58px)] font-semibold tracking-tight">Our Menu</h1>
          <p className="mx-auto max-w-[540px] text-[17px] text-muted">
            Eighty-plus things to love — from a perfect espresso to slow-baked San Sebastian cheesecake.
            Add your favourites and order in a tap.
          </p>
        </div>
      </section>

      <div className="sticky top-[78px] z-30 border-b border-line bg-cream/94 py-3.5 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center gap-3.5 px-6 max-[700px]:flex-col-reverse max-[700px]:items-stretch">
          <div className="flex flex-1 gap-2 overflow-x-auto p-0.5 [scrollbar-width:none]" role="tablist" aria-label="Menu categories">
            {GROUPS.map((group) => (
              <button
                key={group}
                role="tab"
                aria-selected={activeGroup === group}
                onClick={() => setActiveGroup(group)}
                className={`flex-none cursor-pointer rounded-full border-[1.5px] px-5 py-2.5 text-sm font-semibold transition-colors duration-200 ${
                  activeGroup === group
                    ? 'border-espresso bg-espresso text-cream'
                    : 'border-line bg-cream-card text-espresso-soft hover:border-caramel'
                }`}
              >
                {group}
              </button>
            ))}
          </div>
          <div className="relative flex-none">
            <Search className="pointer-events-none absolute left-[15px] top-1/2 h-[17px] w-[17px] -translate-y-1/2 text-muted" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search the menu…"
              aria-label="Search the menu"
              className="min-h-[46px] w-[210px] rounded-full border-[1.5px] border-line bg-cream-card py-2.5 pl-10.5 pr-4 text-[14.5px] transition-all duration-300 focus:w-[250px] focus:border-caramel focus:outline-none max-[700px]:w-full max-[700px]:focus:w-full"
            />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 pb-20">
        {sections.length === 0 ? (
          <div className="py-20 text-center text-muted">
            <h3 className="mb-2 font-display text-2xl font-semibold text-espresso">Nothing matches &ldquo;{query}&rdquo;</h3>
            <p>Try a different name — or browse all categories.</p>
          </div>
        ) : (
          sections.map((cat) => (
            <section key={cat.name} className="pt-14" aria-label={cat.name}>
              <h2 className="mb-6.5 flex items-baseline gap-4.5 font-display text-[27px] font-semibold after:h-px after:flex-1 after:bg-line after:content-['']">
                {cat.name}
                <span className="font-body text-[13px] font-medium text-muted">
                  {cat.items.length} item{cat.items.length > 1 ? 's' : ''}
                </span>
              </h2>
              <Reveal stagger className="grid grid-cols-3 gap-7 max-[1000px]:grid-cols-2 max-[600px]:grid-cols-1">
                {cat.items.map((item) => <MenuCard key={item.id} item={item} />)}
              </Reveal>
            </section>
          ))
        )}
      </div>
    </>
  );
}

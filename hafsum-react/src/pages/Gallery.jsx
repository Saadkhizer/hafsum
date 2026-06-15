import { useCallback, useEffect, useState } from 'react';
import { ALL_ITEMS } from '../data/menu.js';
import { Kicker } from '../components/Section.jsx';
import { Close } from '../components/Icons.jsx';

export default function Gallery() {
  const [lightbox, setLightbox] = useState(null); // { img, name } | null
  const close = useCallback(() => setLightbox(null), []);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && close();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [close]);

  useEffect(() => {
    document.body.style.overflow = lightbox ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [lightbox]);

  return (
    <>
      <section className="pb-16 pt-[150px] text-center" style={{ background: 'radial-gradient(900px 380px at 50% -20%, rgba(216,169,91,.2), transparent 65%)' }}>
        <div className="mx-auto max-w-7xl px-6">
          <Kicker center>Feast your eyes first</Kicker>
          <h1 className="mb-3 font-display text-[clamp(36px,5.4vw,58px)] font-semibold tracking-tight">Gallery</h1>
          <p className="mx-auto max-w-[540px] text-[17px] text-muted">
            Every photo here is the real thing — shot straight from our counter in Bahria Enclave.
            Tap any picture for a closer look.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="columns-[240px] gap-4.5 [column-count:4] max-[1100px]:[column-count:3] max-[800px]:[column-count:2] max-[500px]:[column-count:1]">
            {ALL_ITEMS.map((item) => (
              <figure
                key={item.id}
                role="button"
                tabIndex={0}
                aria-label={`View ${item.name}`}
                onClick={() => setLightbox(item)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setLightbox(item); }
                }}
                className="group relative mb-4.5 cursor-zoom-in break-inside-avoid overflow-hidden rounded-xl shadow-soft"
              >
                <img src={item.img} alt={item.name} loading="lazy" className="w-full transition-transform duration-600 ease-out group-hover:scale-105" />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#1C120B]/80 to-transparent px-4 pb-3 pt-7 text-[13px] font-semibold text-cream opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  {item.name}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {lightbox && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-[#1C120B]/90 p-8"
          onClick={(e) => e.target === e.currentTarget && close()}
        >
          <button
            onClick={close}
            aria-label="Close image"
            className="absolute right-5.5 top-5.5 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-cream text-espresso"
          >
            <Close className="h-5 w-5" />
          </button>
          <img src={lightbox.img} alt={lightbox.name} className="max-h-[84vh] max-w-[min(920px,100%)] rounded-2xl shadow-lift" />
          <p className="absolute inset-x-0 bottom-6.5 text-center text-[15px] text-cream">{lightbox.name}</p>
        </div>
      )}
    </>
  );
}

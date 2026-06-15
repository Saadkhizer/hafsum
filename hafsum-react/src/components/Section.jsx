import { Star } from './Icons.jsx';

export function Kicker({ children, center = false, dark = false }) {
  return (
    <span
      className={`mb-3.5 inline-flex items-center gap-2.5 text-[13px] font-semibold uppercase tracking-[0.22em] ${
        dark ? 'text-gold' : 'text-caramel-deep'
      } ${center ? 'justify-center' : ''}`}
    >
      {!center && <span className="h-[1.5px] w-[34px] bg-caramel" aria-hidden="true" />}
      {children}
    </span>
  );
}

export function SectionTitle({ children, dark = false, className = '' }) {
  return (
    <h2 className={`mb-2 font-display text-[clamp(30px,4.4vw,46px)] font-semibold leading-[1.15] tracking-tight ${dark ? 'text-cream' : 'text-espresso'} ${className}`}>
      {children}
    </h2>
  );
}

export function SectionSub({ children, center = false, dark = false }) {
  return (
    <p className={`max-w-[560px] text-[17px] ${dark ? 'text-[#CBB9A4]' : 'text-muted'} ${center ? 'mx-auto' : ''}`}>
      {children}
    </p>
  );
}

export function Stars({ rating = 5 }) {
  return (
    <span className="inline-flex gap-[3px] text-caramel" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: rating }, (_, i) => <Star key={i} className="h-[17px] w-[17px]" />)}
    </span>
  );
}

import { Link } from 'react-router-dom';

const VARIANTS = {
  primary: 'bg-espresso text-cream hover:bg-brown hover:shadow-lift',
  caramel: 'bg-caramel text-white hover:bg-caramel-deep hover:shadow-lift',
  ghost: 'border-[1.5px] border-espresso text-espresso hover:bg-espresso hover:text-cream',
  light: 'bg-cream text-espresso hover:bg-white hover:shadow-lift',
  ghostLight: 'border-[1.5px] border-cream/55 text-cream hover:bg-cream hover:text-espresso',
};

/** Pill button. Renders <Link> when `to` is set, <a> when `href`, else <button>. */
export default function Button({ variant = 'primary', to, href, className = '', children, ...rest }) {
  const cls = `inline-flex min-h-[50px] cursor-pointer items-center justify-center gap-2.5 rounded-full px-7 py-3 text-[15px] font-semibold tracking-wide transition-all duration-200 ${VARIANTS[variant]} ${className}`;
  if (to) return <Link to={to} className={cls} {...rest}>{children}</Link>;
  if (href) return <a href={href} className={cls} {...rest}>{children}</a>;
  return <button className={cls} {...rest}>{children}</button>;
}

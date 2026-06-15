import { useEffect, useRef, useState } from 'react';

/** Scroll-reveal wrapper. `stagger` animates direct children one by one. */
export default function Reveal({ children, stagger = false, className = '', as: Tag = 'div' }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const mode = stagger ? 'reveal-stagger' : 'reveal';
  return (
    <Tag ref={ref} className={`${mode}${visible ? ' is-visible' : ''} ${className}`}>
      {children}
    </Tag>
  );
}

const base = { fill: 'none', stroke: 'currentColor', strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true };

export const ArrowRight = (p) => (
  <svg viewBox="0 0 24 24" {...base} strokeWidth="2" {...p}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);
export const Plus = (p) => (
  <svg viewBox="0 0 24 24" {...base} strokeWidth="2.2" {...p}><path d="M12 5v14M5 12h14" /></svg>
);
export const Check = (p) => (
  <svg viewBox="0 0 24 24" {...base} strokeWidth="2.4" {...p}><path d="M5 13l4 4L19 7" /></svg>
);
export const Close = (p) => (
  <svg viewBox="0 0 24 24" {...base} strokeWidth="2.2" {...p}><path d="M6 6l12 12M18 6L6 18" /></svg>
);
export const Burger = (p) => (
  <svg viewBox="0 0 24 24" {...base} strokeWidth="2" {...p}><path d="M4 7h16M4 12h16M4 17h16" /></svg>
);
export const Bag = (p) => (
  <svg viewBox="0 0 24 24" {...base} strokeWidth="1.8" {...p}>
    <path d="M6 8h12l-1.2 11.2a2 2 0 0 1-2 1.8H9.2a2 2 0 0 1-2-1.8L6 8z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" />
  </svg>
);
export const Search = (p) => (
  <svg viewBox="0 0 24 24" {...base} strokeWidth="2" {...p}><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
);
export const Eye = (p) => (
  <svg viewBox="0 0 24 24" {...base} strokeWidth="1.8" {...p}>
    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" /><circle cx="12" cy="12" r="3" />
  </svg>
);
export const EyeOff = (p) => (
  <svg viewBox="0 0 24 24" {...base} strokeWidth="1.8" {...p}>
    <path d="M10.6 10.6a3 3 0 0 0 4.24 4.24" />
    <path d="M9.9 4.24A9.1 9.1 0 0 1 12 5c6.5 0 10 7 10 7a13.5 13.5 0 0 1-2.16 2.92M6.1 6.1A13.4 13.4 0 0 0 2 12s3.5 7 10 7a9.1 9.1 0 0 0 3.6-.73" />
    <path d="M3 3l18 18" />
  </svg>
);
export const Star = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
    <path d="M12 2l2.95 6.32 6.91.83-5.12 4.72 1.36 6.84L12 17.27l-6.1 3.44 1.36-6.84-5.12-4.72 6.91-.83L12 2z" />
  </svg>
);
export const Pin = (p) => (
  <svg viewBox="0 0 24 24" {...base} strokeWidth="1.8" {...p}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" /><circle cx="12" cy="10" r="3" /></svg>
);
export const Phone = (p) => (
  <svg viewBox="0 0 24 24" {...base} strokeWidth="1.8" {...p}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);
export const Clock = (p) => (
  <svg viewBox="0 0 24 24" {...base} strokeWidth="1.8" {...p}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.5 2" /></svg>
);
export const Cup = (p) => (
  <svg viewBox="0 0 24 24" {...base} strokeWidth="1.6" {...p}>
    <path d="M4 8h13a3 3 0 0 1 3 3v1a4 4 0 0 1-4 4h-.4A6 6 0 0 1 10 20H9a6 6 0 0 1-6-6V9a1 1 0 0 1 1-1z" />
    <path d="M17 14h.5a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1H17" />
    <path d="M7 2.5c1.5 1.2 1.5 2.3 0 3.5M11 2.5c1.5 1.2 1.5 2.3 0 3.5" />
  </svg>
);
export const Oven = (p) => (
  <svg viewBox="0 0 24 24" {...base} strokeWidth="1.8" {...p}>
    <path d="M12 3c1.5 2 4.5 2.5 4.5 5.5a4.5 4.5 0 0 1-9 0C7.5 5.5 10.5 5 12 3z" />
    <path d="M4 21h16M6 21v-4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v4" />
  </svg>
);
export const Heart = (p) => (
  <svg viewBox="0 0 24 24" {...base} strokeWidth="1.8" {...p}>
    <path d="M12 21s-7-4.6-9.5-9A5.5 5.5 0 0 1 12 6.5 5.5 5.5 0 0 1 21.5 12c-2.5 4.4-9.5 9-9.5 9z" />
  </svg>
);
export const Truck = (p) => (
  <svg viewBox="0 0 24 24" {...base} strokeWidth="1.8" {...p}>
    <path d="M3 7h13v10H3zM16 10h3l2 3v4h-5z" /><circle cx="7.5" cy="17" r="1.8" /><circle cx="17.5" cy="17" r="1.8" />
  </svg>
);
export const Instagram = (p) => (
  <svg viewBox="0 0 24 24" {...base} strokeWidth="1.8" {...p}>
    <rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" />
    <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
  </svg>
);
export const WhatsApp = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
    <path d="M17.5 14.4c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.65.07a8.18 8.18 0 0 1-2.4-1.49 9 9 0 0 1-1.66-2.07c-.17-.3-.02-.46.13-.61.14-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.5 0 1.47 1.07 2.89 1.22 3.09.15.2 2.1 3.2 5.1 4.49.71.3 1.27.49 1.7.63.72.23 1.37.2 1.88.12.58-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35z" />
    <path d="M12 2a10 10 0 0 0-8.66 15L2 22l5.13-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.04.77.8-2.96-.2-.3A8.2 8.2 0 1 1 12 20.2z" />
  </svg>
);

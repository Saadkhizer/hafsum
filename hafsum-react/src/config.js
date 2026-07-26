export const CONFIG = {
  // WhatsApp Business number — orders and invoices are sent here (from the shop's catalog/receipt)
  whatsappNumber: '923336276667',
  phoneDisplay: '+92 51 848 2520',
  phoneHref: 'tel:+92518482520',
  mobileDisplay: '0333 627 6667',
  email: 'info@hufsum.co',
  ntn: '5833227-3',
  gstRate: 0.05,
  address: 'Babu Plaza, Plot No. 1, Commercial Avenue, Sector A, Bahria Enclave, Islamabad',
  addressShort: 'Commercial Avenue, Sector A, Bahria Enclave, Islamabad',
  instagram: 'https://www.instagram.com/hafsum.co/',
  whatsappCatalog: 'https://wa.me/c/923336276667',
  minOrder: 500,
  deliveryNote: 'Minimum order Rs. 500 · Delivery within Bahria Enclave',
  hoursShort: 'Open daily · 8:00 AM – 12:00 AM',
  mapsEmbed: 'https://www.google.com/maps?q=33.6885545,73.2107943&z=16&output=embed',
  mapsDirections: 'https://www.google.com/maps/dir/?api=1&destination=33.6885545,73.2107943',
  // Order backend. In dev the Vite proxy forwards /api → http://localhost:4000,
  // so the default empty base (same-origin) works. Override with VITE_API_URL if hosted elsewhere.
  apiUrl: import.meta.env.VITE_API_URL || '',
  // Optional build-time fallback only. The Client ID normally comes from the server's
  // /api/config at runtime (see ServerConfigContext) — set GOOGLE_CLIENT_ID there and the
  // Google button turns on with no frontend rebuild. This is used only if /api/config
  // can't be reached. See hafsum-server/README.md.
  googleClientId: import.meta.env.VITE_GOOGLE_CLIENT_ID || '',
};

export const rupees = (n) =>
  'Rs. ' + Number(n).toLocaleString('en-PK', { maximumFractionDigits: 2 });

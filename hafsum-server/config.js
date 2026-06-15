import 'dotenv/config';

// Shop facts mirrored from hafsum-react/src/config.js — kept here so the server
// can stamp invoices independently of the frontend.
export const SHOP = {
  name: 'Hafsum Coffee & Cake',
  addressShort: 'Commercial Avenue, Sector A, Bahria Enclave, Islamabad',
  email: 'info@hufsum.co',
  mobileDisplay: '0333 627 6667',
  ntn: '5833227-3',
  gstRate: 0.05,
  minOrder: 500,
};

export const ENV = {
  port: Number(process.env.PORT) || 4000,
  jwtSecret: process.env.JWT_SECRET || 'dev-insecure-secret',
  googleClientId: process.env.GOOGLE_CLIENT_ID || '',
  allowDevLogin: String(process.env.ALLOW_DEV_LOGIN).toLowerCase() !== 'false',
  adminEmail: (process.env.ADMIN_EMAIL || '').toLowerCase(),
  adminPassword: process.env.ADMIN_PASSWORD || '',
  adminGoogleEmails: (process.env.ADMIN_GOOGLE_EMAILS || '')
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean),
};

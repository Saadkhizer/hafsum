// Reset the order store. Works even if db.json is missing or corrupted —
// it overwrites the file directly rather than going through lowdb.
//
// Usage:
//   npm run reset                       → wipe everything (orders + accounts)
//   npm run reset:orders                → clear orders only, keep accounts
//   (or: node reset.js --keep-accounts)
import { readFileSync, writeFileSync } from 'node:fs';
import { DB_PATH } from './paths.js';

const keepAccounts = process.argv.includes('--keep-accounts');

// Try to read existing data; tolerate a missing or corrupted file.
let existing = { users: [], orders: [] };
let wasCorrupt = false;
try {
  existing = JSON.parse(readFileSync(DB_PATH, 'utf8'));
} catch (err) {
  if (err.code !== 'ENOENT') wasCorrupt = true; // file existed but wasn't valid JSON
}

const before = {
  orders: Array.isArray(existing.orders) ? existing.orders.length : 0,
  users: Array.isArray(existing.users) ? existing.users.length : 0,
};

const next = {
  users: keepAccounts && Array.isArray(existing.users) ? existing.users : [],
  orders: [],
};
writeFileSync(DB_PATH, JSON.stringify(next, null, 2));

if (wasCorrupt) console.log('\n⚠️  db.json was corrupted — rebuilt it from scratch.');
console.log(
  keepAccounts
    ? `\n🧹 Cleared ${before.orders} order(s). Kept ${next.users.length} account(s).\n`
    : `\n🧹 Reset complete — removed ${before.orders} order(s) and ${before.users} account(s). Fresh start.\n`
);
console.log('Tip: customers stay logged in their browsers until they sign out (localStorage).\n');

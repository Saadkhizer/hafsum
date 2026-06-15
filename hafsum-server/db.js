import { existsSync, readFileSync, renameSync } from 'node:fs';
import path from 'node:path';
import { JSONFilePreset } from 'lowdb/node';
import { DB_PATH, corruptBackupPath } from './paths.js';

// If db.json exists but isn't valid JSON, the server would crash on startup.
// Back the bad file up and let lowdb recreate a fresh one instead.
if (existsSync(DB_PATH)) {
  try {
    JSON.parse(readFileSync(DB_PATH, 'utf8'));
  } catch {
    const backup = corruptBackupPath();
    renameSync(DB_PATH, backup);
    console.warn(`⚠️  db.json was corrupted — moved it to ${path.basename(backup)} and starting fresh.`);
  }
}

// Single JSON-file store — plenty for one café's order volume, and no native
// build steps (important on Windows). Collections: users, orders.
export const db = await JSONFilePreset(DB_PATH, { users: [], orders: [] });

export async function save() {
  await db.write();
}

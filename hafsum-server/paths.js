import { fileURLToPath } from 'node:url';
import { mkdirSync } from 'node:fs';
import path from 'node:path';
import { ENV } from './config.js';

// Resolve where order data lives. Defaults to this folder (fine for a VPS); set
// DATA_DIR to a mounted disk/volume so orders & accounts survive redeploys on hosts
// with ephemeral filesystems (Render, Railway, Docker). Shared by db.js and reset.js
// so both always read/write the same file.
export const DATA_DIR = ENV.dataDir
  ? path.resolve(ENV.dataDir)
  : fileURLToPath(new URL('.', import.meta.url));

if (ENV.dataDir) mkdirSync(DATA_DIR, { recursive: true });

export const DB_PATH = path.join(DATA_DIR, 'db.json');
export const corruptBackupPath = () => path.join(DATA_DIR, `db.corrupt-${Date.now()}.json`);

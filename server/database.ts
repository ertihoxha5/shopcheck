import { DatabaseSync } from 'node:sqlite';
import { mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const directory = new URL('../data/', import.meta.url);
mkdirSync(directory, { recursive: true });
export const db = new DatabaseSync(fileURLToPath(new URL('shopcheck.sqlite', directory)));
db.exec(`
  PRAGMA foreign_keys = ON;
  PRAGMA busy_timeout = 5000;
  CREATE TABLE IF NOT EXISTS customers (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE
  ) STRICT;
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL CHECK(category IN ('Accessories', 'Stationery')),
    price_cents INTEGER NOT NULL CHECK(price_cents >= 0),
    stock INTEGER NOT NULL CHECK(stock >= 0)
  ) STRICT;
`);

export function listProducts() {
  return db.prepare('SELECT id, name, category, price_cents AS priceCents, stock FROM products ORDER BY id').all();
}

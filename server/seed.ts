import { db } from './database.ts';

const reset = process.argv.includes('--reset');
db.exec('BEGIN IMMEDIATE');
try {
  if (reset) db.exec('DELETE FROM products; DELETE FROM customers;');
  const customer = db.prepare('INSERT OR IGNORE INTO customers (id, name, email) VALUES (?, ?, ?)');
  customer.run(1, 'Customer A', 'customer.a@example.test');
  customer.run(2, 'Customer B', 'customer.b@example.test');
  const product = db.prepare('INSERT OR IGNORE INTO products (id, name, category, price_cents, stock) VALUES (?, ?, ?, ?, ?)');
  for (const row of [
    [1, 'Canvas Tote', 'Accessories', 1999, 5],
    [2, 'Travel Bottle', 'Accessories', 2500, 8],
    [3, 'Desk Pouch', 'Accessories', 1500, 0],
    [4, 'Grid Notebook', 'Stationery', 1005, 10],
    [5, 'Pen Set', 'Stationery', 500, 12],
    [6, 'Desk Planner', 'Stationery', 3000, 3],
  ] as const) product.run(...row);
  db.exec('COMMIT');
  console.log(reset ? 'Local test data reset: 2 customers, 6 products.' : 'Seed complete: missing baseline records added; existing records preserved.');
} catch (error) {
  db.exec('ROLLBACK');
  throw error;
} finally {
  db.close();
}

import express from 'express';
import { listProducts } from './database.ts';

const app = express();
app.disable('x-powered-by');

app.get('/api/products', (_request, response) => {
  response.set('Cache-Control', 'no-store');
  response.json({ products: listProducts() });
});

app.get('/api/health', (_request, response) => {
  response.set('Cache-Control', 'no-store');
  response.json({ status: 'ok', service: 'shopcheck-api' });
});

app.listen(3001, '127.0.0.1', () => {
  console.log('ShopCheck server: http://127.0.0.1:3001');
});

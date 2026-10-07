import { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

type Product = { id: number; name: string; category: string; priceCents: number; stock: number };
const euro = new Intl.NumberFormat('en-IE', { style: 'currency', currency: 'EUR' });

function App() {
  const [status, setStatus] = useState('Checking server…');
  const [products, setProducts] = useState<Product[]>([]);
  const [catalogStatus, setCatalogStatus] = useState('Loading products…');

  useEffect(() => {
    const controller = new AbortController();
    fetch('/api/products', { signal: controller.signal })
      .then(async response => {
        if (!response.ok) throw new Error('Products unavailable');
        const data = await response.json();
        setProducts(data.products);
        setCatalogStatus(data.products.length ? '' : 'No products available.');
      })
      .catch(() => {
        if (!controller.signal.aborted) setCatalogStatus('Unable to load products. Please refresh to try again.');
      });
    return () => controller.abort();
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    fetch('/api/health', { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) throw new Error('Request failed');
        const data = await response.json();
        if (data.status !== 'ok' || data.service !== 'shopcheck-api') {
          throw new Error('Unexpected response');
        }
        setStatus('Server connected');
      })
      .catch(() => {
        if (!controller.signal.aborted) setStatus('Server unavailable. Start the server and refresh this page.');
      });
    return () => controller.abort();
  }, []);

  return (
    <main>
      <p className="eyebrow">MANUAL QA LEARNING PROJECT</p>
      <h1>ShopCheck</h1>
      <p>A small shop built one learning checkpoint at a time.</p>
      <section aria-labelledby="connection-heading">
        <h2 id="connection-heading">Connection check</h2>
        <p role="status">{status}</p>
      </section>
      <h2>Products</h2>
      <p role="status">{catalogStatus}</p>
      <div className="products">
        {products.map(product => (
          <article key={product.id}>
            <p className="eyebrow">{product.category}</p>
            <h3>{product.name}</h3>
            <p>{euro.format(product.priceCents / 100)}</p>
            <p>{product.stock === 0 ? 'Out of stock' : `Available stock: ${product.stock}`}</p>
          </article>
        ))}
      </div>
      <p className="note">Checkpoint 2: saved product data. Login and cart are coming next.</p>
    </main>
  );
}

createRoot(document.getElementById('root')!).render(<App />);

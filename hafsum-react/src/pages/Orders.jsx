import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api.js';
import { rupees } from '../config.js';
import { statusMeta, formatPlaced } from '../lib/invoice.js';
import Button from '../components/Button.jsx';
import { Kicker } from '../components/Section.jsx';

export default function Orders() {
  const [orders, setOrders] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    api('/orders').then(({ orders }) => setOrders(orders)).catch((e) => setError(e.message));
  }, []);

  return (
    <section className="bg-cream px-6 pt-[120px] pb-20 min-h-[70vh]">
      <div className="mx-auto max-w-3xl">
        <Kicker>Your account</Kicker>
        <h1 className="mb-8 font-display text-[clamp(30px,4vw,44px)] font-semibold tracking-tight">My orders</h1>

        {error && <p className="rounded-xl bg-danger/10 px-4 py-3 text-danger">{error}</p>}
        {!orders && !error && <p className="text-muted">Loading…</p>}
        {orders && orders.length === 0 && (
          <div className="rounded-3xl border border-line bg-cream-card p-10 text-center shadow-soft">
            <p className="mb-5 text-muted">You haven’t placed any orders yet.</p>
            <Button variant="caramel" to="/menu">Browse the menu</Button>
          </div>
        )}

        <div className="grid gap-3.5">
          {orders?.map((o) => {
            const m = statusMeta(o.status);
            return (
              <Link key={o.id} to={`/orders/${o.id}`}
                className="flex items-center justify-between gap-4 rounded-2xl border border-line bg-cream-card p-5 shadow-soft transition-colors hover:border-caramel">
                <div>
                  <div className="font-semibold">{o.number}</div>
                  <div className="text-[13px] text-muted">{formatPlaced(o.createdAt)} · {o.orderType} · {o.items.length} item{o.items.length > 1 ? 's' : ''}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold">{rupees(o.grandTotal)}</div>
                  <span className={`mt-1 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[12px] font-semibold ${m.tone}`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${m.dot}`} />{m.label}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { api } from '../api.js';
import { rupees } from '../config.js';
import { statusMeta, formatPlaced } from '../lib/invoice.js';
import Button from '../components/Button.jsx';
import { Check, Close } from '../components/Icons.jsx';

const FILTERS = ['active', 'pending', 'accepted', 'preparing', 'ready', 'completed', 'rejected', 'all'];
// What each status can transition to, shown as buttons on the card.
const NEXT = {
  pending: [['accepted', 'Accept', 'caramel'], ['rejected', 'Reject', 'ghost']],
  accepted: [['preparing', 'Start preparing', 'caramel']],
  preparing: [['ready', 'Mark ready', 'caramel']],
  ready: [['completed', 'Complete', 'primary']],
};

export default function Admin() {
  const { user, logout } = useAuth();
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState('active');
  const [error, setError] = useState('');

  const load = useCallback(() => {
    api('/admin/orders')
      .then(({ orders }) => { setOrders(orders); setError(''); })
      .catch((e) => setError(e.message));
  }, []);

  // Live updates: poll every 5s so new website orders appear without a refresh.
  useEffect(() => {
    load();
    const t = setInterval(load, 5000);
    return () => clearInterval(t);
  }, [load]);

  const update = async (id, status) => {
    try {
      await api(`/admin/orders/${id}`, { method: 'PATCH', body: { status } });
      load();
    } catch (e) {
      setError(e.message);
    }
  };

  const shown = orders.filter((o) =>
    filter === 'all' ? true
    : filter === 'active' ? !['completed', 'rejected'].includes(o.status)
    : o.status === filter
  );
  const pendingCount = orders.filter((o) => o.status === 'pending').length;

  return (
    <section className="min-h-[80vh] bg-cream-deep px-6 pt-[100px] pb-16">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="font-display text-[30px] font-semibold tracking-tight">Order console</h1>
            <p className="text-[14px] text-muted">
              Signed in as {user?.email} · live updates every 5s
              {pendingCount > 0 && <span className="ml-2 rounded-full bg-gold/25 px-2.5 py-0.5 text-[12.5px] font-bold text-caramel-deep">{pendingCount} new</span>}
            </p>
          </div>
          <button onClick={logout} className="cursor-pointer rounded-full border-[1.5px] border-line bg-cream px-4 py-2 text-[13.5px] font-semibold hover:border-caramel">
            Sign out
          </button>
        </div>

        {/* filters */}
        <div className="mb-5 flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button key={f} onClick={() => setFilter(f)}
              className={`cursor-pointer rounded-full border-[1.5px] px-4 py-1.5 text-[13px] font-semibold capitalize transition-colors ${
                filter === f ? 'border-espresso bg-espresso text-cream' : 'border-line bg-cream text-espresso-soft hover:border-caramel'
              }`}>
              {f}
            </button>
          ))}
        </div>

        {error && <p className="mb-4 rounded-xl bg-danger/10 px-4 py-3 text-danger">{error}</p>}

        {shown.length === 0 ? (
          <div className="rounded-3xl border border-line bg-cream-card p-12 text-center text-muted shadow-soft">
            No {filter === 'all' ? '' : filter} orders right now.
          </div>
        ) : (
          <div className="grid gap-4">
            {shown.map((o) => {
              const m = statusMeta(o.status);
              const actions = NEXT[o.status] || [];
              return (
                <article key={o.id} className="rounded-2xl border border-line bg-cream-card p-5 shadow-soft">
                  <div className="flex flex-wrap items-start justify-between gap-3 border-b border-line pb-3">
                    <div>
                      <div className="flex items-center gap-2.5">
                        <h2 className="font-display text-[19px] font-semibold">{o.number}</h2>
                        <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[12px] font-semibold ${m.tone}`}>
                          <span className={`h-1.5 w-1.5 rounded-full ${m.dot}`} />{m.label}
                        </span>
                        <span className="rounded-full bg-cream-deep px-2.5 py-1 text-[12px] font-semibold">{o.orderType}</span>
                      </div>
                      <p className="mt-1 text-[13px] text-muted">{formatPlaced(o.createdAt)}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-[19px] font-bold">{rupees(o.grandTotal)}</div>
                      <div className="text-[12px] text-muted">incl. GST {rupees(o.gst)}</div>
                    </div>
                  </div>

                  <div className="grid gap-4 py-3 sm:grid-cols-[1fr_1fr]">
                    {/* customer */}
                    <div className="text-[14px]">
                      <p className="font-semibold">{o.customer.name}</p>
                      <p className="text-espresso-soft">
                        <a href={`tel:${o.customer.phone}`} className="underline underline-offset-2">{o.customer.phone}</a>
                      </p>
                      {o.customer.address && <p className="text-muted">{o.customer.address}{o.customer.area ? `, ${o.customer.area}` : ''}</p>}
                      {o.customer.notes && <p className="mt-1 rounded-lg bg-cream-deep px-3 py-2 text-[13px]"><strong>Note:</strong> {o.customer.notes}</p>}
                    </div>
                    {/* items */}
                    <ul className="grid gap-1 text-[14px]">
                      {o.items.map((it, i) => (
                        <li key={i} className="flex justify-between gap-3">
                          <span>{it.qty}× {it.name}</span>
                          <span className="flex-none text-muted">{rupees(it.total)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {actions.length > 0 && (
                    <div className="flex flex-wrap gap-2.5 border-t border-line pt-3.5">
                      {actions.map(([status, label, variant]) => (
                        <Button key={status} variant={variant} className="min-h-[44px] px-5 py-2 text-[14px]"
                          onClick={() => update(o.id, status)}>
                          {status === 'rejected' ? <Close className="h-4 w-4" /> : <Check className="h-4 w-4" />}
                          {label}
                        </Button>
                      ))}
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

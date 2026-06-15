import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../api.js';
import { CONFIG } from '../config.js';
import { invoiceMessage, statusMeta } from '../lib/invoice.js';
import InvoiceReceipt from '../components/InvoiceReceipt.jsx';
import Button from '../components/Button.jsx';
import { Check, WhatsApp, Phone } from '../components/Icons.jsx';

/** Turn a local PK number (03xx…) into wa.me format (92xx…). */
function waNumber(phone) {
  const d = (phone || '').replace(/\D/g, '');
  if (d.startsWith('92')) return d;
  if (d.startsWith('0')) return '92' + d.slice(1);
  if (d.startsWith('3')) return '92' + d;
  return d;
}

const StatusBadge = ({ status }) => {
  const m = statusMeta(status);
  return (
    <span className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[13px] font-semibold ${m.tone}`}>
      <span className={`h-2 w-2 rounded-full ${m.dot}`} />{m.label}
    </span>
  );
};

export default function OrderConfirmation() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [error, setError] = useState('');

  // Initial load + poll status so the customer sees the shop accept/advance the order.
  useEffect(() => {
    let alive = true;
    const fetchOrder = () =>
      api(`/orders/${id}`)
        .then(({ order }) => { if (alive) setOrder(order); })
        .catch((e) => { if (alive) setError(e.message); });
    fetchOrder();
    const t = setInterval(fetchOrder, 5000);
    return () => { alive = false; clearInterval(t); };
  }, [id]);

  if (error) {
    return (
      <section className="grid min-h-[70vh] place-items-center px-6 pt-[120px] text-center">
        <div>
          <h1 className="mb-2 font-display text-3xl font-semibold">Order not found</h1>
          <p className="mb-6 text-muted">{error}</p>
          <Button variant="caramel" to="/menu">Back to the menu</Button>
        </div>
      </section>
    );
  }
  if (!order) {
    return <div className="grid min-h-[70vh] place-items-center text-muted pt-[120px]">Loading your order…</div>;
  }

  const meta = statusMeta(order.status);
  const customerWa = `https://wa.me/${waNumber(order.customer.phone)}?text=${encodeURIComponent(invoiceMessage(order))}`;
  const shopWa = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(invoiceMessage(order))}`;

  return (
    <section className="bg-cream px-6 pt-[120px] pb-20"
      style={{ background: 'radial-gradient(900px 360px at 50% -10%, rgba(216,169,91,.16), transparent 65%)' }}>
      <div className="mx-auto max-w-4xl">
        {/* confirmation banner */}
        <div className="mb-8 rounded-3xl border border-line bg-cream-card p-7 text-center shadow-soft">
          <span className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-success/15 text-success">
            <Check className="h-9 w-9" />
          </span>
          <h1 className="font-display text-[clamp(26px,3.6vw,38px)] font-semibold tracking-tight">Order received!</h1>
          <p className="mx-auto mt-2 max-w-[520px] text-[16px] text-muted">
            Thank you{order.customer.name ? `, ${order.customer.name.split(' ')[0]}` : ''} — your order{' '}
            <strong className="text-espresso">{order.number}</strong> has reached Hafsum.
            A representative will call you on <strong className="text-espresso">{order.customer.phone}</strong> to confirm.
          </p>
          <div className="mt-4 flex flex-col items-center gap-2">
            <StatusBadge status={order.status} />
            <span className="text-[13px] text-muted">{meta.note}</span>
          </div>
        </div>

        <div className="grid gap-7 lg:grid-cols-[1fr_1fr]">
          {/* on-site invoice */}
          <div className="rounded-3xl border border-line bg-white p-7 shadow-soft">
            <InvoiceReceipt order={order} />
          </div>

          {/* actions / two options */}
          <div className="grid content-start gap-4">
            <div className="rounded-3xl border border-line bg-cream-card p-6.5 shadow-soft">
              <h2 className="mb-1 font-display text-[21px] font-semibold">Want a copy of your invoice?</h2>
              <p className="mb-4 text-[14px] text-muted">
                Your invoice is shown here on the website. You can also get it on WhatsApp:
              </p>
              <div className="grid gap-2.5">
                <Button variant="caramel" href={customerWa} target="_blank" rel="noopener">
                  <WhatsApp className="h-[18px] w-[18px]" />
                  Get my invoice on WhatsApp
                </Button>
                <Button variant="ghost" href={shopWa} target="_blank" rel="noopener">
                  <WhatsApp className="h-[18px] w-[18px]" />
                  Send a copy to Hafsum
                </Button>
                <Button variant="light" href="#" onClick={(e) => { e.preventDefault(); window.print(); }}>
                  Print / save as PDF
                </Button>
              </div>
            </div>

            <div className="rounded-3xl border border-line bg-cream-card p-6.5 text-[14px] text-muted shadow-soft">
              <p className="mb-2 flex items-center gap-2 font-semibold text-espresso">
                <Phone className="h-[16px] w-[16px]" /> Need to change something?
              </p>
              Call us at {CONFIG.phoneDisplay} or {CONFIG.mobileDisplay}.
              <div className="mt-4 flex flex-wrap gap-2">
                <Link to="/account/orders" className="font-semibold text-caramel-deep underline underline-offset-2">My orders</Link>
                <span>·</span>
                <Link to="/menu" className="font-semibold text-caramel-deep underline underline-offset-2">Order again</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

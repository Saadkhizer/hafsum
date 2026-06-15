import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { api } from '../api.js';
import { ITEM_INDEX } from '../data/menu.js';
import { CONFIG, rupees } from '../config.js';
import Button from '../components/Button.jsx';
import { Kicker } from '../components/Section.jsx';

export default function Checkout() {
  const { cart, total, clearCart } = useCart();
  const { user } = useAuth();
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const [orderType, setOrderType] = useState(params.get('type') === 'Pickup' ? 'Pickup' : 'Delivery');
  const [form, setForm] = useState({ name: '', phone: '', address: '', area: '', notes: '' });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  // Prefill the name from the signed-in account.
  useEffect(() => {
    if (user?.name) setForm((f) => (f.name ? f : { ...f, name: user.name }));
  }, [user]);

  const lines = useMemo(
    () => cart.map((l) => ({ ...l, item: ITEM_INDEX.get(l.id) })).filter((l) => l.item),
    [cart]
  );
  const gst = Math.round(total * CONFIG.gstRate * 100) / 100;
  const grand = total + gst;
  const belowMin = orderType === 'Delivery' && total < CONFIG.minOrder;
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  if (!cart.length) {
    return (
      <section className="grid min-h-[70vh] place-items-center px-6 pt-[120px] pb-16 text-center">
        <div>
          <h1 className="mb-2 font-display text-3xl font-semibold">Your tray is empty</h1>
          <p className="mb-6 text-muted">Add a few favourites before checking out.</p>
          <Button variant="caramel" to="/menu">Browse the menu</Button>
        </div>
      </section>
    );
  }

  const placeOrder = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      const { order } = await api('/orders', {
        method: 'POST',
        body: { items: cart, orderType, customer: form },
      });
      clearCart();
      navigate(`/orders/${order.id}`, { replace: true });
    } catch (err) {
      setError(err.message);
      setBusy(false);
    }
  };

  return (
    <section className="bg-cream px-6 pt-[120px] pb-20">
      <div className="mx-auto max-w-5xl">
        <Kicker>Checkout</Kicker>
        <h1 className="mb-8 font-display text-[clamp(30px,4vw,44px)] font-semibold tracking-tight">Almost there</h1>

        <form onSubmit={placeOrder} className="grid gap-7 lg:grid-cols-[1.3fr_1fr]">
          {/* details */}
          <div className="grid content-start gap-5 rounded-3xl border border-line bg-cream-card p-6.5 shadow-soft">
            <div className="grid grid-cols-2 gap-2" role="radiogroup" aria-label="Order type">
              {['Delivery', 'Pickup'].map((type) => (
                <label key={type}
                  className={`flex cursor-pointer items-center justify-center gap-2 rounded-xl border-[1.5px] px-3 py-3 text-[14.5px] font-semibold transition-colors duration-200 ${
                    orderType === type ? 'border-espresso bg-cream-deep' : 'border-line bg-cream'
                  }`}>
                  <input type="radio" name="order-type" value={type}
                    checked={orderType === type} onChange={() => setOrderType(type)}
                    className="accent-caramel-deep" />
                  {type}
                </label>
              ))}
            </div>

            <Field label="Full name" required>
              <input value={form.name} onChange={set('name')} required placeholder="Your name" className={inputCls} />
            </Field>
            <Field label="Phone number" required hint="We’ll call to confirm your order.">
              <input value={form.phone} onChange={set('phone')} required type="tel"
                placeholder="03xx xxxxxxx" className={inputCls} />
            </Field>

            {orderType === 'Delivery' && (
              <>
                <Field label="Delivery address" required>
                  <input value={form.address} onChange={set('address')} required
                    placeholder="House / street, Bahria Enclave" className={inputCls} />
                </Field>
                <Field label="Area / sector">
                  <input value={form.area} onChange={set('area')} placeholder="e.g. Sector C" className={inputCls} />
                </Field>
              </>
            )}

            <Field label="Notes for the kitchen">
              <textarea value={form.notes} onChange={set('notes')} rows={2}
                placeholder="Allergies, preferences, landmark…" className={`${inputCls} resize-none`} />
            </Field>
          </div>

          {/* summary */}
          <div className="grid content-start gap-4 rounded-3xl border border-line bg-cream-card p-6.5 shadow-soft lg:sticky lg:top-[100px] lg:self-start">
            <h2 className="font-display text-[22px] font-semibold">Your order</h2>
            <div className="grid gap-3">
              {lines.map((l) => (
                <div key={l.id} className="flex items-center gap-3">
                  <img src={l.item.img} alt={l.item.name} loading="lazy" className="h-12 w-12 flex-none rounded-lg object-cover" />
                  <div className="flex-1 text-[14px]">
                    <div className="font-semibold">{l.item.name}</div>
                    <div className="text-muted">{l.qty} × {rupees(l.item.price)}</div>
                  </div>
                  <div className="text-[14px] font-bold">{rupees(l.item.price * l.qty)}</div>
                </div>
              ))}
            </div>
            <div className="border-t border-line pt-3 text-[14.5px]">
              <Row label="Subtotal" value={rupees(total)} />
              <Row label={`GST (${CONFIG.gstRate * 100}%)`} value={rupees(gst)} />
              <div className="mt-2 flex justify-between text-[19px] font-bold"><span>Total</span><span>{rupees(grand)}</span></div>
            </div>

            {belowMin && (
              <p className="rounded-xl bg-danger/10 px-4 py-3 text-[13px] text-danger">
                Minimum delivery order is Rs. {CONFIG.minOrder}. Add a little more, or switch to Pickup.
              </p>
            )}
            {error && (
              <p className="rounded-xl bg-danger/10 px-4 py-3 text-[13px] text-danger" role="alert">{error}</p>
            )}

            <Button variant="caramel" type="submit" className="w-full" disabled={busy || belowMin}>
              {busy ? 'Placing order…' : 'Place order'}
            </Button>
            <p className="text-center text-[12px] text-muted">
              On the next step you can view your invoice or get it on WhatsApp.
              {' '}<Link to="/menu" className="underline underline-offset-2">Add more items</Link>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}

const inputCls =
  'min-h-[48px] w-full rounded-xl border-[1.5px] border-line bg-cream px-4 py-2.5 text-[15px] focus:border-caramel focus:outline-none';

function Field({ label, required, hint, children }) {
  return (
    <label className="grid gap-1.5">
      <span className="text-[13px] font-semibold text-espresso-soft">
        {label}{required && <span className="text-danger"> *</span>}
      </span>
      {children}
      {hint && <span className="text-[12px] text-muted">{hint}</span>}
    </label>
  );
}

const Row = ({ label, value }) => (
  <div className="flex justify-between py-0.5 text-muted"><span>{label}</span><span>{value}</span></div>
);

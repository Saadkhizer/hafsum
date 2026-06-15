import { CONFIG, rupees } from '../config.js';
import { formatPlaced } from '../lib/invoice.js';
import { Cup } from './Icons.jsx';

const Rule = ({ double = false }) => (
  <div className={`my-2 border-t border-dashed border-espresso/30 ${double ? 'border-t-2' : ''}`} aria-hidden="true" />
);

/**
 * Receipt-style invoice. Works with either a server order or a client-built
 * invoice snapshot (same shape: number, orderType, items[], subtotal, gst, grandTotal).
 */
export default function InvoiceReceipt({ order, showCustomer = true }) {
  if (!order) return null;
  const placed = order.placed || (order.createdAt ? formatPlaced(order.createdAt) : '');
  const c = order.customer;

  return (
    <div className="font-mono text-[13px] leading-relaxed text-espresso">
      <div className="text-center">
        <span className="mx-auto mb-2 flex h-14 w-14 items-center justify-center rounded-xl bg-espresso text-gold">
          <Cup className="h-8 w-8" />
        </span>
        <h2 className="font-display text-2xl font-bold tracking-wide">Hafsum</h2>
        <p className="mt-1 text-[11.5px] text-muted">
          {CONFIG.addressShort}<br />
          {CONFIG.email} · {CONFIG.mobileDisplay}<br />
          NTN: {CONFIG.ntn}
        </p>
        <p className="mt-3 font-bold tracking-widest">*** ORDER INVOICE ***</p>
        <p className="font-semibold underline underline-offset-2">{order.number}</p>
        <p className="text-lg font-bold tracking-[0.2em]">{order.orderType.toUpperCase()}</p>
      </div>

      <Rule double />
      {placed && <div className="flex justify-between"><span>Placed</span><span>{placed}</span></div>}
      {showCustomer && c && (
        <>
          <div className="flex justify-between gap-3"><span>Name</span><span className="text-right">{c.name}</span></div>
          <div className="flex justify-between gap-3"><span>Phone</span><span className="text-right">{c.phone}</span></div>
          {c.address && <div className="flex justify-between gap-3"><span>Address</span><span className="text-right">{c.address}</span></div>}
          {c.area && <div className="flex justify-between gap-3"><span>Area</span><span className="text-right">{c.area}</span></div>}
          {c.notes && <div className="flex justify-between gap-3"><span>Notes</span><span className="text-right">{c.notes}</span></div>}
        </>
      )}
      <Rule double />

      <div className="flex justify-between font-bold"><span>Item</span><span>Price</span></div>
      {order.items.map((it, i) => (
        <div key={i} className="flex justify-between gap-3">
          <span>{it.qty}x {it.name} @{it.unit}</span>
          <span className="flex-none">{rupees(it.total)}</span>
        </div>
      ))}

      <Rule />
      <div className="flex justify-between"><span>Price</span><span>{rupees(order.subtotal)}</span></div>
      <div className="flex justify-between"><span>GST ({CONFIG.gstRate * 100}%)</span><span>{rupees(order.gst)}</span></div>
      <div className="flex justify-between text-[15px] font-bold"><span>Grand Total</span><span>{rupees(order.grandTotal)}</span></div>
      <Rule double />

      <p className="text-center text-[11.5px] text-muted">
        The official FBR tax invoice is issued by the shop on payment.
      </p>
    </div>
  );
}

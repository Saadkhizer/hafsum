import { CONFIG, rupees } from '../config.js';

/** Human label + styling for each order status (used by badges across pages). */
export const STATUS = {
  pending: { label: 'Order received', tone: 'bg-gold/20 text-caramel-deep', dot: 'bg-gold', note: 'Waiting for Hafsum to confirm your order.' },
  accepted: { label: 'Accepted', tone: 'bg-success/15 text-success', dot: 'bg-success', note: 'Hafsum has accepted your order — our team will be in touch.' },
  preparing: { label: 'Preparing', tone: 'bg-caramel/20 text-caramel-deep', dot: 'bg-caramel', note: 'Your order is being prepared.' },
  ready: { label: 'Ready', tone: 'bg-success/15 text-success', dot: 'bg-success', note: 'Your order is ready!' },
  completed: { label: 'Completed', tone: 'bg-cream-deep text-muted', dot: 'bg-muted', note: 'This order is complete. Thank you!' },
  rejected: { label: 'Not accepted', tone: 'bg-danger/15 text-danger', dot: 'bg-danger', note: 'Sorry — the shop could not accept this order. Please call us.' },
};

export const statusMeta = (s) => STATUS[s] || STATUS.pending;

/** Format a millisecond timestamp the same way the old client invoice did. */
export const formatPlaced = (ts) =>
  new Date(ts).toLocaleString('en-PK', {
    weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit',
  });

/** Build the WhatsApp message text for an order/invoice. */
export function invoiceMessage(order) {
  const placed = order.placed || (order.createdAt ? formatPlaced(order.createdAt) : '');
  return [
    '*HAFSUM COFFEE & CAKE*',
    CONFIG.addressShort,
    `NTN: ${CONFIG.ntn}`,
    '',
    `*Order Invoice ${order.number}*`,
    placed && `Placed: ${placed}`,
    `Order type: ${order.orderType}`,
    order.customer?.name && `Name: ${order.customer.name}`,
    order.customer?.phone && `Phone: ${order.customer.phone}`,
    '',
    '*Items*',
    ...order.items.map((it) => `${it.qty}x ${it.name} @${it.unit} — ${rupees(it.total)}`),
    '',
    `Subtotal: ${rupees(order.subtotal)}`,
    `GST (${CONFIG.gstRate * 100}%): ${rupees(order.gst)}`,
    `*Grand Total: ${rupees(order.grandTotal)}*`,
    '',
    '_Official FBR tax invoice is issued by the shop on payment._',
  ].filter(Boolean).join('\n');
}

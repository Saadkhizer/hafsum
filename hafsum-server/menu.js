// Single source of truth for item ids/prices: import the very same menu module
// the frontend cart uses, so server-side totals always match what the customer saw.
import { ITEM_INDEX } from '../hafsum-react/src/data/menu.js';
import { SHOP } from './config.js';

/**
 * Validate raw cart lines against the real menu and recompute the invoice
 * server-side. Returns { items, subtotal, gst, grandTotal } or throws on bad input.
 */
export function priceCart(lines) {
  if (!Array.isArray(lines) || lines.length === 0) {
    throw new Error('Your order is empty.');
  }
  const items = lines.map((l) => {
    const it = ITEM_INDEX.get(Number(l.id));
    if (!it) throw new Error(`Unknown item id: ${l.id}`);
    const qty = Math.max(1, Math.min(99, Math.floor(Number(l.qty) || 1)));
    return { id: it.id, name: it.name, qty, unit: it.price, total: it.price * qty };
  });
  const subtotal = items.reduce((s, it) => s + it.total, 0);
  const gst = Math.round(subtotal * SHOP.gstRate * 100) / 100;
  return { items, subtotal, gst, grandTotal: subtotal + gst };
}

import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { ITEM_INDEX } from '../data/menu.js';

const CART_KEY = 'hafsum-cart-v1';
const CartContext = createContext(null);

function loadCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState(loadCart);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const toastTimer = useRef(null);

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);

  // Lock background scroll while the tray is open. `overflow: hidden` alone
  // doesn't stop touch scrolling on iOS Safari, so pin the body in place too.
  useEffect(() => {
    if (!drawerOpen) return;
    const scrollY = window.scrollY;
    const { body } = document;
    body.style.position = 'fixed';
    body.style.top = `-${scrollY}px`;
    body.style.left = '0';
    body.style.right = '0';
    body.style.overflow = 'hidden';
    return () => {
      body.style.position = '';
      body.style.top = '';
      body.style.left = '';
      body.style.right = '';
      body.style.overflow = '';
      window.scrollTo(0, scrollY);
    };
  }, [drawerOpen]);

  // Demo mode for client previews/screenshots: /menu?demo=cart fills the tray.
  useEffect(() => {
    const demo = new URLSearchParams(window.location.search).get('demo');
    if (demo === 'cart' || demo === 'invoice') {
      setCart([{ id: 56, qty: 2 }, { id: 11, qty: 1 }, { id: 2, qty: 1 }]);
      setDrawerOpen(true);
    }
  }, []);

  const showToast = useCallback((text) => {
    setToast(text);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2400);
  }, []);

  const addToCart = useCallback((id, qty = 1) => {
    setCart((prev) => {
      const line = prev.find((l) => l.id === id);
      return line
        ? prev.map((l) => (l.id === id ? { ...l, qty: l.qty + qty } : l))
        : [...prev, { id, qty }];
    });
    const item = ITEM_INDEX.get(id);
    showToast(`${item ? item.name : 'Item'} added to your order`);
  }, [showToast]);

  const setQty = useCallback((id, qty) => {
    setCart((prev) =>
      qty <= 0
        ? prev.filter((l) => l.id !== id)
        : prev.map((l) => (l.id === id ? { ...l, qty } : l))
    );
  }, []);

  const removeLine = useCallback((id) => {
    setCart((prev) => prev.filter((l) => l.id !== id));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const count = cart.reduce((s, l) => s + l.qty, 0);
  const total = cart.reduce((s, l) => {
    const it = ITEM_INDEX.get(l.id);
    return s + (it ? it.price * l.qty : 0);
  }, 0);

  const value = {
    cart, addToCart, setQty, removeLine, clearCart, count, total,
    drawerOpen, openCart: () => setDrawerOpen(true), closeCart: () => setDrawerOpen(false),
    toast, showToast,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside <CartProvider>');
  return ctx;
}

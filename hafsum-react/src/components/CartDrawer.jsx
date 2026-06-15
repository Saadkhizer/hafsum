import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { ITEM_INDEX } from '../data/menu.js';
import { CONFIG, rupees } from '../config.js';
import Button from './Button.jsx';
import { Bag, Close, ArrowRight } from './Icons.jsx';

export default function CartDrawer() {
  const { cart, setQty, removeLine, total, drawerOpen, closeCart } = useCart();
  const [orderType, setOrderType] = useState('Delivery');
  const navigate = useNavigate();

  const goToCheckout = () => {
    closeCart();
    navigate(`/checkout?type=${orderType}`);
  };

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && closeCart();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [closeCart]);

  return (
    <>
      <div
        onClick={closeCart}
        aria-hidden="true"
        className={`fixed inset-0 z-[69] bg-espresso/45 transition-opacity duration-300 ${
          drawerOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />
      <aside
        aria-label="Your order"
        className={`fixed inset-y-0 right-0 z-[70] flex w-[min(430px,100vw)] flex-col bg-cream shadow-[-18px_0_50px_rgba(43,29,20,0.25)] transition-transform duration-300 ${
          drawerOpen ? 'translate-x-0' : 'translate-x-[105%]'
        }`}
      >
        <div className="flex items-center justify-between border-b border-line px-6.5 py-5.5">
          <h3 className="font-display text-[23px] font-semibold">Your order</h3>
          <button
            onClick={closeCart}
            aria-label="Close order tray"
            className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border-[1.5px] border-line bg-cream-card text-espresso transition-colors duration-200 hover:border-caramel"
          >
            <Close className="h-[18px] w-[18px]" />
          </button>
        </div>

        <div className="grid flex-1 content-start gap-4 overflow-y-auto px-6.5 py-4.5">
          {cart.length === 0 ? (
            <div className="px-5 py-15 text-center text-muted">
              <Bag className="mx-auto mb-3.5 h-[54px] w-[54px] text-line" />
              <h3 className="mb-1 font-display text-xl font-semibold text-espresso">Your tray is empty</h3>
              <p className="mb-5">Add something delicious from the menu.</p>
              <Button variant="caramel" to="/menu" onClick={closeCart}>Browse the menu</Button>
            </div>
          ) : (
            cart.map((line) => {
              const it = ITEM_INDEX.get(line.id);
              if (!it) return null;
              return (
                <div key={line.id} className="grid grid-cols-[64px_1fr_auto] items-center gap-3.5">
                  <img src={it.img} alt={it.name} loading="lazy" className="h-16 w-16 rounded-xl object-cover" />
                  <div>
                    <h4 className="text-[15.5px] font-semibold">{it.name}</h4>
                    <span className="text-[13px] text-muted">{rupees(it.price)}</span>
                    <div className="mt-1.5 inline-flex items-center gap-0.5" role="group" aria-label={`Quantity for ${it.name}`}>
                      <button
                        onClick={() => setQty(line.id, line.qty - 1)}
                        aria-label="Decrease quantity"
                        className="inline-flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-lg border-[1.5px] border-line bg-cream-card text-[15px] font-bold transition-colors duration-200 hover:border-caramel hover:bg-cream-deep"
                      >−</button>
                      <span className="min-w-[30px] text-center text-[14.5px] font-semibold">{line.qty}</span>
                      <button
                        onClick={() => setQty(line.id, line.qty + 1)}
                        aria-label="Increase quantity"
                        className="inline-flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-lg border-[1.5px] border-line bg-cream-card text-[15px] font-bold transition-colors duration-200 hover:border-caramel hover:bg-cream-deep"
                      >+</button>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[15px] font-bold">{rupees(it.price * line.qty)}</div>
                    <button
                      onClick={() => removeLine(line.id)}
                      className="cursor-pointer py-1 text-[12.5px] text-danger underline underline-offset-2"
                    >Remove</button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="border-t border-line bg-cream-card px-6.5 pb-6.5 pt-5">
          <div className="mb-3.5 grid grid-cols-2 gap-2" role="radiogroup" aria-label="Order type">
            {['Delivery', 'Pickup'].map((type) => (
              <label
                key={type}
                className={`flex cursor-pointer items-center justify-center gap-2 rounded-xl border-[1.5px] px-3 py-2.5 text-[14px] font-semibold transition-colors duration-200 ${
                  orderType === type ? 'border-espresso bg-cream-deep' : 'border-line bg-cream'
                }`}
              >
                <input
                  type="radio" name="order-type" value={type}
                  checked={orderType === type}
                  onChange={() => setOrderType(type)}
                  className="accent-caramel-deep"
                />
                {type}
              </label>
            ))}
          </div>
          <div className="mb-4 mt-2.5 flex justify-between text-[19px] font-bold">
            <span>Total</span><span>{rupees(total)}</span>
          </div>
          {total > 0 && total < CONFIG.minOrder && (
            <p className="mb-3 text-[13px] text-danger">Minimum delivery order is Rs. {CONFIG.minOrder}.</p>
          )}
          <Button variant="caramel" className="w-full" disabled={!cart.length} onClick={goToCheckout}>
            Proceed to checkout
            <ArrowRight className="h-[18px] w-[18px]" />
          </Button>
          <p className="mt-3 text-center text-[12.5px] text-muted">
            Add your details on the next step — get your invoice on screen or on WhatsApp.
            <br />{CONFIG.deliveryNote}
          </p>
        </div>
      </aside>
    </>
  );
}

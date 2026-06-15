import { useRef, useState } from 'react';
import { useCart } from '../context/CartContext.jsx';
import { rupees } from '../config.js';
import { Check, Plus } from './Icons.jsx';

export default function MenuCard({ item, tag }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const timer = useRef(null);

  const handleAdd = () => {
    addToCart(item.id);
    setAdded(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setAdded(false), 1300);
  };

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-cream-card transition-all duration-300 hover:border-[#D9C5A6] hover:shadow-lift">
      <div className="relative aspect-[4/3] overflow-hidden bg-cream-deep">
        {tag && (
          <span className="absolute left-3 top-3 z-[1] rounded-full bg-espresso/80 px-3 py-[5px] text-[11.5px] font-semibold uppercase tracking-wider text-cream backdrop-blur-sm">
            {tag}
          </span>
        )}
        <img
          src={item.img} alt={item.name} loading="lazy" width="800" height="600"
          className="h-full w-full object-cover transition-transform duration-600 ease-out group-hover:scale-106"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5.5 pb-5.5">
        <h3 className="font-display text-xl font-semibold">{item.name}</h3>
        <p className="line-clamp-2 flex-1 text-sm text-muted">{item.desc}</p>
        <div className="mt-2.5 flex items-center justify-between gap-2.5">
          <span className="font-display text-xl font-bold">
            <small className="mr-0.5 font-body text-[13px] font-medium text-muted">Rs.</small>
            {Number(item.price).toLocaleString('en-PK')}
          </span>
          <button
            onClick={handleAdd}
            aria-label={`Add ${item.name} to order`}
            className={`inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full px-4.5 py-2.5 text-sm font-semibold transition-colors duration-200 ${
              added ? 'bg-success text-white' : 'bg-cream-deep text-espresso hover:bg-espresso hover:text-cream'
            }`}
          >
            {added ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
            <span>{added ? 'Added' : 'Add'}</span>
          </button>
        </div>
      </div>
    </article>
  );
}

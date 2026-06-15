import { useCart } from '../context/CartContext.jsx';
import { Check } from './Icons.jsx';

export default function Toast() {
  const { toast } = useCart();
  return (
    <div
      role="status"
      className={`fixed bottom-6.5 left-1/2 z-[90] flex max-w-[calc(100vw-40px)] -translate-x-1/2 items-center gap-2.5 rounded-full bg-espresso px-6.5 py-3.5 text-[14.5px] font-medium text-cream shadow-lift transition-all duration-300 ${
        toast ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-20 opacity-0'
      }`}
    >
      <Check className="h-[18px] w-[18px] flex-none text-gold" />
      <span>{toast}</span>
    </div>
  );
}

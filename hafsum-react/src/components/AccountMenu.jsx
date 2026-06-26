import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function AccountMenu() {
  const { isAuthed, isAdmin, user, logout, ready } = useAuth();
  const [open, setOpen] = useState(false);
  const [imgError, setImgError] = useState(false);
  const ref = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const onClick = (e) => ref.current && !ref.current.contains(e.target) && setOpen(false);
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  if (!ready) return null;

  if (!isAuthed) {
    return (
      <Link to="/login"
        className="inline-flex h-12 shrink-0 items-center whitespace-nowrap rounded-full border-[1.5px] border-line bg-cream-card px-4 text-[14.5px] font-semibold text-espresso transition-all duration-200 hover:border-caramel hover:shadow-soft sm:px-5">
        Sign in
      </Link>
    );
  }

  const initial = (user.name || user.email || '?').trim().charAt(0).toUpperCase();

  return (
    <div className="relative" ref={ref}>
      <button onClick={() => setOpen((o) => !o)} aria-haspopup="menu" aria-expanded={open}
        className="flex h-12 shrink-0 items-center gap-2 rounded-full border-[1.5px] border-line bg-cream-card pl-2 pr-3.5 text-espresso transition-all duration-200 hover:border-caramel hover:shadow-soft max-[640px]:pr-2">
        {user.picture && !imgError
          ? <img src={user.picture} alt="" referrerPolicy="no-referrer" onError={() => setImgError(true)} className="h-8 w-8 rounded-full object-cover" />
          : <span className="flex h-8 w-8 items-center justify-center rounded-full bg-espresso text-[14px] font-bold text-gold">{initial}</span>}
        <span className="max-w-[110px] truncate text-[14.5px] font-semibold max-[640px]:hidden">{user.name?.split(' ')[0] || 'Account'}</span>
      </button>

      {open && (
        <div role="menu"
          className="absolute right-0 top-[56px] w-56 overflow-hidden rounded-2xl border border-line bg-cream-card shadow-lift">
          <div className="border-b border-line px-4 py-3">
            <p className="truncate text-[14px] font-semibold">{user.name || 'Guest'}</p>
            <p className="truncate text-[12.5px] text-muted">{user.email}</p>
          </div>
          <nav className="grid p-1.5 text-[14.5px]">
            <Link to="/account/orders" onClick={() => setOpen(false)} role="menuitem"
              className="rounded-lg px-3 py-2.5 text-left font-medium hover:bg-cream-deep">My orders</Link>
            {isAdmin && (
              <Link to="/admin" onClick={() => setOpen(false)} role="menuitem"
                className="rounded-lg px-3 py-2.5 text-left font-medium hover:bg-cream-deep">Order console</Link>
            )}
            <button onClick={() => { setOpen(false); logout(); navigate('/'); }} role="menuitem"
              className="cursor-pointer rounded-lg px-3 py-2.5 text-left font-medium text-danger hover:bg-cream-deep">Sign out</button>
          </nav>
        </div>
      )}
    </div>
  );
}

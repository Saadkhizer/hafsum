import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

/** Gate a route behind login (and optionally admin). Redirects to /login with a `next`. */
export default function ProtectedRoute({ children, adminOnly = false }) {
  const { isAuthed, isAdmin, ready } = useAuth();
  const location = useLocation();

  if (!ready) {
    return (
      <div className="grid min-h-[60vh] place-items-center text-muted" aria-busy="true">
        Loading…
      </div>
    );
  }

  if (!isAuthed) {
    const next = encodeURIComponent(location.pathname + location.search);
    return <Navigate to={`/login?next=${next}`} replace />;
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to="/login?staff=1" replace />;
  }

  return children;
}

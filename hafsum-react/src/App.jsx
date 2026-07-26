import { useLayoutEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import CartDrawer from './components/CartDrawer.jsx';
import Toast from './components/Toast.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Home from './pages/Home.jsx';
import MenuPage from './pages/MenuPage.jsx';
import About from './pages/About.jsx';
import Gallery from './pages/Gallery.jsx';
import Contact from './pages/Contact.jsx';
import Login from './pages/Login.jsx';
import Checkout from './pages/Checkout.jsx';
import OrderConfirmation from './pages/OrderConfirmation.jsx';
import Orders from './pages/Orders.jsx';
import Admin from './pages/Admin.jsx';

function ScrollToTop() {
  const { pathname } = useLocation();
  // useLayoutEffect (not useEffect) so the jump happens before the new route
  // paints - on iOS Safari a post-paint scrollTo can leave the fixed header
  // and cart tray briefly misaligned from the viewport edge during the jump.
  // behavior: 'instant' overrides the global `scroll-behavior: smooth`, which
  // would otherwise animate this reset like a user-triggered scroll.
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

export default function App() {
  const { pathname } = useLocation();
  return (
    <>
      {/* warm hero-image backdrop shown behind every page (sits under all content) */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          backgroundColor: '#FAF5EC',
          backgroundImage:
            'radial-gradient(1200px 720px at 84% -4%, rgba(216,169,91,.24), transparent 60%),' +
            'radial-gradient(1000px 760px at -6% 106%, rgba(155,100,53,.16), transparent 60%),' +
            'linear-gradient(rgba(250,245,236,.85), rgba(250,245,236,.91)),' +
            "url('/assets/menu/cappuccino.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />
      <a
        href="#main"
        className="absolute -top-12 left-4 z-[100] rounded-b-xl bg-espresso px-4.5 py-2.5 text-sm font-semibold text-cream transition-all focus:top-0"
      >
        Skip to content
      </a>
      <ScrollToTop />
      <Header />
      <main id="main">
        {/* keyed by route so each page fades + rises in on navigation */}
        <div key={pathname} className="page-enter">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
            <Route path="/orders/:id" element={<ProtectedRoute><OrderConfirmation /></ProtectedRoute>} />
            <Route path="/account/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
            <Route path="/admin" element={<ProtectedRoute adminOnly><Admin /></ProtectedRoute>} />
            <Route path="*" element={<Home />} />
          </Routes>
        </div>
      </main>
      <Footer />
      <CartDrawer />
      <Toast />
    </>
  );
}

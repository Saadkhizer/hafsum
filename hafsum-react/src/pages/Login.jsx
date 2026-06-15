import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { CONFIG } from '../config.js';
import Button from '../components/Button.jsx';
import GoogleButton from '../components/GoogleButton.jsx';
import { Cup } from '../components/Icons.jsx';

export default function Login() {
  const { loginWithGoogle, devLogin, adminLogin } = useAuth();
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const next = params.get('next') || '/';
  const [tab, setTab] = useState(params.get('staff') ? 'staff' : 'customer');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  // dev + staff form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const run = async (fn, dest) => {
    setBusy(true);
    setError('');
    try {
      await fn();
      navigate(dest, { replace: true });
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="grid min-h-[78vh] place-items-center bg-cream px-6 pt-[120px] pb-16"
      style={{ background: 'radial-gradient(900px 380px at 50% -10%, rgba(216,169,91,.18), transparent 65%)' }}>
      <div className="w-full max-w-[440px] rounded-3xl border border-line bg-cream-card p-8 shadow-soft">
        <div className="mb-6 text-center">
          <span className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-espresso text-gold">
            <Cup className="h-8 w-8" />
          </span>
          <h1 className="font-display text-[28px] font-semibold">Welcome to Hafsum</h1>
          <p className="mt-1 text-[15px] text-muted">Sign in to place your order.</p>
        </div>

        {/* tabs */}
        <div className="mb-6 grid grid-cols-2 gap-1 rounded-full border border-line bg-cream p-1">
          {[['customer', 'I’m ordering'], ['staff', 'Shop staff']].map(([key, label]) => (
            <button
              key={key}
              onClick={() => { setTab(key); setError(''); }}
              className={`cursor-pointer rounded-full px-4 py-2.5 text-[14px] font-semibold transition-colors duration-200 ${
                tab === key ? 'bg-espresso text-cream' : 'text-espresso-soft hover:bg-cream-deep'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {error && (
          <p className="mb-4 rounded-xl bg-danger/10 px-4 py-3 text-[13.5px] text-danger" role="alert">{error}</p>
        )}

        {tab === 'customer' ? (
          <div className="grid gap-4">
            <GoogleButton onCredential={(cred) => run(() => loginWithGoogle(cred), next)} onError={setError} />

            {CONFIG.googleClientId && (
              <div className="flex items-center gap-3 text-[12.5px] text-muted">
                <span className="h-px flex-1 bg-line" />or<span className="h-px flex-1 bg-line" />
              </div>
            )}

            <div className="grid gap-2.5">
              <label className="text-[13px] font-semibold text-espresso-soft" htmlFor="dev-name">
                {CONFIG.googleClientId ? 'Continue without Google' : 'Your name'}
              </label>
              <input
                id="dev-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Ayesha Khan"
                className="min-h-[48px] rounded-xl border-[1.5px] border-line bg-cream px-4 text-[15px] focus:border-caramel focus:outline-none"
              />
              <Button variant="caramel" disabled={busy} onClick={() => run(() => devLogin(name || 'Guest'), next)}>
                {busy ? 'Signing in…' : 'Continue to order'}
              </Button>
            </div>
            <p className="text-center text-[12px] text-muted">
              A quick guest sign-in for now — connect Google any time.
            </p>
          </div>
        ) : (
          <form
            className="grid gap-3"
            onSubmit={(e) => { e.preventDefault(); run(() => adminLogin(email, password), '/admin'); }}
          >
            <p className="text-[13.5px] text-muted">Hafsum team — sign in to view and accept website orders.</p>
            <input
              type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="Shop email" autoComplete="username" required
              className="min-h-[48px] rounded-xl border-[1.5px] border-line bg-cream px-4 text-[15px] focus:border-caramel focus:outline-none"
            />
            <input
              type="password" value={password} onChange={(e) => setPassword(e.target.value)}
              placeholder="Password" autoComplete="current-password" required
              className="min-h-[48px] rounded-xl border-[1.5px] border-line bg-cream px-4 text-[15px] focus:border-caramel focus:outline-none"
            />
            <Button variant="primary" type="submit" disabled={busy}>
              {busy ? 'Signing in…' : 'Open order console'}
            </Button>
          </form>
        )}
      </div>
    </section>
  );
}

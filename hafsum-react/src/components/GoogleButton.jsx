import { useEffect, useRef } from 'react';
import { useServerConfig } from '../context/ServerConfigContext.jsx';

const GIS_SRC = 'https://accounts.google.com/gsi/client';

/** Load the Google Identity Services script once. */
function loadGis() {
  return new Promise((resolve, reject) => {
    if (window.google?.accounts?.id) return resolve();
    let s = document.querySelector(`script[src="${GIS_SRC}"]`);
    if (!s) {
      s = document.createElement('script');
      s.src = GIS_SRC;
      s.async = true;
      s.defer = true;
      document.head.appendChild(s);
    }
    s.addEventListener('load', () => resolve());
    s.addEventListener('error', () => reject(new Error('Could not load Google sign-in.')));
  });
}

/**
 * Renders the real "Sign in with Google" button when a Client ID is configured.
 * If none is set, renders nothing — the Login page shows the dev login instead.
 */
export default function GoogleButton({ onCredential, onError }) {
  const ref = useRef(null);
  const { googleClientId } = useServerConfig();

  useEffect(() => {
    if (!googleClientId) return;
    let cancelled = false;
    loadGis()
      .then(() => {
        if (cancelled || !ref.current) return;
        window.google.accounts.id.initialize({
          client_id: googleClientId,
          callback: ({ credential }) => onCredential(credential),
        });
        window.google.accounts.id.renderButton(ref.current, {
          theme: 'outline', size: 'large', shape: 'pill', width: 320, text: 'continue_with',
        });
      })
      .catch((e) => onError?.(e.message));
    return () => { cancelled = true; };
  }, [googleClientId, onCredential, onError]);

  if (!googleClientId) return null;
  return <div ref={ref} className="flex justify-center" aria-label="Sign in with Google" />;
}

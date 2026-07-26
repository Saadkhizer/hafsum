import { createContext, useContext, useEffect, useState } from 'react';
import { api } from '../api.js';
import { CONFIG } from '../config.js';

const ServerConfigContext = createContext(null);

// The server's /api/config endpoint is the source of truth for which login methods
// are available. Until it responds (or if it can't be reached) we fall back to the
// build-time VITE_GOOGLE_CLIENT_ID, if any. This means the shop only sets ONE env var
// — GOOGLE_CLIENT_ID on the server — to turn Google sign-in on; no frontend rebuild.
const FALLBACK = {
  googleClientId: CONFIG.googleClientId,
  googleEnabled: Boolean(CONFIG.googleClientId),
  devLoginEnabled: true,
};

export function ServerConfigProvider({ children }) {
  const [config, setConfig] = useState({ ...FALLBACK, ready: false });

  useEffect(() => {
    let cancelled = false;
    api('/config', { auth: false })
      .then((c) => {
        if (cancelled) return;
        const googleClientId = c.googleClientId || CONFIG.googleClientId || '';
        setConfig({
          googleClientId,
          googleEnabled: Boolean(c.googleEnabled && googleClientId),
          devLoginEnabled: c.devLoginEnabled !== false,
          ready: true,
        });
      })
      .catch(() => {
        if (!cancelled) setConfig({ ...FALLBACK, ready: true });
      });
    return () => { cancelled = true; };
  }, []);

  return <ServerConfigContext.Provider value={config}>{children}</ServerConfigContext.Provider>;
}

export function useServerConfig() {
  const ctx = useContext(ServerConfigContext);
  if (!ctx) throw new Error('useServerConfig must be used inside <ServerConfigProvider>');
  return ctx;
}

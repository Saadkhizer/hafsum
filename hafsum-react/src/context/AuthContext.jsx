import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { api, getToken, setToken, clearToken } from '../api.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  // Restore the session on load (validates the stored token against the server).
  useEffect(() => {
    if (!getToken()) { setReady(true); return; }
    api('/me')
      .then(({ user }) => setUser(user))
      .catch(() => clearToken())
      .finally(() => setReady(true));
  }, []);

  const finishLogin = useCallback(({ token, user }) => {
    setToken(token);
    setUser(user);
    return user;
  }, []);

  const loginWithGoogle = useCallback(
    (credential) => api('/auth/google', { method: 'POST', auth: false, body: { credential } }).then(finishLogin),
    [finishLogin]
  );

  const devLogin = useCallback(
    (name) => api('/auth/dev', { method: 'POST', auth: false, body: { name } }).then(finishLogin),
    [finishLogin]
  );

  const adminLogin = useCallback(
    (email, password) => api('/admin/login', { method: 'POST', auth: false, body: { email, password } }).then(finishLogin),
    [finishLogin]
  );

  const logout = useCallback(() => {
    clearToken();
    setUser(null);
  }, []);

  const value = {
    user,
    ready,
    isAuthed: Boolean(user),
    isAdmin: user?.role === 'admin',
    loginWithGoogle,
    devLogin,
    adminLogin,
    logout,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;

}

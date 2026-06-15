import jwt from 'jsonwebtoken';
import { ENV } from './config.js';

/** Issue an app session token for a stored user. */
export function signToken(user) {
  return jwt.sign(
    { sub: user.id, email: user.email, name: user.name, role: user.role },
    ENV.jwtSecret,
    { expiresIn: '30d' }
  );
}

function readToken(req) {
  const header = req.headers.authorization || '';
  const [scheme, token] = header.split(' ');
  return scheme === 'Bearer' && token ? token : null;
}

/** Require any logged-in user; attaches req.user. */
export function authRequired(req, res, next) {
  const token = readToken(req);
  if (!token) return res.status(401).json({ error: 'Please sign in to continue.' });
  try {
    req.user = jwt.verify(token, ENV.jwtSecret);
    next();
  } catch {
    res.status(401).json({ error: 'Your session has expired — please sign in again.' });
  }
}

/** Require an admin (shop staff) user. */
export function adminRequired(req, res, next) {
  authRequired(req, res, () => {
    if (req.user?.role !== 'admin') {
      return res.status(403).json({ error: 'Shop staff access only.' });
    }
    next();
  });
}

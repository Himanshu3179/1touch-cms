import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret_key'; // Use a secure key in production
const JWT_EXPIRATION = '7d'; // Token expiration (7 days)

export const generateToken = (payload: object): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
};

export const verifyToken = (token: string): object | null => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return typeof decoded === 'object' ? decoded : null;
  } catch (error) {
    console.error('Invalid or expired token:', error);
    return null;
  }
};

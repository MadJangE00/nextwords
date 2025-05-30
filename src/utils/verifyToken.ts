import jwt from 'jsonwebtoken';

export function verifyToken(authHeader?: string): { user_id: number; is_guest: boolean } | null {
  if (!authHeader || !authHeader.startsWith('Bearer ')) return null;

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { user_id: number; is_guest: boolean };
    return decoded;
  } catch {
    return null;
  }
}

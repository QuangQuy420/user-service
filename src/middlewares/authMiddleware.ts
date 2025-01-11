import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../services/AuthService';

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    res.status(401).json({ error: 'Access denied. No access token provided.' });
    return;
  }

  try {
    const decoded = verifyToken(
      token,
      process.env.ACCESS_TOKEN_SECRET as string
    );
    // @ts-ignore
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token.' });
  }
};

export const authorizeRole = (roleList: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    if (!roleList.includes(req.user.role)) {
      res.status(403).send('You do not have access to this resource');
      return;
    }
    next();
  };
};

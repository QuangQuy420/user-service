import { Request, Response } from 'express';
import * as AuthService from '../services/AuthService';

export const register = async (req: Request, res: Response): Promise<void> => {
  const { email, username, password, passwordConfirm } = req.body;

  try {
    const user = await AuthService.registerUser({
      email,
      username,
      password,
      passwordConfirm,
    });

    res.status(201).json(user);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const signin = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;

  try {
    const user = await AuthService.authenticateUser(username, password);
    if (!user) {
      res.status(401).json({ error: 'Invalid email or password' });
      return;
    }

    const accessToken = AuthService.generateAccessToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    const refreshToken = AuthService.generateRefreshToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    // Store refresh token in HttpOnly cookie.
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Use HTTPS in production
      sameSite: 'strict',
    });

    res.status(200).json({
      message: 'Login successful',
      accessToken,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const refreshToken = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    res.status(400).json({ error: 'Refresh token is required' });
    return;
  }

  const decoded = AuthService.verifyToken(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET as string
  );

  if (!decoded) {
    res.status(403).json({ error: 'Invalid or expired refresh token' });
    return;
  }

  // Generate a new access token
  const newAccessToken = AuthService.generateAccessToken({
    id: decoded.id,
    email: decoded.email,
    role: decoded.role,
  });

  res.status(200).json({
    accessToken: newAccessToken,
  });
};

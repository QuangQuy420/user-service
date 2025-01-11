import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';
import * as AuthRepository from '../repositories/AuthRepository';
import { IUser } from '../models/User';

const ACCESS_TOKEN_SECRET =
  process.env.ACCESS_TOKEN_SECRET || 'your_access_token_secret';
const REFRESH_TOKEN_SECRET =
  process.env.REFRESH_TOKEN_SECRET || 'your_refresh_token_secret';
const ACCESS_TOKEN_EXPIRES_IN = '15m';
const REFRESH_TOKEN_EXPIRES_IN = '7d';

type registerUserType = {
  email: string;
  username: string;
  password: string;
  passwordConfirm: string;
};

export interface TokenPayload {
  id: string;
  email: string;
  role: string;
}

export const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, 10);
};

export const verifyPassword = async (
  password: string,
  passwordConfirm: string
) => {
  if (password !== passwordConfirm) {
    throw new Error('The password confirm is incorrect!');
  }
};

export const comparePassword = async (
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> => {
  return bcrypt.compare(plainPassword, hashedPassword);
};

export const generateAccessToken = (userInfo: object): string => {
  return jwt.sign(userInfo, ACCESS_TOKEN_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRES_IN,
  });
};

export const generateRefreshToken = (userInfo: object): string => {
  return jwt.sign(userInfo, REFRESH_TOKEN_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRES_IN,
  });
};

export const verifyToken = (
  token: string,
  secret: string
): TokenPayload | null => {
  try {
    return jwt.verify(token, secret) as TokenPayload;
  } catch (error) {
    return null;
  }
};

export const registerUser = async ({
  email,
  username,
  password,
  passwordConfirm,
}: registerUserType) => {
  await verifyPassword(password, passwordConfirm);

  const existingUsername = await AuthRepository.findUserByField(username);
  const existingEmail = await AuthRepository.findUserByField(email);

  if (existingUsername) {
    throw new Error('Username is already in use');
  }
  if (existingEmail) {
    throw new Error('Email is already in use');
  }

  const hashedPassword = await hashPassword(password);

  return AuthRepository.createUser({
    username,
    email,
    password: hashedPassword,
  });
};

export const authenticateUser = async (
  username: string,
  password: string
): Promise<IUser | null> => {
  try {
    const user = await AuthRepository.findUserByField(username);

    if (!user || !(await comparePassword(password, user.password))) {
      return null;
    }

    return user;
  } catch (error) {
    throw new Error('Error authenticating user');
  }
};

import bcrypt from 'bcrypt';
import * as UserRepository from '../repositories/UserRepository';
import { IUser } from '../models/User';

export const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, 10);
};

export const registerUser = async (
  username: string,
  email: string,
  password: string
): Promise<IUser> => {
  const hashedPassword = await hashPassword(password);
  return UserRepository.createUser({
    username,
    email,
    password: hashedPassword,
  });
};

export const authenticateUser = async (
  email: string,
  password: string
): Promise<IUser | null> => {
  const user = await UserRepository.findUserByEmail(email);
  if (!user || !(await user.comparePassword(password))) {
    return null;
  }
  return user;
};

export const getUserById = async (userId: string): Promise<IUser | null> => {
  return UserRepository.findUserById(userId);
};

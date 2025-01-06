import bcrypt from 'bcrypt';
import * as UserRepository from '../repositories/UserRepository';
import { IUser } from '../models/User';

const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, 10);
};

const verifyPassword = async (password: string, passwordConfirm: string) => {
  if (password !== passwordConfirm) {
    throw new Error('The password confirm is incorrect!');
  }
};

export const registerUser = async ({
  email,
  username,
  password,
  passwordConfirm,
}: {
  email: string;
  username: string;
  password: string;
  passwordConfirm: string;
}) => {
  await verifyPassword(password, passwordConfirm);

  const existingUser = await UserRepository.findUserByEmail(email);
  if (existingUser) {
    throw new Error('Email is already in use');
  }

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

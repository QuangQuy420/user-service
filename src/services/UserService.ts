import * as UserRepository from '../repositories/UserRepository';
import { IUser } from '../models/User';

export const getUserById = async (userId: string): Promise<IUser | null> => {
  return UserRepository.findUserById(userId);
};

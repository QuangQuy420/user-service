import User, { IUser } from '../models/User';

export const createUser = async (userData: Partial<IUser>): Promise<IUser> => {
  return User.create(userData);
};

export const findUserByEmail = async (email: string): Promise<IUser | null> => {
  return User.findOne({ email });
};

export const findUserById = async (id: string): Promise<IUser | null> => {
  return User.findById(id);
};

import User, { IUser } from '../models/User';

export const findUserById = async (id: string): Promise<IUser | null> => {
  return User.findById(id);
};

import User, { IUser } from '../models/User';

export const findUserByField = async (
  username: string
): Promise<IUser | null> => {
  return User.findOne({ username });
};

export const createUser = async (newUser: Partial<IUser>): Promise<IUser> => {
  return User.create(newUser);
};

import * as MessageRepository from '../repositories/MessageRepository';
import bcrypt from 'bcrypt';

export const getAllMessage = async (name, email, password) => {
  const existingUser = await MessageRepository.findByEmail(email);
  if (existingUser) {
    throw new Error('User already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await MessageRepository.create({
    name,
    email,
    password: hashedPassword,
  });
  return user._id.toString();
};

export const sendMessage = async (email, password) => {
  const user = await MessageRepository.findByEmail(email);
  if (!user) {
    throw new Error('Invalid credentials');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Invalid credentials');
  }

  return user._id.toString();
};

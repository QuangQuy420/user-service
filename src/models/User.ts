import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  email: string;
  username: string;
  password: string;
  avatar?: string;
  createdAt: Date;
  role: string;
}

const UserSchema: Schema<IUser> = new mongoose.Schema({
  email: { type: String, unique: true },
  username: { type: String, unique: true },
  password: { type: String, required: true },
  avatar: { type: String },
  createdAt: { type: Date, default: Date.now },
  role: { type: String, default: 'user' },
});

export default mongoose.model<IUser>('User', UserSchema);

import mongoose from "mongoose";
import { Document } from "mongoose";

export interface IUserSettings {
  theme?: string;
  language?: string;
}

export interface IUser extends Document {
  firstName?: string;
  lastName: string;
  email: string;
  password: string;
  age?: number;
  avatarUrl?: string;
  createdAt?: Date;
  settings?: IUserSettings;
  resetPasswordToken?: string;
  resetPasswordExpires?: any;
  unSuccessfulLoginAttempts: number;
  accountLockedUntil: Date | null;
}

const userSchema = new mongoose.Schema<IUser>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: false },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  age: { type: Number },
  avatarUrl: { type: String },
  createdAt: { type: Date, default: Date.now },
  settings: { type: Object },
  resetPasswordExpires: { type: Date },
  resetPasswordToken: { type: String },
  unSuccessfulLoginAttempts: { type: Number, default: 0 },
  accountLockedUntil: { type: Date, default: null },
});

export const User = mongoose.model<IUser>('User', userSchema);
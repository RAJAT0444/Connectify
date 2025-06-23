import mongoose, { Schema, Document } from "mongoose";

// ✅ Rename to IMessage for clarity and export it
export interface IMessage extends Document {
  content: string;
  createdAt: Date;
  ipAddress?: string;
  userAgent?: string;
}

// Message Schema
const MessageSchema: Schema<IMessage> = new Schema({
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  ipAddress: {
    type: String,
    default: "unknown",
  },
  userAgent: {
    type: String,
    default: "unknown",
  },
});

// ✅ Rename to IUser and export if needed
export interface IUser extends Document {
  username: string;
  password: string;
  email: string;
  verifyCode: string;
  verifyCodeExpire: Date;
  isVerified: boolean;
  isAccountVerified: boolean;
  messages: IMessage[];
  isAcceptingMessages: boolean;
}

const UserSchema: Schema<IUser> = new Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: [
      /^([a-zA-Z0-9_.+-]+)@([a-zA-Z0-9-]+\.)+[a-zA-Z0-9]{2,4}$/,
      "Please enter a valid email address",
    ],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  verifyCode: {
    type: String,
    required: [true, "Verification code is required"],
  },
  verifyCodeExpire: {
    type: Date,
    required: [true, "Verification code expiration date is required"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAccountVerified: {
    type: Boolean,
    default: false,
  },
  messages: [MessageSchema],
  isAcceptingMessages: {
    type: Boolean,
    default: true,
  },
});

// ✅ Default export of model
const UserModel =
  (mongoose.models.User as mongoose.Model<IUser>) ||
  mongoose.model<IUser>("User", UserSchema);

export default UserModel;

// ✅ Export the types correctly
export type { IMessage };

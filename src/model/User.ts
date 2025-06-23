import mongoose, { Schema, Document } from "mongoose";

// ✅ Message interface
export interface IMessage extends Document {
  content: string;
  createdAt: Date;
  ipAddress?: string;
  userAgent?: string;
}

// ✅ Message schema
const MessageSchema: Schema<IMessage> = new Schema<IMessage>({
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
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

// ✅ User interface
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

// ✅ User schema
const UserSchema: Schema<IUser> = new Schema<IUser>({
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
    required: true,
  },
  verifyCodeExpire: {
    type: Date,
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAccountVerified: {
    type: Boolean,
    default: false,
  },
  messages: {
    type: [MessageSchema],
    default: [],
  },
  isAcceptingMessages: {
    type: Boolean,
    default: true,
  },
});

// ✅ Final model
const UserModel =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default UserModel;

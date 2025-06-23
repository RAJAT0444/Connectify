

// import mongoose, { Schema, Document } from "mongoose";

// export interface Message extends Document {
//   content: string;
//   createdAt: Date;
// }

// const MessageSchema: Schema<Message> = new Schema({
//   content: {
//     type: String,
//     required: true,
//   },
//   createdAt: {
//     type: Date,
//     required: true,
//     default: Date.now,
//   },
// });

// export interface User extends Document {
//   username: string;
//   password: string;
//   email: string;
//   verifyCode: string;
//   verifyCodeExpire: Date;
//   isVerified: boolean;
//   isAccountVerified: boolean;
//   messages: Message[];
//   isAcceptingMessages: boolean;
// }

// const UserSchema: Schema<User> = new Schema({
//   username: {
//     type: String,
//     required: [true, "Username is required"],
//     trim: true,
//     unique: true,
//   },
//   email: {
//     type: String,
//     required: [true, "Email is required"],
//     unique: true,
//     match: [
//       /^([a-zA-Z0-9_.+-]+)@([a-zA-Z0-9-]+\.)+[a-zA-Z0-9]{2,4}$/,
//       "Please enter a valid email address",
//     ],
//   },
//   password: {
//     type: String,
//     required: [true, "Password is required"],
//   },
//   verifyCode: {
//     type: String,
//     required: [true, "Verification code is required"],
//   },
//   verifyCodeExpire: {
//     type: Date,
//     required: [true, "Verification code expiration date is required"],
//   },
//   isVerified: {
//     type: Boolean,
//     default: false,
//   },
//   isAccountVerified: {
//     type: Boolean,
//     default: false,
//   },
//   messages: [MessageSchema],
//   isAcceptingMessages: {
//     type: Boolean,
//     default: true,
//   },
// });

// const UserModel =
//   (mongoose.models.User as mongoose.Model<User>) ||
//   mongoose.model<User>("User", UserSchema);

// export default UserModel;


import mongoose, { Schema, Document } from "mongoose";

// ✅ Message Interface
export interface IMessage {
  content: string;
  createdAt: Date;
  ipAddress?: string;
  userAgent?: string;
}

// ✅ Embedded message schema (not as model, just for subdocument)
const MessageSchema = new Schema<IMessage>({
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

// ✅ User Interface
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

// ✅ User Schema
const UserSchema = new Schema<IUser>({
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
  messages: [MessageSchema], // ✅ now accepts plain object `{...}` push
  isAcceptingMessages: {
    type: Boolean,
    default: true,
  },
});

// ✅ User Model
const UserModel =
  (mongoose.models.User as mongoose.Model<IUser>) ||
  mongoose.model<IUser>("User", UserSchema);

export default UserModel;

// const mongoose = require("mongoose");
import mongoose from "mongoose";

interface IUser {
  username: string;
  password: string;
  email: any;
  isEmailVerified: boolean;
  emailVerificationOTP: any;
  type: string;
}

const userSchema = new mongoose.Schema<IUser>({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  isEmailVerified: {
    type: Boolean,
    default: false,
  },
  emailVerificationOTP: {
    type: Number,
  },

  type: {
    type: String,
    default: "user",
  },
});
const User = mongoose.model<IUser>("user", userSchema);
export { User };

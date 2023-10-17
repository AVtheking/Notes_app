// const mongoose = require("mongoose");
import mongoose from "mongoose";

interface IUser{
  username: string,
  password: string,
  type:string
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
  type: {
    type: String,
    default: "user",
  },
});
const User = mongoose.model<IUser>("user", userSchema);
export { User };




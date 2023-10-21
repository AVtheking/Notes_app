import mongoose from "mongoose";

interface Iotp {
  email: string;
  otp: Number;
  createdAt: Date;
}
const otpSchema = new mongoose.Schema<Iotp>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  otp: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 120,
  },
});
const Otp = mongoose.model<Iotp>("otp", otpSchema);
export default Otp;

import mongoose from "mongoose";

interface Iotp {
  email: string;
  otp: Number;
}
const otpSchema = new mongoose.Schema<Iotp>({
  email: {
    type: String,
  },
  otp: {
    type: Number,
  },
});
const Otp = mongoose.model<Iotp>("otp", otpSchema);
export default Otp;

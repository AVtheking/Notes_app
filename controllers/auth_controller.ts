import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import validator from "validator";
import Otp from "../models/otp";
import { User } from "../models/user";
import sendmail from "../utils/mailer";
import authSchema from "../utils/validation";
const authCtrl = {
  signUp: async (req: any, res: any, next: any) => {
    try {
      const { username, password, email } = req.body;
      // if (!username || !password || !email) {
      //   return res.status(400).json({ error: "fill all entries" });
      // }
      const result = await authSchema.validateAsync(req.body);
      // if (!validator.isEmail(email)) {
      //   return res.status(400).json({ msg: "invalid email address" });
      // }

      const existingUser = await User.findOne({ email });

      if (existingUser) {
        if (!existingUser.isEmailVerified) {
          await User.deleteOne({ email });
        } else {
          return res
            .status(400)
            .json({ msg: "User with the same username already exists" });
        }
      }
      const hashedPassword = await bcryptjs.hash(password, 8);
      const otp = Math.floor(100000 + Math.random() * 900000);
      let OTP = new Otp({
        email,
        otp,
      });
      sendmail(email, otp);

      let user = new User({
        username,
        password: hashedPassword,
        email,
      });

      user = await user.save();
      OTP = await OTP.save();
      res.status(201).json(user);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  },
  signIn: async (req: any, res: any) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ msg: "No user exist with this username " });
      }
      const isMatch = await bcryptjs.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: "Invalid Password!" });
      }
      if (!user.isEmailVerified) {
        return res.status(400).json({ msg: "Email not verified" });
      }
      const token = jwt.sign({ id: user._id }, "passwordKey");
      console.log(token);
      res.json({ token, ...user.toObject() });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  },
  getData: async (req: any, res: any) => {
    try {
      const user = await User.findById(req.user);
      res.json({ ...user?.toObject(), token: req.token });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  },
  verifyEmail: async (req: any, res: any) => {
    try {
      const { email, otp } = req.body;

      let OTP = await Otp.findOne({ email });

      if (otp != OTP?.otp || !OTP) {
        return res.status(400).json({ msg: "Invalid otp" });
      }
      await User.findOneAndUpdate(
        { email },
        {
          isEmailVerified: true,
        },
        { new: true }
      );

      await Otp.deleteOne({ email });

      res.json({ msg: "Email is verified" });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  },
  forgetPassword: async (req: any, res: any) => {
    try {
      const { email } = req.body;
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: "No user exists with this email" });
      }
      const otp = Math.floor(1000 + Math.random() * 9000);
      let existingOtp = await Otp.findOne({ email });
      if (existingOtp) {
        await existingOtp.deleteOne({ email });
      }
      let OTP = new Otp({
        email,
        otp,
      });
      OTP = await OTP.save();
      sendmail(email, otp);
      res.json({ msg: "Otp is send to your registered email" });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  },
  changePassword: async (req: any, res: any) => {
    try {
      const { email, otp, newPassword } = req.body;

      let OTP = await Otp.findOne({ email });
      console.log(`otp found ${OTP}`);
      if (otp != OTP?.otp || !OTP) {
        return res.status(500).json({ msg: "Invalid otp" });
      }
      const hashedPassword = await bcryptjs.hash(newPassword, 8);
      let user = await User.findOneAndUpdate(
        { email },
        {
          password: hashedPassword,
        },
        { new: true }
      );

      res.json(user);
    } catch (e: any) {
      return res.status(500).json({ error: e.message });
    }
  },
};
export default authCtrl;

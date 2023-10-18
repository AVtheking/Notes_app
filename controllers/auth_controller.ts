  import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from 'nodemailer';
import { User } from "../models/user";

    

  const authCtrl={
      signUp:async (req:any, res:any) => {
          try {
            const { username, password ,email} = req.body;
            if (!username || !password ||!email) {
              return res.status(400).json({error:"fill all enteries"})
            }
          
            const existingUser = await User.findOne({ username });
            
      
            if (existingUser) {
              return res
                .status(400)
                .json({ msg: "User with the same username already exists" });
            }
            const hashedPassword = await bcryptjs.hash(password, 8);
            const otp = Math.floor(100000 + Math.random() * 900000); 

            
            const transporter =  nodemailer.createTransport({
              host: 'smtp.gmail.com',
              port: 465,
              secure: true,
              auth: {
                user: "",
                pass:"prvl uwin zkgq pfog   ",
              
            }
          })
          const mailOptions = {
            from: "",
            to: email,
            subject: "Email verification code",
            text:`Your OTP is ${otp}`
          }
          console.log("here") 

            await transporter.sendMail(mailOptions, (error, info) => {
              if (error)
              { console.log(error) }
              else {
                console.log("Email sent:" +info.response)
              }
            })
            let user = new User({
              username,
              password: hashedPassword,
              email,
              emailVerificationOTP:otp
            });
            user = await user.save();
            res.status(201).json(user);
          } catch (e:any) {
            res.status(500).json({ error: e.message });
          }
      },
      signIn: async (req: any, res: any) => {
          try
      {   const { username, password } = req.body;
          const user = await User.findOne({ username });
          if (!user) {
            return res.status(400).json({ msg: "No user exist with this username " });
          }
          const isMatch = await bcryptjs.compare(password, user.password);
          if (!isMatch) {
            return res.status(400).json({ msg: "Invalid Password!" });
            }
            if (!user.isEmailVerified)
            {
              return res.status(400).json({msg:"Email not verified"})
              }
          const token = jwt.sign({ id: user._id }, "passwordKey");
          console.log(token);
              res.json({ token, ...user.toObject() });
          }
          catch (e:any) {
              res.status(500).json({error:e.message})
          }
      },
      getData:async (req: any, res: any) => {
          try
        { const user = await User.findById(req.user);
            res.json({ ...user?.toObject(), token: req.token });
          }
          catch (e: any) {
            res.status(500).json({error:e.message})
          }
    },
    verifyEmail: async (req: any, res: any)=>{
      try {
        const { username, otp } = req.body;
        let user = await User.findOne({ username })
        
        if (!user) {
          return res.status(400).json({msg:"No user exists with this username"})
        }
        if (otp != user.emailVerificationOTP) {
          return res.status(400).json({msg:"Invalid otp"})
        }
        user.isEmailVerified = true
        user = await user.save()
        res.json({msg:"Email is verified"})
      }
      catch (e:any) {
        res.status(500).json({error:e.message})
      }
    }
      
  }
  export default authCtrl
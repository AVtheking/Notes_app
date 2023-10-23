import dotenv from "dotenv";
import nodemailer from "nodemailer";
dotenv.config();
const sendmail = async (email: string, otp: Number) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    },
  });
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Email verification code",
    text: `<h1>Your OTP is ${otp}</h1>`,
  };
  console.log("here");

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent:" + info.response);
    }
  });
};

export default sendmail;

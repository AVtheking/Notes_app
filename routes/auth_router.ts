import express = require("express");
const authRouter = express.Router();
// const { User } = require("../models/user");
import auth from "../middlewares/auth";
import { User } from "../models/user";
import bcryptjs = require("bcryptjs");
// import  setUser  = require("../services/utils");
import jwt = require("jsonwebtoken");

authRouter.post("/notes/sign-up", async (req:any, res:any) => {
  try {
    const { username, password } = req.body;
    // console.log("Hello1");
    const existingUser = await User.findOne({ username });
    // console.log("Hello2");
    if (existingUser) {
      return res
        .status(400)
        .json({ msg: "User with the same username already exists" });
    }
    const hashedPassword = await bcryptjs.hash(password, 8);
    let user = new User({
      username,
      password: hashedPassword,
    });
    user = await user.save();
    res.json(user);
  } catch (e:any) {
    res.status(500).json({ error: e.message });
  }
});

authRouter.post("/notes/sign-in", async (req:any, res:any) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).json({ msg: "No user exist with this username " });
  }
  const isMatch = await bcryptjs.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ msg: "Invalid Password!" });
  }
  const token = jwt.sign({ id: user._id }, "passwordKey");
  console.log(token);
  res.json({ token, ...user.toObject() });
});
authRouter.get("/", auth, async (req:any, res:any) => {
  const user = await User.findById(req.user);
  res.json({ ...user?.toObject(), token: req.token });
});
export default authRouter

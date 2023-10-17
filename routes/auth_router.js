const express = require("express");
const authRouter = express.Router();
const User = require("../models/user");
const bcryptjs = require("bcryptjs");

authRouter.post("/notes/sign-in", async (req, res) => {
  try {
    const { username, password } = req.body;
    const existingUser = await User.findOne({ username });
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
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

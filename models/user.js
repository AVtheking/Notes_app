const mongoose = require("mongoose");

userSchema = mongoose.Schema({
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
const User = mongoose.model("user", userSchema);
module.exports = { User };

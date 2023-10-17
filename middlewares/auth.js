const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    const token = req.header("auth-token");
    // console.log(token);
    if (!token) {
      return res.status(400).json({ msg: "No Token" });
    }
    const verified = jwt.verify(token, "passwordKey");
    if (!verified) {
      return res.status(400).json({ msg: "No auth token,access denied" });
    }
    req.user = verified.id;
    req.token = token;
    next();
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
module.exports = auth;

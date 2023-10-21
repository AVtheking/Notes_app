import jwt from "jsonwebtoken";
import { User } from "../models/user";
const admin = async (req: any, res: any, next: any) => {
  try {
    const token = req.header("auth-token");
    if (!token) {
      return res.status(401).json({ msg: "No Token" });
    }
    const verified: any = jwt.verify(token, "passwordKey");
    if (!verified) {
      return res.status(401).json({ msg: "No auth token,access denied" });
    }
    const user = await User.findById(verified.id);
    if (user!.type == "user") {
      return res.status(401).json({ msg: "You are not an admin" });
    }
    req.user = user;
    req.token = token;
    next();
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
};
export default admin;

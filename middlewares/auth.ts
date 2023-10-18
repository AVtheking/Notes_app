// @ts-ignore
import jwt from "jsonwebtoken";

type UserId = string;
const auth = async (req:any, res:any , next:any) => {
  try {
    const token = req.header("auth-token");
   
    if (!token) {
      return res.status(401).json({ msg: "No Token" });
    }
    const verified:any = jwt.verify(token, "passwordKey");
    if (!verified) {
      return res.status(401).json({ msg: "No auth token,access denied" });
    }
    req.user = verified.id;
    req.token = token;
    next();
  } catch (e:any) {
    res.status(500).json({ error: e.message });
  }
};
  export default auth

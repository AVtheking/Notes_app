import express from "express";
const authRouter = express.Router();

import authCtrl from "../controllers/auth_controller";
import auth from "../middlewares/auth";

authRouter.post("/notes/sign-up", authCtrl.signUp);
authRouter.post("/notes/verify", authCtrl.verifyEmail);
authRouter.post("/notes/sign-in", authCtrl.signIn);
authRouter.post("/notes/forget-password", authCtrl.forgetPassword);
authRouter.post("/notes/change-password", authCtrl.changePassword);
authRouter.get("/", auth, authCtrl.getData);
export default authRouter;

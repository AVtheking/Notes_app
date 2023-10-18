import express = require("express");
import adminCtrl from "../controllers/admin_controller";
import admin from "../middlewares/admin";
const { Note } = require("../models/note_model");
const adminRouter = express.Router();

adminRouter.post("/notes/admin/add", admin,adminCtrl.addNote );
adminRouter.get("/notes/admin/get", admin,adminCtrl.getNotes );
adminRouter.delete("/notes/admin/delete", admin,adminCtrl.deleteNote );
adminRouter.patch("/notes/admin/update", admin,adminCtrl.updateNote );
export default adminRouter

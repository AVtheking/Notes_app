import express = require("express");
import noteCtrl from "../controllers/notes_controller";
import auth from "../middlewares/auth";
const notesRouter = express.Router();

notesRouter.post("/notes/add", auth,noteCtrl.addNote);

notesRouter.get("/notes/get", auth,noteCtrl.getNotes);
notesRouter.delete("/notes/delete", auth,noteCtrl.deleteNote);
notesRouter.patch("/notes/update", auth,noteCtrl.updateNote);

export default notesRouter

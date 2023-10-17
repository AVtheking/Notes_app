import express = require("express");
import auth from "../middlewares/auth";
import { Note } from "../models/note_model";
const notesRouter = express.Router();

notesRouter.post("/notes/add", auth, async (req, res) => {
  try {
    const { id, userId, title, content } = req.body;
    const existingId = await Note.findOne({ id });
    // if (existingId) {
    //   return res
    //     .status(400)
    //     .json({ msg: "Note with same id exist ,please give different id" });
    // }
    let newNote = new Note({
      id,
      userId,
      title,
      content,
    });
    newNote = await newNote.save();
    res.json(newNote);
  } catch (e:any) {
    res.status(500).json({ error: e.message });
  }
});

notesRouter.get("/notes/get/:userId", auth, async (req, res) => {
  try {
    const { userId } = req.params;
    const notes = await Note.find({ userId });
    res.json(notes);
  } catch (e:any) {
    res.status(500).json({ error: e.message });
  }
});
notesRouter.delete("/notes/delete", auth, async (req, res) => {
  try {
    const { id } = req.body;
    await Note.deleteOne({ id: id });
    res.json({ msg: "note has been deleted succesfully" });
  } catch (e:any) {
    res.status(500).json({ error: e.message });
  }
});
notesRouter.put("/notes/update", auth, async (req, res) => {
  try {
    const { id, userId, title, content } = req.body;
    await Note.deleteOne({ id: id });
    let updatedNote = new Note({
      id,
      userId,
      title,
      content,
    });
    updatedNote = await updatedNote.save();
    res.json({ msg: "note updated successfully" });
  } catch (e:any) {
    res.status(500).json({ error: e.message });
  }
});

export default notesRouter

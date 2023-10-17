const express = require("express");
const { Note } = require("../models/note_model");
const notesRouter = express.Router();

notesRouter.post("/notes/add", async (req, res) => {
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
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

notesRouter.get("/notes/get/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const notes = await Note.find({ userId });
    res.json(notes);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
notesRouter.delete("/notes/delete", async (req, res) => {
  try {
    const { id } = req.body;
    await Note.deleteOne({ id: id });
    res.json({ msg: "note has been deleted succesfully" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
notesRouter.put("/notes/update", async (req, res) => {
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
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = notesRouter;

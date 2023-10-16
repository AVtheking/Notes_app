const express = require("express");
const { Note } = require("../models/note_model");
const notesRouter = express.Router();

notesRouter.post("/notes/add", async (req, res) => {
  try {
    const { id, userId, title, content } = req.body;
    const existingId = await Note.findOne({ id });
    if (existingId) {
      return res
        .status(400)
        .json({ msg: "Note with same id exist ,please give different id" });
    }
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
module.exports = notesRouter;

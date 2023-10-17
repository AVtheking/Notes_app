const express = require("express");
const admin = require("../middlewares/admin");
const { Note } = require("../models/note_model");
const adminRouter = express.Router();

adminRouter.post("/notes/admin/add", admin, async (req, res) => {
  try {
    const { id, userId, title, content } = req.body;
    const existingId = await Note.findOne({ id });

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
adminRouter.get("/notes/admin/get", admin, async (req, res) => {
  try {
    //   const { userId } = req.params;
    const notes = await Note.find();
    res.json(notes);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
adminRouter.delete("/notes/admin/delete", admin, async (req, res) => {
  try {
    const { id } = req.body;
    await Note.deleteOne({ id: id });
    res.json({ msg: "note has been deleted succesfully" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
adminRouter.put("/notes/admin/update", admin, async (req, res) => {
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
module.exports = adminRouter;

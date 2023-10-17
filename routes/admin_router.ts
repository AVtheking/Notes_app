import express = require("express");
import admin from "../middlewares/admin";
const { Note } = require("../models/note_model");
const adminRouter = express.Router();

adminRouter.post("/notes/admin/add", admin, async (req, res) => {
  try {
    const {  title, content } = req.body;
  

    let newNote = new Note({
 
   
      title,
      content,
    });
    newNote = await newNote.save();
    res.json(newNote);
  } catch (e:any) {
    res.status(500).json({ error: e.message });
  }
});
adminRouter.get("/notes/admin/get", admin, async (req, res) => {
  try {
 
    const notes = await Note.find();
    res.json(notes);
  } catch (e:any) {
    res.status(500).json({ error: e.message });
  }
});
adminRouter.delete("/notes/admin/delete", admin, async (req, res) => {
  try {
    const { id } = req.body;
    await Note.deleteOne({ id: id });
    res.json({ msg: "note has been deleted succesfully" });
  } catch (e:any) {
    res.status(500).json({ error: e.message });
  }
});
adminRouter.patch("/notes/admin/update", admin, async (req, res) => {
  try {
    const { id, title, content } = req.body;
    await Note.deleteOne({ id: id });
    let existingNote = await Note.findById({ id })
    if (!existingNote)
    {
      return res.status(404).json({msg:"Note not found"})
    }
    existingNote.title = title;
    existingNote.content=content
    existingNote = await existingNote.save();
    res.json({ msg: "note updated successfully" });
  } catch (e:any) {
    res.status(500).json({ error: e.message });
  }
});
export default adminRouter

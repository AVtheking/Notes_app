import { Note } from "../models/note_model";

const adminCtrl = {
    addNote:async (req:any, res:any) => {
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
    },
    getNotes:async (req:any, res:any) => {
        try {
       
          const notes = await Note.find();
          res.json(notes);
        } catch (e:any) {
          res.status(500).json({ error: e.message });
        }
    },
    deleteNote:async (req:any, res:any) => {
        try {
          const { id } = req.body;
          await Note.deleteOne({ id: id });
          res.json({ msg: "note has been deleted succesfully" });
        } catch (e:any) {
          res.status(500).json({ error: e.message });
        }
    },
    updateNote:async (req:any, res:any) => {
        try {
          const { id, title, content } = req.body;
       
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
      }
}   

export default adminCtrl
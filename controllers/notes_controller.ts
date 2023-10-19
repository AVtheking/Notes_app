import { Note } from "../models/note_model";

const noteCtrl = {
    addNote:  async (req:any, res:any) => {
        try {
          const { title, content } = req.body;
          
          let newNote = new Note({
              userId:req.user,
              title,
              content,
            });
            newNote = await newNote.save();
            console.log("here")
          res.status(201).json(newNote);
        } catch (e:any) {
          res.status(500).json({ error: e.message });
        }
    },
    getNotes:async (req:any, res:any) => {
        try {
            console.log(req.user)
          const notes = await Note.find({userId:req.user});
          res.json(notes);
        } catch (e:any) {
          res.status(500).json({ error: e.message });
        }
    },
    deleteNote:async (req:any, res:any) => {
        try {
          const { id } = req.body;
          await Note.deleteOne({ _id: id });
          res.json({ msg: "note has been deleted succesfully" });
        } catch (e:any) {
          res.status(500).json({ error: e.message });
        }
    },
    updateNote:async (req:any, res:any) => {
        try {
          const { id,  title, content } = req.body;
          let existingNote = await Note.findByIdAndUpdate(id, { title , content},{new:true})
          if (!existingNote)
          {
            return res.status(404).json({msg:"Note not found"})
          }
    
          res.json({ msg: "note updated successfully",updatedNote:existingNote });
        } catch (e:any) {
          res.status(500).json({ error: e.message });
        }
      }
    
}
export default noteCtrl
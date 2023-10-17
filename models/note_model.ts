// const mongoose = require("mongoose");

import { Schema, model } from "mongoose";


interface INotes {


  title: string,
  content?: string,
  createdAt:Date
  
}

const notesSchema = new Schema<INotes>({
 

  title: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    // required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
const Note = model<INotes>("notes", notesSchema);
export { Note };


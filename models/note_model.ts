// const mongoose = require("mongoose");

import { Schema, model } from "mongoose";


interface INotes {
  id: string,
  userId: string,
  title: string,
  content?: string,
  createdAt:Date
  
}

const notesSchema = new Schema<INotes>({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  userId: {
    type: String,
    required: true,
  },
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


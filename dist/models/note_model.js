"use strict";
// const mongoose = require("mongoose");
Object.defineProperty(exports, "__esModule", { value: true });
exports.Note = void 0;
const mongoose_1 = require("mongoose");
const notesSchema = new mongoose_1.Schema({
  userId: {
    type: String,
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
const Note = (0, mongoose_1.model)("notes", notesSchema);
exports.Note = Note;

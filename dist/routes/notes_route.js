"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const auth_1 = __importDefault(require("../middlewares/auth"));
const note_model_1 = require("../models/note_model");
const notesRouter = express.Router();
notesRouter.post("/notes/add", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, userId, title, content } = req.body;
        const existingId = yield note_model_1.Note.findOne({ id });
        // if (existingId) {
        //   return res
        //     .status(400)
        //     .json({ msg: "Note with same id exist ,please give different id" });
        // }
        let newNote = new note_model_1.Note({
            id,
            userId,
            title,
            content,
        });
        newNote = yield newNote.save();
        res.json(newNote);
    }
    catch (e) {
        res.status(500).json({ error: e.message });
    }
}));
notesRouter.get("/notes/get/:userId", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const notes = yield note_model_1.Note.find({ userId });
        res.json(notes);
    }
    catch (e) {
        res.status(500).json({ error: e.message });
    }
}));
notesRouter.delete("/notes/delete", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.body;
        yield note_model_1.Note.deleteOne({ id: id });
        res.json({ msg: "note has been deleted succesfully" });
    }
    catch (e) {
        res.status(500).json({ error: e.message });
    }
}));
notesRouter.put("/notes/update", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, userId, title, content } = req.body;
        yield note_model_1.Note.deleteOne({ id: id });
        let updatedNote = new note_model_1.Note({
            id,
            userId,
            title,
            content,
        });
        updatedNote = yield updatedNote.save();
        res.json({ msg: "note updated successfully" });
    }
    catch (e) {
        res.status(500).json({ error: e.message });
    }
}));
exports.default = notesRouter;

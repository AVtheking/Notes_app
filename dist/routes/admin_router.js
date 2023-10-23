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
const admin_1 = __importDefault(require("../middlewares/admin"));
const { Note } = require("../models/note_model");
const adminRouter = express.Router();
adminRouter.post("/notes/admin/add", admin_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, userId, title, content } = req.body;
        const existingId = yield Note.findOne({ id });
        let newNote = new Note({
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
adminRouter.get("/notes/admin/get", admin_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //   const { userId } = req.params;
        const notes = yield Note.find();
        res.json(notes);
    }
    catch (e) {
        res.status(500).json({ error: e.message });
    }
}));
adminRouter.delete("/notes/admin/delete", admin_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.body;
        yield Note.deleteOne({ id: id });
        res.json({ msg: "note has been deleted succesfully" });
    }
    catch (e) {
        res.status(500).json({ error: e.message });
    }
}));
adminRouter.put("/notes/admin/update", admin_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, userId, title, content } = req.body;
        yield Note.deleteOne({ id: id });
        let updatedNote = new Note({
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
exports.default = adminRouter;

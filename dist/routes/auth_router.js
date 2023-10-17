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
const authRouter = express.Router();
// const { User } = require("../models/user");
const auth_1 = __importDefault(require("../middlewares/auth"));
const user_1 = require("../models/user");
const bcryptjs = require("bcryptjs");
// import  setUser  = require("../services/utils");
const jwt = require("jsonwebtoken");
authRouter.post("/notes/sign-up", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        // console.log("Hello1");
        const existingUser = yield user_1.User.findOne({ username });
        // console.log("Hello2");
        if (existingUser) {
            return res
                .status(400)
                .json({ msg: "User with the same username already exists" });
        }
        const hashedPassword = yield bcryptjs.hash(password, 8);
        let user = new user_1.User({
            username,
            password: hashedPassword,
        });
        user = yield user.save();
        res.json(user);
    }
    catch (e) {
        res.status(500).json({ error: e.message });
    }
}));
authRouter.post("/notes/sign-in", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const user = yield user_1.User.findOne({ username });
    if (!user) {
        return res.status(400).json({ msg: "No user exist with this username " });
    }
    const isMatch = yield bcryptjs.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ msg: "Invalid Password!" });
    }
    const token = jwt.sign({ id: user._id }, "passwordKey");
    console.log(token);
    res.json(Object.assign({ token }, user.toObject()));
}));
authRouter.get("/", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.User.findById(req.user);
    res.json(Object.assign(Object.assign({}, user === null || user === void 0 ? void 0 : user.toObject()), { token: req.token }));
}));
exports.default = authRouter;

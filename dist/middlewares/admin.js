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
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const user_1 = require("../models/user");
const admin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.header("auth-token");
        if (!token) {
            return res.status(401).json({ msg: "No Token" });
        }
        const verified = jwt.verify(token, "passwordKey");
        if (!verified) {
            return res.status(401).json({ msg: "No auth token,access denied" });
        }
        const user = yield user_1.User.findById(verified.id);
        if (user.type == "user") {
            return res.status(401).json({ msg: "You are not an admin" });
        }
        req.user = user;
        req.token = token;
        next();
    }
    catch (e) {
        res.status(500).json({ error: e.message });
    }
});
exports.default = admin;

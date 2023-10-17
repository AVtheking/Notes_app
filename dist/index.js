"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const mongoose = require("mongoose");
const admin_router_1 = __importDefault(require("./routes/admin_router"));
const auth_router_1 = __importDefault(require("./routes/auth_router"));
const notes_route_1 = __importDefault(require("./routes/notes_route"));
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.json());
// app.use('/', (req, res) => {
//     res.send('Hello World!');
// });
app.use(notes_route_1.default);
app.use(auth_router_1.default);
app.use(admin_router_1.default);
//connection to Database
mongoose
    .connect(process.env.DB)
    .then(() => {
    console.log("connection is successful");
})
    .catch((e) => {
    console.log(e);
});
const PORT = process.env.PORT || 5000;
app.listen(process.env.PORT, () => {
    console.log(`connected at port ${PORT}`);
});

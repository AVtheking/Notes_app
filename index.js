const express = require("express");
const mongoose = require("mongoose");
const notesRouter = require("./routes/notes_route");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth_router");
const adminRouter = require("./routes/admin_router");
require("dotenv").config();

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.json());
// app.use('/', (req, res) => {
//     res.send('Hello World!');
// });
app.use(notesRouter);
app.use(authRouter);
app.use(adminRouter);

//connection to Database
mongoose
  .connect(process.env.DB)
  .then(() => {
    console.log("connection is successful");
  })
  .catch((e) => {
    console.log(e);
  });

app.listen(process.env.PORT, () => {
  console.log(`connected at port ${PORT}`);
});

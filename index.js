const express = require("express");
const mongoose = require("mongoose");
const notesRouter = require("./routes/notes_route");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth_router");
const adminRouter = require("./routes/admin_router");
const PORT = 3000;
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

//Database
const DB =
  "mongodb+srv://test:test123@cluster0.dhaqmmz.mongodb.net/?retryWrites=true&w=majority";

//connection to Database
mongoose
  .connect(DB)
  .then(() => {
    console.log("connection is successful");
  })
  .catch((e) => {
    console.log(e);
  });

app.listen(PORT, () => {
  console.log(`connected at port ${PORT}`);
});

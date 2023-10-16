const express = require("express");
const mongoose = require("mongoose");
const notesRouter = require("./routes/notes_route");
const PORT = 3000;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(notesRouter);

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

app.listen(PORT, "0.0.0.0", () => {
  console.log(`connected at port ${PORT}`);
});

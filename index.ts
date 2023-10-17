import express from "express"
import mongoose from "mongoose";
import adminRouter from "./routes/admin_router";
import authRouter from "./routes/auth_router";
import notesRouter from "./routes/notes_route";
import cookieParser = require("cookie-parser");
import dotenv =require('dotenv') ;

dotenv.config();

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
  .connect(process.env.DB as string)
  .then(() => {
    console.log("connection is successful");
  })
  .catch((e:any) => {
    console.log(e);
  });
  const PORT = process.env.PORT || 5000;
app.listen(process.env.PORT, () => {
  console.log(`connected at port ${PORT}`);
});

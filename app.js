require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const userRoute = require("./routers/UserRoute");
const courseRouter = require("./routers/CourseRoute");
const sectionRouter = require("./routers/SectionRoute");
const app = express();

//password mongo:3ENmKw3wR0hlH3Bn
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB COnnected"))
  .catch((e) => console.log(e));
app.use(express.json());

const PORT = process.env.PORT || 5000;
app.use("/", userRoute);
app.use("/", courseRouter);
app.use("/", sectionRouter);

app.listen(PORT, console.log(`server Running on the Port ${PORT}...`));

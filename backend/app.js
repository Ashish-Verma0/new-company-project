const express = require("express");
const bodyParser = require("body-parser");
const authRouter = require("./router/auth.router");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const error = require("./utils/error");
const app = express();
require("dotenv").config();

app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
// Routes

app.use("/api/v1", authRouter);

app.use("/", (req, res) => {
  res.send("hello world");
});

app.use(error);

module.exports = app;

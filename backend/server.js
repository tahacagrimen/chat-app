const express = require("express");
const dotenv = require("dotenv");
const app = express();
dotenv.config();

const connectDB = require("./config/db");
connectDB();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("Server started on port 5000");
});

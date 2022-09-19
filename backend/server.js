const express = require("express");
const dotenv = require("dotenv");
const app = express();
dotenv.config();
const connectDB = require("./config/db");
connectDB();

const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");

const { notFound, errorHandler } = require("./middleware/errorMiddleware");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("Server started on port 5000");
});

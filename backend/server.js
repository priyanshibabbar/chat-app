// const express = require("express");
// const dotenv = require("dotenv");
// const {chats} = require("./data/data");

// const app = express();

// app.get("/", (req, res) => {
//     res.send("API is running");
// });

// app.get("/api/chat", (req, res) => {
//     res.send(chats)
// });

// app.get("/api/chat/:id", (req,res) => {
//     // console.log(req.params.id);
//     const singleChat = chats.find((c) => c._id === req.params.id);
//     res.send(singleChat);
// });

// const PORT = process.env.PORT || 5000

// app.listen(PORT, console.log(`Server started at PORT ${PORT}`));

const express = require("express");
const dotenv = require("dotenv");
const { chats } = require("./data/data");
const cors = require("cors");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const fileUpload = require("express-fileupload");

dotenv.config();

connectDB();

const app = express();

app.use(
  fileUpload({
    useTempFiles: true,
  })
);

app.use(cors());

app.use(express.json()); // to accept JSON data

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = 4000;
const backendUrl = process.env.BACKEND_URL || "http://localhost:4000";

const server = app.listen(PORT, () => {
  // console.log(`Server started at PORT ${PORT}`);
  console.log(`Backend is available at ${backendUrl}`);
});

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:4000",
  },
});

// socket connection
io.on("connection", (socket) => {
    console.log("connected to socket.io");
})
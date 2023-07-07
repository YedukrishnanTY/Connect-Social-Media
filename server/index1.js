import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log(`Socket ${socket.id} connected.`);

  socket.on("setUsername", () => {
    console.log(`(${socket.id}) connected.`);
  });

  socket.on("sendMessage", (data) => {
    const time = new Date().toLocaleTimeString();
    const message = {
      userId: data.userId,
      firstName: data.firstName,
      message: data.message,
      picturePath: data.picturePath,
      category: data.category, // include category in message data
      time: time,
    };
    console.log(`New message from user ${data.firstName}: ${data.message} in  ${data.category}`);
    io.to(data.category).emit("message", message); // emit message to specific category
  });

  socket.on("joinCategory", (category) => {
    console.log(`Socket ${socket.id} joined category ${category}.`);
    socket.join(category);
  });

  socket.on("leaveCategory", (category) => {
    console.log(`Socket ${socket.id} left category ${category}.`);
    socket.leave(category);
  });

  socket.on("disconnect", () => {
    console.log(`Socket ${socket.id} disconnected.`);
  });
});

server.listen(3002, () => {
  console.log(`Server running on port ${3002}`);
});

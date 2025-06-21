// socket.js
import { Server } from "socket.io";

const socketUserMap = {};
let io;
export function getIO() {
  return io;
}
export function getRecieverid(userId) {
  return socketUserMap[userId];
}
export function initializeSocket(server) {
    console.log("🟢 initializeSocket() called");
    io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;
    console.log("✅ Socket connected:", userId);

    if (userId) {
      socketUserMap[userId] = socket.id;
      io.emit("getOnlineUsers", Object.keys(socketUserMap));
    }

    socket.on("disconnect", () => {
      console.log("❌ Disconnected:", userId);
      delete socketUserMap[userId];
      io.emit("getOnlineUsers", Object.keys(socketUserMap));
    });

    socket.on("sendMessage", (message) => {
      const receiverSocketId = socketUserMap[message.recieverId];
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("newMessage", message);
      }
    });
  });
}

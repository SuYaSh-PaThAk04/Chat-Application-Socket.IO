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
    io = new Server(server, {
    cors: {
      origin: "https://chat-application-socket-io-git-main-suyash-pathak04s-projects.vercel.app/",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;
    if (userId) {
      socketUserMap[userId] = socket.id;
      io.emit("getOnlineUsers", Object.keys(socketUserMap));
    }

    socket.on("disconnect", () => {
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

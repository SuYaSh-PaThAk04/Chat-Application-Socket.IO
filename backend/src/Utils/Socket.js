import {Server} from "socket.io"
import http from "http"
import express from "express"

const app = express()
const server = http.createServer(app);
const io = new Server(server,
  {  cors : {
        origin : "http://localhost:5173",
    }}
);

export function getRecieverid(userId){
    return socketUserMap[userId];
}

const socketUserMap = {};
io.on("Connection",(socket)=>{
    const userId = socket.handshake.query.userId;

    if(userId)socketUserMap(userId)=socket.id;
    io.emit("getOnlineUsers",Object.keys(socketUserMap));

    io.on("Disconnect",()=>{
    delete socketUserMap(userId);
     io.emit("getOnlineUsers",Object.keys(socketUserMap));
})
})


export {io,app,server};
const {Server}=require('socket.io');
const http=require('http');
const express = require('express');
const app = express();


const server = http.createServer(app);
const io = new Server(server,{
  cors:{
    origin:["https://sapp-social-media-app.onrender.com/"],
    methods:["GET","POST"]
  }
});

const getReceiverSocketId = (receiverId)=>{
  return userSocketMap[receiverId] 
}

// online user status
const userSocketMap = {}
// {userId:sockedId}

io.on('connection',(socket)=>{

  const userId = socket.handshake.query.userId;
  if(userId !=="undefined")  userSocketMap[userId] = socket.id;


  io.emit("getOnlineUsers",Object.keys(userSocketMap));
  socket.on("disconnect",()=>{
    delete userSocketMap[userId];
    io.emit("getOnlineUsers",Object.keys(userSocketMap));

  })
});

module.exports={app,io,server,getReceiverSocketId}

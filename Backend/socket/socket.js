const { Server } = require("socket.io");
const http = require("http");
const express = require("express");
const cookieParser = require("cookie-parser");


const app=express()
app.use(cookieParser());


const server=http.createServer(app)

const io=new Server(server,{
    cors:{
        origin:["https://chatappfrontend-vdpb.onrender.com"],//frontend code
        methods:["GET","POST"]
    },
})

 const getReceiverSocketId=(receiverId)=>{
    return userSocketMap[receiverId]
}

const userSocketMap={}

io.on("connection",(socket)=>{
    console.log("a user is connected ",socket.id);

    const userId=socket.handshake.query.userId

    if(userId !== "undefined"){
        userSocketMap[userId]=socket.id
    }

    io.emit("getOnlineUser",Object.keys(userSocketMap))

    socket.on("disconnect",()=>{
        console.log("user disconnectd",socket.id)
        delete userSocketMap[userId]
        io.emit("getOnlineUsers",Object.keys(userSocketMap))
    });
});

module.exports ={app, server, io, getReceiverSocketId}
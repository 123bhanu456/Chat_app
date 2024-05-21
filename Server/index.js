const express =require('express');
const app=express();
const http=require('http');
const cors=require('cors');
const {Server}=require('socket.io');
app.use(cors());

const server=http.createServer(app);

const io=new Server(server,{
    cors:{
        origin:"https://chat-app-iq8n.onrender.com",
        method:["GET","POST"],
    }
})

io.on("connection",(socket)=>{
    console.log("User Connected "+ socket.id);

    socket.on("join_room",(data)=>{
        socket.join(data);
        console.log(`User with Id:${socket.id} joined room ${data}`);
     })

     socket.on("send_msg",(data)=>{
        socket.to(data.room).emit("recieve_msg",data);
       
     });

     socket.on("disconnect",()=>{
        console.log("user Disconnected",socket.id);
     });

    
})

server.listen(3001,()=>{
    console.log("server Running");
})
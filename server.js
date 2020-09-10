const express=require("express");
const app=express();
const socketIo=require("socket.io");
const http=require("http");
const path=require("path");

app.use(express.static(path.join(__dirname,'./public')))
const cors=require("cors");

app.use(cors());

const server=http.createServer(app);
const io=socketIo(server);

io.on("connection",(socket)=>
{
    console.log("New User Connected");


    socket.broadcast.emit("message","A new user has joined");
    socket.emit("message","Welcome");

     socket.on("disconnect",()=>{
        console.log("User Disconnected");
       io.emit("message","A user has left");
    })

    socket.on("sendMessage",(data)=>
    {
        io.emit("message",data)
    })


})

const port = process.env.PORT || 3000


server.listen(port,()=>
{
    console.log("App is running");    
})
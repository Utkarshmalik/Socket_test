const express=require("express");
const app=express();
const socketIo=require("socket.io");
const http=require("http");
app.use(express.static('public'))
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


server.listen(process.env.PORT || 3000,()=>
{
    console.log("App is running");    
})
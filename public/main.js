const socket=io();
let form = document.getElementById("myform")


form.addEventListener('submit', e => {

    e.preventDefault();
    let textValue=e.target.message.value;
    socket.emit("sendMessage",textValue);    
})

// form.addEventListener("submit",()=>
// {
//     console.log("BUtton clicked");
// })

socket.on("newConnect",(message)=>
{
    console.log(message);
})

socket.on("message",(message)=>{
    console.log(message);
    var node = document.createElement("li");                 // Create a <li> node
    var textnode = document.createTextNode(message);         // Create a text node
    node.appendChild(textnode);                              // Append the text to <li>
    document.getElementById("list").appendChild(node);     // Append <li> to <ul> with id="myList"

})


socket.on("newJoined",()=>
{
    console.log("A new user has joined the room");
})

socket.on("userLeft",()=>
{
    console.log("A user has left the room");
})
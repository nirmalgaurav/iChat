const socket = io('http://localhost:8000');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");
var audio = new Audio("ting.mp3");


let messagePosition = 'right';
const append = (message , position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
}

form.addEventListener('submit' ,(e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You : ${message}` , 'right');
    socket.emit('send' , message);
    messageInput.value ='';
       if (messagePosition == "left") {
         audio.play();
       }
})

const Name = prompt('Enter your name to join');

socket.emit("new-user-joined", Name);

socket.on('user-joined' , Name =>{
    append(`${Name} joined the chat` , 'right');
    messagePosition = 'right';
})


socket.on("receive", data => {
  append(`${data.name}:${data.message}`, "left");
  messagePosition= 'left';
});

socket.on('left' , name => {
    append(`${name} left the chat`, "left");
})


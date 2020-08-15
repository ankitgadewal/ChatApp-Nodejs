const socket = io('http://localhost:5000')

const form = document.getElementById('send-container');
const messageInp = document.getElementById('messageInp');
const messageContainer = document.querySelector('.container')
var audio = new Audio('notification.mp3');


const append = (message, position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position == 'left'){
        audio.play();
    }
}

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageInp.value;
    append(`You: ${message}`, 'right')
    socket.emit('send', message);
    messageInp.value = ''
})

const name = prompt('Enter you name to join: ');
socket.emit('new-user-joined', name);

socket.on('user-joined', name=>{
    console.log(name)
    append(`${name} joined the chat`, 'left')
})

socket.on('receive', data=>{
    append(`${data.name}: ${data.message}`, 'left')
})

socket.on('leftchat', name=>{
    append(`${name} left the chat`, 'left')
})
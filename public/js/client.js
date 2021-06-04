const socket = io()
const containerPesan = document.getElementById('message-ctn');
const formPesan = document.getElementById('send-ctn');
const inputPesan = document.getElementById('message-input');

const name = prompt('Masukan nama !');
appendMessage('Anda telah bergabung');
socket.emit('new-user', name);

socket.on('chatMessage', data => {
    appendNama(`${data.name}`);
    appendMessage(`${data.message}`);
});

socket.on('userConnected', name => {
    appendMessage(`${name} terhubung`);
});

socket.on('userDisconnected', name => {
    appendMessage(`${name} keluar`);
});

formPesan.addEventListener('submit', e => {
    e.preventDefault();
    const message = inputPesan.value;
    appendNama('Anda: ');
    appendMessage(`${message}`);
    socket.emit('send-chat-message', message);
    inputPesan.value = '';
});

function appendMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.className = 'card mb-3 chat-bubble shadow';
    messageElement.innerHTML = `<div class="card-body"><p class="card-text">${message}</p></div>`;
    containerPesan.append(messageElement);
}

function appendNama(nama) {
    const nameElement = document.createElement('h6');
    nameElement.className = `card-header`;
    nameElement.innerHTML = `<b>${nama}</b>` ;
    containerPesan.append(nameElement);
}
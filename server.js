const express = require('express');
const app = express();

app.use(express.static('public'));

const http = require('http').Server(app);
const serverSocket = require('socket.io')(http);

const port = 8080;

http.listen(port, function () {
    console.log('Servidor iniciado. Abra seu navegador em http://localhost' + port);
})

app.get('/', function (req, resp) {
    resp.sendFile(__dirname + '/index.html');
})

serverSocket.on('connect', function (socket) {

    socket.on('login', function (nickname) {
        console.log('Cliente conectado: ' + nickname);
        serverSocket.emit('chat_msg', `Usuário ${nickname} conectou.`);
        socket.nickname = nickname;
    });

    socket.on('chat_msg', function (msg) {
        console.log(`Msg recebida do cliente ${socket.nickname}: ${msg}`);
        serverSocket.emit('chat_msg', `${socket.nickname}: ${msg}`);
    })

    socket.on('status', function (msg) {
        socket.broadcast.emit('status', msg);
    })

});
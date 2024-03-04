$(function () {
    const socket = io();
    socket.nickname = '';
    $('form').submit(function (evt) {
        if (socket.nickname === '') {
            socket.nickname = $('#msg').val();
            socket.emit('login', $('#msg').val());
        } else {
            socket.emit('chat_msg', $('#msg').val());
        }
        $('#msg').val('');
        return false;
    })

    socket.on('chat_msg', function (msg) {
        $('#mensagens').append($('<li class="list-group-item">').text(msg))
    })
})
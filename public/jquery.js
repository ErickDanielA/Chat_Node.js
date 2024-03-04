$(function (){
    const socket = io();
    $('form').submit(function(evt){
        socket.emit('chat_msg', $('#msg').val());
        $('#msg').val('');
        return false;
    })
})
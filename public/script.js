const socket = io();

$('#chat-box').hide();

$('#login-btn').on('click', () => {
    const userName = $('#username').val();
    socket.emit('login', {
        username : userName
    });
    $('#username').val("");
    $('#chat-box').show();
    $('#login').hide();
    
    
});


$('#send-btn').on("click", () => {
    // console.log('clicked');
    const msgText = $('#inp').val();
    if (msgText.length == 0) return;
    $('#inp').val("");
    socket.emit('send-msg', {
        msg: msgText
    });
});

socket.on('recieved-msg', (data) => {
    // console.log(data);
    $('#chat').append(`<li class="border p-2 ms-2"><span class="fw-bold">${data.username} :</span> <span>${data.msg}</span></li>`);
});
const express = require("express");
const app = express();
const http = require('http'); //basic nodejs module already installed
const path = require('path');
const socketio = require('socket.io');


//creating a http server and passing express as request handler
const server = http.createServer(app); //app will handle all request
const io = socketio(server);
const users = {}

app.use('/', express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
    console.log(socket.id);
    console.log(`someone got connected!! with socket id - ${socket.id}`);

    socket.on('send-msg', (data)=> {
        console.log(data);
        io.emit('recieved-msg', {
            msg : data.msg,
            username : users[socket.id]
        });
    });

    socket.on('login', (data) => {
        users[socket.id] = data.username;
    })
})








const port = process.env.PORT || 3000;
//listen method ==> provided by nodejs module
server.listen(port, () => {
    console.log('server started at port ' + port);
})
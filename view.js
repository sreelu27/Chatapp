// import needed modules
//Express is lightweight web application framework for Node.js.
const express = require('express');
const mainapp = express();

//create server
const http = require('http').Server(mainapp);

//Socket.io enables the realtime communication between the clients and the server.
const io = require('socket.io')(http);

//used to serve the users every time they access this application
mainapp.get('/', function(req, res) {
    //res.send('Welcome to group chat app!!!');
    res.render('index.ejs');
});


io.sockets.on('connection', function(socket) {
    socket.on('username', function(username) {
        socket.username = username;
        io.emit('is_online', '<i>' + socket.username + ' join the chat..</i>');
    });

    socket.on('disconnect', function(username) {
        io.emit('is_online', '<i>' + socket.username + ' left the chat..</i>');
    })

    socket.on('chat_message', function(message) {
        io.emit('chat_message', '<strong>' + socket.username + '</strong>: ' + message);
    });

});

const server = http.listen(3000, function() {
    console.log('listening on *:3000');
});

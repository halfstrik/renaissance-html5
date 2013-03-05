var io = require('socket.io').listen(80),
    playersCounter = 0;

io.sockets.on('connection', function (socket) {
    'use strict';
    playersCounter += 1;
    console.log('One come in, now playing: ' + playersCounter);
    socket.emit('greetings', { userName: 'user',
                               str: 45,
                               sex: 'man',
                               x: 0,
                               y: 0 });
    socket.on('disconnect', function (data) {
        console.log(data);
        playersCounter -= 1;
        console.log('One comes out, now playing: ' + playersCounter);
    });
});
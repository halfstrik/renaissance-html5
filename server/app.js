var io = require('socket.io').listen(80),
    playersOnline = [],
    helper = require('./helper.js');

playersOnline.deletePlayer = function (player) {
    'use strict';
    var indexOfPlayer = this.indexOf(player);
    if (indexOfPlayer !== -1) {
        this.splice(indexOfPlayer, 1);
    } else {
        throw {message: 'Player not found'};
    }
};

io.sockets.on('connection', function (socket) {
    'use strict';
    var player = helper.getNewPlayer();
    socket.character = player;
    socket.emit('greetings', player);
    socket.broadcast.emit('joinPlayer', player);
    socket.emit('playersList', playersOnline);
    playersOnline.push(player);
    console.log('Player ' + player.nickname + ' logged in. greetings!');
    console.log('Now playing: ' + playersOnline.length);
    socket.on('disconnect', function (data) {
        console.log(data);
        player = socket.character;
        playersOnline.deletePlayer(player);
        console.log('Player ' + player.nickname + ' logged out, see you!');
        console.log('Now playing: ' + playersOnline.length);
        socket.broadcast.emit('leavePlayer', player);
    });
});
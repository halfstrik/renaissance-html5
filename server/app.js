var io = require('socket.io').listen(80),
    playersOnline = [],
    helper = require('./helper.js');

playersOnline.deletePlayer = function (playerPublicData) {
    'use strict';
    var indexOfPlayer = this.indexOf(playerPublicData);
    if (indexOfPlayer !== -1) {
        this.splice(indexOfPlayer, 1);
    } else {
        throw {message: 'Player not found'};
    }
};

io.sockets.on('connection', function (socket) {
    'use strict';
    socket.emit('about', { server: 'localhost', game: 'renaissance', version: 'dev'});
    socket.emit('account', {username: 'required'});
    socket.on('account', function (account) {
        if (socket.player !== undefined) {
            socket.emit('error', {message: 'already logged in'});
        }
        if (!account || account.username === undefined) {
            socket.emit('error', {message: 'username is required'});
        }
        var player = helper.player(account.username);
        socket.player = player;
        playersOnline.push(player.getPublicData().username);
        socket.emit('success', {player: player.getPrivateData(), playerList: playersOnline});
        socket.broadcast.emit('loggedIn', {player: player.getPublicData()});
        console.log('Player ' + player.nickname + ' logged in');
        console.log('Now playing: ' + playersOnline.length);
    });
    socket.on('disconnect', function () {
        if (socket.player !== undefined) {
            var player = socket.player;
            playersOnline.deletePlayer(player.getPublicData().username);
            socket.broadcast.emit('loggedOut', player);
            console.log('Player ' + player.nickname + ' logged out');
            console.log('Now playing: ' + playersOnline.length);
        }
    });
});
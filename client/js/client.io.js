/*global io*/
(function () {
    "use strict";

    var socket = io.connect('http://localhost');
    socket.on('about', function (about) {
        console.dir(about);
    });
    socket.on('account', function (accountRequirements) {
        console.dir(accountRequirements);
        socket.emit('account', {username: 'user_' + Date.now()});
        socket.on('success', function (info) {
            console.dir(info);
        });
        socket.on('error', function (error) {
            console.dir(error);
        });
    });
    socket.on('loggedIn', function (joinPlayer) {
        console.log('joinPlayer');
        console.dir(joinPlayer);
    });
    socket.on('loggedOut', function (leavePlayer) {
        console.log('leavePlayer');
        console.dir(leavePlayer);
    });

    setTimeout(function () {
        console.log('disconnecting after 2 minutes');
        socket.disconnect();
    }, 120000);
}());
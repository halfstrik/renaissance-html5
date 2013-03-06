var app = require('../server/helper.js');

exports.getNewPlayer_expectedGiveIncrementedResults = function (test) {
    'use strict';
    test.equal('user_1', app.getNewPlayer().nickname);
    test.equal('user_2', app.getNewPlayer().nickname);
    test.done();
};
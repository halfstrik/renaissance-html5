exports.getNewPlayer = (function () {
    'use strict';
    var i = 0;
    return function () {
        i += 1;
        return {
            nickname: "user_" + String(i),
            str: 45,
            sex: 'man',
            x: 0,
            y: 0
        };
    };
}());
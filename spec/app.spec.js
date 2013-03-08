/*global describe, it, expect*/
var helper = require('../server/helper.js');
describe("", function () {
    "use strict";
    it("", function () {
        var newPlayer1 = helper.getNewPlayer(),
            newPlayer2 = helper.getNewPlayer();
        expect(newPlayer1.nickname).toBe('user_1');
        expect(newPlayer2.nickname).toBe('user_2');
    });
});
/*global describe, it, expect*/
var helper = require('../server/helper.js');
describe("helper specs", function () {
    "use strict";
    it("creates object with no access to 'that'", function () {
        var player = helper.player("testUsername");
        expect(player.that).toBeUndefined();
    });
    it("create object with getPrivateData method", function () {
        var player = helper.player("testUsername");
        expect(player.getPrivateData().goldAmount).toBe(0);
    });
    it("create object with getPublicData method", function () {
        var player = helper.player("testUsername");
        expect(player.getPublicData().goldAmount).toBeUndefined();
    });
});
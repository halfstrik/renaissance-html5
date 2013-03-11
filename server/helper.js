exports.player = function (username) {
    'use strict';
    var that = this;
    this.username = username;
    this.sex = 'man';
    this.position = {x: 0, y: 0 };
    this.goldAmount = 0;
    return {
        getPrivateData: function () {
            return {
                username: that.username,
                sex: that.sex,
                position: that.position,
                goldAmount: that.goldAmount
            };
        },
        getPublicData: function () {
            return {
                username: that.username,
                sex: that.sex,
                position: that.position
            };
        }
    };
};
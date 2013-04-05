/*global UO*/
(function () {
    "use strict";
    var canvas,
        context;
    canvas = document.getElementById("game_canvas");
    context = canvas.getContext('2d');
    UO.staticUtilities.loadWorldStaticData('json/world.big.json', function () {
        UO.spriteSheetUtilities.loadSpriteSheet('json/ManStand.json', function () {
            UO.staticUtilities.drawEntireWorld(context, 16, 16, 400, 300);
            UO.spriteSheetUtilities.drawImageFromSpriteSheet('ManStandDown.png', context, 400, 300);
        });
    });
}());
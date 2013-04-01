/*global UO*/
(function () {
    "use strict";
    var canvas,
        context;
    canvas = document.getElementById("game_canvas");
    context = canvas.getContext('2d');
    UO.spriteSheetUtilities.loadWorldStaticData('json/world.json', function () {
        UO.spriteSheetUtilities.drawImageByTileCoordinates(context, 0, 0, 8, 6);
    });
}());
/*global ATLASE_UTILITIES*/
(function () {
    "use strict";
    var canvas,
        context;
    canvas = document.getElementById("game_canvas");
    context = canvas.getContext('2d');
    ATLASE_UTILITIES.loadSpriteSheetImage('img/land/land.json', function () {
        ATLASE_UTILITIES.drawImageFromAtlas('img/land/land.json', '5.png', context, 400, 300);
        ATLASE_UTILITIES.drawImageFromAtlas('img/land/land.json', '5.png', context, 444, 300);
        ATLASE_UTILITIES.drawImageFromAtlas('img/land/land.json', '1.png', context, 422, 278);
        ATLASE_UTILITIES.drawImageFromAtlas('img/land/land.json', '0.png', context, 422, 322);
    });
}());
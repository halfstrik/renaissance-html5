/*global IMAGE_UTILITIES*/
(function () {
    "use strict";
    var canvas,
        context;
    canvas = document.getElementById("game_canvas");
    context = canvas.getContext('2d');
    IMAGE_UTILITIES.getSpriteSheetImage('img/land/land.json');
    setTimeout(function () {
        var imageObject = IMAGE_UTILITIES.getImageObject('img/land/land.json', '5.png'),
            image = IMAGE_UTILITIES.getSpriteSheetImage('img/land/land.json');
        context.drawImage(image, imageObject.x, imageObject.y, imageObject.w, imageObject.h,
            400 - imageObject.w * 0.5, 300 - imageObject.h * 0.5, imageObject.w, imageObject.h);
    }, 2000);
}());
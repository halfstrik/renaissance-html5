(function () {
    "use strict";
    var canvas,
        context,
        img,
        onImageLoad = function () {
            context.drawImage(img, 400 - (img.height / 2), 300 - img.width / 2);
        };
    canvas = document.getElementById("game_canvas");
    context = canvas.getContext('2d');

    img = new Image();
    img.onload = onImageLoad;
    img.src = 'img/land/grass_5.png';
}());
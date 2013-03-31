/*global ATLASE_UTILITIES*/
(function () {
    "use strict";
    var canvas,
        context;
    canvas = document.getElementById("game_canvas");
    context = canvas.getContext('2d');
    ATLASE_UTILITIES.loadWorldStaticData('json/world.json', function () {
        console.log('ALL IMAGES LOADED, context: ', context);
    });
}());
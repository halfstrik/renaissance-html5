/*global ATLASE_UTILITIES*/
var ATLASE_UTILITIES = ATLASE_UTILITIES || (function () {
    "use strict";
    var worldData;

    return {
        loadWorldStaticData: function (worldJsonFileName, callback) {
            var jsonRequest,
                restArguments;
            if (worldData !== undefined) {
                restArguments = Array.prototype.slice.call(arguments, 2);
                callback.apply(null, restArguments);
            }
            worldData = {};
            jsonRequest = new XMLHttpRequest();
            jsonRequest.open('GET', worldJsonFileName, true);
            jsonRequest.onload = function () {
                var i,
                    totalNumberOfImages,
                    loadedNumberOfImages,
                    rawTile,
                    parsedJson = JSON.parse(this.responseText),
                    loadImage = function (imagePath, firstgid, imageheight, imagewidth, tileheight, tilewidth) {
                        var image = new Image();
                        image.onload = function () {
                            var tile = {};
                            tile.image = image;
                            tile.firstgid = firstgid;
                            tile.imageheight = imageheight;
                            tile.imagewidth = imagewidth;
                            tile.tileheight = tileheight;
                            tile.tilewidth = tilewidth;
                            worldData.tileset.push(tile);
                            loadedNumberOfImages += 1;
                            if (loadedNumberOfImages === totalNumberOfImages) {
                                restArguments = Array.prototype.slice.call(arguments, 2);
                                callback.apply(null, restArguments);
                            }
                        };
                        image.src = imagePath;
                    };
                worldData.height = parsedJson.height;
                worldData.width = parsedJson.width;
                worldData.tileheight = parsedJson.tileheight;
                worldData.tilewidth = parsedJson.tilewidth;
                worldData.layers = parsedJson.layers;
                totalNumberOfImages = parsedJson.tilesets.length;
                loadedNumberOfImages = 0;
                worldData.tileset = [];
                for (i = 0; i < totalNumberOfImages; i += 1) {
                    rawTile = parsedJson.tilesets[i];
                    loadImage(rawTile.image, rawTile.firstgid, rawTile.imageheight, rawTile.imagewidth,
                        rawTile.tileheight, rawTile.tilewidth);
                }
            };
            jsonRequest.send();
        }
    };
}());
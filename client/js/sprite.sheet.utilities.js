/*global UO*/
var UO = UO || {};
UO.spriteSheetUtilities = UO.spriteSheetUtilities || (function () {
    "use strict";
    var worldData,
        layerBuilder = function (data, width) {
            return {
                getImageNumber: function (tileX, tileY) {
                    return data[tileX + width * tileY];
                }
            };
        },
        tileSetBuilder = function (image, firstgid, imageheight, imagewidth, tileheight, tilewidth) {
            var lastgid = Math.floor(imageheight / tileheight) * Math.floor(imagewidth / tilewidth) + firstgid;
            return {
                isImageInTileSet: function (imageNumber) {
                    return imageNumber >= firstgid && imageNumber <= lastgid;
                },
                drawImageOnCanvas: function (context, dx, dy, imageNumber) {
                    if (imageNumber !== 0) {
                        var sx = ((imageNumber - firstgid) * tilewidth) % imagewidth,
                            sy = tileheight * Math.floor(((imageNumber - firstgid) * tilewidth) / imagewidth);
                        context.drawImage(image, sx, sy, tileheight, tileheight, dx, dy, tileheight, tilewidth);
                    }
                }
            };
        };

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
                var i, totalNumberOfTileSets, rawTileSet, loadedNumberOfImages,
                    totalNumberOfLayers, rawLayer, layer,
                    parsedJson = JSON.parse(this.responseText),
                    loadImage = function (imagePath, firstgid, imageheight, imagewidth, tileheight, tilewidth) {
                        var image = new Image();
                        image.onload = function () {
                            var tileSet = tileSetBuilder(image, firstgid, imageheight, imagewidth, tileheight, tilewidth);
                            worldData.arrayOfTileSets.push(tileSet);
                            loadedNumberOfImages += 1;
                            if (loadedNumberOfImages === totalNumberOfTileSets) {
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
                totalNumberOfLayers = parsedJson.layers.length;
                worldData.layers = [];
                for (i = 0; i < totalNumberOfLayers; i += 1) {
                    rawLayer = parsedJson.layers[i];
                    layer = layerBuilder(rawLayer.data, rawLayer.height, rawLayer.width);
                    worldData.layers.push(layer);
                }
                totalNumberOfTileSets = parsedJson.tilesets.length;
                loadedNumberOfImages = 0;
                worldData.arrayOfTileSets = [];
                for (i = 0; i < totalNumberOfTileSets; i += 1) {
                    rawTileSet = parsedJson.tilesets[i];
                    loadImage(rawTileSet.image, rawTileSet.firstgid, rawTileSet.imageheight, rawTileSet.imagewidth,
                        rawTileSet.tileheight, rawTileSet.tilewidth);
                }
            };
            jsonRequest.send();
        },
        drawImageByTileCoordinates: function (context, dx, dy, tileX, tileY) {
            var imageNumber, i, j,
                totalNumberOfLayers = worldData.layers.length,
                totalNumberOfTileSets = worldData.arrayOfTileSets.length;
            for (i = 0; i < totalNumberOfLayers; i += 1) {
                imageNumber = worldData.layers[i].getImageNumber(tileX, tileY);
                for (j = 0; j < totalNumberOfTileSets; j += 1) {
                    if (worldData.arrayOfTileSets[j].isImageInTileSet(imageNumber)) {
                        worldData.arrayOfTileSets[j].drawImageOnCanvas(context, dx, dy, imageNumber);
                    }
                }
            }
        }
    };
}());
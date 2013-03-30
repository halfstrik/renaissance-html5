/*global ATLASE_UTILITIES*/
var ATLASE_UTILITIES = ATLASE_UTILITIES || (function () {
    "use strict";
    var spriteSheets = {};

    return {
        loadSpriteSheetImage: function (spriteSheetJsonFileName, callback) {
            var jsonRequest,
                parsedJson,
                restArguments;
            if (spriteSheets.hasOwnProperty(spriteSheetJsonFileName)) {
                restArguments = Array.prototype.slice.call(arguments, 2);
                callback.apply(null, restArguments);
            }
            spriteSheets[spriteSheetJsonFileName] = {};
            jsonRequest = new XMLHttpRequest();
            jsonRequest.open('GET', spriteSheetJsonFileName, true);
            jsonRequest.onload = function () {
                var frameName,
                    sprite,
                    frameInSprite,
                    image;
                parsedJson = JSON.parse(this.responseText);
                spriteSheets[spriteSheetJsonFileName].sprites = [];
                for (frameName in parsedJson.frames) {
                    if (parsedJson.frames.hasOwnProperty(frameName)) {
                        sprite = parsedJson.frames[frameName];
                        frameInSprite = sprite.frame;

                        spriteSheets[spriteSheetJsonFileName].sprites.push({
                            "id": frameName,
                            "x": frameInSprite.x,
                            "y": frameInSprite.y,
                            "w": frameInSprite.w,
                            "h": frameInSprite.h
                        });
                    }
                }
                image = new Image();
                image.onload = function () {
                    spriteSheets[spriteSheetJsonFileName].image = image;
                    restArguments = Array.prototype.slice.call(arguments, 2);
                    callback.apply(null, restArguments);
                };
                image.src = parsedJson.meta.image;
            };
            jsonRequest.send();
        },
        drawImageFromAtlas: function (spriteSheetJsonFileName, imageName, context, dx, dy) {
            var sprite,
                i,
                spritesArray = spriteSheets[spriteSheetJsonFileName].sprites,
                spritesArrayLength = spritesArray.length,
                image = spriteSheets[spriteSheetJsonFileName].image;
            for (i = 0; i < spritesArrayLength; i += 1) {
                sprite = spritesArray[i];
                if (sprite.id === imageName) {
                    context.drawImage(image, sprite.x, sprite.y, sprite.w, sprite.h,
                        dx - sprite.w * 0.5, dy - sprite.h * 0.5, sprite.w, sprite.h);
                }
            }
        }
    };
}());
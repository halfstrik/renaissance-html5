/*global UO*/
var UO = UO || {};
UO.spriteSheetUtilities = UO.spriteSheetUtilities || (function () {
    "use strict";
    var spriteSheets;

    return {
        loadSpriteSheet: function (spriteSheetJsonFileName, callback) {
            var jsonRequest,
                parsedJson,
                restArguments;
            spriteSheets = {};
            jsonRequest = new XMLHttpRequest();
            jsonRequest.open('GET', spriteSheetJsonFileName, true);
            jsonRequest.onload = function () {
                var frameName, sprite, frameInSprite, image;
                parsedJson = JSON.parse(this.responseText);
                spriteSheets.sprites = [];
                for (frameName in parsedJson.frames) {
                    if (parsedJson.frames.hasOwnProperty(frameName)) {
                        sprite = parsedJson.frames[frameName];
                        frameInSprite = sprite.frame;

                        spriteSheets.sprites.push({
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
                    spriteSheets.image = image;
                    restArguments = Array.prototype.slice.call(arguments, 2);
                    callback.apply(null, restArguments);
                };
                image.src = parsedJson.meta.image;
            };
            jsonRequest.send();
        },
        drawImageFromSpriteSheet: function (imageName, context, dx, dy) {
            var sprite, i,
                spritesArray = spriteSheets.sprites,
                spritesArrayLength = spritesArray.length,
                image = spriteSheets.image;
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
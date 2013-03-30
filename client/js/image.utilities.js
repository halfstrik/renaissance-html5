/*global IMAGE_UTILITIES*/
var IMAGE_UTILITIES = IMAGE_UTILITIES || (function () {
    "use strict";
    var spriteSheets = {};

    return {
        getSpriteSheetImage: function (spriteSheetJsonFileName) {
            var jsonRequest,
                parsedJson;
            if (spriteSheets.hasOwnProperty(spriteSheetJsonFileName)) {
                return spriteSheets[spriteSheetJsonFileName].image;
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
                image = new Image();
                image.onload = function () {
                    spriteSheets[spriteSheetJsonFileName].image = image;
                };
                image.src = parsedJson.meta.image;
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
            };
            jsonRequest.send();
        },
        getImageObject: function (spriteSheetJsonFileName, imageName) {
            var sprite,
                image = this.getSpriteSheetImage(spriteSheetJsonFileName),
                i,
                spritesArray,
                spritesArrayLength;
            if (image) {
                spritesArray = spriteSheets[spriteSheetJsonFileName].sprites;
                spritesArrayLength = spritesArray.length;
                for (i = 0; i < spritesArrayLength; i += 1) {
                    sprite = spritesArray[i];
                    if (sprite.id === imageName) {
                        return sprite;
                    }
                }
            }
        }
    };
}());
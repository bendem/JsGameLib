/**
 * Creates an utility to manage sprites.
 *
 * @param Image The image data of the sprite
 */
var Sprite = function(img) {
    this.img = img;
    this.descriptors = [];
};

Sprite.prototype = {
    registerId: function(id, position, width, height) {
        this.descriptors.push({
            id: id,
            position: position,
            width: width,
            height: height,
        });

        return this;
    },

    draw: function(ctx, id, position) {
        var spritePart = search(this.descriptors, 'id', id);
        if(spritePart === null) {
            return this;
        }

        ctx.drawImage(
            this.img,
            spritePart.position.x,
            spritePart.position.y,
            spritePart.position.width,
            spritePart.position.height,
            position.x,
            position.y,
            spritePart.position.width,
            spritePart.position.height
        );
        return this;
    },
};

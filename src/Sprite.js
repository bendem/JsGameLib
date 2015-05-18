/**
 * Creates an utility to manage sprites.
 *
 * @param Image The image data of the sprite
 */
var Sprite = function(img) {
    this.img = img;
    this.parts = {};
};

Sprite.prototype = {
    registerIds: function(array) {
        for(var i = array.length - 1; i >= 0; i--) {
            this.registerId(
                array[i].id,
                array[i].position,
                array[i].width,
                array[i].height
            );
        }

        return this;
    },

    registerId: function(id, position, width, height) {
        this.parts[id] = new SpritePart(this, position, width, height);
        return this;
    },

    draw: function(ctx, part, position) {
        if(!(part instanceof SpritePart)) {
            part = this.get(part);
        }

        if(part === null) {
            // TODO Error?
            return this;
        }
        return this.drawPart(ctx, part, position);
    },

    // Use this if you don't want the lookup time
    drawPart: function(ctx, part, position) {
        ctx.drawImage(
            this.img,
            part.position.x,
            part.position.y,
            part.width,
            part.height,
            position.x,
            position.y,
            part.width,
            part.height
        );
        if(Game.debug) {
            ctx.save();
            // Box
            ctx.beginPath();
            ctx.strokeStyle = 'rgba(20, 0, 60, 0.3)';
            var w = ctx.measureText(part.id).width;
            ctx.rect(position.x, position.y, part.width, part.height);
            ctx.stroke();
            // Text shadow
            ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
            ctx.beginPath();
            ctx.rect(position.x, position.y, w + 10, 20);
            ctx.fill();
            // Name
            ctx.fillStyle = '#eee';
            ctx.textAlign = 'center';
            ctx.font = '15px';
            ctx.fillText(part.id, position.x + w / 2 + 5, position.y + 15);
            ctx.restore();
        }
        return this;
    },

    get: function(id) {
        return this.parts[id];
    },
};

var SpritePart = function(sprite, pos, width, height) {
    this.sprite = sprite;
    this.position = pos;
    this.width = width;
    this.height = height;
};

SpritePart.prototype = {
    draw: function(ctx, position) {
        this.sprite.drawPart(ctx, this, position);
        return this;
    }
};

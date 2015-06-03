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

            // Id lookup
            var id;
            for(var i in this.parts) {
                if(this.parts[i].position.equals(part.position)) {
                    id = i;
                    break;
                }
            }

            var w = ctx.measureText(id).width;
            ctx
                .beginPath()
                // Text shadow
                .beginPath()
                .rect(position.x, position.y + part.width, w + 10, 20)
                .set('fillStyle', 'rgba(0, 0, 0, 0.4)')
                .fill()
                .set('strokeStyle', '#111')
                .stroke()

                // Name
                .set('fillStyle', '#fff')
                .set('textAlign', 'center')
                .set('font', '15px')
                .fillText(id, position.x + w / 2 + 5, position.y + part.width + 15)
            ;

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

var ContextWrapper = function(ctx) {
    this.ctx = ctx;
};

ContextWrapper.prototype = {
    set: function(name, val) {
        this.ctx[name] = val;
        return this;
    },

    get: function(name) {
        return this.ctx[name];
    },

    circle: function(pos, radius) {
        return this.arc(
            pos.x,
            pos.y,
            radius,
            0, 2 * Math.PI
        );
    },

    square: function(pos, width) {
        return this.rectangle(pos, width, width);
    },

    rectangle: function(pos, width, height) {
        return this.rect(
            pos.x,
            pos.y,
            width,
            height
        );
    },

    roundedSquare: function(pos, width) {
        return this.roundedRect(pos, width, width);
    },

    roundedRect: function(pos, width, height, radius) {
        return this
            // start after top left
            .moveTo(pos.x + radius, pos.y)

            // top right
            .lineTo(pos.x + width - radius, pos.y)
            .arcTo(pos.x + width, pos.y, pos.x + width, pos.y + radius, radius)
            // bottom right
            .lineTo(pos.x + width, pos.y + height - radius)
            .arcTo(pos.x + width, pos.y + height, pos.x + width - radius, pos.y + height, radius)

            // bottom left
            .lineTo(pos.x + radius, pos.y + height)
            .arcTo(pos.x, pos.y + height, pos.x, pos.y + height - radius, radius)

            // top left
            .lineTo(pos.x, pos.y + radius)
            .arcTo(pos.x, pos.y, pos.x + radius, pos.y, radius);
    },

    text: function(pos, text) {
        return this.fillText(
            text,
            pos.x,
            pos.y
        );
    },
};

(function() {
    // Don't clutter global namespace
    var proto = CanvasRenderingContext2D.prototype;
    for(var name in proto) {
        if(typeof proto[name] !== 'function') {
            console.log(name);
            continue;
        }

        ContextWrapper.prototype[name] = (function(name) {
            return function() {
                var ret = proto[name].apply(this.ctx, arguments);
                return ret === undefined ? this : ret;
            };
        })(name); // jshint ignore:line
    }
})();

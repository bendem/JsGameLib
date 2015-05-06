/**
 * An immutable 2D point.
 *
 * @param Number x coordinate
 * @param Number y coordinate
 */
var Point = function(x, y) {
    this.x = x || 0;
    this.y = y || 0;
};

Point.prototype = {
    addX: function(x) {
        return new Point(this.x + x, this.y);
    },

    addY: function(y) {
        return new Point(this.x, this.y + y);
    },

    add: function(vector) {
        return new Point(this.x + vector.x, this.y + vector.y);
    },

    distance: function(point) {
        return Math.sqrt(square(point.x - this.x) + square(point.y - this.y));
    },

    scale: function(factor, factorY) {
        if(factor instanceof Vector) {
            return new Point(this.x * factor.x, this.y * factor.y);
        }
        factorY = factorY || factor;
        return new Point(this.x * factor, this.y * factorY);
    },

    getAngle: function(point) {
        var deltaX = this.x - point.x;
        var deltaY = this.y - point.y;

        return Math.atan2(deltaY, deltaX);
    },

    equals: function(point) {
        if(!point) {
            return false;
        }
        return this.x === point.x && this.y === point.y;
    },

    clone: function() {
        return new Point(this.x, this.y);
    }
};

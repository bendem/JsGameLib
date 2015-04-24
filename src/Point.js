// Point is immutable
var Point = function(x, y) {
    this.x = x;
    this.y = y;
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

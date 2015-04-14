var Box = function(topLeft, width, height) {
    this.topLeft = topLeft;
    this.width = width;
    this.height = height;
};

Box.prototype = {
    getLeftX: function() {
        return this.topLeft.x;
    },
    getRightX: function() {
        return this.topLeft.x + this.width;
    },
    getTopY: function() {
        return this.topLeft.y;
    },
    getBottomY: function() {
        return this.topLeft.y + this.height;
    },

    getTopLeft: function() {
        return new Point(this.getLeftX(), this.getTopY());
    },
    getTopRight: function() {
        return new Point(this.getRightX(), this.getTopY());
    },
    getBottomLeft: function() {
        return new Point(this.getLeftX(), this.getBottomY());
    },
    getBottomRight: function() {
        return new Point(this.getRightX(), this.getBottomY());
    }
};

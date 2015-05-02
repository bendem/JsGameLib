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
    },
    getCenter: function() {
        return new Point(this.topLeft.x + this.width / 2, this.topLeft.y + this.height / 2);
    },

    squaredDistance: function(point) {
        var deltaX = Math.max(
            Math.abs(point.x - (this.topLeft.x + this.width / 2)) - this.width / 2,
            0
        );
        var deltaY = Math.max(
            Math.abs(point.y - (this.topLeft.y + this.height / 2)) - this.height / 2,
            0
        );
        return square(deltaX) + square(deltaY);
    },

    distance: function(point) {
        return Math.sqrt(this.squaredDistance(point));
    },
};

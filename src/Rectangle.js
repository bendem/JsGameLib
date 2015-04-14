var Rectangle = function(topLeft, width, height, attributes, anchor) {
    this.topLeft = topLeft.clone();
    this.width = width;
    this.height = height;
    this.attributes = attributes;
    this.anchor = anchor || Anchor.TopLeft;
};

extend(Rectangle, Entity, {
    draw: function(ctx) {
        ctx.beginPath();
        merge(ctx, this.attributes).rect(
            this.topLeft.x,
            this.topLeft.y,
            this.width,
            this.height
        );
        ctx.fill();
    },

    getBoundingBox: function() {
        return new Box(this.topLeft, this.width, this.height);
    }
});

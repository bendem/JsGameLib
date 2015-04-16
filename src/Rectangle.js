var Rectangle = function(topLeft, width, height, attributes, anchor) {
    Entity.call(this, topLeft, anchor || Anchor.TopLeft);
    this.width = width;
    this.height = height;
    this.attributes = attributes;
};

extend(Rectangle, Entity, {
    draw: function(ctx) {
        ctx.beginPath();
        merge(ctx, this.attributes).rect(
            this.topLeft.x,
            this.topLeft.y,
            this.width,
            this.height
        ).fill();
    },

    getBoundingBox: function() {
        return new Box(this.topLeft, this.width, this.height);
    }
});

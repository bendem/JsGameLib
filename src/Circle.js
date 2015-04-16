var Circle = function(center, radius, attributes, anchor) {
    Entity.call(this, center, anchor || Anchor.TopLeft);
    this.radius = radius;
    this.attributes = attributes;
};

extend(Circle, Entity, {
    draw: function(ctx) {
        ctx.beginPath();
        merge(ctx, this.attributes).arc(
            this.position.x,
            this.position.y,
            this.radius,
            0, 2 * Math.PI
        ).fill();
    },

    getBoundingBox: function() {
        return new Box(
            new Point(this.center.x - this.radius, this.center.y - this.radius),
            this.radius * 2,
            this.radius * 2
        );
    }
});

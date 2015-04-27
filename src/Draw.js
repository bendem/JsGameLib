var Draw = {
    circle: function(ctx, pos, radius) {
        ctx.arc(
            pos.x,
            pos.y,
            radius,
            0, 2 * Math.PI
        );
        return ctx;
    },

    square: function(ctx, pos, width) {
        return Draw.rect(ctx, pos, width, width);
    },

    rect: function(ctx, pos, width, height) {
        ctx.rect(
            this.topLeft.x,
            this.topLeft.y,
            this.width,
            this.height
        );
        return ctx;
    },

    roundedSquare: function(ctx, pos, width) {
        return Draw.roundedRect(ctx, pos, width, width);
    },

    roundedRect: function(ctx, pos, width, height, radius) {
        // start after top left
        ctx.moveTo(pos.x + radius, pos.y);

        // top right
        ctx.lineTo(pos.x + width - radius, pos.y);
        ctx.arcTo(pos.x + width, pos.y, pos.x + width, pos.y + radius, radius);
        // bottom right
        ctx.lineTo(pos.x + width, pos.y + height - radius);
        ctx.arcTo(pos.x + width, pos.y + height, pos.x + width - radius, pos.y + height, radius);

        // bottom left
        ctx.lineTo(pos.x + radius, pos.y + height);
        ctx.arcTo(pos.x, pos.y + height, pos.x, pos.y + height - radius, radius);

        // top left
        ctx.lineTo(pos.x, pos.y + radius);
        ctx.arcTo(pos.x, pos.y, pos.x + radius, pos.y, radius);
    },

    text: function(ctx, pos, text) {
        ctx.fillText(
            this.text,
            this.pos.x,
            this.pos.y
        );
        return ctx;
    },
};

var EntityList = function(game) {
    this.game = game;
    this.entities = [];
};

EntityList.prototype = {
    register: function(entity) {
        this.entities.push(entity);
        return this;
    },

    update: function(name, time) {
        this.entities.forEach(function(entity) {
            entity.update(time, this.entities);
        }, this);
        return this;
    },

    draw: function(name, ctx) {
        ctx.clearRect(0, 0, this.game.width, this.game.height);

        // Draw shadows
        ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
        this.entities.forEach(function(entity) {
            entity.drawShadow(ctx);
        }, this);

        // Draw objects
        ctx.fillStyle = '#999';
        this.entities.forEach(function(entity) {
            ctx.save();
            entity.draw(ctx);
            ctx.restore();
        }, this);
        return this;
    }
};

var EntityList = function(game) {
    this.game = game;
    this.entities = [];
    this.previousTime = 0;
};

EntityList.prototype = {
    register: function(entity) {
        this.entities.push(entity);
        return this;
    },

    update: function(time) {
        if(!this.previousTime) {
            // First frame is used to get the start time
            this.previousTime = time;
            return;
        }

        var delta = time - this.previousTime;
        this.previousTime = time;
        this.entities.forEach(function(entity) {
            entity.update(delta, this.entities);
        }, this);
        return this;
    },

    draw: function(ctx) {
        ctx.clearRect(0, 0, this.game.width, this.game.height);

        if(Game.debug) {
            ctx.save();
            ctx.font = '20px sans-serif';
            var w = ctx.measureText('debug: on').width;
            ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
            ctx.beginPath();
            ctx.rect(this.game.width - w - 20, this.game.height - 30, w + 20, 30);
            ctx.fill();
            ctx.fillStyle = '#eee';
            ctx.textAlign = 'end';
            ctx.fillText('debug: on', this.game.width - 10, this.game.height - 7);
            ctx.restore();
        }

        // Draw objects
        this.entities.forEach(function(entity) {
            ctx.save();
            entity.draw(ctx);
            ctx.restore();
        }, this);
        return this;
    },

    clean: function() {
        this.entities = this.entities.filter(function(entity) {
            return !entity.remove;
        });
    },
};

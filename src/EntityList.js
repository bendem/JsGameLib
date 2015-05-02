var EntityList = function(game) {
    this.game = game;
    this.drawableEntities = [];
    this.updatableEntities = [];
    this.entities = [];
    this.previousTime = 0;
};

EntityList.prototype = {
    register: function(entity) {
        if(typeof entity.update === 'function') {
            this.updatableEntities.push(entity);
        }
        if(typeof entity.draw === 'function') {
            this.drawableEntities.push(entity);
        }
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

        // We update each entity every time 16 ms has passed. That way, in
        // case of delay (i.e. tab hidden causing requestAnimationFrame to
        // delay the animation), the game is updated uniformly instead of
        // having the entities catching up one after another (which could
        // lead to inconsistencies).
        while(delta > 16) {
            delta -= 16;
            this.previousTime += 16;

            this.updatableEntities.forEach(function(entity) {
                entity.update(this.entities);
            }, this);

            // Cleanup each time to make sure we are not updating removed entities
            this.clean();
        }

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
        for(var layer = 0; layer < this.game.layerCount; ++layer) {
            this.drawableEntities.forEach(function(entity) {
                if(entity.layer !== undefined && entity.layer !== layer) {
                    // Don't draw entities with a defined layer if it's not the
                    // right one.
                    return;
                }
                ctx.save();
                entity.draw(ctx, layer);
                ctx.restore();
                // Ignoring jshing warning, the function is evaluated before the end
                // of the loop so it doesn't matter.
            }); // jshint ignore:line
        }
        return this;
    },

    clean: function() {
        // TODO That seems inefficient
        this.entities = this.entities.filter(function(entity) {
            return !entity.remove;
        });
        this.updatableEntities = this.updatableEntities.filter(function(entity) {
            return !entity.remove;
        });
        this.drawableEntities = this.drawableEntities.filter(function(entity) {
            return !entity.remove;
        });
    },
};

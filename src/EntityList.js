var EntityList = function(game) {
    this.game = game;
    this.updatableEntities = [];
    this.entities = [];
    this.previousTime = 0;
};

EntityList.prototype = {
    register: function(entity) {
        if(typeof entity.update === 'function') {
            this.updatableEntities.push(entity);
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

    clean: function() {
        // TODO That seems inefficient
        var remove = function(entity) {
            return !entity.remove;
        };
        this.entities = this.entities.filter(remove);
        this.updatableEntities = this.updatableEntities.filter(remove);
    },
};

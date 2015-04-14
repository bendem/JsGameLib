var Game = function(options) {
    this.options = merge({
        id: 'canvas'
    }, options);

    this.canvas = document.getElementById(this.options.id);
    this.ctx = this.canvas.getContext('2d');

    Game.width = this.canvas.clientWidth;
    Game.height = this.canvas.clientHeight;

    // Make sure the canvas is not distorded
    this.canvas.width = Game.width;
    this.canvas.height = Game.height;

    this.entityList = new EntityList();
    this.eventManager = new EventManager(this);
    this.previousTime = 0;
    this.stopped = false;
    this.started = false;
};

Game.prototype = {

    start: function() {
        if(this.started) {
            return;
        }
        this.started = true;
        this.nextFrame = requestAnimationFrame(function(time) {
            this.run(time);
        });
        return this;
    },

    run: function(time) {
        if(this.previousTime === 0) {
            // First frame only gets the time
            this.previousTime = time;
        } else {
            this.entityList.draw();

            // Execute game logic in a callback so that it does not
            // prevent the animation frame from ending.
            // http://impactjs.com/forums/impact-engine/misuse-of-requestanimationframe
            var self = this;
            setTimeout(function() {
                self.entityList.update(time - self.previousTime);
            }, 0);
        }

        // Loop
        if(!this.stopped) {
            this.nextFrame = requestAnimationFrame(function(time) {
                this.run(time);
            });
        }
    },

    stop: function() {
        this.stopped = true;
        if(this.nextFrame) {
            cancelAnimationFrame(this.nextFrame);
            this.nextFrame = undefined;
        }
        return this;
    },

    isRunning: function() {
        return this.started && !this.stopped;
    },

    register: function(entity, ignoreSizeChanges) {
        this.entityList.register(entity);

        if(!ignoreSizeChanges) {
            this.eventManager.register(
                'width_changed',
                entity.containerWidthChanged,
                this
            );
            this.eventManager.register(
                'height_changed',
                entity.containerHeightChanged,
                this
            );
        }
    }

};

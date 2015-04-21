var Game = function(options) {
    this.options = merge({
        id: 'canvas'
    }, options);

    this.resourceManager = new ResourceManager();
    this.entityList = new EntityList(this);
    this.eventManager = new EventManager(this);

    this.canvas = document.getElementById(this.options.id);
    this.ctx = this.canvas.getContext('2d');

    this.adjustDimensions();

    this.previousTime = 0;
    this.stopped = false;
    this.started = false;
};

Game.debug = false;

Game.prototype = {

    startWithResources: function(resources) {
        if(resources) {
            for (var i = resources.length - 1; i >= 0; i--) {
                this.resourceManager.load(resources[i]);
            }
        }
        this.resourceManager.ready(this.start, this);
    },

    start: function() {
        if(this.started) {
            return;
        }
        this.started = true;
        var self = this;
        this.nextFrame = requestAnimationFrame(function(time) {
            self.run(time);
        });
        return this;
    },

    run: function(time) {
        var self = this;
        if(this.previousTime === 0) {
            // First frame only gets the time
            this.previousTime = time;
        } else {
            this.entityList.draw(this.ctx);

            // Execute game logic in a callback so that it does not
            // prevent the animation frame from ending.
            // http://impactjs.com/forums/impact-engine/misuse-of-requestanimationframe
            setTimeout(function() {
                self.entityList.update(time - self.previousTime);
            }, 0);
        }

        // Loop
        if(!this.stopped) {
            this.nextFrame = requestAnimationFrame(function(time) {
                self.run(time);
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
        return this;
    },

    /**
     * Adjusts the size of the game to the size of the canvas.
     */
    adjustDimensions: function() {
        return this
            .setWidth(this.canvas.clientWidth)
            .setHeight(this.canvas.clientHeight);
    },

    /**
     * Sets the dimensions of the game.
     *
     * @param Vector
     */
    setDimensions: function(vec) {
        return this
            .setWidth(vec.x)
            .setHeight(vec.y)
            ;
    },

    setWidth: function(w) {
        this.eventManager.handleEvent('width_changed', w);
        this.canvas.width = this.width = w;
        return this;
    },

    setHeight: function(h) {
        this.eventManager.handleEvent('heigth_changed', h);
        this.canvas.height = this.height = h;
        return this;
    },

};

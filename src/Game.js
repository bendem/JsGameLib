var Game = function(options) {
    this.options = Utils.merge({
        id: 'canvas'
    }, options);

    this.canvas = document.getElementById(this.options.id);
    this.ctx = new ContextWrapper(this.canvas.getContext('2d'));

    this.resourceManager = new ResourceManager();
    this.entityList = new EntityList(this);
    this.renderer = new Renderer(this, this.entityList);
    this.eventManager = new EventManager(this);

    this.input = new Input(this);

    this.adjustDimensions();

    this.previousTime = 0;
    this.stopped = false;
    this.started = false;
};

Game.debug = false;

Game.prototype = {

    startWithResources: function(resources) {
        if(resources) {
            for(var i = resources.length - 1; i >= 0; i--) {
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
            this.renderer.render(this.ctx);

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

    register: function(entity) {
        if(entity.forEach) {
            entity.forEach(function(e) {
                this.register(e);
            }, this);
            return this;
        }

        this.entityList.register(entity);
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

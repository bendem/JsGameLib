var EventManager = function(game) {
    this.handlers = {};
    this.game = game;

    var self = this;
    window.addEventListener('resize', function() {
        self.handleResize();
    });
    window.addEventListener('deviceorientation', function() {
        self.handleResize();
    });
};

EventManager.prototype = {
    register: function(name, handler, obj, native) {
        // Registering a handler for multiple events at once
        if(name.forEach !== undefined) {
            name.forEach(function(name) {
                this.register(name, handler, obj, native);
            }, this);
            return;
        }

        var thing = {
            handler: handler,
            object: obj
        };

        if(!this.handlers.hasOwnProperty(name)) {
            // If not handled already, register the handler
            // and create the list.
            if(native) {
                var self = this;
                this.game.canvas.addEventListener(name, function(e) {
                    self.handleEvent(name, e);
                });
            }
            this.handlers[name] = [thing];
        } else {
            // Else, just add it to the list
            this.handlers[name].push(thing);
        }
        return this;
    },

    handleEvent: function(name, arg) {
        if(!this.handlers.hasOwnProperty(name)) {
            return;
        }
        this.handlers[name].forEach(function(h) {
            h.handler.call(h.object, name, arg);
        });
    },

    handleResize: function() {
        var w = this.game.canvas.clientWidth;
        var h = this.game.canvas.clientHeight;
        if(w !== this.game.width) {
            this.handleEvent('width_changed', w);
            this.game.canvas.width = this.game.width = w;
        }
        if(h !== this.game.height) {
            this.handleEvent('height_changed', h);
            this.game.canvas.height = this.game.height = h;
        }
    }
};



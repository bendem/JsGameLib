var EventManager = function(game) {
    this.handlers = {};
    this.game = game;

    var self = this;
    this.register(['resize', 'deviceorientation'], function() {
        self.game.adjustDimensions();
    }, null, window);
};

EventManager.prototype = {

    /**
     * Registers an event handler.
     *
     * @param  String   The event name or an iterable object containing event names
     * @param  Function The function to execute when the event happens
     * @param  Object   The object to provide as this to the function
     * @param  Object   If the event to listen to is a native event, provide a target to
     *                  register the handler on (optional).
     * @return EventManager
     */
    register: function(name, handler, obj, native) {
        // Registering a handler for multiple events at once
        if(name.forEach !== undefined) {
            name.forEach(function(name) {
                this.register(name, handler, obj, native);
            }, this);
            return this;
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
                native.addEventListener(name, function(e) {
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

    /**
     * Dispatches an event to the registered listeners.
     *
     * @param String Name of the event
     * @param Object Argument to pass to the listeners
     */
    handleEvent: function(name, arg) {
        if(!this.handlers.hasOwnProperty(name)) {
            return;
        }
        this.handlers[name].forEach(function(h) {
            h.handler.call(h.object, name, arg);
        });
    },
};

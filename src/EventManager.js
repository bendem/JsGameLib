var EventManager = function(game) {
    this.handlers = {};
    this.game = game;
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

        // Register native events with a different name
        var actualName = (native ? 'native-' : '') + name;

        if(!this.handlers.hasOwnProperty(actualName)) {
            // If not handled already, register the handler
            // and create the list.
            if(native) {
                var self = this;
                native.addEventListener(name, function(e) {
                    self.handleEvent(actualName, e);
                });
            }
            this.handlers[actualName] = [thing];
        } else {
            // Else, just add it to the list
            this.handlers[actualName].push(thing);
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

        var h, cancelled = false;
        for(h of this.handlers[name]) {
            cancelled |= h.handler.call(h.object, name, arg);
        }

        if(cancelled && name.startsWith('native-')) {
            arg.preventDefault();
        }
        return cancelled;
    },
};

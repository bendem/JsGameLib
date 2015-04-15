var ResourceManager = function() {
    this.loading = [];
    this.loaded = [];
    this.done = false;
    this.callback = null;
};

ResourceManager.prototype = {
    load: function(resourcePath) {
        if(this.done) {
            // TODO Error
            return;
        }
        if(this.loaded.indexOf(resourcePath) !== -1
                || this.loading.indexOf(resourcePath) !== -1) {
            // Already loaded
            return;
        }

        // Save the insertion index
        var index = this.loading.length;
        this.loading.push(resourcePath);
        var img = new Image();
        var self = this;
        img.onload = function() {
            // Move loaded img from loading to loaded
            self.loaded.push(resourcePath);
            self.loading.splice(index, 1);

            // If nothing is loading and a callback is provided, let's call it
            if(self.loading.length === 0 && self.callback !== null) {
                self.callback.func.call(self.callback.obj);
            }
        };
        img.src = resourcePath;
    },

    ready: function(func, obj) {
        if(this.loading.length === 0) {
            // Loading is done already
            func.call(obj);
        } else {
            // Save callback for later
            this.callback = {
                func: func,
                obj: obj,
            };
        }

    }
};

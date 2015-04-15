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
        var img = new Image();
        this.loading.push({
            path: resourcePath,
            img: img
        });
        var self = this;
        img.onload = function() {
            // Move loaded img from loading to loaded
            self.loaded.push(self.loading.splice(index, 1)[0]);

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
    },

    get: function(resourcePath) {
        var res = search(this.loaded, 'path', resourcePath);
        if(res) {
            return res.img;
        }
        return null;
    }

};

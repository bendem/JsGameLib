var Renderer = function(game, entityList) {
    this.game = game;
    this.entityList = entityList;
    this.functions = {};
    this.skipErrors = false;
};

Renderer.prototype = {

    register: function(name, draw, obj) {
        this.functions[name] = {
            draw: draw,
            object: obj,
        };
        return this;
    },

    render: function(ctx) {
        ctx.clearRect(0, 0, this.game.width, this.game.height);

        var info = this.entityList.entities.filter(function(e) {
            // Check we the entity can be drawn
            return typeof e.drawInfo === 'function';
        }).map(function(e) {
            // Get drawing informations
            return e.drawInfo();
        }).filter(function(info) {
            // Ignore if nothing got returned
            return info;
        }).map(function(info) {
            // Wrap in an array if it's not one
            if(!(info instanceof Array)) {
                return [info];
            }
            return info;
        }).reduce(function(prev, cur) {
            // Flatten the results
            return prev.concat(cur);
        }, []);

        // Sort by layer and draw
        this.sort(info).forEach(function(info) {
            ctx.save();
            var drawer = this.functions[info.name];
            if(!drawer) {
                if(!this.skipErrors) {
                    console.warn('No drawing informations for ', info.name);
                }
                return;
            }
            drawer.draw.call(drawer.object, ctx, info);
            ctx.restore();
        }, this);

        this.debugInfo(ctx);
        this.skipErrors = true;

        return this;
    },

    debugInfo: function(ctx) {
        if(!Game.debug) {
            return;
        }
        ctx.save();

        var w = ctx
            .set('font', '20px sans-serif')
            .measureText('debug: on')
            .width;

        ctx
            .beginPath()
            .rect(this.game.width - w - 20, this.game.height - 30, w + 20, 30)
            .set('fillStyle', 'rgba(0, 0, 0, 0.4)')
            .fill()
            .stroke()

            .set('textAlign', 'end')
            .set('fillStyle', '#ddd')
            .fillText('debug: on', this.game.width - 10, this.game.height - 7)
        ;

        ctx.restore();
    },

    sort: function(drawInfo) {
        return drawInfo.sort(function(a, b) {
            if(a.layer < b.layer) {
                return -1;
            }
            if(a.layer > b.layer) {
                return 1;
            }
            return 0;
        });
    },

};

// TODO Make all stuff chainable, use setters, add circle
var CanvasWrapper = function(ctx) {
    this.ctx = ctx;
};

for(var funcName in CanvasRenderingContext2D.prototype) {
    if(CanvasRenderingContext2D.prototype[funcName] instanceof Function) {
        CanvasWrapper.prototype[funcName] = function() {
            var ret = this.ctx.apply(this.ctx, arguments);
            if(ret === undefined) {
                return this;
            }
            return ret;
        };
    }
}

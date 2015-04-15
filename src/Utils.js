/**
 * Prototypal inheritance: Modifies the prototype of the child
 * object to chain the parent object and adds the provided properties
 * to the new prototype.
 *
 * @param  Function The child object
 * @param  Function The parent object
 * @param  Object   The new prototype of the child object
 */
var extend = function(clazz, parent, props) {
    clazz.prototype = Object.create(parent.prototype);
    for(var prop in props) {
        clazz.prototype[prop] = props[prop];
    }
};

/**
 * Merges two objects, setting all values contained into the second
 * object in the first object.
 *
 * @param  Object The object to override
 * @param  Object The object containing the values to add
 * @return Object The object overriden
 */
var merge = function(obj1, obj2) {
    obj1 = obj1 || {};
    for(var name in obj2){
        obj1[name] = obj2[name];
    }
    return obj1;
};

/**
 * Checks wether a number is between to other numbers.
 *
 * @param  Number  The number to check
 * @param  Number  One of the bounds
 * @param  Number  The other bound
 * @return Boolean
 */
var isBetween = function(x, x1, x2) {
    var xMin = Math.min(x1, x2);
    var xMax = Math.max(x1, x2);
    return x > xMin && x < xMax;
};

/**
 * Do I need to explain random
 * @param  Number Min bound
 * @param  Number Max bound
 * @return Number The random
 */
var random = function(min, max) {
    return Math.random() * (max - min) + min;
};

/**
 * Y u read this?
 */
var emptyFunction = function() {};

/**
 * A function that will throw an error about
 * unimplemented thing.
 */
var unimplementedError = function() {
    throw Error('unimplemented method');
};

/**
 * Return the sign of number.
 *
 * @param  Number The number you need the sign of
 * @return Number -1, 0 or 1
 */
var sign = function(x) {
    return (0 < x) - (x < 0);
};

var square = function(x) {
    return x * x;
};

var linePath = function(ctx, start, end) {
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
};

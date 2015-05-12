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
 * Checks wether a number is (exclusively) between to other numbers.
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

var isBetweenInclusive = function(x, x1, x2) {
    var xMin = Math.min(x1, x2);
    var xMax = Math.max(x1, x2);
    return x >= xMin && x <= xMax;
};

var isOneOf = function() {
    if(arguments.length < 2) {
        return false;
    }
    var e = arguments[0];
    for(var i = 1; i < arguments.length; i++) {
        if(e === arguments[i]) {
            return true;
        }
    }
    return false;
};

/**
 * Do I need to explain random?
 *
 * @param  Number Minimum bound
 * @param  Number Maximim bound
 * @return Number The random number generated
 */
var random = function(min, max) {
    return Math.random() * (max - min) + min;
};

var randomInt = function(min, max) {
    return Math.floor(random(min, max));
};

/**
 * Y u read this?
 */
var emptyFunction = function() {};

/**
 * Returns the sign of a number.
 *
 * @param  Number The number you need the sign of
 * @return Number -1, 0 or 1
 */
var sign = function(x) {
    return (0 < x) - (x < 0);
};

/**
 * Returns the square of the passed number.
 *
 * @param  Number The number to square
 * @return Number The squared number
 */
var square = function(x) {
    return x * x;
};

var assert = function(assertion) {
    if(!assertion) {
        throw new Error('Assertion failed');
    }
};

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
 * Searches an array of objects for an object having the provided
 * value for the provided property name.
 *
 * @param  Array  The array to search in
 * @param  String The name of the property to check
 * @param  Object The value of that property
 * @return Object The object found or null if not found
 */
var search = function(array, prop, value) {
    for (var i = array.length - 1; i >= 0; i--) {
        if(array[i][prop] === value) {
            return array[i];
        }
    }
    return null;
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
 * Do I need to explain random?
 *
 * @param  Number Minimum bound
 * @param  Number Maximim bound
 * @return Number The random number generated
 */
var random = function(min, max) {
    return Math.random() * (max - min) + min;
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

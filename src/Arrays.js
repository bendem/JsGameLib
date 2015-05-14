var Arrays = {

    /**
     * Generates an array of specified length filled with the provided content.
     *
     * @param  Object The content to fill the new array with
     * @param  Number The number of element the created array will contain
     * @return Array
     */
    of: function(content, count) {
        return Array.apply(null, {
            length: count
        }).map(function() {
            return content;
        });
    },

    /**
     * Chooses a random value in an array.
     *
     * @param  Array  The array to choose a value in
     * @return Object The chosen value
     */
    choose: function(arr) {
        return arr[Utils.randomInt(0, arr.length)];
    },

    /**
     * Gets a value at a specified index in an array or the default if
     * it doesn't exist.
     *
     * @param  Array  The array to look in
     * @param  Number The index to look at
     * @param  Object The value to return in case it's missing
     * @return Object
     */
    get: function(arr, i, def) {
        if(arr[i] !== undefined) {
            return arr[i];
        }
        return def;
    },

    /**
     * Searches an array of objects for an object having the provided
     * value for the provided property name.
     *
     * @param  Array  The array to search in
     * @param  String The name of the property to check
     * @param  Object The value of that property
     * @return Object The object found or null if not found
     */
    search: function(arr, prop, value) {
        for(var i = arr.length - 1; i >= 0; i--) {
            if(arr[i][prop] === value) {
                return arr[i];
            }
        }
        return null;
    },

    /**
     * Returns a value in the array, if an element in the array
     * satisfies the provided testing function. Otherwise undefined
     * is returned.
     *
     * @param  Array    The array to search in
     * @param  Function A function to test each element of the array with
     * @return Object|undefined
     */
    first: function(arr, test) {
        for(var i = 0; i < arr.length; i++) {
            if(test(arr[i], i, arr)) {
                return arr[i];
            }
        }
    },

    /**
     * Removes all instances of an element from an array.
     *
     * @param  Array The array
     * @param  Object The element to remove
     * @return Array
     */
    remove: function(arr, elem) {
        var index;
        while((index = arr.indexOf(elem)) > -1) {
            arr.splice(index, 1);
        }
        return arr;
    },

};

var Arrays2D = {

    /**
     * Generates a 2D array filled with the provided content.
     *
     * @param  Number The number of columns
     * @param  Number The number of lines
     * @param  Object The content of the array
     * @return Array
     */
    of: function(cols, lines, content) {
        var res = [];
        for(var i = 0; i < cols; ++i) {
            res.push(Arrays.of(content, lines));
        }
        return res;
    },

    /**
     * Gets an element from an array.
     *
     * @param  Array The array
     * @param  Point The coordinates
     * @return Object
     */
    get: function(arr, point) {
        return arr[point.x][point.y];
    },

    set: function(arr, point, value) {
        arr[point.x][point.y] = value;
        return arr;
    },

    /**
     * Logs a 2D representation of the provided array for debugging purposes.
     *
     * @param  Array The array to display
     */
    debug: function(arr) {
        var res = '';
        for(var i = 0; i < arr[0].length; i++) {
            for(var j = 0; j < arr.length; j++) {
                res += arr[j][i] + ' ';
            }
            res += '\n';
        }
        console.log(res);
    },
};

/**
 * @license Copyright (c) 2011 Brian Cavalier
 * LICENSE: see the LICENSE.txt file. If file is missing, this file is subject
 * to the MIT License at: http://www.opensource.org/licenses/mit-license.php.
 */

/**
 * apply.ja
 * Helper for using arguments-based and variadic callbacks with any
 * {@link Promise} that resolves to an array.
 *
 * @author brian@hovercraftstudios.com
 */

(function(define) {
define(function() {

    var toString = Object.prototype.toString;
    
    /**
     * Creates a function that accepts a function that takes individual
     * arguments (it can be variadic, too), and returns a new function that
     * takes a single array as its only param:
     *
     * function argBased(a, b, c) {
     *   return a + b + c;
     * }
     *
     * argBased(1, 2, 3); // 6
     *
     * // Create an array-based version of argBased
     * var arrayBased = apply(argBased);
     * var inputs = [1, 2, 3];
     *
     * arrayBased(inputs); // 6
     *
     * With promises:
     *
     * var d = when.defer();
     * d.promise.then(arrayBased);
     *
     * d.resolve([1, 2, 3]); // arrayBased called with args 1, 2, 3 -> 6
     *
     * @param f {Function} arguments-based function
     *
     * @returns {Function} a new function that accepts an array
     */
    return function(f) {
        /**
         * @param array {Array} must be an array of arguments to use to apply the original function
         *
         * @returns the result of applying f with the arguments in array.
         */
        return function(array) {
            // It better be an array
            if(toString.call(array) != '[object Array]') throw new Error('apply called with non-array arg');

            return f.apply(null, array);
        }
    };

});
})(typeof define == 'function'
    ? define
    : function (factory) { typeof module != 'undefined'
        ? (module.exports  = factory())
        : (this.when_apply = factory());
    }
    // Boilerplate for AMD, Node, and browser global
);



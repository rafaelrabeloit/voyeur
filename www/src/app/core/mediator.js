(function (root) {
    "use strict";

    // Declares local variables
    var calls = {},
        mediator = {
            /*
             * @function on
             * @description Subscribes to a call
             * @param {string} method Name of the method to subscribe
             * @param {function} callback Funciton to call when we fire the event
             * @param {object} scope Context to which to bind the callback
             */
            on: function (method, callback, scope) {

                // if the method is not yet created, initializes an array
                if (!calls[method]) {
                    calls[method] = [];
                }

                // adds the listener
                calls[method].push({
                    callback: callback,
                    scope: scope
                });
            },

            /*
             * @function un
             * @description Unsuscribes from a call
             * @param {string} method Name of the method to subscribe
             * @param {function} callback Funciton to call when we fire the event
             * @param {object} scope Context to which to bind the callback
             */
            un: function (method, callback) {

                // Declares the local vars
                var m = calls[method],
                    i,
                    l;

                // if the method has listeners
                if (m) {

                    // Quries the listeners to try to find a callback
                    l = m.length;
                    for (i = l - 1; i >= 0; i--) {

                        // if found it is removed from the array 
                        if (m[i].callback === callback) {
                            m.splice(i, 1);
                        }
                    }
                }
            },

            /*
             * @function fire
             * @description Fires a method call with a series or agruments
             * @param {string} method Name of the method to fire
             * @param {array} args Arguments to attach to the event
             */
            fire: function (method, args) {

                var m = calls[method],
                    i,
                    l;

                // Searches the method and then calls all the listeners
                if (m) {
                    l = m.length;
                    for (i = 0; i < l; i++) {
                        m[i].callback.apply(m[i].scope || null, args || []);
                    }
                }
            }
        };

    // Sets the mediator object on the app namespace
    /* istanbul ignore next */
    root.app = root.app || {};
    root.app.mediator = mediator;

}(window));
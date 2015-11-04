/*global window: false, app: false, Backbone: false, JST: false, $: false, root: false */

/** 
 * @name init.js
 * @author Rafael Rabelo Itajuba
 * @description
 * Bootstraps the application
 */

(function (root) {
    "use strict";

    // Initializer for DI in test env
    root.app.initializer = {
        cache: function () {
            /*
            var img;

            root.app.image_cache = [];

            img = new Image();
            img.src = "img/background.png";
            root.app.image_cache.push(img);
            */
        },

        data: function () {
            return;
        },

        system: function () {

            // Creates the Footer and header views
            root.app.view.header = new app.view.Header({
                el: '.bar'
            });

            root.app.view.footer = new app.view.Footer({
                el: '.footer'
            });

            // creates the slider helper
            root.app.slider = new app.view.Slider({
                el: '.wrap'
            });

            // Creates the application router instance 
            root.app.router = new app.Router();

            // Starts the backbone app
            Backbone.history.start();
        }
    };

    // Check if it is has a tests namespace
    /* istanbul ignore if */
    if (!root.tests) {
        // on the DOM Load starts the applciation router 
        $(function () {
            root.app.initializer.cache();
            root.app.initializer.data();
            root.app.initializer.system();
        });
    }

}(window));
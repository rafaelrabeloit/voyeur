/*global window: false, app: false, Backbone: false, JST: false, $: false, require: false, _: false*/

(function (root) {
    "use strict";

    root.app = root.app || {};
    root.app.view = {};
    root.app.mod = {};

    // Creates the application main object 
    var app = root.app;

    app.dispatcher = _.extend({}, Backbone.Events);
    
    // Creates the router instance 
    app.Router = Backbone.Router.extend({

        // Defines the main routes of the app
        // We have two fiwed routes,the home / route and the /about route
        // And then a dynamic route, which loads modules dynamically (based on a namespace)
        routes: {
            '': 'main',
            '*actions': 'goToPage'
        },

        // Loads the home page route
        main: function () {
            app.slider.show(new app.mod.home.View());
        },

        goToPage: function (id) {
            // if the id is the menu
            var mod = app.mod[id];

            // if rhe view exists, it shows it
            if (mod) {
                app.slider.show(new mod.View());
            } else { // if not, it notifies the user that the module does not exists
                app.mediator.fire('modal', [' The module "' + id + '" does not exists']);
            }
        }
    });

}(window));
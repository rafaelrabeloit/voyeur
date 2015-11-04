/*global app: false, Backbone: false, JST: false, $: false, require: false */

(function () {
    "use strict";

    // if the module does not exist
    app.mod.home = app.mod.home || {};

    // Creates the Home view
    app.mod.home.View = Backbone.View.extend({

        // page class name 
        className: 'home page',

        // Custom events
        events: {
            'click': 'onBack'
        },

        // Custom events hadlers
        onBack: function () {
            return;
        },

        // Method fired when the view is initialized
        initialize: function () {
            app.mediator.fire('viewchangeheader', ['KEY_HOME_TTL', false]);

            /* configure footer buttons */
            app.mediator.fire('viewchangefooter', [false]);
        },

        // function that renders the view
        render: function () {
            this.$el.html(JST["src/app/templates/home.tpl"]({
                message: app.strings.labelList.KEY_HOME_MESSAGE
            }));
            return this.$el[0];
        },

        // function fired when the DOM is rendered
        load: function () {
            return;
        },

        // Function called when the view is destroyed
        destroy: function () {
            return;
        }
    });

}());
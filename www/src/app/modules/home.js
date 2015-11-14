/*global app: false, Backbone: false, JST: false, $: false, require: false */

(function (root) {
    "use strict";

    // if the module does not exist
    root.app.mod.home = root.app.mod.home || {};

    // Creates the Home view
    root.app.mod.home.View = Backbone.View.extend({

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
        },

        // Function called when the view is destroyed
        destroy: function () {
            return;
        }
    });

}(window));
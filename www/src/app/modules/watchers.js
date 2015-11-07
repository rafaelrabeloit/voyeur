/*global app: false, Backbone: false, JST: false, $: false, require: false */

(function () {
    "use strict";

    // if the module does not exist
    app.mod.watchers = app.mod.watchers || {};

    // Creates the Home view
    app.mod.watchers.View = Backbone.View.extend({

        // page class name 
        className: 'watchers page',

        template: function () {
            return JST["src/app/templates/watchers.tpl"]();
        },
        
        // function that renders the view
        render: function () {
            this.$el.html(this.template());
            return this.$el[0];
        }
    });

}());
/*global app: false, Backbone: false, JST: false, $: false, require: false */

(function () {
    "use strict";

    // if the module does not exist
    app.mod.values = app.mod.values || {};

    // Creates the Home view
    app.mod.home.View = Backbone.View.extend({

        // page class name 
        className: 'values page',

        template: function () {
            return JST["src/app/templates/values.tpl"]();
        },
        
        initialize: function () {
            var watcher = localStorage.getItem("app.config.selectedWatcher");
        },
        
        // function that renders the view
        render: function () {
            this.$el.html(this.template());
            return this.$el[0];
        }
    });

}());
/*global app: false, Backbone: false, JST: false, $: false, require: false */

(function (root) {
    "use strict";

    // if the module does not exist
    app.mod.values = app.mod.values || {};

    // Creates the values view
    app.mod.values.View = Backbone.Epoxy.View.extend({

        // data binding 
        itemView: app.mod.value.View,
        collection: new root.app.collection.Values(),

        // page class name 
        className: 'values page',

        initialize: function () {
            var _this = this;
            
            this.collection.watcher = localStorage.getItem("app.config.selectedWatcher");
            this.collection.fetch({
                success: function (models, response) {
                    //TODO: Loading...
                }
            });
        },
        
        template: function (data) {
            return JST["src/app/templates/values.tpl"](data);
        },
        
        // function that renders the view
        render: function () {
            this.$el.html(this.template());
            this.applyBindings();
            return this.$el[0];
        },

        // Function called when the view is destroyed
        destroy: function () {
            return;
        }
    });

}(window));
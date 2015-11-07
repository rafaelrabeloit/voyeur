/*global app: false, Backbone: false, JST: false, $: false, require: false */

(function (root) {
    "use strict";

    // if the module does not exist
    root.app.view.watcher = root.app.view.watcher || {};
    root.app.view.watcher.list = root.app.view.watcher.list || {};

    // Creates the watchers view
    root.app.view.watcher.list.View = Backbone.Epoxy.View.extend({

        // data binding 
        itemView: root.app.view.watcher.view.View,
        collection: new root.app.collection.Watchers(),

        // Method fired when the view is initialized
        initialize: function () {
            // register on add for Watcher
            root.app.dispatcher.on('add:watcher', this.refresh, this);
        },

        template: function (data) {
            return JST["src/app/templates/watchers/list.tpl"](data);
        },
        
        // function that renders the view
        render: function () {
            this.$el.html(this.template());
            this.applyBindings();
            
            this.refresh();
            
            return this.$el[0];
        },

        refresh: function () {
            this.collection.fetch({
                reset: true,
                success: function (models) {
                    //TODO: loading end             
                }
            });
        },
        
        // Function called when the view is destroyed
        destroy: function () {
            root.app.dispatcher.off('add:watcher', this.refresh, this);
        }
    });

}(window));
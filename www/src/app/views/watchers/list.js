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

        // Custom events
        events: {
            'click #new-watcher': 'onNew'
        },

        // Method fired when the view is initialized
        initialize: function () {
            var _this = this;
            
            this.collection.fetch({
                success: function (models, response) {
                    //TODO: Loading...
                }
            });
        },

        template: function (data) {
            return JST["src/app/templates/watchers/list.tpl"](data);
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
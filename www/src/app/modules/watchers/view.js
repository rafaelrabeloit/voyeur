/*global app: false, Backbone: false, JST: false, $: false, require: false */

(function (root) {
    "use strict";

    // if the module does not exist
    app.mod.watchers = app.mod.watchers || {};

    // Creates the watchers view
    app.mod.watchers.View = Backbone.Epoxy.View.extend({

        // data binding 
        itemView: app.mod.watcher.View,
        collection: new root.app.collection.Watchers(),

        // page class name 
        className: 'watchers page',
        
        // Custom events
        events: {
            'click #new-watcher': 'onNew'
        },

        // Custom events hadlers
        onNew: function () {
            var watcher = new root.app.model.Watcher({
                recurrence: $("#recurrence", this.$el).val(),
                target: $("#target", this.$el).val(),
                selector: $("#selector", this.$el).val(),
                name: $("#name", this.$el).val(),
                enabled: true
            });
            watcher.save();
            
            this.collection.add(watcher);
            
            return;
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
            return JST["src/app/templates/watchers.tpl"](data);
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
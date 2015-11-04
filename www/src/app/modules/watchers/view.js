/*global app: false, Backbone: false, JST: false, $: false, require: false */

(function (root) {
    "use strict";

    // if the module does not exist
    app.mod.watchers = app.mod.watchers || {};

    // Creates the watchers view
    app.mod.watchers.View = Backbone.View.extend({

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
                enabled: true
            });
            watcher.save();
            
            var view = new root.app.mod.watcher.View({model: watcher});
            $("#watchers-list", this.$el).append(view.render());
            return;
        },

        // Method fired when the view is initialized
        initialize: function () {},

        template: function (data) {
            return JST["src/app/templates/watchers.tpl"]({
                model: data
            });
        },
        
        // function that renders the view
        render: function () {
            this.$el.html(this.template(this.model));
            return this.$el[0];
        },

        // function fired when the DOM is rendered
        load: function () {

            var watchers = new root.app.collection.Watchers();
            var _this = this;
            
            watchers.fetch({
                success: function (models, response) {
                    models.each(function (model, index) {
                        var view = new root.app.mod.watcher.View({model: model});
                        $("#watchers-list", _this.$el).append(view.render());
                    });
                }
            });

            return;
        },

        // Function called when the view is destroyed
        destroy: function () {
            return;
        }
    });

}(window));
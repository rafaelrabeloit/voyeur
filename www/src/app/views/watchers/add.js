/*global app: false, Backbone: false, JST: false, $: false, require: false */

(function (root) {
    "use strict";

    // if the module does not exist
    root.app.view.watcher = root.app.view.watcher || {};
    root.app.view.watcher.add = root.app.view.watcher.add || {};

    // Creates the watchers view
    root.app.view.watcher.add.View = Backbone.Epoxy.View.extend({
        
        model: new root.app.model.Watcher(),
        
        el: function () {
            return this.template(this.model.attributes);
        },

        // Custom events
        events: {
            'click #new-watcher': 'onNew'
        },

        // Custom events hadlers
        onNew: function () {
            this.model.set({
                recurrence: $("#recurrence", this.$el).val(),
                target: $("#target", this.$el).val(),
                selector: $("#selector", this.$el).val(),
                name: $("#name", this.$el).val(),
                enabled: true
            });
            this.model.save([], {
                success: function (model, response, options) {
                    root.app.dispatcher.trigger('add:watcher');
                }
            });
        },

        template: function (data) {
            return JST["src/app/templates/watchers/add.tpl"](data);
        },
        
        // function that renders the view
        render: function () {
            this.$el.html(this.template(this.model.attributes));
            return this.$el[0];
        }
    });

}(window));
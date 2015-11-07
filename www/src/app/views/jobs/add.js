/*global app: false, Backbone: false, JST: false, $: false, require: false */

(function (root) {
    "use strict";

    // if the module does not exist
    root.app.view.job = root.app.view.job || {};
    root.app.view.job.add = root.app.view.job.add || {};

    // Creates the job view
    root.app.view.job.add.View = Backbone.Epoxy.View.extend({
        
        model: new root.app.model.Job({status: "FREE"}),
        
        el: function () {
            return this.template(this.model.attributes);
        },
        
        // Custom events
        events: {
            'click .add-job': 'onAdd'
        },

        // Custom events hadlers
        onAdd: function () {
            this.model.save([], {
                success: function (model, response, options) {
                    root.app.dispatcher.trigger('add:job');
                }
            });
        },

        template: function (data) {
            return JST["src/app/templates/jobs/add.tpl"](data);
        },
        
        // function that renders the view
        render: function () {
            this.$el.html(this.template(this.model.attributes));
            return this.$el[0];
        }
    });

}(window));
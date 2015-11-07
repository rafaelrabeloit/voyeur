/*global app: false, Backbone: false, JST: false, $: false, require: false */

(function (root) {
    "use strict";

    // if the module does not exist
    root.app.view.job = root.app.view.job || {};
    root.app.view.job.view = root.app.view.job.view || {};

    // Creates the job view
    root.app.view.job.view.View = Backbone.Epoxy.View.extend({
        el: function () {
            return this.template(this.model.attributes);
        },
        
        // Custom events
        events: {
            'click .delete-job': 'onDelete'
        },

        // Custom events hadlers
        onDelete: function () {
            this.model.destroy();
        },

        template: function (data) {
            return JST["src/app/templates/jobs/view.tpl"](data);
        },
        
        // function that renders the view
        render: function () {
            this.$el.html(this.template(this.model.attributes));
            return this.$el[0];
        }
    });

}(window));
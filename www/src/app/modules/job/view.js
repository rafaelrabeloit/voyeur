/*global app: false, Backbone: false, JST: false, $: false, require: false */

(function (root) {
    "use strict";

    // if the module does not exist
    app.mod.job = app.mod.job || {};

    // Creates the job view
    app.mod.job.View = Backbone.Epoxy.View.extend({
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
            return JST["src/app/templates/job.tpl"](data);
        },
        
        // function that renders the view
        render: function () {
            this.$el.html(this.template(this.model.attributes));
            return this.$el[0];
        },

        // function fired when the DOM is rendered
        load: function () {
            return;
        },

        // Function called when the view is destroyed
        destroy: function () {
            return;
        }
    });

}(window));
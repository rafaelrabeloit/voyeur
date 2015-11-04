/*global app: false, Backbone: false, JST: false, $: false, require: false */

(function (root) {
    "use strict";

    // if the module does not exist
    app.mod.job = app.mod.job || {};

    // Creates the job view
    app.mod.job.View = Backbone.View.extend({
        // tag
        tagName: 'li',

        // page class name 
        className: 'job',

        // Custom events
        events: {
            'click .del-job': 'onDelete'
        },

        // Custom events hadlers
        onDelete: function () {
            this.model.destroy();
            this.remove();
            return;
        },

        // Method fired when the view is initialized
        initialize: function () {},

        template: function (data) {
            return JST["src/app/templates/job.tpl"]({
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
            return;
        },

        // Function called when the view is destroyed
        destroy: function () {
            return;
        }
    });

}(window));
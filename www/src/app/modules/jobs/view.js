/*global app: false, Backbone: false, JST: false, $: false, require: false */

(function (root) {
    "use strict";

    // if the module does not exist
    app.mod.jobs = app.mod.jobs || {};

    // Creates the jobs view
    app.mod.jobs.View = Backbone.Epoxy.View.extend({
        
        // data binding 
        itemView: app.mod.job.View,
        collection: new root.app.collection.Jobs(),
        
        // page class name 
        className: 'jobs page',

        // Custom events
        events: {
            'click #new-job': 'onNew'
        },

        // Custom events hadlers
        onNew: function () {
            var job = new root.app.model.Job({status: "FREE"});
            job.save();
        },

        // Method fired when the view is initialized
        initialize: function () {
            var _this = this;
            this.collection.fetch({
                success: function (models, response) {
                    //TODO: loading end
                }
            });
        },

        template: function (data) {
            return JST["src/app/templates/jobs.tpl"](data);
        },
        
        // function that renders the view
        render: function () {
            this.$el.html(this.template());
            this.applyBindings();
            return this.$el[0];
        },

        // function fired when the DOM is rendered
        load: function () {
        },

        // Function called when the view is destroyed
        destroy: function () {
            return;
        }
    });

}(window));
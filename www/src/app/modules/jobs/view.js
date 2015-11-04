/*global app: false, Backbone: false, JST: false, $: false, require: false */

(function (root) {
    "use strict";

    // if the module does not exist
    app.mod.jobs = app.mod.jobs || {};

    // Creates the jobs view
    app.mod.jobs.View = Backbone.View.extend({

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
            var view = new root.app.mod.job.View({model: job});
            $("#jobs-list", this.$el).append(view.render());
            return;
        },

        // Method fired when the view is initialized
        initialize: function () {
        },

        template: function (data) {
            return JST["src/app/templates/jobs.tpl"]({
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
            var jobs = new root.app.collection.Jobs(),
                _this = this;
            
            jobs.fetch({
                success: function (models, response) {
                    models.each(function (model, index) {
                        var view = new root.app.mod.job.View({model: model});
                        $("#jobs-list", _this.$el).append(view.render());
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
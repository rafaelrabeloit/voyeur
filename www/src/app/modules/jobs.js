/*global app: false, Backbone: false, JST: false, $: false, require: false */

(function (root) {
    "use strict";

    // if the module does not exist
    root.app.mod.jobs = root.app.mod.jobs || {};

    // Creates the Home view
    root.app.mod.jobs.View = Backbone.View.extend({

        // page class name 
        className: 'jobs page',

        template: function () {
            return JST["src/app/templates/jobs.tpl"]();
        },
        
        initialize: function () {
            this.jobListView = new root.app.view.job.list.View();
            this.jobAddView = new root.app.view.job.add.View();
        },
        
        // function that renders the view
        render: function () {
            this.$el.html(this.template());
            
            this.jobListView.setElement(this.$("#list-container")).render();
            this.jobAddView.setElement(this.$("#add-container")).render();
            
            return this.$el[0];
        }
    });

}(window));
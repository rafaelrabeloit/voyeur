/*global app: false, Backbone: false, JST: false, $: false, require: false */

(function () {
    "use strict";

    // if the module does not exist
    app.mod.jobs = app.mod.jobs || {};

    // Creates the Home view
    app.mod.jobs.View = Backbone.View.extend({

        // page class name 
        className: 'jobs page',

        template: function () {
            return JST["src/app/templates/jobs.tpl"]();
        },
        
        // function that renders the view
        render: function () {
            this.$el.html(this.template());
            return this.$el[0];
        }
    });

}());
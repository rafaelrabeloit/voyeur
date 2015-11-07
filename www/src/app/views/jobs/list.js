/*global app: false, Backbone: false, JST: false, $: false, require: false */

(function (root) {
    "use strict";

    // if the module does not exist
    root.app.view.job = root.app.view.job || {};
    root.app.view.job.list = root.app.view.job.list || {};

    // Creates the jobs view
    root.app.view.job.list.View = Backbone.Epoxy.View.extend({
        
        // data binding 
        itemView: root.app.view.job.view.View,
        collection: new root.app.collection.Jobs(),

        // Method fired when the view is initialized
        initialize: function () {
            // register on add for Job
            root.app.dispatcher.on('add:job', this.refresh, this);
        },

        template: function (data) {
            return JST["src/app/templates/jobs/list.tpl"](data);
        },
        
        // function that renders the view
        render: function () {
            this.$el.html(this.template());
            this.applyBindings();
            
            this.refresh();
            
            return this.$el[0];
        },
        
        refresh: function () {
            this.collection.fetch({
                reset: true,
                success: function (models) {
                    //TODO: loading end                  
                }
            });
        },
        
        destroy: function () {
            root.app.dispatcher.off('add:job', this.refresh, this);
        }
    });

}(window));
/*global app: false, Backbone: false, JST: false, $: false, require: false */

(function (root) {
    "use strict";

    // if the module does not exist
    app.mod.values = app.mod.values || {};

    // Creates the values view
    app.mod.values.View = Backbone.View.extend({

        // page class name 
        className: 'values page',

        // Method fired when the view is initialized
        initialize: function () {  },

        template: function (data) {
            return JST["src/app/templates/values.tpl"]({
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
            
            var values = new root.app.collection.Values(),
                _this = this;
            
            values.watcher = localStorage.getItem("app.config.selectedWatcher");
            values.fetch({
                success: function (models, response) {
                    models.each(function (model, index) {
                        var view = new root.app.mod.value.View({model: model});
                        $("#values_list", _this.$el).append(view.render());
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
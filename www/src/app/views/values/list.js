/*global app: false, Backbone: false, JST: false, $: false, require: false */

(function (root) {
    "use strict";

    // if the module does not exist
    root.app.view.value = root.app.view.value || {};
    root.app.view.value.list = root.app.view.value.list || {};

    // Creates the values view
    root.app.view.value.list.View = Backbone.Epoxy.View.extend({

        // data binding 
        itemView: root.app.view.value.view.View,
        collection: new root.app.collection.Values(),

        initialize: function (selectedWatcher) {
            var _this = this;
            
            this.collection.fetch({
                success: function (models, response) {
                    //TODO: Loading...
                }
            });
        },
        
        template: function (data) {
            return JST["src/app/templates/values/list.tpl"](data);
        },
        
        // function that renders the view
        render: function () {
            this.$el.html(this.template());
            this.applyBindings();
            return this.$el[0];
        }
    });

}(window));
/*global app: false, Backbone: false, JST: false, $: false, require: false */

(function (root) {
    "use strict";

    // if the module does not exist
    root.app.mod.values = root.app.mod.values || {};

    // Creates the Home view
    root.app.mod.values.View = Backbone.View.extend({
        
        // page class name 
        className: 'values page',

        template: function () {
            return JST["src/app/templates/values.tpl"]();
        },
        
        initialize: function () {
            this.selectedWatcher = localStorage.getItem("app.config.selectedWatcher");
            this.valueListView = new root.app.view.value.list.View({selectedWatcher: this.selectedWatcher});
        },
        
        // function that renders the view
        render: function () {
            this.$el.html(this.template());

            this.valueListView.setElement(this.$("#list-container")).render();
            
            return this.$el[0];
        }
    });

}(window));
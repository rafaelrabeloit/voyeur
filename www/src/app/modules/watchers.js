/*global app: false, Backbone: false, JST: false, $: false, require: false */

(function (root) {
    "use strict";

    // if the module does not exist
    root.app.mod.watchers = root.app.mod.watchers || {};

    // Creates the Home view
    root.app.mod.watchers.View = Backbone.View.extend({

        // page class name 
        className: 'watchers page',

        template: function () {
            return JST["src/app/templates/watchers.tpl"]();
        },
        
        initialize: function () {
            this.watcherListView = new root.app.view.watcher.list.View();
            this.watcherAddView = new root.app.view.watcher.add.View();
        },
        
        // function that renders the view
        render: function () {
            this.$el.html(this.template());

            this.watcherListView.setElement(this.$("#list-container")).render();
            this.watcherAddView.setElement(this.$("#add-container")).render();

            return this.$el[0];
        }
    });

}(window));
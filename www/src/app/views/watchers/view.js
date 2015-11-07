/*global app: false, Backbone: false, JST: false, $: false, require: false */

(function (root) {
    "use strict";

    // if the module does not exist
    root.app.view.watcher = root.app.view.watcher || {};
    root.app.view.watcher.view = root.app.view.watcher.view || {};
    
    // Creates the watcher view
    root.app.view.watcher.view.View = Backbone.View.extend({
        el: function () {
            return this.template(this.model.attributes);
        },

        // Custom events
        events: {
            'click .target': 'onClick',
            'click .delete-watcher': 'onDelete',
            'click .enable-watcher': 'onEnable'
        },

        // Custom events hadlers
        onClick: function (e) {
            localStorage.setItem("app.config.selectedWatcher", this.model.get("resource"));
            root.app.core.load("values");
            return;
        },

        onDelete: function () {
            this.model.destroy();
        },
        
        onEnable: function () {
            var _this = this;
            this.model.set('enabled', $(".enable-watcher", this.$el).hasClass('active'));
            this.model.save({
                error: function (model, response) {
                    if (model.get('enabled')) {
                        $(".enable-watcher", this.$el).removeClass('active');
                    } else {
                        $(".enable-watcher", this.$el).addClass('active');
                    }
                }
            });
            return;
        },
        
        template: function (data) {
            return JST["src/app/templates/watchers/view.tpl"](data);
        },
        
        // function that renders the view
        render: function () {
            this.$el.html(this.template(this.model.attributes));
            return this.$el[0];
        }
    });

}(window));
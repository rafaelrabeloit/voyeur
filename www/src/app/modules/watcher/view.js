/*global app: false, Backbone: false, JST: false, $: false, require: false */

(function (root) {
    "use strict";

    // if the module does not exist
    app.mod.watcher = app.mod.watcher || {};

    // Creates the watcher view
    app.mod.watcher.View = Backbone.View.extend({
        // tag
        tagName: 'li',
        
        // page class name 
        className: 'watcher',

        // Custom events
        events: {
            'click .target': 'onClick',
            'click .del-watcher': 'onDelete',
            'click .enable-watcher': 'onEnable'
        },

        // Custom events hadlers
        onClick: function (e) {
            root.app.core.load("values");
            localStorage.setItem("app.config.selectedWatcher", this.model.get("resource"));
            return;
        },

        onDelete: function () {
            var _this = this;
            this.model.destroy({
                success: function (model, response) {
                    _this.remove();
                }
            });
            return;
        },
        
        onEnable: function () {
            console.log( $(".enable-watcher", this.$el).hasClass('active') );
            console.log( this.model.get('enabled') );
            
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
        
        // Method fired when the view is initialized
        initialize: function () {},

        template: function (data) {
            return JST["src/app/templates/watcher.tpl"]({
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
            return;
        },

        // Function called when the view is destroyed
        destroy: function () {
            return;
        }
    });

}(window));
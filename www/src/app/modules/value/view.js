/*global app: false, Backbone: false, JST: false, $: false, require: false */

(function (root) {
    "use strict";

    // if the module does not exist
    app.mod.value = app.mod.value || {};

    // Creates the value view
    app.mod.value.View = Backbone.View.extend({
        // tag
        tagName: 'li',
        
        // page class name 
        className: 'value',

        // Method fired when the view is initialized
        initialize: function () {},

        template: function (data) {
            return JST["src/app/templates/value.tpl"]({
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
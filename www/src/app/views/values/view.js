/*global app: false, Backbone: false, JST: false, $: false, require: false */

(function (root) {
    "use strict";

    // if the module does not exist
    root.app.view.value = root.app.view.value || {};
    root.app.view.value.view = root.app.view.value.view || {};

    // Creates the value view
    root.app.view.value.view.View = Backbone.Epoxy.View.extend({
        el: function () {
            return this.template(this.model.attributes);
        },
        
        template: function (data) {
            return JST["src/app/templates/values/view.tpl"](data);
        },
        
        // function that renders the view
        render: function () {
            this.$el.html(this.template(this.model.attributes));
            return this.$el[0];
        }
    });

}(window));
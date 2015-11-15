/*global app: false, Backbone: false, JST: false, $: false, _: false, root: false */

(function (root) {

    "use strict";

    Backbone.VModel = Backbone.Epoxy.Model.extend({
        idAttribute: "resource",
        sync: function (method, collection, options) {
            options = options || {};
            options.beforeSend = root.app.core.auth;
            options.error = root.app.core.error;
            return Backbone.sync.call(this, method, collection, options);
        }
    });

}(window));
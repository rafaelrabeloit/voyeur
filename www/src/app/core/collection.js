/*global app: false, Backbone: false, JST: false, $: false, _: false, root: false */

(function (root) {

    "use strict";

    Backbone.VCollection = Backbone.Collection.extend({
        sync: function (method, collection, options) {
            options = options || {};
            options.beforeSend = root.app.core.auth;
            options.error = root.app.core.error;
            return Backbone.sync.call(this, method, collection, options);
        }
    });
    
}(window));
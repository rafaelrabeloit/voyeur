/*global app: false, Backbone: false, JST: false, $: false, _: false, root: false */

(function (root) {

    "use strict";

    Backbone.VModel = Backbone.Epoxy.Model.extend({
        idAttribute: "resource",
        sync: function (method, collection, options) {
            options = options || {};
            options.beforeSend = function (xhr) {
                var token = root.app.appParameters.auth.user.concat(":", root.app.appParameters.auth.pass);
                xhr.setRequestHeader('Authorization', ("Basic ".concat(root.btoa(token))));
            };
            return Backbone.sync.call(this, method, collection, options);
        }
    });

}(window));
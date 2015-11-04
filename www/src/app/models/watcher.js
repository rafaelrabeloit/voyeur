/*global app: false, Backbone: false, JST: false, $: false, _: false, root: false */

(function (root) {

    "use strict";

    var Watcher = Backbone.Model.extend({
        urlRoot:  root.app.appParameters.config.apiURL + 'watchers',
        idAttribute: "resource",
        initialize: function () {
            var values = new root.app.collection.Values();
            values.watcher = this.get("id");
            this.set('values', values);
        }
    });

    root.app = root.app || {};
    root.app.model = root.app.model || {};
    root.app.model.Watcher = Watcher;
}(window));
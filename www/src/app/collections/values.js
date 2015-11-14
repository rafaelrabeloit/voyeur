/*global app: false, Backbone: false, JST: false, $: false, _: false, root: false */

(function (root) {

    "use strict";

    var Values = Backbone.VCollection.extend({
        model: root.app.model.Value,
        url: function () {
            return root.app.appParameters.config.apiURL + 'watchers/' + this.watcher + '/values';
        },
        defaults: {
            watcher: 0
        }
    });

    root.app = root.app || {};
    root.app.collection = root.app.collection || {};
    root.app.collection.Values = Values;

}(window));
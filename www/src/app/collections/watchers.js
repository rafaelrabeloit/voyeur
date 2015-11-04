/*global app: false, Backbone: false, JST: false, $: false, _: false, root: false */

(function (root) {

    "use strict";

    var Watchers = Backbone.Collection.extend({
        model: root.app.model.Watcher,
        url: root.app.appParameters.config.apiURL + 'watchers'
    });

    root.app = root.app || {};
    root.app.collection = root.app.collection || {};
    root.app.collection.Watchers = Watchers;

}(window));
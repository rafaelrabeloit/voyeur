/*global app: false, Backbone: false, JST: false, $: false, _: false, root: false */

(function (root) {

    "use strict";

    var Jobs = Backbone.Collection.extend({
        model: root.app.model.Job,
        url: root.app.appParameters.config.apiURL + 'jobs'
    });

    root.app = root.app || {};
    root.app.collection = root.app.collection || {};
    root.app.collection.Jobs = Jobs;

}(window));
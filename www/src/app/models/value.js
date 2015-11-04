/*global app: false, Backbone: false, JST: false, $: false, _: false, root: false */

(function (root) {

    "use strict";

    var Value = Backbone.Model.extend({
        urlRoot: function () {
            return root.app.appParameters.config.apiURL + 'watchers/' + this.watcher + '/values';
        },
        idAttribute: "resource"
    });

    root.app = root.app || {};
    root.app.model = root.app.model || {};
    root.app.model.Value = Value;
}(window));
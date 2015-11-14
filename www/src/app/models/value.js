/*global app: false, Backbone: false, JST: false, $: false, _: false, root: false */

(function (root) {

    "use strict";

    var Value = Backbone.VModel.extend({
        urlRoot: function () {
            return root.app.appParameters.config.apiURL + 'watchers/' + this.watcher + '/values';
        }
    });

    root.app = root.app || {};
    root.app.model = root.app.model || {};
    root.app.model.Value = Value;
}(window));
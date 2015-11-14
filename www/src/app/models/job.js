/*global app: false, Backbone: false, JST: false, $: false, _: false, root: false */

(function (root) {

    "use strict";

    var Job = Backbone.VModel.extend({
        urlRoot:  root.app.appParameters.config.apiURL + 'jobs',
        idAttribute: "resource"
    });

    root.app = root.app || {};
    root.app.model = root.app.model || {};
    root.app.model.Job = Job;
}(window));
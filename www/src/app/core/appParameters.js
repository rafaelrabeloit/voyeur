/*global app: false, Backbone: false, JST: false, $: false, console: false */

(function (root) {
    "use strict";

    // Declares local variables
    var appParameters = {
        config: {
            appName: "Voyeur",
            apiURL: "http://api.voyeur.neptune.li/"
        }
    };

    // Sets the appParameters object on the app namespace
    /* istanbul ignore next */
    root.app = root.app || {};
    root.app.appParameters = appParameters;

}(window));
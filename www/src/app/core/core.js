/*global app: false, Backbone: false, JST: false, $: false, root: false */

(function (root) {
    "use strict";

    var core = {
        load: function (page) {
            if (page && typeof page === "string" && page !== "") {
                if (page[0] === "#") {
                    root.location.href = page;
                } else {
                    root.location.href = "#" + page;
                }
            }
        },

        replace: function (page) {
            if (page && typeof page === "string" && page !== "") {
                if (page[0] === "#") {
                    root.location.replace(page);
                } else {
                    root.location.replace("#" + page);
                }
            }
        },

        print: function () {
            root.print();
        }
    };

    // Sets the object on the app namespace
    /* istanbul ignore next */
    root.app = root.app || {};
    root.app.core = core;

}(window));
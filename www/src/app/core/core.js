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
        },

        auth: function (xhr) {
            var token = root.app.appParameters.auth.user.concat(":", root.app.appParameters.auth.pass);
            xhr.setRequestHeader('Authorization', ("Basic ".concat(root.btoa(token))));
        },

        error: function (xhr, statusTxt, thrown) {
            //unauthorized
            if (xhr.status === 401) {
                root.app.core.replace("home");
                root.app.dispatcher.trigger('modal', ["Login error"]);
            }
        }
    };

    // Sets the object on the app namespace
    /* istanbul ignore next */
    root.app = root.app || {};
    root.app.core = core;

}(window));
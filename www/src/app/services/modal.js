/*global app: false, Backbone: false, JST: false, $: false, require: false*/

(function (root) {
    "use strict";

    // Declares local variables
    var alert, timeout, modal = {

        onModal: function (text, title) {
            $("body").append(JST["src/app/templates/modal.tpl"]());
            alert = $("#myModal");

            // Sets the text to the alert and sets the class to active
            $(".modal-body", alert).text(text);
            $(".modal-title", alert).text(title);

            alert.modal("show");

            alert.on('hidden.bs.modal', function (e) {
                alert.off();
                alert.remove();
                alert = null;
            });
        }
    };

    // Adds the service to the mediator
    root.app.dispatcher.on('modal', modal.onModal, modal);

}(window));
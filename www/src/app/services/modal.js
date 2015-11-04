/*global app: false, Backbone: false, JST: false, $: false, require: false*/

(function (root) {
    "use strict";

    // Declares local variables
    var alert, timeout, modal = {

        onModal: function (text, alertType) {

            // Creates the modal div if it doesn't exists
            if (!alert) {
                alert = document.createElement('div');
                alert.className = 'modal alert ' + alertType;
                $('body')[0].appendChild(alert);
            }

            // Sets the text to the alert and sets the class to active
            alert.textContent = text;

            // Sets the animation 
            setTimeout(function () {

                // Adds the active class
                alert.classList.add('active');

                // if a timeoput was already set it clears it
                if (timeout) {
                    clearTimeout(timeout);
                }

                // then it sets a nex timeout to take off the alert
                timeout = setTimeout(function () {
                    alert.parentNode.removeChild(alert);
                    alert = null;
                }, 2000);
            }, 0);


        }
    };

    // Adds the service to the mediator
    root.app.mediator.on('modal', modal.onModal);

}(window));
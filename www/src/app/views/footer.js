/*global app: false, Backbone: false, JST: false, $: false, require: false*/

(function () {
    "use strict";

    // Creates the Home view
    app.view.Footer = Backbone.View.extend({

        button1Info: {
            callback: null,
            nextPage: null
        },

        button2Info: {
            callback: null,
            nextPage: null
        },

        // initializes the header view
        initialize: function () {

            // Subscribes to the mediator onview change event
            app.mediator.on('viewchangefooter', this.onViewChange, this);
        },

        // Enable footer and configure buttons label, next page and function to be executer on button
        onViewChange: function (enable, btn2Info, btn1Info) {
            var $btn1, $btn2, $footer = $(this.$el[0]),
                $btn1Label, $btn2Label;

            if (!enable) {
                $footer.addClass('hide');
            } else {
                this.button1Info = btn1Info;
                this.button2Info = btn2Info;

                $btn1 = $(".btn1", this.$el[0]);
                $btn2 = $(".btn2", this.$el[0]);

                $btn1Label = $("label", $btn1);
                $btn2Label = $("label", $btn2);

                $btn1.removeClass('hide');
                $btn2.removeClass('hide');

                if (btn1Info === null || btn1Info === undefined) {
                    $btn1.addClass('hide');
                } else {
                    $btn1Label.text(app.strings.labelList[btn1Info.keyLabel]);
                }

                if (btn2Info === null || btn2Info === undefined) {
                    $btn2.addClass('hide');
                } else {
                    $btn2Label.text(app.strings.labelList[btn2Info.keyLabel]);
                }

                if (btn1Info !== null && btn2Info !== null && btn1Info !== undefined && btn2Info !== undefined) {
                    $footer.addClass('footerSplit');
                    $footer.removeClass('footerSolo');
                } else {
                    $footer.addClass('footerSolo');
                    $footer.removeClass('footerSplit');
                }

                $footer.removeClass('hide');
            }
        },

        // Declares the buttons events
        events: {
            'click .btn1': 'onButton',
            'click .btn2': 'onButton'
        },

        // When the button 1 is clicked change to hover and after some time goes to next screen
        onButton: function (e) {
            var $target = $(e.currentTarget),
                buttonInfo;
            e.preventDefault();

            if ($target.hasClass('btn1')) {
                buttonInfo = this.button1Info;
            } else if ($target.hasClass('btn2')) {
                buttonInfo = this.button2Info;
            }

            if (buttonInfo.callback !== null && buttonInfo.callback !== undefined) {
                buttonInfo.callback();
            }

            if (buttonInfo.nextPage !== null && buttonInfo.nextPage !== undefined) {
                window.location.href = buttonInfo.nextPage;
            }
        }
    });
}());
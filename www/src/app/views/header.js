/*global app: false, Backbone: false, JST: false, $: false, require: false*/

(function () {
    "use strict";

    // Creates the Home view
    app.view.Header = Backbone.View.extend({

        backTo: null,

        // initializes the header view
        initialize: function () {

            // Subscribes to the mediator onview change event
            app.mediator.on('viewchangeheader', this.onViewChange, this);
        },

        // Declares the event listeners
        events: {
            'click .back': 'goBack'
        },

        // Sets the title of the header (and the back button if set) when a view changes
        onViewChange: function (title, back) {

            var label, $title = $(".title", this.$el[0]),
                $back = $(".back", this.$el[0]);

            label = app.strings.labelList[title];

            // Sets the title of the header
            $title.text((label !== undefined) ? label : title);

            // If the back button is passed, it shows it or hides
            if (back) {
                $back.removeClass('hide');
            } else {
                $back.addClass('hide');
            }
        },

        // function fired when the goback arrow was clicked
        goBack: function () {
            history.back();
        }
    });

}());
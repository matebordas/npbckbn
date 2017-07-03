define([
    'jquery',
    'underscore',
    'backbone',
    'text!carousel/templates/popover'

], function ($, _, Backbone, PopoverTemplate) {
    'use strict';

    return Backbone.View.extend({

        className: 'popover',

        template: _.template(PopoverTemplate),

        events: {
            'click #set-color-btn': 'setColor'
        },

        render: function() {
            this.$el.html(this.template);
            return this;
        },

        setColor: function() {
            var color = this.$('#hex-colour-input').val();
            this.trigger("setColor", color);
        }
    });
});

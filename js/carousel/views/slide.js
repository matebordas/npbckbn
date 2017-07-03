define([
    'jquery',
    'underscore',
    'backbone',
    'text!carousel/templates/slide'

], function ($, _, Backbone, SlideTemplate) {
    'use strict';

    return Backbone.View.extend({

        className: 'slide-view fade',

        template: _.template(SlideTemplate),

        initialize: function(options) {
            this.model = options.model;
        },

        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    });
});

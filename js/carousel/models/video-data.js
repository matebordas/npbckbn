define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';

    return Backbone.Model.extend({
        defaults: {
            id: null,
            type: '',
            count: 0
        }
    });
});

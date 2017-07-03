define([
    'underscore',
    'backbone',
    'carousel/models/video-data'
], function (_, Backbone, VideoData) {
    'use strict';

    return Backbone.Collection.extend({
        model: VideoData
    });
});

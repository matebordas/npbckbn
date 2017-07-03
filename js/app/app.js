define([
	'jquery',
	'underscore',
	'backbone',
	'carousel/views/carousel',
	'carousel/collections/video-data-list'

], function ($, _, Backbone, CarouselView, VideoDataList) {
	'use strict';

	return Backbone.View.extend({

		el: '#slider-app',

        initialize: function() {

            var videoDataList = new VideoDataList([
                {id: 1, type: 'vod', count: 1832327 },
            	{id: 2, type: 'live', count: 353366 }
            ]);

            var carouselApp = new CarouselView({ videoDataList: videoDataList });
            this.$el.append(carouselApp.render().el);
        }
	});
});

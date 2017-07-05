define([
    'jquery',
    'underscore',
    'backbone',
    'text!carousel/templates/layout.html',
    'carousel/models/video-data',
    'carousel/views/slide',
    'carousel/views/popover'

], function ($, _, Backbone, LayoutTemplate, VideoData, SlideView, PopoverView) {
    'use strict';

    return Backbone.View.extend({

        className: 'carousel-view',

        template: _.template(LayoutTemplate),

        events: {
            'click .next': 'plusSlides',
            'click .prev': 'plusSlides',
            'click .settings-icon': 'toggleSettings'
        },

        initialize: function(options) {
            this.slideIndex = 0;
            this.videoDataList = options.videoDataList;

            var totalVideoCount = this.calculateTotalPlays(this.videoDataList);

            this.videoDataList.push(new VideoData({
                id: 3,
                type: 'all',
                count: totalVideoCount
            }));
        },

        render: function() {
            var self = this;
            this.$el.html(this.template());

            this.$sliderContent = this.$('#slider-content');
            this.$headerContent = this.$('#slider-header');

            this.popoverView = new PopoverView();

            this.popoverView.on("setColor", function(color) {
                $(self.slides[self.slideIndex]).css("background", color)
            });

            this.$headerContent.append(this.popoverView.render().el);

            this.videoDataList.forEach(function(videoData) {
                var slideView = new SlideView({ model: videoData});
                self.$sliderContent.append(slideView.render().el);
            });

            this.slides = this.$(".slide-view");
            this.showSlides(this.slideIndex,  this.animateNext.bind(this));

            this.slideInterval = setInterval(function() {
                self.showSlides(self.slideIndex + 1, self.animateNext.bind(self));
            }, 3000);

            return this;
        },

        calculateTotalPlays: function(videoDataList) {
            return videoDataList.reduce(function(acc, videoData){
                return videoData.get('count') + acc;
            }, 0);
        },

        plusSlides: function(event) {
            var self = this;

            if (event.target.className === 'next') {
                this.showSlides(this.slideIndex + 1, this.animateNext.bind(this));
            } else {
                this.showSlides(this.slideIndex - 1, this.animatePrev.bind(this));
            }

            clearInterval(this.slideInterval);
            this.slideInterval = setInterval(function() {
                self.showSlides(self.slideIndex + 1, self.animateNext.bind(self));
            }, 3000);
        },

        showSlides: function(slideNumber, animateSlide) {
            this.$sliderContent.css('backgroundColor', this.slides[this.slideIndex].style.backgroundColor);
            this.slideIndex = slideNumber;

            if (slideNumber > this.slides.length - 1) {
                this.slideIndex = 0;
            }

            if (slideNumber < 0) {
                this.slideIndex = this.slides.length - 1;
            }

            for (var i = 0; i < this.slides.length; i++) {
                this.slides[i].style.display = "none";
            }

            animateSlide();
        },

        animateNext: function() {
            $(this.slides[this.slideIndex]).css("display", "block").css({
                left: this.$el.width()
            }).animate({
                left: 0
            }, 500);
        },

        animatePrev: function() {
            $(this.slides[this.slideIndex]).css("display", "block").css({
                left: -this.$el.width()
            }).animate({
                left: 0
            }, 500);
        },

        toggleSettings: function() {
            this.$('#popover-content').toggleClass('popover-content-visible');
        }
    });
});

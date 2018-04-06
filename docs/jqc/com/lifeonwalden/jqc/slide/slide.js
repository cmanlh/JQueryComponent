/*
   Copyright 2017 cmanlh

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
/**
 * slideshow
 * 
 */
(function ($) {
    $JqcLoader.importComponents('com.lifeonwalden.jqc', ['baseElement', 'uniqueKey'])
        .importCss($JqcLoader.getCmpParentURL('com.lifeonwalden.jqc', 'slide').concat('css/slide.css'))
        .execute(function () {
            var DEFAULT_OPTIONS = {
                slides: null, // slide set
                mode: 'fade', // fade, horizontal, vertical
                switchSpeed: 1000, // speed
                switchGap: 5000, // switch gap time
                container: null, // container
                mask: null,
                fullLoad: false, // load all slide before show slide,
                loadDelay: 1000,
                pageCtrl: null,
            };
            $.jqcSlide = function (param) {
                if (arguments.length > 0) {
                    $.jqcBaseElement.apply(this, arguments);
                }
                this.options = $.extend(true, {}, DEFAULT_OPTIONS, param);

                this.el = this.options.container; // the jquery element for the target document node
                this.el.addClass('jqcSlideContainer');
                this.typeName = 'jqcSlide';
                this.elementId = 'jqc'.concat($.jqcUniqueKey.fetchIntradayKey());
                this.el.attr($.jqcBaseElement.JQC_ELEMENT_TYPE, this.typeName);
                this.el.attr($.jqcBaseElement.JQC_ELEMENT_ID, this.elementId);
                this.slideCmp = [];
                this.currentSlide = 0;
                this.handler = null;
                this.pageCtrler = [];

                if (this.options.mask) {
                    this.options.mask.addClass('jqcSlideMask');
                }
                setup(this);
            };

            function setup(that) {
                var slides = that.options.slides;
                if (that.options.fullLoad) {
                    var slide = null;
                    for (var i in slides) {
                        var _slide = createSlide(that, slides[i]);
                        if (slide) {
                            slide = slide.after(_slide);
                        } else {
                            slide = _slide;
                            slide.css('display', 'block');
                        }
                        that.slideCmp.push(_slide);
                    }
                    that.el.append(slide);
                    setupRunner(that);
                } else {
                    var _slide = createSlide(that, slides[0]);
                    _slide.css('display', 'block');
                    that.slideCmp.push(_slide);
                    that.el.append(_slide);
                    setTimeout(function () {
                        var sildeLength = slides.length;
                        var slide = null;
                        for (var i = 1; i < sildeLength; i++) {
                            var _slide = createSlide(that, slides[i]);
                            if (slide) {
                                slide = slide.after(_slide);
                            } else {
                                slide = _slide;
                            }
                            that.slideCmp.push(_slide);
                        }
                        that.el.append(slide);
                        setupRunner(that);
                    }, that.options.loadDelay);
                }
            }

            function setupRunner(that) {
                setupCtrl(that);
                that.handler = setInterval(function () {
                    switchPage(that, -1);
                }, that.options.switchGap);
            }

            function setupCtrl(that) {
                if (that.options.pageCtrl) {
                    var pageCtrlContainer = null,
                        pccClazz = null;
                    if (that.options.pageCtrl == 'right') {
                        pccClazz = 'jqcSlidePageCtrlRight';
                    }
                    pageCtrlContainer = $('<div class="'.concat(pccClazz).concat('"></div>'));
                    var resize = function () {
                        that.el.height(that.slideCmp[0].height());
                        pageCtrlContainer.css('top', (that.el.height() - pageCtrlContainer.height()) / 2);
                    };
                    for (var i in that.slideCmp) {
                        var _pageCtrler = $('<div class="jqcSlidePageCtrlPage" jqcSlidePageIndex="'.concat(i).concat('"></div>'));
                        if (i == 0) {
                            _pageCtrler.addClass('jqcSlidePageCtrlActive');
                        }
                        that.pageCtrler.push(_pageCtrler);
                        pageCtrlContainer.append(_pageCtrler);
                    }
                    resize();
                    that.el.append(pageCtrlContainer);
                    $(window).resize(function () {
                        resize();
                    });
                    pageCtrlContainer.on('click', function (e) {
                        var pageCtrler = $(e.target);
                        if (pageCtrler.hasClass('jqcSlidePageCtrlPage')) {
                            switchPage(that, pageCtrler.attr('jqcSlidePageIndex'));
                        }
                    });
                }
            }

            function switchPage(that, to) {
                var next = to;
                if (to == that.currentSlide) {
                    return;
                }
                if (next == -1) {
                    var next = (that.currentSlide + 1) % that.slideCmp.length;
                }
                var currentSlide = that.slideCmp[that.currentSlide],
                    nextSlide = that.slideCmp[next];
                if (that.options.mode == 'fade') {
                    currentSlide.fadeOut(that.options.switchSpeed);
                    nextSlide.fadeIn(that.options.switchSpeed);
                }
                if (that.options.pageCtrl) {
                    var currentCtrl = that.pageCtrler[that.currentSlide],
                        nextCtrl = that.pageCtrler[next];
                    currentCtrl.removeClass('jqcSlidePageCtrlActive');
                    nextCtrl.addClass('jqcSlidePageCtrlActive');
                }
                that.currentSlide = next;
            }

            function createSlide(that, slide) {
                var _slide = null;
                if (slide.type == 'img') {
                    var _img = '<img src="'.concat(slide.url).concat('">');
                    if (that.options.mask) {
                        _slide = _img;
                    } else {
                        if (slide.href) {
                            _slide = '<a target="_blank" href="'.concat(slide.href).concat('">').concat(_img).concat('</a>');
                        } else {
                            _slide = _img;
                        }
                    }
                }

                return $('<div class="jqcSlide">'.concat(_slide).concat('</div>'));
            }

            $.jqcSlide.prototype = new $.jqcBaseElement();
            $.jqcSlide.prototype.constructor = $.jqcSlide;

            superDestroy = $.jqcSlide.prototype.destroy;
            $.jqcSlide.prototype.destroy = function () {
                superDestroy.apply(this);
                this.el.remove();
            };
        });
}(jQuery));
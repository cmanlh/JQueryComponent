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
 * loading
 * 
 */
(function ($) {
    $JqcLoader.importComponents('com.lifeonwalden.jqc', ['baseElement', 'uniqueKey', 'zindex'])
        .importCss($JqcLoader.getCmpParentURL('com.lifeonwalden.jqc', 'loading').concat('css/loading.css'))
        .execute(function () {
            const DEFAULT_OPTIONS = {
                show: false,
                width: 300,
                height: 150,
                speed: 1
            };

            function Loading(params) {
                var _this = this;
                this.options = Object.assign({}, DEFAULT_OPTIONS, params);
                this.body = $('body');
                render.call(this);
                this.options.show && this.show();
                this.status = this.options.show ? 'show' : 'hide';
                this.typeName = 'jqcMenu';
                this.elementId = 'jqc'.concat($.jqcUniqueKey.fetchIntradayKey());
            }
            Loading.prototype = new $.jqcBaseElement();
            Loading.prototype.constructor = Loading;

            Loading.prototype.show = function (text) {
                if (this.locked) {
                    return;
                }
                var _this = this;
                this.status = 'show';
                this.mask.css('display', 'flex');
                if (text != undefined) {
                    this.text.text(text).show();
                } else {
                    this.text.hide();
                }
                removeScroll.call(_this);
            };

            Loading.prototype.hide = function () {
                if (this.locked) {
                    return;
                }
                if (this.status === 'hide') {
                    return;
                }
                var _this = this;
                this.status = 'hide';
                this.mask.hide();
                addScroll.call(_this);
            };

            Loading.prototype.lock = function (time) {
                var _this = this;
                this.locked = true;
                if (time) {
                    setTimeout(function () {
                        _this.locked = false;
                    }, time);
                }
            };
            Loading.prototype.unlock = function () {
                this.locked = false;
            };

            // 私有方法
            function render() {
                var _this = this;
                $('body').append(renderMask.call(_this));
            }

            function renderMask() {
                var _this = this;
                this.mask = $('<div>')
                    .addClass('jqcLoading-mask')
                    .css('z-index', $.jqcZindex.loading)
                    .append(renderLoadingBox.call(_this));
                return this.mask;
            }

            function renderLoadingBox() {
                var _this = this;
                this.box = $('<div>').addClass('jqcLoading-body');
                var box = $('<div>').addClass('jqcLoading-svg-container');
                var svg = $('<svg><circle class="jqcLoading-circle" cx="50" cy="50" r="20" fill="none"/></svg>')
                    .addClass('jqcLoading-svg')
                    .attr('viewBox', '25 25 50 50');
                box.append(svg);
                this.box.append(box);
                this.text = $('<p>').addClass('jqcLoading-text').text(this.options.text);
                this.box.append(this.text);
                return this.box;
            }

            function renderCanvas() {
                var _this = this;
                this.canvas = $('<canvas></canvas>');
                this.canvas[0].width = this.options.width;
                this.canvas[0].height = this.options.height;
                this.ctx = this.canvas[0].getContext('2d');
                this.ctx.strokeStyle = '#ff0000';
                this.ctx.lineWidth = 3;
                this.ctx.lineCap = 'round';
                this.ctx.lineJoin = 'round';
                return this.canvas;
            }

            function renderCircle() {
                this.circle = $('<circle>')
                    .addClass('jqcLoading-circle')
                    .attr({
                        cx: 50,
                        cy: 50,
                        r: 20,
                        fill: 'none'
                    });
                return this.circle; 
            }

            function removeScroll() {
                var _this = this;
                this.scrollStatus = this.body.css('overflow');
                this.body.css('overflow', 'hidden');
            }

            function addScroll() {
                var _this = this;
                this.scrollStatus && this.body.css('overflow', _this.scrollStatus);
            }
            // 单例模式 一个页面只能实例化一次
            $.jqcLoading = (function () {
                var loading;
                return function (params) {
                    if (!loading) {
                        loading = new Loading(params);
                    }
                    return loading;
                }
            })();
        });
}(jQuery));
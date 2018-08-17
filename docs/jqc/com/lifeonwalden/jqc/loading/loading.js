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
                this.aid = 0;           //looper id
                this.frame = 0;         //frame number
                pointData.call(this);
                render.call(this);
                this.loop = drawLine.bind(this);    //looper function
                this.options.show && this.show();
                this.status = this.options.show ? 'show' : 'hide';
                this.typeName = 'jqcMenu';
                this.elementId = 'jqc'.concat($.jqcUniqueKey.fetchIntradayKey());
            }
            Loading.prototype = new $.jqcBaseElement();
            Loading.prototype.constructor = Loading;

            Loading.prototype.show = function () {
                if (this.status === 'show') {
                    return;
                }
                var _this = this;
                this.status = 'show';
                this.mask.css('display', 'flex');
                removeScroll.call(_this);
                this.frame = 0;
                this.ctx.beginPath();
                this.aid = window.requestAnimationFrame(_this.loop);
            };

            Loading.prototype.hide = function () {
                if (this.status === 'hide') {
                    return;
                }
                var _this = this;
                this.status = 'hide';
                this.mask.hide();
                addScroll.call(_this);
                cancelAnimationFrame(_this.aid);
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
                this.box = $('<div>')
                    .addClass('jqcLoading-box')
                    .append(renderCanvas.call(_this))
                    .css({
                        width: _this.options.width,
                        height: _this.options.height,
                    });
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

            function pointData() {
                this.x1 = this.options.width * 4 / 15;
                this.y1 = this.options.height / 2;
                this.x2 = this.options.width * 5.5 / 15;
                this.y2 = this.options.height / 4 * 3;
                this.x3 = this.options.width * 9.5 / 15;
                this.y3 = this.options.height / 4;
                this.x4 = this.options.width * 11 / 15;
                this.y4 = this.options.height / 2;
                this.x5 = this.options.width;
                this.y5 = 0;
            }

            function drawLine() {
                var _this = this;
                var y;
                this.ctx.clearRect(0, 0, _this.options.width, _this.options.height);
                this.ctx.moveTo(0, _this.options.height);
                this.frame += this.options.speed;
                if (this.frame < _this.x1) {
                    y = this.options.height - Math.round(_this.y1 / _this.x1 * _this.frame);
                } else if (this.frame <  _this.x2) {
                    this.ctx.lineTo(_this.x1, _this.y1);
                    y = _this.y1 + Math.round(_this.y3 / (_this.x2 - _this.x1) * (_this.frame - _this.x1));
                } else if (this.frame <  _this.x3) {
                    this.ctx.lineTo(_this.x1, _this.y1);
                    this.ctx.lineTo(_this.x2, _this.y2);
                    y = _this.y2 - Math.round(_this.y1 / _this.x1 * (_this.frame - _this.x2));
                } else if (this.frame <  _this.x4) {
                    this.ctx.lineTo(_this.x1, _this.y1);
                    this.ctx.lineTo(_this.x2, _this.y2);
                    this.ctx.lineTo(_this.x3, _this.y3);
                    y = _this.y3 + Math.round(_this.y3 / (_this.x2 - _this.x1) * (_this.frame - _this.x3));
                } else if (this.frame < _this.x5) {
                    this.ctx.lineTo(_this.x1, _this.y1);
                    this.ctx.lineTo(_this.x2, _this.y2);
                    this.ctx.lineTo(_this.x3, _this.y3);
                    this.ctx.lineTo(_this.x4, _this.y4);
                    y = _this.y1 - Math.round(_this.y1 / _this.x1 * (_this.frame - _this.x4));
                } else {
                    this.frame = 0;
                    y = 0;
                    this.ctx.beginPath();
                }
                this.ctx.lineTo(_this.frame, y);
                this.ctx.stroke();
                this.aid = window.requestAnimationFrame(_this.loop);
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
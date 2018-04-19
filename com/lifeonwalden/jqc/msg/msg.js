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
 * tips
 * 
 */
(function ($) {
    $JqcLoader.importComponents('com.lifeonwalden.jqc', ['baseElement', 'uniqueKey', 'toolkit'])
        .importCss($JqcLoader.getCmpParentURL('com.lifeonwalden.jqc', 'msg').concat('css/msg.css'))
        .execute(function () {
            
            var DEFAULT_OPTIONS = {
                element: null,
                width: 800,
                data: [],
                speed: 1,
                adapter: {
                    text: 'text'
                },
            };
            
            $.jqcMsg = function (params) {
                var _this = this;
                this.options = Object.assign({}, DEFAULT_OPTIONS, params);
                this.el = this.options.element;
                this.frame = 0;
                this.aid = 0;
                this.width = 0;
                this.animate = animate.bind(this);
                render.call(this);
                setTimeout(function () {
                    reload.call(_this);               
                }, 0);
            }

            $.jqcMsg.prototype.add = function (tip) {
                var _this = this;
                var rawType = $.jqcToolkit.rawType(tip);
                if (rawType != 'Array' && rawType != 'Object') {
                    throw new Error('$.jqcMsg add function argument expect Array or Object.');
                }
                if (rawType === 'Array') {
                    this.options.data = this.options.data.concat(tip);
                }
                if (rawType === 'Object') {
                    this.options.data.push(tip);
                }
                reload.call(this);
            };

            function render() {
                if (!this.el) {
                    throw new Error('jqcMsg: element expect a jquery object.');
                }
                var _this = this;
                this.el.append(createTipsBox.call(_this));
            }

            function createTipsBox() {
                var _this = this;
                this.box = $('<div>')
                    .addClass('jqcMsg-box')
                    .width(_this.options.width)
                    .append(createScrollBox.call(_this));
                return this.box;
            }

            function createScrollBox() {
                var _this = this;
                this.scrollBox = $('<div>')
                    .addClass('jqcMsg-scrollBox')
                    .css('width', 9999);
                return this.scrollBox;
            }

            function createTipsItem(tip) {
                var _this = this;
                var _text = this.options.adapter.text
                var _close = $('<span>')
                    .addClass('jqcMsg-close')
                    .click(function (e) {
                        e.stopPropagation();
                        var len = _this.options.data.length;
                        var _parent = $(this).parent();
                        var _index = _parent.index();
                        if (_index >= len) {
                            _index = _index - len;
                            _this.frame -= parseInt(_parent.outerWidth());
                        }
                        _this.options.data.splice(_index, 1);
                        _this.box.off();
                        _parent.animate({
                            width: 0
                        }, 'fast', function () {
                            reload.call(_this);
                            setTimeout(function () {
                                cancelAnimationFrame(_this.aid);
                            }, 16);
                        });
                    });
                var _item = $('<div>')
                    .addClass('jqcMsg-item')
                    .text(tip[_text])
                    .click(function (e) {
                        e.stopPropagation();
                        _this.options.click && _this.options.click(tip);
                    }).append(_close);
                return _item;
            }

            function reload() {
                var _this = this;
                cancelAnimationFrame(_this.aid);
                this.scrollBox.empty();
                this.width = 0;
                this.options.data.forEach(function(item) {
                    var _item = createTipsItem.call(_this, item);
                    _this.scrollBox.append(_item);
                    _this.width += _item.outerWidth();
                });
                setTimeout(function () {
                    if (_this.width > _this.options.width) {
                        _this.scrollBox.width(Math.ceil(_this.width) * 2);
                        cloneItems.call(_this);
                        _this.animate();
                        bindEvent.call(_this);
                    } else {
                        _this.frame = 0;
                        _this.scrollBox.css('left', 0);
                    }
                }, 0);
            }

            function cloneItems() {
                var _this = this;
                var _clone = this.scrollBox.find('.jqcMsg-item').clone(true);
                this.scrollBox.append(_clone);
            }

            function animate(el) {
                var _this = this;
                this.frame += this.options.speed;
                if (this.frame >= this.width) {
                    this.frame = 0;
                }
                this.scrollBox.css('left', -_this.frame);
                this.aid = window.requestAnimationFrame(_this.animate);
            }

            function bindEvent() {
                var _this = this;
                this.box.off();
                this.box.on('mouseenter', function (e) {
                    cancelAnimationFrame(_this.aid);
                }).on('mouseleave', function (e) {
                    if (_this.width > _this.options.width) {
                        _this.animate();
                    }
                });
            }
        });
}(jQuery));
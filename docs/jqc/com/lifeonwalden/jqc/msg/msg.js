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
 * message
 * 
 */
(function ($) {
    $JqcLoader.importComponents('com.lifeonwalden.jqc', ['baseElement', 'uniqueKey', 'lang'])
        .importCss($JqcLoader.getCmpParentURL('com.lifeonwalden.jqc', 'msg').concat('css/msg.css'))
        .execute(function () {

            var DEFAULT_OPTIONS = {
                element: null,
                data: [],
                speed: 20,
                adapter: {
                    text: 'text'
                },
                onSelect: null
            };

            $.jqcMsg = function (params) {
                this.options = Object.assign({}, DEFAULT_OPTIONS, params);
                this.el = this.options.element;
                this.frame = 0;
                this.aid = 0; // animation event handler
                this.msgBoxGap = 5;
                this.lastTimeStamp = 0;
                render.call(this);
                this.animate = animate.bind(this);
                triggerAnimation.call(this);
                bindEvent.call(this);
            }

            $.jqcMsg.prototype.add = function (msg) {
                var _this = this;
                if (!msg) {
                    throw new Error('$.jqcMsg add function argument expect Array or Object.');
                }
                if (Array.isArray(msg)) {
                    msg.forEach(function (item) {
                        addMsg.call(_this, item);
                    });
                }
                if (typeof msg == 'Object') {
                    addMsg.call(_this, msg);
                }
                triggerAnimation.call(this);
            };

            function render() {
                if (!this.el) {
                    throw new Error('jqcMsg: element expect a jquery object.');
                }
                var _this = this;
                this.scrollBox = $('<div>').addClass('jqcMsg-scrollBox')
                this.el.addClass('jqcMsg-box').append(this.scrollBox);
                this.options.data.forEach(function (item) {
                    addMsg.call(_this, item);
                });
            }

            function addMsg(msg) {
                var _this = this;
                var _text = this.options.adapter.text
                var _close = $('<span>').attr('title', $.jqcLang.CLOSE)
                    .addClass('jqcMsg-close');
                var msgBox = $('<div>')
                    .addClass('jqcMsg-item')
                    .text(msg[_text]).append(_close);
                msgBox.data('bindData', msg);

                var scrollBoxWidth = _this.scrollBox.outerWidth()
                _this.scrollBox.append(msgBox).width(scrollBoxWidth + msgBox.outerWidth() + _this.msgBoxGap);
            }

            function closeMsg(msgBox, toClose = true) {
                var _this = this;
                if (!toClose) {
                    return;
                }
                var scrollBoxWidth = _this.scrollBox.outerWidth()
                var msgBoxWidth = msgBox.outerWidth();
                msgBox.remove();
                _this.scrollBox.width(scrollBoxWidth - msgBoxWidth - _this.msgBoxGap);
                triggerAnimation.call(_this);
            }

            function triggerAnimation() {
                var _this = this;
                window.cancelAnimationFrame(_this.aid);
                if (_this.el.width() < _this.scrollBox.outerWidth()) {
                    _this.animate();
                } else {
                    _this.frame = (_this.el.width() - _this.scrollBox.outerWidth()) / 2;
                    _this.scrollBox.css('left', _this.frame);
                }
            }

            function animate(timestamp) {
                var _this = this;
                if (timestamp - this.lastTimeStamp > this.options.speed) {
                    this.frame -= 1;
                    if (this.frame <= -1 * this.scrollBox.outerWidth()) {
                        this.frame = this.scrollBox.outerWidth() / 2;
                        this.scrollBox.css('left', _this.frame);

                        return;
                    } else {
                        var firstMsgBox = this.scrollBox.find('.jqcMsg-item').first();
                        if (Math.abs(this.scrollBox.position().left) > firstMsgBox.outerWidth()) {
                            this.scrollBox.append(firstMsgBox);
                            this.frame += firstMsgBox.outerWidth();
                        }
                    }
                    this.lastTimeStamp = timestamp;
                    this.scrollBox.css('left', _this.frame);
                }
                _this.aid = window.requestAnimationFrame(_this.animate);
            }

            function bindEvent() {
                var _this = this;
                this.el.off();
                this.el.on('mouseenter', function (e) {
                    window.cancelAnimationFrame(_this.aid);
                }).on('mouseleave', function (e) {
                    triggerAnimation.call(_this);
                }).on('click', '.jqcMsg-item', function (e) {
                    var eTarget = $(e.target);
                    if (eTarget.hasClass('jqcMsg-item')) {
                        _this.options.onSelect(eTarget.data('bindData'), closeMsg.bind(_this, eTarget));
                    } else if (eTarget.hasClass('jqcMsg-close')) {
                        closeMsg.call(_this, eTarget.parent(), true);
                    }
                    e.stopPropagation();
                });
            }
        });
}(jQuery));
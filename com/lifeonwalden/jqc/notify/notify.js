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
 * notification
 * 
 */
(function ($) {
    $JqcLoader.importComponents('com.lifeonwalden.jqc', ['dateUtil'])
        .importCss($JqcLoader.getCmpParentURL('com.lifeonwalden.jqc', 'notify').concat('css/notify.css'))
        .execute(function () {
            const defaultParams = {
                el: '',
                status: 'normal',
                data: [],
                position: 'left',
                adapter: {
                    title: 'title',
                    content: 'content',
                    time: function () {
                        return new Date();
                    }
                }
            };
            $.jqcNotify = function (params) {
                var adapter = {};
                Object.assign(adapter, defaultParams.adapter, params.adapter);
                Object.assign(this, defaultParams, params, {adapter: adapter});
                if (!this.el) {
                    throw new Error('jqcNotify: el参数非jquery对象。');
                }
                this.init();
                this.bindEvent();
            }
            $.jqcNotify.prototype.init = function () {
                var _this = this;
                this.el.addClass('jqcNotify-element');
                this.badge = $('<span>').addClass('jqcNotify-badge');
                this.el.append(this.badge);
                this.ctrBadge();
            }
            $.jqcNotify.prototype.bindEvent = function () {
                var _this = this;
                this.el.click(function (e) {
                    e.stopPropagation();
                    if (_this.status == 'normal') {
                        _this.open();
                    } else {
                        _this.close();
                    }
                });
                $(document).on('click.jqcNotify', function () {
                    if (_this.lock) {
                        return;
                    }
                    if (_this.status == 'active') {
                        _this.close();
                    }
                });
            }
            $.jqcNotify.prototype.open = function () {
                var _this = this;
                this.status = 'active';
                this.el.addClass('active');
                this.render();
                this.badge.hide();
            }
            $.jqcNotify.prototype.close = function () {
                var _this = this;
                this.status = 'normal';
                this.el.removeClass('active');
                this.container.remove();
                this.ctrBadge();
                if (this.onClose) {
                    setTimeout(function () {
                        _this.onClose.call(this);
                    }, 20);
                }
            }
            $.jqcNotify.prototype.render = function () {
                var _this = this;
                var _title = this.adapter.title;
                var _content = this.adapter.content;
                var _time = this.adapter.time;
                
                var pos = {};
                var offset = this.el.offset();
                pos.top = offset.top + this.el.outerHeight() + 8;
                if (this.position == 'right') {
                    pos.left = offset.left + this.el.outerWidth() - 300;
                } else {
                    pos.left = offset.left;
                }
                this.container = $('<div>').addClass('jqcNotify-container')
                    .css(pos);
                $('body').append(this.container);
                this.more = $('<div>').addClass('jqcNotify-more');
                var left = $('<div>').addClass('jqcNotfiy-more-left').text('通知');
                var right = null;
                if (this.onMore) {
                    right = $('<div>').addClass('jqcNotfiy-more-right');
                    this.more.css('cursor', 'pointer').click(function () {
                        _this.onMore.call(_this);
                    });
                }
                this.more.append(left, right);
                var len = this.data.length;
                if (this.tip) {
                    var str = this.tip.call(this, this.data);
                    var span = $('<span>').text(str);
                    left.append(span);
                }
                this.container.append(this.more);
                // 未读通知列表
                this.scrollBox = $('<div>').addClass('jqcNotify-scrollBox');
                this.scroller = $('<div>').addClass('jqcNotify-scroller');
                var notifyItems = $('<div>').addClass('jqcNotify-items');
                this.container.append(this.scrollBox);
                this.scrollBox.append(this.scroller, notifyItems);
                this.data.forEach(function(item) {
                    var $item = $('<div>');
                    // var $icon = $('<span>');
                    var $content = $('<div>').addClass('jqcNotify-item-content');
                    $item.append($content);
                    var $title = $('<div>').addClass('jqcNotify-item-title');
                    var t = $('<p>').text(item[_title]);
                    var timeValue = $.jqcDateUtil.format(_time(item), 'yyyy/MM/dd HH:mm:ss');
                    var time = $('<span>').text(timeValue);
                    $content.append($title);
                    $title.append(t, time);
                    var $notifyContent = $('<div>').addClass('jqcNotify-item-body').text(item[_content]);
                    $content.append($notifyContent);
                    notifyItems.append($item);
                    if (_this.onSelect) {
                        $item.css('cursor', 'pointer').click(function () {
                            _this.onSelect.call(_this, item);
                        });
                    }
                });
                setTimeout(function() {
                    var scrollHeight = notifyItems[0].scrollHeight;
                    if (scrollHeight > 450) {
                        var percent = (450 * 100 / scrollHeight).toFixed(4) + '%';
                        _this.scroller.css({
                            height: percent,
                            top: 0
                        }).show();
                        notifyItems.scroll(function (e) {
                            var top = ($(this).scrollTop() / scrollHeight * 100).toFixed(4) + '%';
                            _this.scroller.css({
                                top: top
                            });
                            
                        })
                    }
                    _this.scroller.mousedown(function (e) {
                        $(this).addClass('hover');
                        var top = $(this).position().top;
                        var height = $(this).height();
                        var y = e.pageY;
                        _this.lock = true;
                        $(document).on('mousemove.jqcNotify', function (e) {
                            var _y = e.pageY - y;
                            var _top = top + _y;
                            if (_top < 0) {
                                _top = 0;
                            }
                            if (_top + height > 450) {
                                _top = 450 - height;
                            }
                            _this.scroller.css({
                                top: _top
                            });
                            var stop = _top * scrollHeight / 450;
                            notifyItems.scrollTop(stop);
                        });
                        $(document).on('mouseup.jqcNotify', function (e) {
                            e.stopPropagation();
                            _this.scroller.removeClass('hover');
                            $(this).off('mousemove.jqcNotify');
                            $(this).off('mouseup.jqcNotify');
                            setTimeout(function() {
                                _this.lock = false;
                            }, 20);
                        })
                    });
                    // onOpen回调
                    _this.onOpen&& _this.onOpen.call(_this);
                }, 10);
                this.container.click(function (e) {
                    e.stopPropagation();
                });
            }
            $.jqcNotify.prototype.ctrBadge = function () {
                var _this = this;
                var len = this.data.length;
                if (len) {
                    len = len > 99 ? '99+' : len;
                    this.badge.text(len).show();
                } else {
                    this.badge.hide();
                }
            }
        });
}(jQuery));
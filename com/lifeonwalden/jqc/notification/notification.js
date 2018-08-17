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
    $JqcLoader.importComponents('com.lifeonwalden.jqc', ['baseElement', 'toolkit', 'zindex'])
        .importCss($JqcLoader.getCmpParentURL('com.lifeonwalden.jqc', 'notification').concat('css/notification.css'))
        .execute(function () {
            function Notification() {
                this.speed = 3000;
                this.stack = [];
                this.body = $('body');
                this.top = 16;
            }
            // 继承
            Notification.prototype = new $.jqcBaseElement();
            Notification.prototype.constructor = Notification;
            
            Notification.prototype.show = function (params) {
                var _this = this;
                createNotice.call(this, params);
            };

            function createNotice(params) {
                var _this = this;
                if (!params) {
                    throw new Error('$.jqcNotification: argument expects an object.');
                }
                var $notice = $('<div>')
                    .addClass('jqcNotification-box')
                    .css({
                        'z-index': $.jqcZindex.notification,
                        'top': _this.top
                    });
                if (params.type) {
                    $notice.addClass(params.type);
                    if (!params.title && !params.content) {
                        var placeholder = $('<div>')
                            .addClass('jqcNotification-placeholder');
                        $notice.append(placeholder);
                    }
                }
                if (params.title) {
                    var $title = $('<p>')
                        .addClass('jqcNotification-title')
                        .text(params.title)
                        .attr('title', params.title);
                    $notice.append($title);
                }
                if (params.content) {
                    var $content = $('<div>').addClass('jqcNotification-content').text(params.content);
                    $notice.append($content);
                }
                var $close = $('<span>')
                    .addClass('jqcNotification-close');
                $notice.append($close);
                $close.click(function () {
                    _this.stack = _this.stack.filter(i => (i != $notice));
                    $notice.remove();
                    toTop.call(_this);
                });
                this.body.append($notice);
                this.top += ($notice.outerHeight() + 16);
                this.stack.push($notice);
                if (params.duration === 0) {
                    return;
                }
                $notice.timer = setTimeout(function () {
                    _this.stack = _this.stack.filter(i => (i!= $notice));
                    $notice.animate({
                        height: 0
                    }, 500, function () {
                        $(this).remove();
                        toTop.call(_this);
                    });
                }, (params.duration || _this.speed));
                $notice.mouseenter(function () {
                    clearTimeout($notice.timer);
                }).mouseleave(function () {
                    $notice.timer = setTimeout(function () {
                        _this.stack = _this.stack.filter(i => (i!= $notice));
                        $notice.animate({
                            height: 0
                        }, 500, function () {
                            $(this).remove();
                            toTop.call(_this);
                        });
                    }, (params.duration || _this.speed));
                })
            }

            function toTop() {
                var _this = this;
                this.top = 16;
                this.stack.forEach(function(element) {
                    element.css('top', _this.top);
                    _this.top += (element.outerHeight() + 16);
                });
            }
            var notification = new Notification();
            $.jqcNotification = notification.show.bind(notification);
        });
}(jQuery));
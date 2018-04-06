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
 * enable dom node resizeable function
 */
(function ($) {
    $.jqcResizeable = function (param) {
        var defaultOptions = {
            dragHandler: null, // the drag handler
            resizeableBox: null, // the target resizeable box when drag
            minWidth: null, // the minimize width
            maxWidth: null, // the maximum width
        };
        var that = this;
        that.options = $.extend(true, {}, defaultOptions, param);
        var dom = $(document);

        that.options.dragHandler.addClass('jqcResizeable');
        that.options.dragHandler.on('mousedown.jqcResizeable', function (e) {
            if (e.target.className.indexOf('jqcResizeable') < 0) {
                return;
            }
            var windowWidth = $(window).width();
            var _position = that.options.resizeableBox.position();
            var startX = e.pageX;
            var oldWidth = that.options.resizeableBox.width();
            var maxAllowedChange = windowWidth - _position.left - oldWidth - 10;
            dom.on('mousemove.jqcResizeable', function (e) {
                var endX = e.pageX;
                var changeWidth = endX - startX;
                changeWidth = maxAllowedChange < changeWidth ? maxAllowedChange : changeWidth;

                var resizedWidth = oldWidth + changeWidth;
                if (that.options.minWidth && resizedWidth < that.options.minWidth) {
                    resizedWidth = that.options.minWidth;
                }
                if (that.options.maxWidth && that.options.maxWidth < resizedWidth) {
                    resizedWidth = that.options.maxWidth;
                }

                that.options.resizeableBox.width(resizedWidth);
            });

            dom.on('mouseup.jqcResizeable', function (e) {
                that.options.dragHandler.off('mouseup.jqcResizeable');
                dom.off('mousemove.jqcResizeable');
                dom.off('mouseup.jqcResizeable');
            });
        });
    };
}(jQuery));
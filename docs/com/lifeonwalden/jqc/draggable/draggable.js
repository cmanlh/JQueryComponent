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
 * enable dom node draggable function
 */
(function ($) {
    $.jqcDraggable = function (param) {
        var defaultOptions = {
            dragHandler: null, // the drag handler
            movableBox: null // the target moable box when drag
        };
        var that = this;
        that.options = $.extend(true, {}, defaultOptions, param);
        var dom = $(document);

        that.options.dragHandler.addClass('jqcDraggable');
        that.options.dragHandler.on('mousedown.jqcDraggable', function (e) {
            if (e.target.className.indexOf('jqcDraggable') < 0) {
                return;
            }
            var _scrollY = $(window).scrollTop(),
                _scrollX = $(window).scrollLeft();
            var _position = that.options.movableBox.position();
            var topGap = e.pageY - _scrollY - _position.top,
                leftGap = e.pageX - _scrollX - _position.left;
            dom.on('mousemove.jqcDraggable', function (e) {
                var movableBoxH = that.options.movableBox.outerHeight(),
                    movableBoxW = that.options.movableBox.outerWidth();

                var _top = e.pageY - _scrollY - topGap,
                    _left = e.pageX - _scrollX - leftGap;
                _top = _top < 0 ? 0 : _top;
                _left = _left < -movableBoxW + 50 ? -movableBoxW + 50 : _left;

                _top = (_top + movableBoxH) > window.innerHeight ? window.innerHeight - movableBoxH : _top;
                _left = (_left + movableBoxW) > window.innerWidth ? window.innerWidth - movableBoxW : _left;

                that.options.movableBox.css('top', _top);
                that.options.movableBox.css('left', _left);
            });

            that.options.dragHandler.on('mouseup.jqcDraggable', function (e) {
                that.options.dragHandler.off('mouseup.jqcDraggable');
                dom.off('mousemove.jqcDraggable');
            });
        });
    };
}(jQuery));
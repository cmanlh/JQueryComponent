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
 * ui blocker
 */
(function ($) {
    $JqcLoader.importComponents('com.lifeonwalden.jqc', ['baseElement', 'zindex']).execute(function () {
        const BLOCKER_CACHE = [];
        $.jqcBlocker = function (param) {
            var that = BLOCKER_CACHE.pop();
            if (that) {
                return that;
            }

            if (arguments.length > 0) {
                $.jqcBaseElement.apply(this, arguments);
            }

            that = this;
            that.ui = $("<div style='display:none;position:fixed;background-color:#777777;opacity: 0.1;filter: alpha(opacity=10);top:0px;left:0px;'>");

            $(window).on('resize.jqcBlocker', function (e) {
                that.resize();
            });
            $('body').append(that.ui);
        };

        $.jqcBlocker.prototype = new $.jqcBaseElement();
        $.jqcBlocker.prototype.constructor = $.jqcBlocker;
        $.jqcBlocker.prototype.resize = function () {
            var that = this;
            that.ui.width(window.innerWidth);
            that.ui.height(window.innerHeight);
        };
        $.jqcBlocker.prototype.show = function () {
            var that = this;
            that.zidex = $.jqcZindex.popupMgr.fetchIndex();
            that.ui.css('z-index', that.zidex);
            that.resize();
            that.ui.show();
        }
        $.jqcBlocker.prototype.close = function () {
            var that = this;
            that.ui.hide();
            $.jqcZindex.popupMgr.returnIndex(that.zidex);
            BLOCKER_CACHE.push(that);
        };
        $.jqcBlocker.prototype.addListener = function (eventType, handler) {
            var that = this;
            that.ui.on(eventType, handler);
        };
        $.jqcBlocker.prototype.removeListener = function (eventType) {
            var that = this;
            that.ui.off(eventType);
        };
    });
}(jQuery));
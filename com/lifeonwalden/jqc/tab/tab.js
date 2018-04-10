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
 * Tab
 */
(function ($) {
    $JqcLoader.importComponents('com.lifeonwalden.jqc', ['baseElement', 'uniqueKey', 'lang', 'zindex'])
        .importCss($JqcLoader.getCmpParentURL('com.lifeonwalden.jqc', 'tab').concat('css/tab.css'))
        .execute(function () {
            $.jqcTab = function (params) {
                const DEFAULT_OPTIONS = {
                    element: null, // container for tabF
                    position: 'relative'
                };
                if (arguments.length > 0) {
                    $.jqcBaseElement.apply(this, arguments);
                }
                this.options = $.extend(true, {}, DEFAULT_OPTIONS, params);
                this.typeName = 'jqcTab';
                this.elementId = 'jqc'.concat($.jqcUniqueKey.fetchIntradayKey());

                this.el = this.options.element;
                this.el.attr($.jqcBaseElement.JQC_ELEMENT_TYPE, this.typeName);
                this.el.attr($.jqcBaseElement.JQC_ELEMENT_ID, this.elementId);
                this.el.css('position', this.options.position);

                initRender.call(this);
            };

            $.jqcTab.prototype = new $.jqcBaseElement();
            $.jqcTab.prototype.constructor = $.jqcTab;

            function initRender() {
                var _this = this;
                _this.container = $('<div>').addClass('jqcTabContainer');
                _this.moreBtn = $('<span>').addClass('jqcTabMoreContainer');
                _this.moreContainer = $('<div>').addClass('jqcTabMoreContainer');

                _this.container.append(_this.moreBtn).append(_this.moreContainer);
            }

            function TabPanel(param) {
                this.id = param.id;
                this.tab = $('<span>').addClass('jqcTabInactive').addClass('jqcTabActive').text(param.title);
                this.close = $('<span>').addClass('jqcTabClose');
                this.tab.append(this.close);
                this.panel = $('<div>').addClass('jqcTabPanel');
            }

            TabPanel.prototype.remove = function () {
                this.tab.remove();
                this.panel.remove();
            }

            TabPanel.prototype.inactive = function () {
                this.tab.removeClass('jqcTabActive');
                this.panel.fadeOut();
            }

            TabPanel.prototype.active = function () {
                this.tab.addClass('jqcTabActive');
                this.panel.fadeIn();
            }
        });
}(jQuery));
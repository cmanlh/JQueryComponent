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
    $JqcLoader.importComponents('com.lifeonwalden.jqc', ['baseElement', 'uniqueKey', 'lang'])
        .importCss($JqcLoader.getCmpParentURL('com.lifeonwalden.jqc', 'tab').concat('css/tab.css'))
        .execute(function () {
            const DEFAULT_OPTIONS = {
                element: null, // container for tabF
                position: 'relative'
            };
            $.jqcTab = function (params) {
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
                this.activeOne = null;
                this.hasMore = false;
                this.index = new Map();

                initRender.call(this);
                eventBind.call(this);
            };

            $.jqcTab.prototype = new $.jqcBaseElement();
            $.jqcTab.prototype.constructor = $.jqcTab;
            $.jqcTab.prototype.add = function (param) {
                if (this.index.has(param.id)) {
                    reActive.call(this, param.id);
                } else {
                    if (this.activeOne) {
                        this.activeOne.inactive();
                    }
                    this.activeOne = new TabPanel({
                        owner: this,
                        id: param.id,
                        title: param.title,
                        content: param.content
                    });
                    layoutTabAfterAdd.call(this);

                    if (param.afterRender) {
                        param.afterRender(this.activeOne.getPanel());
                    }
                }
            };

            function eventBind() {
                var _this = this;
                this.container.on('click.tabClose', '.jqcTabClose', function (e) {
                    e.stopPropagation();
                    remove.call(_this, $(e.target).attr('closeId'));
                });

                this.container.on('click.tab', '.jqcTabInactive', function (e) {
                    reActive.call(_this, $(e.target).attr('tabId'));
                });

                this.moreBtn.on('click.moreBtn', function (e) {
                    e.stopPropagation();
                    _this.moreContainer.toggle();
                });

                this.moreBtn.on('mouseover.tab', function (e) {
                    _this.moreContainer.show();
                });
            }

            function remove(id) {
                var toClosedOne = this.index.get(id);
                var isActive = toClosedOne.getStatus();
                toClosedOne.remove();
                var firstOne = this.container.find('>.jqcTabInactive:first');
                if (firstOne.length == 0) {
                    return;
                } else {
                    if (isActive) {
                        this.activeOne = this.index.get(firstOne.attr('tabId'));
                        this.activeOne.active();
                    }
                    layoutTabAfterRemove.call(this);
                }
            }

            function reActive(id) {
                this.activeOne.inactive();
                this.activeOne = this.index.get(id);
                this.activeOne.active();
                if (this.activeOne.getTab().parent().hasClass('jqcTabMoreContainer')) {
                    this.container.prepend(this.activeOne.getTab());
                    layoutTabAfterAdd.call(this);
                }
            };

            function layoutTabAfterAdd() {
                var lastTab = this.container.find('>.jqcTabInactive:last');
                if ((lastTab.position().left + lastTab.outerWidth() + 64) < this.container.width()) {
                    return;
                }

                if (!this.hasMore) {
                    this.moreBtn.show();
                    this.hasMore = true;
                }
                this.moreContainer.prepend(lastTab);
                layoutTabAfterAdd.call(this);
            }

            function layoutTabAfterRemove() {
                if (false == this.hasMore) {
                    return;
                }

                var firstMoreTab = this.moreContainer.find('>.jqcTabInactive:first');
                var lastTab = this.container.find('>.jqcTabInactive:last');
                if ((lastTab.position().left + lastTab.outerWidth() + 64 + firstMoreTab.outerWidth()) >= this.container.width()) {
                    return;
                }

                this.container.append(firstMoreTab);
                if (this.moreContainer.find('>.jqcTabInactive').length == 0) {
                    this.moreBtn.hide();
                    this.hasMore = false;
                } else {
                    layoutTabAfterRemove.call(this);
                }
            }

            function initRender() {
                var _this = this;
                this.container = $('<div>').addClass('jqcTabContainer');
                this.moreBtn = $('<span>').addClass('jqcTabMoreBtn').attr('title', $.jqcLang.TAB_MORE_CLOSE).hide();
                this.moreContainer = $('<div>').addClass('jqcTabMoreContainer').hide();

                this.container.append(this.moreBtn).append(this.moreContainer);

                this.el.append(this.container);
            }

            function TabPanel(param) {
                this.owner = param.owner;
                this.id = ''.concat(param.id);
                this.isActive = true;
                this.tab = $('<span>').addClass('jqcTabInactive').addClass('jqcTabActive').attr('tabId', this.id).text(param.title);
                this.close = $('<span>').attr('closeId', this.id).addClass('jqcTabClose');
                this.tab.append(this.close);
                this.panel = $('<div>').addClass('jqcTabPanel').append(param.content);

                this.owner.container.prepend(this.tab);
                this.owner.el.append(this.panel);
                this.owner.index.set(this.id, this);
            }

            TabPanel.prototype.remove = function () {
                this.tab.remove();
                this.panel.remove();
                this.owner.index.delete(this.id);
            };

            TabPanel.prototype.inactive = function () {
                this.tab.removeClass('jqcTabActive');
                this.panel.hide();
                this.isActive = false;
            };

            TabPanel.prototype.active = function () {
                this.tab.addClass('jqcTabActive');
                this.panel.fadeIn();
                this.isActive = true;
            };

            TabPanel.prototype.getStatus = function () {
                return this.isActive;
            };

            TabPanel.prototype.getPanel = function () {
                return this.panel;
            };

            TabPanel.prototype.getTab = function () {
                return this.tab;
            };
        });
}(jQuery));
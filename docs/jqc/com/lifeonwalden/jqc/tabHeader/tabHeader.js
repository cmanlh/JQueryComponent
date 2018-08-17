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
 * tabHeader
 * 
 */
(function ($) {
    $JqcLoader.importComponents('com.lifeonwalden.jqc', ['baseElement', 'uniqueKey', 'search'])
        .importCss($JqcLoader.getCmpParentURL('com.lifeonwalden.jqc', 'tabHeader').concat('css/tabHeader.css'))
        .execute(function () {
            var DEFAULT_OPTIONS = {
                element: null,
                onSelect: null,
                onAddTab: null,
                onClose: null,
                search: null,
                defaultTab: null
            };
            $.jqcTabHeader = function (params) {
                this.tabs = [];
                this.options = $.extend(true, {}, DEFAULT_OPTIONS, params);
                this.typeName = 'jqcTabHeader';
                this.elementId = 'jqc'.concat($.jqcUniqueKey.fetchIntradayKey());
                this.el = this.options.element || null;
                this.width = 0;
                this.render();
            }
            $.jqcTabHeader.prototype = new $.jqcBaseElement();
            $.jqcTabHeader.prototype.constructor = $.jqcTabHeader;
            $.jqcTabHeader.prototype.render = function () {
                var _this = this;
                if (!this.el) { throw new Error('argument(elemtnt) expect a jquery object.') }
                this.slideBox = $('<div></div>')
                    .addClass('jqcTabHeader-slideBox');
                this.middleBox = $('<div></div>')
                    .addClass('jqcTabHeader-middleBox')
                    .append(this.slideBox);
                this.prev = $('<span>')
                    .addClass('jqcTabHeader-prev jqcIcon-prev')
                    .click(function () {
                       _this.toPrev(); 
                    });
                this.next = $('<span>')
                    .addClass('jqcTabHeader-next jqcIcon-next')
                    .click(function () {
                        _this.toNext();
                    });
                this.box = $('<div>')
                    .addClass('jqcTabHeader-main')
                    .append(this.middleBox)
                    .append(this.prev)
                    .append(this.next);
                this.container = $('<div>')
                    .addClass('jqcTabHeader-container');
                this.el
                    .attr($.jqcBaseElement.JQC_ELEMENT_TYPE, this.typeName)
                    .attr($.jqcBaseElement.JQC_ELEMENT_ID, this.elementId)
                    .addClass('jqcTabHeaderBox')
                    .append(this.box)
                    .append(this.container);
                if (this.options.search) {
                    this.searchBox = $('<div>')
                        .addClass('jqcTabHeader-search');
                    this.el.append(_this.searchBox);
                    var search = new $.jqcSearch(Object.assign(_this.options.search, {
                        element: _this.searchBox
                    }));
                    this.box.css('margin-right', 200);
                }
                if (this.options.defaultTab) {
                    this.addTab(this.options.defaultTab.tabName, this.options.defaultTab.html);
                }
            };
            $.jqcTabHeader.prototype.hasTab = function (tabName) {
                var _this = this;
                return this.tabs.filter(item => item === tabName).length ? true : false;
            };
            $.jqcTabHeader.prototype.addTab = function (tabName, html) {
                var _this = this;
                if (!tabName) {
                    return;
                }
                if (!this.hasTab(tabName)) {
                    this.tabs.push(tabName);
                    var _uuid = uuid(8);
                    var _closeBtn = $('<span></span>')
                        .addClass('jqcIcon jqcIcon-close')
                        .click(function (e) {
                            e.stopPropagation();
                            if (_this.tabs.length === 1) {
                                $(this).parent('.jqcTabHeader-item')
                                    .trigger('click');
                                return;
                            }
                            var _item = $(this).parent('.jqcTabHeader-item');
                            if (_item.hasClass('jqcTabHeader-item-active')) {
                                var _next = _item.next('.jqcTabHeader-item');
                                if (_next.length) {
                                    _next.trigger('click');
                                } else {
                                    _item.prev('.jqcTabHeader-item')
                                        .trigger('click');
                                }
                            }
                            _this.container.find('[data-uid='+ _uuid +']')
                                .remove();
                            var _width = _item.width() + 31;
                            _this.width -= _width;
                            var _left = parseInt(_this.slideBox.css('left'));
                            if (_left + _width < 0) {
                                _this.slideBox.css('left', _left + _width);
                            } else {
                                _this.slideBox.css('left', 0);
                            }
                            _item.remove();
                            _this.slide();
                            _this.tabs = _this.tabs.filter(item => (item != tabName));
                        });
                    var _tab = $('<div>' + tabName + '</div>')
                        .attr('data-label', tabName)
                        .attr('data-uid', _uuid)
                        .addClass('jqcTabHeader-item jqcTabHeader-item-active')
                        .append(_closeBtn)
                        .click(function (e) {
                            $(this)
                                .addClass('jqcTabHeader-item-active')
                                .siblings()
                                .removeClass('jqcTabHeader-item-active');
                            _this.container.find('[data-uid=' + _uuid + ']')
                                .show()
                                .siblings()
                                .hide();
                            _this.slideToActive(tabName);
                        });
                    this.slideBox.append(_tab);
                    var _container = $('<div>')
                        .attr('data-uid', _uuid)
                        .append($(html));
                    this.container.append(_container);
                    _container.show()
                        .siblings()
                        .hide();
                    var _width = _this.slideBox.width();
                    this.width += _tab.width() + 31;
                    this.slideBox.css('width', _width + _this.width);
                    this.slide();
                    _tab.trigger('click');
                } else {
                    _this.showTab(tabName);
                }
            };
            $.jqcTabHeader.prototype.toPrev = function () {
                var _prev = this.middleBox.find('.jqcTabHeader-item-active')
                    .prev('.jqcTabHeader-item')
                    .trigger('click');
                if (!_prev.length) {
                    return this;
                }
                var _offsetLeft = _prev.offset().left;
                var _boxOffsetLeft = this.middleBox.offset().left;
                if (_offsetLeft < _boxOffsetLeft) {
                    var _left = parseInt(this.slideBox.css('left'));
                    this.slideBox.css('left', _left - _offsetLeft + _boxOffsetLeft);
                }
                return this;
            };
            $.jqcTabHeader.prototype.toNext = function () {
                var _next = this.middleBox.find('.jqcTabHeader-item-active')
                    .next('.jqcTabHeader-item')
                    .trigger('click');
                if (!_next.length) {
                    return this;
                }
                var _width = _next.width() + 31;
                var _offsetLeft = _next.offset().left;
                var _boxWidth = this.middleBox.width();
                var _boxOffsetLeft = this.middleBox.offset().left;
                var _move = _width + _offsetLeft - _boxWidth - _boxOffsetLeft;
                if (_move > 0) {
                    var _left = parseInt(this.slideBox.css('left'));
                    this.slideBox.css('left', _left - _move);
                }
            };
            $.jqcTabHeader.prototype.showTab = function (tabName) {
                this.middleBox.find('[data-label=' + tabName + ']')
                    .trigger('click');
            };
            $.jqcTabHeader.prototype.slide = function () {
                var _g = this.width - this.middleBox.width();
                if (_g > 0) {
                    this.prev.show();
                    this.next.show();
                } else {
                    this.prev.hide();
                    this.next.hide();
                    this.slideBox.css('left', 0);
                }
            };
            $.jqcTabHeader.prototype.slideToActive = function (label) {
                var _this = this;
                var _appointed;
                _this.slide();
                if (label) {
                    _appointed = this.middleBox.find('[data-label=' + label + ']');
                } else {
                    _this.slideBox.css('left', 0);
                    _appointed = this.middleBox.find('.jqcTabHeader-item-active');
                }
                if (!_appointed.length) {
                    return this;
                }
                var _width = _appointed.width() + 31;
                var _offsetLeft = _appointed.offset().left;
                var _boxWidth = this.middleBox.width();
                var _boxOffsetLeft = this.middleBox.offset().left;
                var _moveRight = _width + _offsetLeft - _boxWidth - _boxOffsetLeft;
                var _moveLeft = _offsetLeft - _boxOffsetLeft;
                var _left = parseInt(this.slideBox.css('left'));
                if (_moveLeft < 0) {
                    this.slideBox.css('left', _left - _moveLeft);    
                }
                if (_moveRight > 0) {
                    this.slideBox.css('left', _left - _moveRight);
                }
            };
            function uuid(len) {
                var arr = [];
                for (var index = 0; index < len; index++) {
                    arr.push((Math.random() * 16 | 0).toString(16));
                }
                return arr.join('');
            }
        });
}(jQuery));
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
                if (this.options.search) {
                    this.el.css('margin-right', 200);
                    this.searchBox = $('<div>')
                        .addClass('jqcTabHeader-search');
                    this.el.append(_this.searchBox);
                    var search = new $.jqcSearch(Object.assign(_this.options.search, {
                        element: _this.searchBox,
                        onSelect: function (data) {
                            _this.addTab(data);
                        }
                    }));
                }
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
                this.el
                    .attr($.jqcBaseElement.JQC_ELEMENT_TYPE, this.typeName)
                    .attr($.jqcBaseElement.JQC_ELEMENT_ID, this.elementId)
                    .addClass('jqcTabHeaderBox')
                    .append(this.middleBox)
                    .append(this.prev)
                    .append(this.next);
                if (this.options.defaultTab) {
                    this.addTab(this.options.defaultTab);
                }
            };
            $.jqcTabHeader.prototype.addTab = function (tab) {
                var _this = this;
                var isExsit = this.tabs.filter(item => (item.label == tab.label)).length;
                if (!isExsit) {
                    this.tabs.push(tab);
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
                            if (_this.options.onClose) {
                                _this.options.onClose(tab);
                            }
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
                            _this.tabs = _this.tabs.filter(item => (item.label != tab.label));
                        });
                    var _tab = $('<div>' + tab.label + '</div>')
                        .attr('data-label', tab.label)
                        .addClass('jqcTabHeader-item jqcTabHeader-item-active')
                        .append(_closeBtn)
                        .click(function (e) {
                            $(this)
                                .addClass('jqcTabHeader-item-active')
                                .siblings()
                                .removeClass('jqcTabHeader-item-active');
                            if (_this.options.onSelect) {
                                _this.options.onSelect(tab);
                            }
                            _this.slideToActive(tab.label);
                        });
                    this.slideBox.append(_tab);
                    var _width = _this.slideBox.width();
                    this.width += _tab.width() + 31;
                    this.slideBox.css('width', _width + _this.width);
                    this.slide();
                    if (this.options.onAddTab) {
                        this.options.onAddTab(tab);
                    }
                    _tab.trigger('click');
                } else {
                    _this.toAppointed(tab.label);
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
                    console.log(_left);
                    this.slideBox.css('left', _left - _move);
                }
            };
            $.jqcTabHeader.prototype.toAppointed = function (label) {
                var _appointed = this.middleBox.find('[data-label=' + label + ']')
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
                }
            };
            $.jqcTabHeader.prototype.slideToActive = function (label) {
                var _appointed = this.middleBox.find('[data-label=' + label + ']');
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

        });
}(jQuery));
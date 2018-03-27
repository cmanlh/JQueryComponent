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
 * contextmenu
 * 
 * Dependent on
 *  + jqc.baseElement.js
 *  + jqc.uniqueKey.js
 */
(function ($) {
    if (undefined == $.jqcBaseElement || undefined == $.jqcUniqueKey) {
        throw new Error("Need library : jqc.baseElement.js, jqc.uniqueKey.js");
    }

    var DEFAULT_OPTIONS = {
        element: null,
        selectorId: '',
        selector: '',
        max: 5,
        onSelect: null,
    };
    $.jqcContextMenu = function (params) {
        if (arguments.length > 0) {
            $.jqcBaseElement.apply(this, arguments);
        }
        this.selectorId = '';
        this.selector = null;
        this.options = $.extend(true, {}, DEFAULT_OPTIONS, params);
        this.el = this.options.element;
        this.el.addClass('jqcContextMenu');
        this.typeName = 'jqcContextMenu';
        this.elementId = 'jqc'.concat($.jqcUniqueKey.fetchIntradayKey());
        this.el.attr($.jqcBaseElement.JQC_ELEMENT_TYPE, this.typeName);
        this.el.attr($.jqcBaseElement.JQC_ELEMENT_ID, this.elementId);
        this.maxHeight = this.options.max * 32;
        this.renderFirstLevel();
        
    };
    $.jqcContextMenu.prototype = new $.jqcBaseElement();
    $.jqcContextMenu.prototype.constructor = $.jqcContextMenu;
    $.jqcContextMenu.prototype.renderFirstLevel = function () {
        var _this = this;
        this.contextMenuBox = $('<div class="jqcContextMenuBox"></div>')
            .attr('data-id', _this.elementId);
        this.contextMenuFirstLevel = $('<div class="jqcContextMenuLeftBox"></div>').css('max-height', _this.maxHeight);
        var _fakeScrollBox = $('<div class="fakeScrollBox"></div>').css('max-height', _this.maxHeight);
        _fakeScrollBox.append(_this.contextMenuFirstLevel);
        this.contextMenuBox.append(_fakeScrollBox);
        this.options.operations.forEach(function(element) {
            var _el = $('<div class="jqcContextMenu-item">' + element.label + '</div>');
            _el.attr('eventId', element.id);
            if (element.child) {
                _el.on('mouseenter', function (e) {
                    e.stopPropagation();
                    $(this).addClass('jqcContextMenu-active').siblings().removeClass('jqcContextMenu-active');
                    _this.renderSecondLevel(element.child);
                }).click(function (e) {
                    e.stopPropagation();
                });
            } else {
                _el.click(function (e) {
                    e.stopPropagation();
                    if (_this.options.onSelect) {
                        _this.options.onSelect.call(_this.selector, {
                            selectorId: _this.selectorId,
                            eventId: element.id
                        });
                        _this.contextMenuBox.hide();
                        _this.selectorId = '';
                    }
                }).on('mouseenter', function (e) {
                    e.stopPropagation();
                    _this.destroySecondLevel();
                    _this.contextMenuBox.find('.jqcContextMenu-active').removeClass('jqcContextMenu-active');
                });
            }
            _this.contextMenuFirstLevel.append(_el);
        });
        if (this.options.operations.length > this.options.max) {
            this.slide1 = $('<span><span>').addClass('slide slide1');
            var _height = parseInt(_this.options.max * _this.maxHeight / this.options.operations.length) ;
            this.slide1.height(_height);
            this.contextMenuBox.append(_this.slide1);
        }
        $('body').append(_this.contextMenuBox);
        this.bindEvent();
    };
    $.jqcContextMenu.prototype.bindEvent = function () {
        var _this = this;
        if (this.slide1) {
            var _height = this.slide1.height();
            this.contextMenuFirstLevel.scroll(function (e) {
                e.stopPropagation();
                var _scrollTop = $(this).scrollTop();
                var _top = (_this.maxHeight + _scrollTop) * _this.maxHeight / 32 / _this.options.operations.length - _height;
                _this.slide1.css('top', _top);
            });
            this.slide1.on('mousedown click', function (e) {
                e.stopPropagation();
                var _parentOffsetTop = _this.contextMenuBox.offset().top;
                var _y = e.pageY;
                var _offsetTop = _this.slide1.offset().top - _parentOffsetTop;
                $(document).on('mousemove', function (e) {
                    var _top = e.pageY - _y + _offsetTop;
                    _top = _top < 0 ? 0 : _top;
                    _top = _top + _height > _this.maxHeight ? _this.maxHeight - _height : _top;
                    _this.slide1.css('top', _top); 
                    var _scrollTop = (_top + _height) * _this.options.operations.length * 32 / _this.maxHeight - _this.maxHeight;
                    _this.contextMenuFirstLevel.scrollTop(_scrollTop);
                });
            });
            $(document).on('mouseup', function () {
                $(this).off('mousemove');
            });
        }
        this.contextMenuBox.on('contextmenu', function (e) {
            e.preventDefault();
        });

        this.el.on('contextmenu', _this.options.selector, function (e) {
            e.preventDefault();
            var _selectorId = $(this).attr(_this.options.selectorId);
            if (_selectorId === 0 || _selectorId) {
                _this.selectorId = _selectorId;
                _this.selector = e.currentTarget;
                _this.contextMenuShow(e);  
            } else  {
                _this.contextMenuBox.hide();
            }
        });
    };
    $.jqcContextMenu.prototype.contextMenuShow = function (e) {
        var _this = this;
        this.destroySecondLevel();
        this.contextMenuBox
            .find('.jqcContextMenu-active')
            .removeClass('jqcContextMenu-active');
        var _offset = _this.el.offset().left + _this.el.width();
        _this.contextMenuBox.css({
            'top': e.pageY,
            'left': (e.pageX <= _offset - 320 ? e.pageX : e.pageX - 158)
        }).show();
        this.contextMenuFirstLevel.scrollTop(0);
        this.slide1 && this.slide1.css('top', 0);
        $(document).off('click');
        $(document).on('click', function () {
            _this.contextMenuBox.hide();
        });  
    };
    $.jqcContextMenu.prototype.destroySecondLevel = function () {
        var _this = this;
        this.destroyThirdLevel();
        this.contextMenuBox
            .removeClass('jqcContextMenuDoubleSize')
            .find('.fakeScrollBox2')
            .remove();
        this.contextMenuBox
            .find('.slide2')
            .remove();
    };
    $.jqcContextMenu.prototype.renderSecondLevel = function (child, parentLabel) {
        var _this = this;
        this.destroyThirdLevel();
        this.contextMenuBox.addClass('jqcContextMenuDoubleSize');
        this.contextMenuSecondLevel = $('<div class="jqcContextMenuRightBox"></div>').css('max-height', _this.maxHeight);
        var _fakeScrollBox = $('<div class="fakeScrollBox fakeScrollBox2"></div>').css('max-height', _this.maxHeight);
        _fakeScrollBox.append(this.contextMenuSecondLevel);
        this.contextMenuBox.append(_fakeScrollBox);
        child.forEach(function(data) {
            var _el = $('<div class="jqcContextMenu-item">' + data.label + '</div>');
            if (data.child) {
                _el.on('mouseenter', function (e) {
                    e.stopPropagation();
                    $(this).addClass('jqcContextMenu-active').siblings().removeClass('jqcContextMenu-active');
                    _this.renderThirdLevel(data.child);
                }).click(function (e) {
                    e.stopPropagation();
                }); 
            } else {
                _el.click(function (e) {
                    e.stopPropagation();
                    if (_this.options.onSelect) {
                        _this.options.onSelect.call(_this.selector, {
                            selectorId: _this.selectorId,
                            eventId: data.id
                        });
                        _this.contextMenuBox.hide();
                        _this.selectorId = '';
                    }
                    _this.destroySecondLevel();
                }).on('mouseenter', function (e) {
                    e.stopPropagation();
                    _this.destroyThirdLevel();
                    $(this).siblings().removeClass('jqcContextMenu-active');
                });
            }
                
            _this.contextMenuSecondLevel.append(_el);
        });
        if (child.length > this.options.max) {
            this.slide2 = $('<span><span>').addClass('slide slide2');
            var _height = parseInt(_this.options.max * _this.maxHeight / child.length) ;
            this.slide2.height(_height);
            this.contextMenuBox.append(_this.slide2);
        }
        if (this.slide2) {
            var _height = this.slide2.height();
            this.contextMenuSecondLevel.scroll(function (e) {
                e.stopPropagation();
                var _scrollTop = $(this).scrollTop();
                var _top = (_this.maxHeight + _scrollTop) * _this.maxHeight / 32 / child.length - _height;
                _this.slide2.css('top', _top);
            });
            this.slide2.on('mousedown click', function (e) {
                e.stopPropagation();
                var _parentOffsetTop = _this.contextMenuBox.offset().top + 1;
                var _y = e.pageY;
                var _offsetTop = _this.slide2.offset().top - _parentOffsetTop;
                $(document).on('mousemove', function (e) {
                    var _top = e.pageY - _y + _offsetTop;
                    _top = _top < 0 ? 0 : _top;
                    _top = _top + _height > _this.maxHeight ? _this.maxHeight - _height : _top;
                    _this.slide2.css('top', _top); 
                    var _scrollTop = (_top + _height) * child.length * 32 / _this.maxHeight - _this.maxHeight;
                    _this.contextMenuSecondLevel.scrollTop(_scrollTop);
                });
            });
            $(document).on('mouseup', function () {
                $(this).off('mousemove');
            });
        }
    };
    $.jqcContextMenu.prototype.destroyThirdLevel = function () {
        var _this = this;
        this.contextMenuBox
            .removeClass('jqcContextMenuTrebleSize')
            .find('.fakeScrollBox3')
            .remove();
        this.contextMenuBox
            .find('.slide3')
            .remove();
    };
    $.jqcContextMenu.prototype.renderThirdLevel = function (child, parentLabel) {
        var _this = this;
        this.contextMenuBox.addClass('jqcContextMenuTrebleSize');
        this.contextMenuBox.find('.fakeScrollBox3').remove();
        this.contextMenuBox.find('.slide3').remove();
        this.contextMenuThirdLevel = $('<div class="jqcContextMenuThirdLevelBox"></div>').css('max-height', _this.maxHeight);
        var _fakeScrollBox = $('<div class="fakeScrollBox fakeScrollBox3"></div>').css('max-height', _this.maxHeight);
        _fakeScrollBox.append(this.contextMenuThirdLevel);
        this.contextMenuBox.append(_fakeScrollBox);
        child.forEach(function(data) {
            var _el = $('<div class="jqcContextMenu-item">' + data.label + '</div>');
            _el.click(function (e) {
                e.stopPropagation();
                if (_this.options.onSelect) {
                    _this.options.onSelect.call(_this.selector, {
                        selectorId: _this.selectorId,
                        eventId: data.id
                    });
                    _this.contextMenuBox.hide();
                    _this.selectorId = '';
                }
                _this.destroySecondLevel();
            });
            _this.contextMenuThirdLevel.append(_el);
        });
        if (child.length > this.options.max) {
            this.slide3 = $('<span><span>').addClass('slide slide3');
            var _height = parseInt(_this.options.max * _this.maxHeight / child.length) ;
            this.slide3.height(_height);
            this.contextMenuBox.append(_this.slide3);
        }
        if (this.slide3) {
            var _height = this.slide3.height();
            this.contextMenuThirdLevel.scroll(function (e) {
                e.stopPropagation();
                var _scrollTop = $(this).scrollTop();
                var _top = (_this.maxHeight + _scrollTop) * _this.maxHeight / 32 / child.length - _height;
                _this.slide3.css('top', _top);
            });
            this.slide3.on('mousedown click', function (e) {
                e.stopPropagation();
                var _parentOffsetTop = _this.contextMenuBox.offset().top + 1;
                var _y = e.pageY;
                var _offsetTop = _this.slide3.offset().top - _parentOffsetTop;
                $(document).on('mousemove', function (e) {
                    var _top = e.pageY - _y + _offsetTop;
                    _top = _top < 0 ? 0 : _top;
                    _top = _top + _height > _this.maxHeight ? _this.maxHeight - _height : _top;
                    _this.slide3.css('top', _top); 
                    var _scrollTop = (_top + _height) * child.length * 32 / _this.maxHeight - _this.maxHeight;
                    _this.contextMenuThirdLevel.scrollTop(_scrollTop);
                });
            });
            $(document).on('mouseup', function () {
                $(this).off('mousemove');
            });
        }
    };
}(jQuery));
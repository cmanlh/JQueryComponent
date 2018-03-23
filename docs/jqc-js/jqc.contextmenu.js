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
        var _fakeScollBox = $('<div class="fakeScollBox"></div>').css('max-height', _this.maxHeight);
        _fakeScollBox.append(_this.contextMenuFirstLevel);
        this.contextMenuBox.append(_fakeScollBox);
        this.options.operations.forEach(function(element) {
            var _el = $('<div>' + element.label + '</div>');
            _el.attr('eventId', element.id);
            _el.click(function () {
                if (_this.options.onSelect) {
                    _this.options.onSelect.call(_this.selector, {
                        selectorId: _this.selectorId,
                        eventId: element.id
                    });
                    _this.contextMenuBox.hide();
                    _this.selectorId = '';
                }
            });
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
            var _parentOffsetTop = this.contextMenuBox.offset().top + 1;
            this.slide1.on('mousedown', function (e) {
                e.stopPropagation();
                var _y = e.pageY;
                $(document).on('mousemove', function (e) {
                    var _offsetTop = _this.slide1.offset().top - _parentOffsetTop;
                    var _top = e.pageY - _y;
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
        $(document).click(function (e) {
            if ($(e.target) != _this.contextMenuBox) {
                _this.contextMenuBox.hide();
            }
        });
    };
    $.jqcContextMenu.prototype.contextMenuShow = function (e) {
        var _this = this;
        var _offset = _this.el.offset().left + _this.el.width();
        _this.contextMenuBox.css({
            'top': e.pageY,
            'left': (e.pageX <= _offset - 158 ? e.pageX : e.pageX - 158)
        }).show();
        this.contextMenuFirstLevel.scrollTop(0);
        this.slide1 && this.slide1.css('top', 0);  
    };
    $.jqcContextMenu.prototype.renderMenuList = function (targetId, operationIds) {
        var _this = this;
        var _operationIds = operationIds.split(',');
        this.contextMenuBox.html('操作');
        $.each(_operationIds, function (i, operationId) {
            var _el = $('<div>'+ _this.options.operations[operationId] +'</div>');
            _el.addClass('jqcContextMenu-active');
            _el.click(function () {
                if (_this.options.onSelect) {
                    _this.options.onSelect({
                        targetId: targetId,
                        operationId: operationId
                    });
                }
                $JqcWatcher.trigger(_this.options.listener, {
                    targetId: targetId,
                    operationId: operationId
                });
            });
            _this.contextMenuBox.append(_el);
        });
        this.contextMenuBox.off();
        this.contextMenuBox.on('contextmenu', function (e) {
            e.preventDefault();
        });
    };
}(jQuery));
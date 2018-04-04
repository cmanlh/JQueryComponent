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
 * search
 * 
 */
(function ($) {
    $JqcLoader.importComponents('com.lifeonwalden.jqc', ['baseElement', 'uniqueKey', 'pinyin'])
        .importCss($JqcLoader.getCmpParentURL('com.lifeonwalden.jqc', 'search').concat('css/search.css'))
        .execute(function () {
            
            var DEFAULT_OPTIONS = {
                element: null,
                onSelect: null,
                data: [],
                placeholder: ''
            };
            $.jqcSearch = function (params) {
                this.tabs = [];
                this.options = $.extend(true, {}, DEFAULT_OPTIONS, params);
                this.typeName = 'jqcSearch';
                this.elementId = 'jqc'.concat($.jqcUniqueKey.fetchIntradayKey());
                this.result = [];
                this.index = 0;
                this.pinyin = new $.jqcPinyin();
                if (this.options.data) {
                    this.data = getChildAndAddPinYin(this.options.data, this.pinyin);
                } else {
                    this.data = [];
                }
                this.el = this.options.element || null;
                this.render();
                
            }
            $.jqcSearch.prototype = new $.jqcBaseElement();
            $.jqcSearch.prototype.constructor = $.jqcSearch;

            $.jqcSearch.prototype.render = function () {
                if (!this.el) {
                    throw new Error('Element expects a jQuery object.');
                }
                var _this = this;
                this.input = $('<input type="text"/>')
                    .addClass('jqcSearch-input')
                    .attr('placeholder', _this.options.placeholder)
                    .focus(function () {
                       _this.renderResultList();
                    })
                    .keyup(function (e) {
                        var _keyCode = e.keyCode;
                        if (_keyCode === 38) {
                            _this.index --;
                            _this.index = _this.index < 1 ? _this.result.length : _this.index;
                            _this.chooseItem();
                        } else if (_keyCode === 40) {
                            _this.index ++;
                            _this.index = (_this.index > _this.result.length ? 1 : _this.index);
                            _this.chooseItem();
                        } else if (_keyCode === 13) {
                            _this.resultList.find('.jqcSearch-resultItem-active')
                                .trigger('click');
                        } else {
                            _this.renderResultList();
                        }
                    });
                this.resultList = $('<div>').addClass('jqcSearch-resultList');
                this.el.attr($.jqcBaseElement.JQC_ELEMENT_TYPE, this.typeName)
                    .attr($.jqcBaseElement.JQC_ELEMENT_ID, this.elementId)
                    .append(this.input)
                    .append(this.resultList)
                    .addClass('jqcSearch');
                if (this.el.css('position') === 'static') {
                    this.el.css('position', 'relative');
                }
                // close result list
                $(document).on('click', function (e) {
                    if (!$(e.target).parents('.jqcSearch').length) {
                        _this.resultList.hide();
                    }
                });
            };
            $.jqcSearch.prototype.renderResultList = function () {
                var _this = this;
                this.index = 0;
                this.resultList.empty();
                var _val = this.input.val().trim();
                if (!_val) {
                    this.result = this.data || [];
                } else {
                    this.result = this.data.filter(item => (item.label.indexOf(_val) > -1 || item.pinyin.indexOf(_val) > -1));
                }
                this.result.forEach(function(item, index) {
                    var resultItem = $('<div>' + item.label + '</div>')
                    .addClass('jqcSearch-resultItem')
                    .click(function () {
                        _this.input.val(item.label);
                        _this.resultList.hide();
                        if (_this.options.onSelect) {
                            _this.options.onSelect(item);
                        }
                    }).mouseenter(function () {
                        _this.index = index + 1;
                        $(this).addClass('jqcSearch-resultItem-active')
                            .siblings()
                            .removeClass('jqcSearch-resultItem-active');
                    }).mouseleave(function () {
                       _this.index = 0;
                       $(this).removeClass('jqcSearch-resultItem-active')
                            .siblings()
                            .removeClass('jqcSearch-resultItem-active');
                    });
                    
                    _this.resultList.append(resultItem);
                });
                if (!this.result.length) {
                    var _none = $('<span>无对应选项</span>')
                        .addClass('noResult');
                    this.resultList.append(_none);
                }
                this.resultList.show();
            };
            $.jqcSearch.prototype.chooseItem = function () {
                var _this = this;
                this.resultList.find('.jqcSearch-resultItem')
                    .removeClass('jqcSearch-resultItem-active')
                    .eq(_this.index - 1)
                    .addClass('jqcSearch-resultItem-active');
            };
            
            function getChildAndAddPinYin(data, $pinyin) {
                var _arr = [];
                data.forEach(item => {
                    if (item.child) {
                        _arr = _arr.concat(getChildAndAddPinYin(item.child, $pinyin));
                    } else {
                        var _pinyin = $pinyin.firstAlphabet(item.label);
                        _arr.push(Object.assign(item, {
                            'pinyin': _pinyin
                        }));
                    }
                });
                return _arr;
            }
        });
}(jQuery));
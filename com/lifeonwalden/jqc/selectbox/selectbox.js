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
 * select box, support filter & multi-select
 * 
 */
(function($) {
    $JqcLoader.importComponents('com.lifeonwalden.jqc', ['baseElement', 'valHooks', 'uniqueKey', 'pinyin'])
        .importCss($JqcLoader.getCmpParentURL('com.lifeonwalden.jqc', 'selectbox').concat('css/selectbox.css'))
        .execute(function() {
            var optionCoreCache = new Map();
            var DEFAULT_OPTION_COUNT = 10;
            var UNDEFINED_OPTION = '';

            function fillMap(mapping, key, data) {
                if (mapping.has(key)) {
                    var preData = mapping.get(key);
                    if ($.isArray(preData)) {
                        preData.push(data);
                    } else {
                        mapping.set(key, [preData, data]);
                    }
                } else {
                    mapping.set(key, data);
                }
            }
            /**
             * For param
             * {
             *  source : data source
             *  extOption : extension options
             * }
             * 
             * For source
             * [{
             *  value : literal,
             *  label : literal,
             *  filter : literal,
             *  pinyinFilter : literal
             * }]
             * or
             * {
             *  data : non-standard data source
             *  adapter : adapter for convert data to standard data
             * }
             * 
             * For adapter
             * {
             *  value : literal,
             *  label : literal or function,
             *  filter : literal,
             *  pinyinFilter : literal or field string array
             * }
             * 
             * @param {*} param 
             */
            var OPTION_DEFAULT_OPTIONS = {
                source: null,
                extOption: null,
                supportPinYin: false,
                pinyinParser: null,
                supportFuzzyMatch: false,
                maxOptionCount: DEFAULT_OPTION_COUNT
            };

            function OptionCore(param) {
                this.option = $.extend(true, {}, OPTION_DEFAULT_OPTIONS, param);
                this.source = null;
                this.optionMapping = new Map();
                this.sortedFilterCache = [];
                this.filterIndex = new Map();
                this.optionsCache = new Map();
                this.undefinedOption = '<li class="none" value="'.concat(UNDEFINED_OPTION).concat('">无对应选项</li>');
                if (this.option.supportPinYin && !(this.option.pinyinParser && this.option.pinyinParser.firstAlphabet)) {
                    throw new Error('Need a pinyin parser that supports firstAlphabet.');
                }
            }

            OptionCore.prototype.get = function(key) {
                return this.optionMapping.get(key);
            };

            OptionCore.prototype.fetchLabel = function(key) {
                var data = this.get(key);
                if (data) {
                    return data.text;
                } else {
                    return undefined;
                }
            };

            OptionCore.prototype.fuzzyFilter = function(inputTerm) {
                var _inputTerm = null;
                if (inputTerm.isMulti) {
                    _inputTerm = $.trim(inputTerm.value);
                } else {
                    _inputTerm = $.trim(inputTerm);
                }
                if (0 == _inputTerm.length) {
                    return this.undefinedOption;
                }

                var matched = this.optionsCache.get(_inputTerm);
                if (-1 == matched) {
                    return this.undefinedOption;
                }

                var optionList = '',
                    size = this.sortedFilterCache.length;
                if (!inputTerm.isMulti && matched) {
                    return matched;
                } else {
                    var counter = 0,
                        matched = false;
                    var repeatCheck = new Map();
                    for (var i = 0; i < size; i++) {
                        var _data = this.sortedFilterCache[i];
                        if (_data.filter.indexOf(_inputTerm) >= 0) {
                            matched = true;
                            if ($.isArray(_data.data)) {
                                var __data = _data.data;
                                for (var j in __data) {
                                    var __dataTmp = __data[j];
                                    var __key = __dataTmp.data[__dataTmp.key];
                                    if (inputTerm.isMulti && inputTerm.selected.has(__key)) {
                                        continue;
                                    }
                                    if (repeatCheck.has(__key)) {
                                        continue;
                                    }
                                    repeatCheck.set(__key, null);
                                    optionList = optionList.concat(__dataTmp.label);
                                    counter++;
                                }
                            } else {
                                var __data = _data.data;
                                var __key = __data.data[__data.key];
                                if (inputTerm.isMulti && inputTerm.selected.has(__key)) {
                                    continue;
                                }
                                if (repeatCheck.has(__key)) {
                                    continue;
                                }
                                repeatCheck.set(__key, null);
                                optionList = optionList.concat(__data.label);
                                counter++;
                            }
                            if (this.option.maxOptionCount == counter) {
                                break;
                            }
                        }
                    }
                }

                if (matched) {
                    if (inputTerm.isMulti) {
                        this.optionsCache.set(_inputTerm, 1);
                    } else {
                        this.optionsCache.set(_inputTerm, optionList);
                    }

                    return optionList;
                } else {
                    this.optionsCache.set(_inputTerm, -1);

                    return this.undefinedOption;
                }
            };

            OptionCore.prototype.filter = function(inputTerm) {
                var _inputTerm = null;
                if (inputTerm.isMulti) {
                    _inputTerm = $.trim(inputTerm.value);
                } else {
                    _inputTerm = $.trim(inputTerm);
                }
                if (0 == _inputTerm.length) {
                    return this.undefinedOption;
                }

                var matched = this.optionsCache.get(_inputTerm);
                if (-1 == matched) {
                    return this.undefinedOption;
                }
                if (!inputTerm.isMulti && matched) {
                    return matched;
                }

                var startPosition = this.filterIndex.get(_inputTerm);
                if (-1 == startPosition) {
                    return this.undefinedOption;
                }

                var optionList = '',
                    start = startPosition,
                    realStart = -1,
                    size = this.sortedFilterCache.length;
                if (null == startPosition || undefined == startPosition) {
                    var _length = _inputTerm.length;
                    do {
                        _length--;
                        startPosition = this.filterIndex.get(_inputTerm.substring(0, _length));
                        if (-1 == startPosition) {
                            this.filterIndex.set(_inputTerm, -1);

                            return this.undefinedOption;
                        } else if (0 <= startPosition) {
                            start = startPosition
                            break;
                        } else {
                            start = 0;
                        }
                    } while (0 <= _length);
                }

                var counter = 0;
                var repeatCheck = new Map();
                for (var i = start; i < size; i++) {
                    var _data = this.sortedFilterCache[i];
                    if (_data.filter.substr(0, _inputTerm.length) === _inputTerm) {
                        if (-1 == realStart) {
                            realStart = i;
                        }
                        if ($.isArray(_data.data)) {
                            var __data = _data.data;
                            for (var j in __data) {
                                var __dataTmp = __data[j];
                                var __key = __dataTmp.data[__dataTmp.key];
                                if (inputTerm.isMulti && inputTerm.selected.has(__key)) {
                                    continue;
                                }
                                if (repeatCheck.has(__key)) {
                                    continue;
                                }
                                repeatCheck.set(__key, null);
                                optionList = optionList.concat(__dataTmp.label);
                                counter++;
                            }
                        } else {
                            var __data = _data.data;
                            var __key = __data.data[__data.key];
                            if (inputTerm.isMulti && inputTerm.selected.has(__key)) {
                                continue;
                            }
                            if (repeatCheck.has(__key)) {
                                continue;
                            }
                            repeatCheck.set(__key, null);
                            optionList = optionList.concat(__data.label);
                            counter++;
                        }
                        if (this.option.maxOptionCount == counter) {
                            break;
                        }
                    } else if (-1 < realStart) {
                        break;
                    }
                }

                if (-1 < realStart) {
                    this.filterIndex.set(_inputTerm, realStart);
                    if (inputTerm.isMulti) {
                        this.optionsCache.set(_inputTerm, 1);
                    } else {
                        this.optionsCache.set(_inputTerm, optionList);
                    }
                    return optionList;
                } else {
                    this.filterIndex.set(_inputTerm, -1);
                    this.optionsCache.set(_inputTerm, -1);

                    return this.undefinedOption;
                }
            };

            OptionCore.prototype.updateDataSource = function(newDataSource) {
                if (this.option.source.adapter) {
                    this.option.source.data = newDataSource;
                } else {
                    this.option.source = newDataSource;
                }
                this.optionMapping = new Map();
                this.sortedFilterCache = [];
                this.filterIndex = new Map();
                this.optionsCache = new Map();
                this.setup();
            };

            OptionCore.prototype.addNewItem = function(newItem) {
                var newDataSource = null;
                if (this.option.source.adapter) {
                    newDataSource = this.option.source.data;
                } else {
                    newDataSource = this.option.source;
                }
                newDataSource.push(newItem);
                this.updateDataSource(newDataSource);
            };

            OptionCore.prototype.setup = function() {
                var _source = this.option.source;
                if (!_source) {
                    throw new Error('The data source of selectbox should not be null or undefined.');
                }
                var keyVal = 'value',
                    keyFilter = 'filter',
                    keyPinyinFilter = 'pinyinFilter',
                    keyLabel = 'label',
                    mapping = new Map(),
                    unSorted = [],
                    sourceData = null;
                if ($.isArray(_source)) {
                    if (!_source[0][keyFilter]) {
                        keyFilter = keyLabel;
                    }

                    if (!_source[0][keyPinyinFilter]) {
                        keyPinyinFilter = keyFilter;
                    }
                    sourceData = _source;
                } else {
                    if (_source.adapter) {
                        if (_source.adapter.value) {
                            keyVal = _source.adapter.value;
                        }
                        if (_source.adapter.label) {
                            keyLabel = _source.adapter.label;
                        }
                        if (_source.adapter.filter) {
                            keyFilter = _source.adapter.filter;
                        } else {
                            if ('string' != typeof(keyLabel)) {
                                throw new Error('Must provide a field for filtering.');
                            }
                            keyFilter = keyLabel;
                        }
                        if (_source.adapter.pinyinFilter) {
                            keyPinyinFilter = _source.adapter.pinyinFilter;
                        } else {
                            keyPinyinFilter = keyFilter;
                        }
                    }
                    sourceData = _source.data;
                }

                if (this.option.extOption) {
                    if ($.isArray(this.option.extOption)) {
                        sourceData = sourceData.concat(this.option.extOption);
                    } else {
                        sourceData = sourceData.push(this.option.extOption);
                    }
                }

                for (var i in sourceData) {
                    var _data = sourceData[i];
                    if (!_data)
                        continue;
                    var packageData = null;
                    if ('string' == typeof(keyLabel)) {
                        packageData = {
                            label: '<li '.concat('value="v').concat(_data[keyVal]).concat('">').concat(_data[keyLabel]).concat('</li>'),
                            key: keyVal,
                            text: _data[keyLabel],
                            data: _data
                        };
                    } else {
                        var text = keyLabel(_data);
                        packageData = {
                            label: '<li '.concat('value="v').concat(_data[keyVal]).concat('">').concat(text).concat('</li>'),
                            key: keyVal,
                            text: text,
                            data: _data
                        };
                    }

                    var filterKey = _data[keyFilter].toString();
                    fillMap(mapping, filterKey, packageData);
                    unSorted.push(filterKey);
                    if (this.option.supportPinYin) {
                        if ('string' == typeof(keyPinyinFilter)) {
                            var cnFilterKey = _data[keyPinyinFilter].toString();
                            indexPYFilter(filterKey, cnFilterKey, mapping, packageData, unSorted, this);
                        } else {
                            if (this.option.supportFuzzyMatch) {
                                var cnFilterKey = "";
                                for (var _pyFilter in keyPinyinFilter) {
                                    cnFilterKey = cnFilterKey.concat(_data[keyPinyinFilter[_pyFilter]].toString())
                                }
                                indexPYFilter(filterKey, cnFilterKey, mapping, packageData, unSorted, this);
                            } else {;
                                for (var _pyFilter in keyPinyinFilter) {
                                    var cnFilterKey = _data[keyPinyinFilter[_pyFilter]].toString();
                                    indexPYFilter(filterKey, cnFilterKey, mapping, packageData, unSorted, this);
                                }
                            }
                        }
                    }
                    this.optionMapping.set(_data[keyVal].toString(), packageData);
                }

                var sorted = unSorted.sort(),
                    filterKeyBrush = null;
                for (var i in sorted) {
                    var __filter = sorted[i];
                    if (__filter == filterKeyBrush) {
                        continue;
                    }
                    filterKeyBrush = __filter;
                    this.sortedFilterCache.push({
                        filter: __filter,
                        data: mapping.get(__filter)
                    });
                }
            };

            // autoDisplay 自动显示前十个
            OptionCore.prototype.autoDisplay = function(params) {
                var _this = this;
                var cache = [];
                if (this.sortedFilterCache.length) {
                    var _list = '';
                    var count = 0;
                    for (var index = 0; index < this.sortedFilterCache.length; index++) {
                        var _data = this.sortedFilterCache[index].data;
                        var _key = _data.data[_data.key];
                        if (params != undefined && params.selected && params.selected.has(_key)) {
                            continue;
                        }
                        if (cache.indexOf(_key) > -1) {
                            continue;
                        }
                        cache.push(_key);
                        _list += _data.label;
                        count++;
                        if (count >= 10) {
                            break;
                        }
                    }
                    return _list;
                } else {
                    return this.undefinedOption;
                }
            };

            function indexPYFilter(filterKey, cnFilterKey, mapping, packageData, unSorted, that) {
                if (cnFilterKey != filterKey) {
                    fillMap(mapping, cnFilterKey, packageData);
                    unSorted.push(cnFilterKey);
                }
                var pinyinFilterKey = that.option.pinyinParser.firstAlphabet(cnFilterKey);
                if (filterKey != pinyinFilterKey && cnFilterKey != pinyinFilterKey) {
                    fillMap(mapping, pinyinFilterKey, packageData);
                    unSorted.push(pinyinFilterKey);
                }
            }

            var BOX_DEFAULT_OPTIONS = {
                dataName: null, // for the same data type, in one application, should have the same name
                optionData: null, // data source
                extOption: null, // extension options
                width: 120, // option panel width
                defaultVal: null,
                supportPinYin: false, // for chinese
                pinyinParser: null,
                supportMultiSelect: false,
                element: null,
                supportFuzzyMatch: false,
                filterDelay: 256,
                withSearch: true,
                withResetter: true, // does need resetter control
                onSelect: null, // call back on selecting event,
                afterSelect: null, // call back after selecting event
                updateDataSource: null, // update data source
                postClear: null, // call back after reset button clicked
                addNewItem: null, // add new item to options at runtime
                maxOptionCount: DEFAULT_OPTION_COUNT
            };
            $.jqcSelectBox = function(param) {
                if (arguments.length > 0) {
                    $.jqcBaseElement.apply(this, arguments);
                }
                this.options = $.extend(true, {}, BOX_DEFAULT_OPTIONS, param);
                if (!this.options.dataName) {
                    throw new Error('Must provide a unique data name to identify the same type select box');
                }
                if (!this.options.element) {
                    throw new Error('Must Binding SelectBox to a text input element.');
                }
                this.optionCore = optionCoreCache.get(this.options.dataName);
                if (!this.optionCore) {
                    this.optionCore = new OptionCore({
                        source: this.options.optionData,
                        extOption: this.options.extOption,
                        supportPinYin: this.options.supportPinYin,
                        pinyinParser: this.options.pinyinParser,
                        supportFuzzyMatch: this.options.supportFuzzyMatch,
                        maxOptionCount: this.options.maxOptionCount
                    }); // data source
                    this.optionCore.setup();
                    optionCoreCache.set(this.options.dataName, this.optionCore);
                }

                this.el = this.options.element; // the jquery element for the target document node
                this.el.addClass('jqcSelectboxHooks');
                var _width = this.el.outerWidth();
                this.el.css('background-position', _width - 26);
                if (!this.options.withSearch) {
                    this.el.addClass('onlySelect')
                        .prop('readonly', true)
                        .css('background-position', _width - 21);
                }
                this.typeName = 'jqcSelectBox';
                this.elementId = 'jqc'.concat($.jqcUniqueKey.fetchIntradayKey());
                this.el.attr($.jqcBaseElement.JQC_ELEMENT_TYPE, this.typeName);
                this.el.attr($.jqcBaseElement.JQC_ELEMENT_ID, this.elementId);
                $.jqcValHooksCtrl.addElement(this);

                if (this.options.defaultVal || this.options.defaultVal === 0 || this.options.defaultVal === false) {
                    this.defaultVal = this.options.defaultVal.toString();
                } else {
                    this.defaultVal = UNDEFINED_OPTION;
                }

                if (this.options.supportMultiSelect) {
                    renderMultiSelect(this);
                } else {
                    renderSingleSelect(this);
                }

                this.el.val(this.defaultVal);
            }

            function renderMultiSelect(that) {
                that.container = $('<div class="jqcSelectboxContainer" style="display:none;">'); //container for option list & operation board
                that.operationBar = $('<div class="jqcSelectboxOperationBar">');
                that.input = $('<input placeholder="输入选项值">').addClass('search-input');
                that.resetter = $('<button class="jqcSelectboxResetter" title="清空当前所选项">重置</button>'); // reset handler to reset value to default
                that.refresher = $('<button class="jqcSelectboxRefresher" title="从服务器获取新选项">刷新</button>'); // refresh handler to refresh the data source
                that.addNewItem = $('<button class="jqcSelectboxAddNewItem" title="从服务器获取新选项">新增</button>'); // allowed to trigger adding a item to options
                that.optionUL = $('<ul class="jqcSelectboxOptions">');
                that.optionSelected = $('<ul class="jqcSelectboxSelectedOption"></ul>');

                that.operationBar.append(that.input);
                if (that.options.withResetter) {
                    that.operationBar.append(that.resetter);
                }
                if (that.options.updateDataSource) {
                    that.operationBar.append(that.refresher);
                }
                if (that.options.addNewItem) {
                    that.operationBar.append(that.addNewItem);
                }
                that.container.append(that.operationBar).append(that.optionUL).append(that.optionGap).append(that.optionSelected);
                var
                    elOuterHeight = that.el.outerHeight(),
                    elOuterWidth = that.el.outerWidth();
                that.container.css('width', that.options.width * 2 + 116);
                that.input.css('width', that.options.width);
                that.optionUL.css('width', that.options.width + 50);
                that.optionSelected.css('width', that.options.width + 60);
                that.container.appendTo('body');

                that.valueCache = new Map();
                if (that.defaultVal !== UNDEFINED_OPTION && that.defaultVal && that.defaultVal.length > 0) {
                    that.defaultVal.split(',').forEach(function(element) {
                        that.valueCache.set(element, null);
                    });
                }
                var triggerByMe = 0,
                    onSelecting = false;
                that.el.focus(function(e) {
                    triggerByMe = 1;
                    var elOffset = that.el.offset();
                    var maxWidth = $('body').width();
                    that.container.css('top', elOffset.top + elOuterHeight + 2);
                    if (that.container.outerWidth() + elOffset.left + 5 > maxWidth) {
                        that.container.css('right', maxWidth - (elOffset.left + elOuterWidth - 15));
                    } else {
                        that.container.css('left', elOffset.left);
                    }
                    $(this).addClass('jqcSelectboxHooks-active');
                    that.container.show();
                    that.input.focus();
                    // 自动显示
                    if (that.options.autoDisplay) {
                        that.optionUL.html(that.optionCore.autoDisplay({
                            selected: that.valueCache
                        }));
                    }
                });

                var filterHandler = null,
                    filterFun = that.options.supportFuzzyMatch ? that.optionCore.fuzzyFilter : that.optionCore.filter;
                var oldVal = null,
                    selectIndex = null,
                    optionSize = 0;
                that.input.keydown(function(e) {
                    switch (e.keyCode) {
                        case $.ui.keyCode.TAB:
                            {
                                that.container.hide();
                                that.el.removeClass('jqcSelectboxHooks-active').trigger('blur');
                                that.el.nextAll(":input").first().focus();
                                e.preventDefault();
                                return;
                            }
                    }
                });
                that.input.keyup(function(e) {
                    switch (e.keyCode) {
                        case $.ui.keyCode.ENTER:
                            that.optionUL.find('li.jqcSelectboxSelected').trigger('click');
                            break;
                        case $.ui.keyCode.ESCAPE:
                            {
                                triggerByMe = 4;
                                $(document).trigger('click');
                                return;
                            }
                        case $.ui.keyCode.UP:
                            selectIndex == null ? selectIndex = -1 : selectIndex--;
                            break;
                        case $.ui.keyCode.DOWN:
                            selectIndex == null ? selectIndex = 0 : selectIndex++;
                            break;
                        default:
                            {
                                var _val = that.input.val();
                                if ($.trim(_val) == '' && that.options.autoDisplay) {
                                    that.optionUL.html(that.optionCore.autoDisplay({
                                        selected: that.valueCache
                                    }));
                                    return;
                                }
                                if (null != filterHandler) {
                                    clearTimeout(filterHandler);
                                }
                                filterHandler = setTimeout(function() {
                                    if (oldVal != that.input.val()) {
                                        that.optionUL.html(filterFun.call(that.optionCore, {
                                            value: that.input.val(),
                                            selected: that.valueCache,
                                            isMulti: true
                                        }));
                                        selectIndex = null;
                                    }
                                    filterHandler = null;
                                    oldVal = that.input.val();
                                }, that.filterDelay);
                                return;
                            }
                    }
                    optionSize = that.optionUL.find('li').length;
                    if (optionSize === 0) {
                        return;
                    }
                    that.optionUL.find('li.jqcSelectboxSelected').removeClass('jqcSelectboxSelected');
                    that.optionUL.find('li').eq(selectIndex = selectIndex % optionSize).addClass('jqcSelectboxSelected');
                });

                $(document).click(function(e) {
                    if (1 !== triggerByMe && 2 !== triggerByMe) {
                        that.container.hide();
                        that.el.removeClass('jqcSelectboxHooks-active').trigger('blur');
                        if (onSelecting && that.options.afterSelect) {
                            onSelecting = false;
                            var result = [];
                            that.currentVal.split(',').forEach(function(element) {
                                var _element = that.optionCore.get(element);
                                if (_element) {
                                    result.push(_element.data);
                                }
                            });
                            that.options.afterSelect(result)
                        }
                    }

                    triggerByMe = 3;
                });

                that.container.click(function(e) {
                    triggerByMe = 2;
                });

                that.optionUL.on('click', 'li', function(e) {
                    var eTarget = $(e.target);
                    var _val = eTarget.attr('value');
                    if (null == _val || undefined == _val) {
                        return;
                    }
                    if (UNDEFINED_OPTION == _val) {
                        return;
                    }
                    _val = _val.substr(1);
                    if (!that.valueCache.has(_val)) {
                        if (that.currentVal) {
                            that.el.val(that.currentVal.concat(',').concat(_val));
                        } else {
                            that.el.val(_val);
                        }
                        if (that.options.onSelect) {
                            var result = [];
                            that.currentVal.split(',').forEach(function(element) {
                                var _element = that.optionCore.get(element);
                                if (_element) {
                                    result.push(_element.data);
                                }
                            });
                            that.options.onSelect(result, that.optionCore.get(_val).data, true);
                        }
                        that.input.val('');
                        that.input.focus();
                        that.valueCache.set(_val, null);
                        eTarget.remove();
                        onSelecting = true;
                    }
                });

                that.optionSelected.on('click', 'li', function(e) {
                    var eTarget = $(e.target);
                    var _val = eTarget.attr('value');
                    if (null == _val || undefined == _val) {
                        return;
                    }
                    _val = _val.substr(1);
                    that.valueCache.delete(_val);
                    var resultStr = '',
                        result = [];
                    that.valueCache.forEach(function(val, key) {
                        if (that.options.onSelect) {
                            result.push(that.optionCore.get(key).data);
                        }
                        resultStr = resultStr.concat(',').concat(key);
                    });
                    if (resultStr.length === 0) {
                        that.el.val(UNDEFINED_OPTION);
                    } else {
                        that.el.val(resultStr.substr(1));
                    }
                    if (that.options.onSelect) {
                        that.options.onSelect(result, that.optionCore.get(_val).data, false);
                    }
                    that.optionUL.append(that.optionCore.get(_val).label);
                    onSelecting = true;
                });


                function reset(toHide) {
                    oldVal = null;
                    that.input.val('');
                    that.optionUL.empty();
                    that.optionSelected.empty();
                    that.valueCache.clear();
                    that.el.val(that.defaultVal);
                    if (toHide) {
                        that.container.hide();
                        that.el.removeClass('jqcSelectboxHooks-active').trigger('blur');
                    }
                }

                if (that.options.withResetter) {
                    that.resetter.click(function(e) {
                        reset(true);
                        if (that.options.postClear) {
                            that.options.postClear();
                        }
                    });
                }

                if (that.options.updateDataSource) {
                    that.refresher.click(function(e) {
                        if (!that.options.updateDataSource) {
                            return;
                        }
                        that.options.updateDataSource(function(newDataSource) {
                            if ($.isArray(newDataSource)) {
                                that.optionCore.updateDataSource(newDataSource);
                            }
                            reset(false);
                        });
                    });
                }

                if (that.options.addNewItem) {
                    that.addNewItem.click(function(e) {
                        that.container.hide();
                        that.el.removeClass('jqcSelectboxHooks-active').trigger('blur');
                        that.options.addNewItem(function(newItem) {
                            if (newItem) {
                                that.optionCore.addNewItem(newItem);
                            }
                        });
                    });
                }
            }

            function renderSingleSelect(that) {
                that.container = $('<div class="jqcSelectboxContainer" style="display:none;">'); //container for option list & operation board
                that.operationBar = $('<div class="jqcSelectboxOperationBar">');
                that.input = $('<input placeholder="输入选项值">').addClass('search-input');
                that.resetter = $('<button class="jqcSelectboxResetter" title="清空当前所选项">重置</button>'); // reset handler to reset value to default
                that.refresher = $('<button class="jqcSelectboxRefresher" title="从服务器获取新选项">刷新</button>'); // refresh handler to refresh the data source
                that.addNewItem = $('<button class="jqcSelectboxAddNewItem" title="从服务器获取新选项">新增</button>'); // allowed to trigger adding a item to options
                that.optionUL = $('<ul>');

                var inputWidth = that.el.outerWidth();
                var containerWidth = inputWidth;
                if (that.options.withSearch) {
                    that.operationBar.append(that.input);
                    if (that.options.withResetter) {
                        containerWidth += 54;
                        that.operationBar.append(that.resetter);
                    } else {
                        // inputWidth += 52;
                    }
                    if (that.options.updateDataSource) {
                        that.operationBar.append(that.refresher);
                        containerWidth += 54;
                    }
                    if (that.options.addNewItem) {
                        that.operationBar.append(that.addNewItem);
                        containerWidth += 54;
                    }
                    that.container.append(that.operationBar).append(that.optionUL);
                } else {
                    that.container.append(that.optionUL);
                }
                var
                    elOuterHeight = that.el.outerHeight(),
                    elOuterWidth = that.el.outerWidth();
                that.container.css('width', containerWidth);
                that.input.css('width', inputWidth);
                that.container.appendTo('body');

                var triggerByMe = false;
                that.el.focus(function(e) {
                    triggerByMe = true;
                    var elOffset = that.el.offset();
                    var maxWidth = $('body').width();
                    that.container.css('top', elOffset.top + elOuterHeight + 4);
                    if (that.container.outerWidth() + elOffset.left + 5 > maxWidth) {
                        that.container.css('right', maxWidth - (elOffset.left + elOuterWidth - 15));
                    } else {
                        that.container.css('left', elOffset.left);
                    }
                    $(this).addClass('jqcSelectboxHooks-active');
                    that.container.show();
                    that.input.focus();
                    // 自动显示
                    if (that.options.autoDisplay) {
                        that.optionUL.html(that.optionCore.autoDisplay());
                    }
                });

                var filterHandler = null,
                    filterFun = that.options.supportFuzzyMatch ? that.optionCore.fuzzyFilter : that.optionCore.filter;
                var oldVal = null,
                    selectIndex = null,
                    optionSize = 0;
                that.input.keydown(function(e) {
                    switch (e.keyCode) {
                        case $.ui.keyCode.TAB:
                            {
                                that.container.hide();
                                that.el.removeClass('jqcSelectboxHooks-active').trigger('blur');
                                that.el.nextAll(":input").first().focus();
                                e.preventDefault();
                                return;
                            }
                    }
                });
                that.input.keyup(function(e) {
                    switch (e.keyCode) {
                        case $.ui.keyCode.ENTER:
                            that.optionUL.find('li.jqcSelectboxSelected').trigger('click');
                            selectIndex = null;
                            return;
                        case $.ui.keyCode.ESCAPE:
                            that.container.hide();
                            that.el.removeClass('jqcSelectboxHooks-active').trigger('blur');
                            return;
                        case $.ui.keyCode.UP:
                            selectIndex == null ? selectIndex = -1 : selectIndex--;
                            break;
                        case $.ui.keyCode.DOWN:
                            selectIndex == null ? selectIndex = 0 : selectIndex++;
                            break;
                        default:
                            {
                                var _val = that.input.val();
                                if ($.trim(_val) == '' && that.options.autoDisplay) {
                                    that.optionUL.html(that.optionCore.autoDisplay());
                                    return;
                                }
                                if (null != filterHandler) {
                                    clearTimeout(filterHandler);
                                }
                                filterHandler = setTimeout(function() {
                                    if (oldVal != that.input.val()) {
                                        that.optionUL.html(filterFun.call(that.optionCore, that.input.val()));
                                        selectIndex = null;
                                    }
                                    filterHandler = null;
                                    oldVal = that.input.val();
                                }, that.filterDelay);
                                return;
                            }
                    }
                    optionSize = that.optionUL.find('li').length;
                    if (optionSize === 0) {
                        return;
                    }
                    that.optionUL.find('li.jqcSelectboxSelected').removeClass('jqcSelectboxSelected');
                    that.optionUL.find('li').eq(selectIndex = selectIndex % optionSize).addClass('jqcSelectboxSelected');
                });

                $(document).click(function(e) {
                    if (!triggerByMe) {
                        that.container.hide();
                        that.el.removeClass('jqcSelectboxHooks-active').trigger('blur');
                    }
                    triggerByMe = false;
                });

                that.container.click(function(e) {
                    triggerByMe = true;
                });

                that.optionUL.on('click', 'li', function(e) {
                    var _val = $(e.target).attr('value');
                    if (null == _val || undefined == _val) {
                        return;
                    }
                    if (UNDEFINED_OPTION == _val) {
                        return;
                    }
                    _val = _val.substr(1);
                    if (that.options.onSelect) {
                        that.options.onSelect(that.optionCore.get(_val).data);
                    }
                    if (that.options.afterSelect) {
                        that.options.afterSelect(that.optionCore.get(_val).data);
                    }
                    that.input.val('');
                    that.optionUL.empty();
                    that.el.val(_val);
                    oldVal = null;
                    that.container.hide();
                    that.el.removeClass('jqcSelectboxHooks-active').trigger('blur');
                });

                function reset(toHide) {
                    oldVal = null;
                    that.input.val('');
                    that.optionUL.empty();
                    that.el.val(that.defaultVal);
                    if (toHide) {
                        that.container.hide();
                        that.el.removeClass('jqcSelectboxHooks-active').trigger('blur');
                    }
                }

                if (that.options.withResetter) {
                    that.resetter.click(function(e) {
                        reset(true);
                        if (that.options.postClear) {
                            that.options.postClear();
                        }
                    });
                }

                if (that.options.updateDataSource) {
                    that.refresher.click(function(e) {
                        if (!that.options.updateDataSource) {
                            return;
                        }
                        that.options.updateDataSource(function(newDataSource) {
                            if ($.isArray(newDataSource)) {
                                that.optionCore.updateDataSource(newDataSource);
                            }
                            reset(false);
                        });
                    });
                }

                if (that.options.addNewItem) {
                    that.addNewItem.click(function(e) {
                        that.container.hide();
                        that.el.removeClass('jqcSelectboxHooks-active').trigger('blur');
                        that.options.addNewItem(function(newItem) {
                            if (newItem) {
                                that.optionCore.addNewItem(newItem);
                            }
                        });
                    });
                }
            }

            $.jqcSelectBox.prototype = new $.jqcBaseElement();
            $.jqcSelectBox.prototype.constructor = $.jqcSelectBox;
            $.jqcSelectBox.prototype.updateCurrentVal = function(val) {
                this.currentVal = val;
                if (this.options.supportMultiSelect) {
                    if (this.currentVal === UNDEFINED_OPTION) {
                        this.optionSelected.empty();
                        return '';
                    } else {
                        var result = '',
                            label = '';
                        var _this = this;
                        this.currentVal.split(',').forEach(function(element) {
                            var option = _this.optionCore.get(element);
                            if (option) {
                                label = label.concat(option.label);
                                result = result.concat(',').concat(option.text);
                                _this.valueCache.set(element, null);
                            }
                        });
                        this.optionSelected.html(label);
                        return result.substr(1);
                    }
                } else {
                    if (this.currentVal === UNDEFINED_OPTION) {
                        return '';
                    } else {
                        var packageData = this.optionCore.get(this.currentVal);
                        if (packageData) {
                            return packageData.text;
                        } else {
                            return '';

                        }
                    }
                }
            };
            $.jqcSelectBox.prototype.updateDataSource = function(data) {
                if ($.isArray(data)) {
                    this.optionCore.updateDataSource(data);
                }
            };

            superDestroy = $.jqcSelectBox.prototype.destroy;
            $.jqcSelectBox.prototype.destroy = function() {
                superDestroy.apply(this);
                this.container.remove();
            };
        });
}(jQuery));
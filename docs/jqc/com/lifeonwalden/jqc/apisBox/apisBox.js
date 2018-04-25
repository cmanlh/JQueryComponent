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
 * apisBox
 * 
 */
(function ($) {
    $JqcLoader.importComponents('com.lifeonwalden.jqc', ['baseElement', 'uniqueKey', 'toolkit'])
        .importCss($JqcLoader.getCmpParentURL('com.lifeonwalden.jqc', 'apisBox').concat('css/apisBox.css'))
        .execute(function () {
            var T = $.jqcToolkit;

            const INFO = '__info__';

            var DEFAULT_OPTIONS = {
                element: null,
                data: [],
                defaultShow: undefined
            };
            
            $.jqcApisBox = function (params) {
                var _this = this;
                this.options = Object.assign({}, DEFAULT_OPTIONS, params);
                this.el = this.options.element;
                if (!this.el) {
                    throw new Error('jqcApisBox: element expects a jQuery object.');
                }
                if (T.rawType(_this.options.data) != 'Array') {
                    throw new Error('jqcApisBox: data expects an Array.');
                }
                render.call(this);
                reload.call(this);
            }

            $.jqcApisBox.prototype.add = function (api) {
                var _this = this;
                var _rawType = T.rawType(api);
                var _data = [];
                if (_rawType === 'Object') {
                    _data.push(api);
                } else if (_rawType === 'Array') {
                    _data = api;
                } else {
                    throw new Error('jqcApisBox:function add expects a Object or Array.');
                }
                this.options.data = this.options.data.concat(_data);
                reload.call(this);
            }

            function reload(params) {
                var _this = this;
                this.box.empty();
                this.options.data.forEach(function(item) {
                    _this.box.append(createItemBox.call(_this, item));
                });
                var _type = $('<li>')
                    .addClass('jqcApisBox-jsonBox-type th')
                    .text('数据类型');
                var _required = $('<li>')
                    .addClass('jqcApisBox-jsonBox-required th')
                    .text('是否必须');
                var _optional = $('<li>')
                    .addClass('jqcApisBox-jsonBox-optional th')
                    .text('可选值');
                var _default = $('<li>')
                    .addClass('jqcApisBox-jsonBox-default th')
                    .text('默认值');
                this.box.find('.jqcApisBox-item > ul').append(_type, _required, _optional, _default);
                spread.call(this);
            }

            function render() {
                var _this = this;
                this.el.append(createBox.call(_this));
            }

            function spread() {
                var _this = this;
                if (T.rawType(_this.options.defaultShow) !== 'Number') {
                    return;
                }
                var index = this.options.defaultShow;
                var _index = 0;
                var _targets = this.box.find('.jqcApisBox-itemBrief');
                var _len = _targets.length;
                _index = index >= 0 ? (index < _len ? index : _len - 1) : (index + _len < 0 ? 0 : index);
                _targets.eq(_index).trigger('click');
            }

            function createBox() {
                var _this = this;
                this.box = $('<div>')
                    .addClass('jqcApisBox');
                return this.box;
            }

            function createItemBox(data) {
                var _this = this;
                var itemBox = $('<div>')
                    .addClass('jqcApisBox-item')
                    .append(createBrief.call(_this, data));
                if (data.note) {
                    itemBox.append(createSubTitle('说明'));
                    itemBox.append(createNoteBox.call(_this, data.note));
                }
                if (data.params) {
                    itemBox.append(createSubTitle('参数'));
                    itemBox.append(createJsonBox.call(_this, data.params));
                }
                if (data.response) {
                    itemBox.append(createSubTitle('返回值'));                    
                    itemBox.append(createJsonBox.call(_this, data.response)); 
                }
                return itemBox;
            }

            function createBrief(data) {
                var _this = this;
                var _type = methodType(data.method);
                var _url = $('<p>').text(data.api);
                var _name = $('<span>').text(data.apiName);
                var _brief = $('<div>')
                    .addClass('jqcApisBox-itemBrief')
                    .addClass('jqcApisBox-itemBrief-'+ _type)
                    .append(_url)
                    .append(_name)
                    .click(function (e) {
                        e.stopPropagation();
                        var _parent = $(this).parent();
                        _parent.siblings().height(36);
                        if (_parent.height() === 36) {
                            _parent.height('auto');
                        } else {
                            _parent.height(36);
                        }
                        
                    })
                return _brief;
            }

            function methodType(type) {
                var _type = type || '';
                if (!_type) {
                    return 'GET';
                }
                return _type.toUpperCase();
            }

            function createNoteBox(note) {
                var _this = this;
                var _note = $('<div>')
                    .addClass('jqcApisBox-noteBox')
                    .text(note);
                return _note;
            }

            function createSubTitle(title) {
                var _subTitle = $('<div>')
                    .addClass('jqcApisBox-subTitle')
                    .text(title);
                return _subTitle;
            }

            function createJsonBox(json) {
                var _this = this;
                var _key = Object.keys(json).filter(i => (i != INFO));
                if (!_key.length) {
                    return '';
                }
                var jsonBox = $('<ul>')
                    .addClass('jqcApisBox-jsonBox');
                _key.forEach(function(item) {
                    var _item = json[item][INFO];
                    var _name = $('<p>')
                        .addClass('jqcApisBox-paramName')
                        .text(item);
                    var _box = $('<div>')
                        .append(_name)
                        .click(function (e) {
                            e.stopPropagation();
                            var _parent = $(this).parent();
                            if (_parent.hasClass('hasChild')) {
                                _parent.toggleClass('fold');
                            }
                        })
                    var _li = $('<li>')
                        .append(_box);
                    if (_item.note) {
                        _box.attr('title', _item.note);
                    }
                    if (_item.type) {
                        var _type = $('<p>')
                            .addClass('jqcApisBox-tips jqcApisBox-tips-type')
                            .text(_item.type)
                            .attr('title', '数据类型');
                        _box.append(_type);
                    }
                    var _required = $('<p>')
                        .addClass('jqcApisBox-tips jqcApisBox-tips-required')
                        .attr('title', '是否必须');
                    if (_item.required) {
                        _required.text('是');
                    } else {
                        _required.text('否').addClass('jqcApisBox-tips-disabled');
                    }
                    _box.append(_required);
                    var _optional = $('<p>')
                        .addClass('jqcApisBox-tips jqcApisBox-tips-optional')
                        .attr('title', '可选值');
                    if (_item.optional !== undefined) {
                        _optional.text('有')
                            .attr('title', _item.optional);
                    } else {
                        _optional.text('无').addClass('jqcApisBox-tips-disabled');
                    }
                    _box.append(_optional);
                    if (_item.default !== undefined) {
                        var _str;
                        var _rawType = T.rawType(_item.default);
                        if (_rawType === 'Array') {
                            _str = '[ ]';
                        } else if (_rawType === 'Object') {
                            _str = '{ }';
                        } else {
                            _str = _item.default;
                        }
                        var _default = $('<p>')
                            .addClass('jqcApisBox-tips jqcApisBox-tips-default')
                            .text(_str)
                            .attr('title', '默认值');
                        _box.append(_default);
                    }
                    var _des = $('<p>').addClass('jqcApisBox-description').text(_item.description);
                    _box.append(_des);
                    var _jsonBox = createJsonBox.call(_this, json[item]);
                    if (_jsonBox) {
                        _li.addClass('hasChild')
                            .append(_jsonBox);
                    }
                    jsonBox.append(_li);
                });
                return jsonBox;
            }
        });
}(jQuery));
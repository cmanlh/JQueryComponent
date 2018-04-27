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
 */
(function ($) {
    $JqcLoader.importComponents('com.lifeonwalden.jqc', ['baseElement', 'uniqueKey', 'toolkit'])
        .importCss($JqcLoader.getCmpParentURL('com.lifeonwalden.jqc', 'contextmenu').concat('css/contextmenu.css'))
        .execute(function () {
            var T = $.jqcToolkit;
            var $body = $('body');
            /**
             * menus数据解析，为menu数组
             * 
             * {
             *  id: optional,
             *  text : requried,
             *  valid : true, function(data) optional, default value: true
             * }
             */
            const DEFAULT_OPTIONS = {
                menus: [], // 构建菜单的数据
                max: null,
                onSelect: null,
                adapter: {
                    id: 'id',
                    text: 'text',
                    child: 'child',
                    valid: 'valid'
                },
                autoSkip: true,
                width: 160,
                height: 32,
            };

            // /**
            //  * 根据传入数据，弹性显示菜单项，并在菜单被选择时，将data作为参数，并上menu数据传回给onSelect
            //  */
            // $.jqcContextMenu.prototype.show = function (data) {};



            $.jqcContextMenu = function (params) {
                this.options = Object.assign({}, DEFAULT_OPTIONS, params);
                this.box = null;                        //view
                this.level = 1;                         //菜单层级
                this.needShowMenus = [];                //显示的菜单
                this.pageWidth = window.innerWidth;     //页面可视宽度
                this.pageHeight = window.innerHeight;   //页面可视高度
                this.width = this.options.width;                       //单个菜单的宽度
                this.height = this.options.height;                       //单个菜单的高度
                this.scrollTop = $(window).scrollTop(); //页面上卷高度
                this.data = null;                       //显示条件
                this.toLeft = false;
                this.toTop = false;
                this.maxHeight = this.options.max ? this.options.max * this.height : 'auto';
                var firstLevelLen = this.options.menus.length;
                this.firstLevlHeight = (this.options.max && firstLevelLen > this.options.max) ? this.maxHeight : firstLevelLen * this.height;
                bindEvent.call(this);
            }
            // 显示
            $.jqcContextMenu.prototype.show = function (data) {
                $body.find('.jqcContextMenu').remove();
                var _this = this;
                this.level = 1;
                this.data = Array.prototype.slice.call(arguments);
                var _menus = [].concat(_this.options.menus);
                this.needShowMenus = getNeedShowMenus.call(_this, _menus, _this.data);
                if (this.options.autoSkip) {
                    this.needShowMenus = skip.call(_this, this.needShowMenus);
                }
                this.level = getLevel.call(_this);
                setTimeout(function () {
                    render.call(_this);
                }, 0);
            };

            // 绑定事件
            function bindEvent() {
                var _this = this;
                $(window).resize(function () {
                    _this.pageWidth = window.innerWidth;
                    _this.pageHeight = window.innerHeight;
                }).scroll(function () {
                    _this.scrollTop = $(this).scrollTop();
                });
                $(document).on('contextmenu click', function (e) {
                    _this.pageX = e.pageX;
                    _this.pageY = e.pageY;
                }).on('mouseup', function () {
                    $(this).off('mousemove');
                }).click(function (e) {
                    _this.box && _this.box.remove();
                });
            }

            function render() {
                var _this = this;
                $body.append(createBox.call(_this));
            }

            function createBox() {
                var _this = this;
                var _left = 0;
                this.box = $('<div>')
                    .addClass('jqcContextMenu')
                    .css({
                        left: _this.pageX,
                        top: _this.pageY
                    }).click(function (e) {
                        e.stopPropagation();
                    }).on('contextmenu', function (e) {
                        e.stopPropagation();
                        e.preventDefault();
                    });
                if (this.pageX + (this.level * this.width) > this.pageWidth) {
                    this.box.addClass('to-left');
                    this.toLeft = true;
                    _left = -this.width;
                } else {
                    this.box.removeClass('to-left');
                    this.toLeft = false;
                    _left = 0;
                }
                if (this.pageY + this.firstLevlHeight - this.scrollTop > this.pageHeight) {
                    this.box.addClass('to-top');
                    this.toTop = true;
                } else {
                    this.box.removeClass('to-top');
                    this.toTop = false;
                }
                this.box.append(createMenu.call(_this, _this.needShowMenus, 0, _left));
                return this.box;  
            }

            function skip(data) {
                var _this = this;
                if (Array.isArray(data) && data.length === 1 && data[0]['__temp']) {
                    return skip.call(_this, data[0]['__temp']);
                } else {
                    return data;
                }
            }

            function createMenu(menu, offsetTop, left) {
                var _this = this;
                var _scrollBox = $('<div>')
                    .addClass('jqcContextMenu-scrollBox')
                    .css({
                        'max-height': _this.maxHeight,
                        'width': _this.width + 20
                    });
                menu.forEach(item => {
                    if (_this.options.autoSkip) {
                        item = simplifyData.call(_this, item);
                    }
                    var _item = $('<div>')
                        .addClass('jqcContextMenu-item')
                        .text(item[_this.options.adapter.text])
                        .on('mouseenter', function (e) {
                            e.stopPropagation();
                            $(this).siblings()
                                .removeClass('jqcContextMenu-active');
                            var _parent = $(this).parents('.jqcContextMenu-fakeScrollBox');
                            var _index = _parent.index();
                            _this.box.find('.jqcContextMenu-fakeScrollBox:gt('+ _index +')').remove();
                            if (Array.isArray(item['__temp']) && item['__temp'].length > 0) {
                                $(this).addClass('jqcContextMenu-active');
                                var _offsetTop = $(this).offset().top;
                                _index ++;
                                var _left = _this.toLeft ? -(_this.width * (_index + 1) - _index) : (_this.width * _index - _index);
                                _this.box.append(createMenu.call(_this, item['__temp'], _offsetTop, _left));
                            }
                        }).click(function (e) {
                            e.stopPropagation();
                            if (!Array.isArray(item['__temp']) || item['__temp'].length === 0) {
                                _this.options.onSelect && _this.options.onSelect({
                                    menu: item,
                                    showData: menu.showData
                                });
                                _this.box.remove();
                            }
                        }).css({
                            'height': _this.height,
                            'width': _this.width - 2,
                            'line-height': _this.height + 'px'
                        });
                    _scrollBox.append(_item);
                });
                var _fakeScrollBox = $('<div>')
                    .addClass('jqcContextMenu-fakeScrollBox')
                    .append(_scrollBox)
                    .css({
                        'max-height': _this.maxHeight,
                        'width': _this.width - 2,
                        'left': left
                    });
                // 是否限制最大个数
                if (this.options.max && menu.length > _this.options.max) {
                    var _height = parseInt(_this.options.max * _this.maxHeight / menu.length) ;
                    var _slide = $('<span><span>')
                        .addClass('jqcContextMenu-slide')
                        .on('mousedown click', function (e) {
                            e.stopPropagation();
                            var _sibling = $(this).siblings('.jqcContextMenu-scrollBox');
                            var _parentOffsetTop = $(this).parent().offset().top + 1;
                            var _y = e.pageY;
                            var _offsetTop = $(this).offset().top - _parentOffsetTop;
                            $(document).on('mousemove', function (e) {
                                var _top = e.pageY - _y + _offsetTop;
                                _top = _top < 0 ? 0 : _top;
                                _top = _top + _height > _this.maxHeight ? _this.maxHeight - _height : _top;
                                _slide.css('top', _top); 
                                var _scrollTop = (_top + _height) * menu.length * _this.height / _this.maxHeight - _this.maxHeight;
                                _sibling.scrollTop(_scrollTop);
                            });
                        });
                    _slide.height(_height);
                    _fakeScrollBox.append(_slide);
                    // 控制slide滚动
                    _scrollBox.scroll(function (e) {
                        e.stopPropagation();
                        var _scrollTop = $(this).scrollTop();
                        var _top = (_this.maxHeight + _scrollTop) * _this.maxHeight / _this.height / menu.length - _height;
                        _slide.css('top', _top);
                    });
                }
                if (offsetTop) {
                    var _currentHeight = menu.length * _this.height;
                    if (_this.options.max) {
                        _currentHeight = menu.length > _this.options.max ? _this.options.max * _this.height : _currentHeight;
                    }
                    if (offsetTop - _this.scrollTop + _currentHeight + 20 > this.pageHeight) {
                        _fakeScrollBox.css({
                            'top': 'auto',
                            'bottom': _this.box.offset().top - offsetTop - _this.height - 1 + _this.scrollTop
                        });
                    } else {
                        _fakeScrollBox.css({
                            'top': offsetTop - _this.box.offset().top - 1 - _this.scrollTop,
                            'bottom': 'auto'
                        });
                    }
                }
                return _fakeScrollBox;
            }

            function getNeedShowMenus(menus, data) {
                var _this = this;
                var _menus = [];
                var rest = [].concat(data);
                var _data = null;
                if (rest.length > 1) {
                    _data = rest.shift();
                } else {
                    _data = rest[0];
                }
                _menus = menus.filter(item => {
                    var _valid = item[_this.options.adapter.valid];
                    var _child = item[_this.options.adapter.child];
                    if (T.rawType(_valid) === 'Undefined') {
                        if (_child) {
                            // item[_this.options.adapter.child] = getNeedShowMenus.call(_this, _child, rest);
                            item['__temp'] = getNeedShowMenus.call(_this, _child, rest);
                        }
                        return true;
                    } else if (T.rawType(_valid) === 'Function') {
                        if (_data === undefined || _valid(_data)) {
                            if (_child) {
                                // item[_this.options.adapter.child] = getNeedShowMenus.call(_this, _child, rest);
                                item['__temp'] = getNeedShowMenus.call(_this, _child, rest);
                            }
                            return true;
                        } else {
                            return false;
                        }
                    } else if (T.rawType(_valid) === 'Boolean') {
                        if (_valid) {
                            if (_child) {
                                // item[_this.options.adapter.child] = getNeedShowMenus.call(_this, _child, rest);
                                item['__temp'] = getNeedShowMenus.call(_this, _child, rest);
                            }
                            return true;
                        } else {
                            return false;
                        }
                    } else {
                        throw new Error('jqcContextMenu: valid expects a Boolean or Function');
                    }
                });
                _menus.showData = _data;
                return _menus;
            }

            function getLevel() {
                var _this = this;
                var _child = [];
                var _level = 1;
                this.needShowMenus.forEach(function(item) {
                    if (item['__temp']) {
                        _level = 2;
                        _child = _child.concat(item.child);
                    }
                });
                _child.forEach(function (item) {
                    if (item['__temp']) {
                        _level = 3;
                    }
                });
                return _level;
            };

            function simplifyData(data) {
                var _this = this;
                var child = [];
                var _child = '__temp';
                if (!data.hasOwnProperty(_child) || !Array.isArray(data[_child]) || data[_child].length === 0) {
                    return data;
                }
                child = data[_child];
                var len = child.length;
                if (len >= 2) {
                    return data;
                }
                if (len === 1) {
                    return simplifyData.call(_this, child[0]);
                }
            }
        });
}(jQuery));
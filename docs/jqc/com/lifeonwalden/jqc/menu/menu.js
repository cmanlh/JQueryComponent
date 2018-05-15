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
 * menu
 * 
 */
(function ($) {
    $JqcLoader.importComponents('com.lifeonwalden.jqc', ['baseElement', 'uniqueKey', 'lang', 'dialog', 'zindex'])
        .importCss($JqcLoader.getCmpParentURL('com.lifeonwalden.jqc', 'menu').concat('css/menu.css'))
        .execute(function () {
            $.jqcMenu = function (params) {
                var _this = this;
                const DEFAULT_OPTIONS = {
                    data: null, // menu data
                    speed: 200, //animate speed :ms
                    width: 150, // menu item width
                    position: 'fixed',
                    top: 0, // top of position
                    left: 0, // left of position
                    adapter: {
                        id: 'id',
                        label: 'label',
                        child: 'child'
                    },
                    configBoxWidth: 500, // dialog width
                    displayed: true, // displayed after render
                    allowedConfig: false,
                    autoSkip: true,
                    configurableMenuData: null, // configurable menu data source
                    onResettingMenu: null, // call back for resetting menu
                    onSelect: null, //call back function for leaf menu be selected
                };
                if (arguments.length > 0) {
                    $.jqcBaseElement.apply(this, arguments);
                }
                this.options = $.extend(true, {}, DEFAULT_OPTIONS, params);
                this.typeName = 'jqcMenu';
                this.elementId = 'jqc'.concat($.jqcUniqueKey.fetchIntradayKey());
                if (this.options.allowedConfig) {
                    if (!this.options.configurableMenuData[0].hasOwnProperty(this.options.adapter.id)) {
                        throw new Error("Configuration menu require [id] property in the menu object.");
                    }
                    this.snapshot = null;
                }
                render.call(this);
                eventBind.call(this);
            };

            $.jqcMenu.prototype = new $.jqcBaseElement();
            $.jqcMenu.prototype.constructor = $.jqcMenu;
            $.jqcMenu.prototype.show = function () {
                if (this.options.position == 'fixed') {
                    this.container.animate({
                        left: this.options.left
                    }, this.options.speed);
                } else {
                    this.container.fadeIn();
                }
            };
            $.jqcMenu.prototype.hide = function () {
                if (this.options.position == 'fixed') {
                    this.container.animate({
                        left: -1 * this.options.width - this.options.left - 3
                    }, this.options.speed);
                } else {
                    this.container.fadeOut();
                }
            };

            function eventBind() {
                var _this = this;
                _this.mainMenu.off();
                _this.mainMenu.on('mouseover.jqcMenuItem', '.jqcMenuItem', function (e) {
                    $(e.target).find('>ul').fadeIn(_this.options.speed);
                    e.stopPropagation();
                });

                _this.mainMenu.on('mouseleave.jqcMenuItem', 'li', function (e) {
                    $(e.currentTarget).find('>ul').fadeOut(_this.options.speed);
                });

                _this.mainMenu.on('click.jqcMenuLeaf', '.jqcMenuLeaf', function (e) {
                    _this.mainMenu.find('ul').fadeOut(_this.options.speed);
                    _this.options.onSelect && _this.options.onSelect(_this.menuIndex.get($(e.target).attr('menuId')));
                });

                if (_this.options.allowedConfig) {
                    _this.settingBtn.off();
                    _this.settingBtn.on('click.jqcMenu', function (e) {
                        if (_this.isSetting) {
                            _this.settingDialog.close();
                            e.stopPropagation();
                            return;
                        }
                        _this.isSetting = true;
                        if (_this.settingDialog) {
                            _this.settingDialog.open();
                        } else {
                            renderSettingPanel.call(_this);
                        }
                    });
                }
            }

            function render() {
                var _this = this;
                _this.container = $('<div>').addClass('jqcMenu').css('position', _this.options.position)
                    .css('width', _this.options.width).css('left', _this.options.left).css('top', _this.options.top);
                if (false == _this.options.displayed) {
                    _this.hide();
                }
                _this.container.css('z-index', $.jqcZindex.menu);
                if (_this.options.allowedConfig) {
                    _this.setting = $('<div>').addClass('jqcMenuSetting');
                    _this.settingBtn = $('<span>').attr('title', $.jqcLang.MENU_SETTING);
                    _this.setting.append(_this.settingBtn);
                    _this.container.append(_this.setting);
                }
                if (this.options.allowedConfig) {
                    _this.hasMenuId = _this.options.configurableMenuData[0].hasOwnProperty(_this.options.adapter.id);
                } else {
                    _this.hasMenuId = _this.options.data[0].hasOwnProperty(_this.options.adapter.id);
                }
<<<<<<< HEAD
                this.menuIndex = new Map();
=======
>>>>>>> 1c47d001f08a091291e9e320e0494c86c817acb0
                _this.mainMenu = renderMenuBox.call(_this, _this.options.data);
                _this.container.append(_this.mainMenu);

                $('body').append(_this.container);
            }

            function renderMenuBox(data) {
                var _this = this;
                var menuBox = $('<ul>').addClass('jqcMenuBox');
                data.forEach(function (value, index, array) {
                    var id = value[_this.options.adapter.id];
                    if (_this.snapshot) {
                        if (_this.snapshot[id]) {
                            menuBox.append(renderMenu.call(_this, value));
                        }
                    } else {
                        menuBox.append(renderMenu.call(_this, value));
                    }
                });

                return menuBox;
            }

            function renderMenu(data) {
                var _this = this;
                var item = $('<li>');
                var _data = this.options.autoSkip ? simplifyData.call(_this, data) : data;
                item.text(_data[_this.options.adapter.label]);
                if (!_this.hasMenuId) {
                    _data[_this.options.adapter.id] = 'jqc'.concat($.jqcUniqueKey.fetchIntradayKey());
                }
                var id = _data[_this.options.adapter.id];
                item.attr('menuId', id);
                var _child = _this.options.adapter.child;
                if (_data.hasOwnProperty(_child) && Array.isArray(_data[_child]) && _data[_child].length > 0) {
                    if (_data[_child].length === 1 && _this.options.autoSkip) {
                        item.text(_data[_child][0][_this.options.adapter.label]);
                        item.attr('menuId', _data[_child][0][_this.options.adapter.id]);
                        item.addClass('jqcMenuLeaf');
                        _this.menuIndex.set(_data[_child][0][_this.options.adapter.id], _data[_child][0]);
                    } else {
                        item.addClass('jqcMenuItem');
                        item.append(renderMenuBox.call(_this, _data[_child]));
                    }
                } else {
                    item.addClass('jqcMenuLeaf');
                }
                _this.menuIndex.set(id, _data);
                return item;
            }

            function simplifyData(data) {
                var _this = this;
                var child = [];
                var _child = _this.options.adapter.child;
                if (!data.hasOwnProperty(_child) || !Array.isArray(data[_child]) || data[_child].length === 0) {
                    return data;
                }
                if (this.snapshot) {
                    child = data[_child].filter(item => (this.snapshot[item[_this.options.adapter.id]]));
                } else {
                    child = data[_child];
                }
                var len = child.length;
                if (len >= 2) {
                    return data;
                }
                if (len === 1) {
                    return simplifyData.call(_this, child[0]);
                }
            }

            function renderSettingPanel() {
                var _this = this;
                _this.configurableMenuIndex = new Map();
                _this.settingPanel = $('<div>').addClass('jqcMenuSettingPanel');
                _this.options.configurableMenuData.forEach(function (value, index, array) {
                    _this.settingPanel.append(renderConfig.call(_this, value));
                });
                _this.settingPanel.find('>ul').css('width', _this.options.width * 1.5);

                _this.settingStack = [];
                _this.settingDialog = new $.jqcDialog({
                    title: $.jqcLang.MENU_SETTING_CONFIG,
                    content: _this.settingPanel,
                    modal: false,
                    width: _this.options.configBoxWidth,
                    position: {
                        top: _this.options.top,
                        left: _this.options.width + _this.options.left + 3
                    },
                    afterClose: function () {
                        _this.isSetting = false;
                    }
                });
                _this.settingDialog.open();

                _this.settingPanel.off();
                _this.settingPanel.on('click.jqcMenu', '.jqcMenuConfigLeaf', function (e) {
                    if (e.target.tagName == 'INPUT') {
                        e.stopPropagation();
                        return;
                    }
                    _this.settingDialog.close();
                    _this.options.onSelect && _this.options.onSelect(_this.configurableMenuIndex.get($(e.target).parent().attr('menuConfigId')));
                });

                _this.settingPanel.on('change.jqcMenu', 'input', function (e) {
                    var $checkbox = $(e.target),
                        $menu = $checkbox.parent().parent();
                    var _id = $menu.attr('menuConfigId');
                    var parentId = $menu.attr('parentId');
                    var menu = _this.configurableMenuIndex.get(_id);

                    var $parent = $menu.parents('li:first');
                    var $grandpa = $parent.parents('li:first');
                    var _checked;
                    if (e.target.checked) {
                        _checked = true;
                        $parent.find('input').eq(0).prop('checked', _checked);
                        $grandpa.find('input').eq(0).prop('checked', _checked);
                        $menu.find('input').prop('checked', _checked);
                    } else {
                        _checked = false;
                        $menu.find('input').prop('checked', _checked);
                        var pInput = $parent.find('input');
                        var pFlag = false;
                        for (var i = 1; i < pInput.length; i++) {
                            var element = pInput[i];
                            pFlag = element.checked ? true : pFlag;
                        }
                        pInput.eq(0).prop('checked', pFlag);
                        var gInput = $grandpa.find('input');
                        var gFlag = false;
                        for (var j = 1; j < gInput.length; j++) {
                            var element = gInput[j];
                            gFlag = element.checked ? true : gFlag;
                        }
                        gInput.eq(0).prop('checked', gFlag);
                    }
                    reRender.call(_this, true);
                });
            }

            function reRender(realRerender) {
                var _this = this;
                this.menuIndex = new Map();
                var data = this.options.configurableMenuData;
                var input = this.settingPanel.find('input');
                this.snapshot = {};
                for (var index = 0; index < input.length; index++) {
                    var element = input[index];
                    var _id = $(element).attr('data-id');
                    var _checked = $(element).prop('checked');
                    if (_checked) {
                        _this.snapshot[_id] = true;
                    }
                }
                this.mainMenu.remove();
                this.mainMenu = renderMenuBox.call(_this, _this.options.configurableMenuData);
                this.container.append(_this.mainMenu);
                eventBind.call(this);

                if (this.options.onResettingMenu && realRerender) {
                    clearTimeout(this.reRenderCallBackHandler);
                    this.reRenderCallBackHandler = setTimeout(function () {
                        var idQ = [];
                        _this.mainMenu.find('li').each(function (idx, el) {
                            idQ.push($(el).attr('menuId'));
                        })
                        _this.options.onResettingMenu(idQ);
                    }, 3000);
                }
            }

            function renderConfig(data, parentId) {
                var _this = this;
                var menuBox = $('<ul>').addClass('jqcMenuConfigItem');
                if (Array.isArray(data)) {
                    data.forEach(function (value, index, array) {
                        menuBox.append(renderConfigMenu.call(_this, value, parentId));
                    });
                } else {
                    menuBox.append(renderConfigMenu.call(_this, data, parentId));
                }

                return menuBox;
            }

            function renderConfigMenu(data, parentId) {
                var _this = this;
                var item = $('<li>');
                var id = data[_this.options.adapter.id];
                if (this.menuIndex.has(id)) {
                    setTimeout(function () {
                        var parent = item.parent().parent();
                        while (parent.attr('menuconfigid')) {
                            parent.find('input').eq(0).prop('checked', true);
                            parent = parent.parent().parent();
                        }
                        reRender.call(_this);
                    }, 200);
                }
                item.append($('<div>').text(data[_this.options.adapter.label]).append('<input type="checkbox" data-id=' + id + ''.concat(_this.menuIndex.has(id) ? ' checked="checked"' : '').concat('>').concat('<span></span>')));
                item.attr('menuConfigId', id);

                var _child = _this.options.adapter.child;
                if (data.hasOwnProperty(_child) && Array.isArray(data[_child]) && data[_child].length > 0) {
                    if (data[_child].length === 1) {
                        item.addClass('jqcMenuOnly');
                    }
                    item.addClass('jqcMenuConfigItem');
                    item.append(renderConfig.call(_this, data[_child], id));
                } else {
                    item.addClass('jqcMenuConfigLeaf');
                }
                if (parentId) {
                    item.attr('parentId', parentId);
                }
                _this.configurableMenuIndex.set(id, data);

                return item;
            }
        });
}(jQuery));
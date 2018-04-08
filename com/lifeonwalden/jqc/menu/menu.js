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
                    displayed: true, // displayed after render
                    allowedConfig: false,
                    configurableMenuData: null, // configurable menu data source
                    onRemoveMenu: null, // call back for remove menu in configuration
                    onAddMenu: null, // call back for add menu in configuration
                    onSelect: null, //call back function for leaf menu be selected
                };
                if (arguments.length > 0) {
                    $.jqcBaseElement.apply(this, arguments);
                }
                this.options = $.extend(true, {}, DEFAULT_OPTIONS, params);
                this.typeName = 'jqcMenu';
                this.elementId = 'jqc'.concat($.jqcUniqueKey.fetchIntradayKey());
                if (this.options.allowedConfig) {
                    if (!this.options.data[0].hasOwnProperty(this.options.adapter.id)) {
                        throw new Error("Configuration menu require [id] property in the menu object.");
                    }
                }
                this.menuIndex = new Map();
                render.call(this);
                eventBind.call(this);
            };

            $.jqcMenu.prototype = new $.jqcBaseElement();
            $.jqcMenu.prototype.constructor = $.jqcMenu;
            $.jqcMenu.prototype.show = function () {
                if (this.options.position == 'fixed') {
                    this.container.animate({
                        left: 0
                    }, this.options.speed);
                } else {
                    this.container.fadeIn();
                }
            };
            $.jqcMenu.prototype.hide = function () {
                if (this.options.position == 'fixed') {
                    this.container.animate({
                        left: -1 * this.options.width
                    }, this.options.speed);
                } else {
                    this.container.fadeOut();
                }
            };

            function eventBind() {
                var _this = this;
                _this.mainMenu.on('mouseover.jqcMenuItem', '.jqcMenuItem', function (e) {
                    $(e.target).find('>ul').fadeIn(_this.options.speed);
                    e.stopPropagation();
                });

                _this.mainMenu.on('mouseleave.jqcMenuItem', 'li', function (e) {
                    $(e.currentTarget).find('>ul').fadeOut(_this.options.speed);
                });

                _this.mainMenu.on('click.jqcMenuLeaf', '.jqcMenuLeaf', function (e) {
                    _this.mainMenu.find('ul').fadeOut(_this.options.speed);
                    _this.options.onSelect(_this.menuIndex.get($(e.target).attr('menuId')));
                });

                if (_this.options.allowedConfig) {
                    _this.settingBtn.on('click.jqcMenu', function (e) {
                        if (_this.isSetting) {
                            return;
                        }
                        _this.isSetting = true;
                        renderSettingPanel.call(_this);
                    });
                }
            }

            function render() {
                var _this = this;
                _this.container = $('<div>').addClass('jqcMenu').css('position', _this.options.position)
                    .css('width', _this.options.width).css('left', _this.options.left).css('top', _this.options.top);
                if (false == _this.options.displayed) {
                    _this.container.css('left', -1 * _this.options.width);
                }
                _this.container.css('z-index', $.jqcZindex.menu);
                if (_this.options.allowedConfig) {
                    _this.setting = $('<div>').addClass('jqcMenuSetting');
                    _this.settingBtn = $('<span>').attr('title', $.jqcLang.SETTING);
                    _this.setting.append(_this.settingBtn);
                    _this.container.append(_this.setting);
                }
                _this.hasMenuId = _this.options.data[0].hasOwnProperty(_this.options.adapter.id);
                _this.mainMenu = renderMenuBox.call(_this, _this.options.data);
                _this.container.append(_this.mainMenu);

                $('body').append(_this.container);
            }

            function renderMenuBox(data) {
                var _this = this;
                var menuBox = $('<ul>').addClass('jqcMenuBox');
                data.forEach(function (value, index, array) {
                    menuBox.append(renderMenu.call(_this, value));
                });

                return menuBox;
            }

            function renderMenu(data) {
                var _this = this;
                var item = $('<li>');
                item.text(data[_this.options.adapter.label]);
                if (!_this.hasMenuId) {
                    data[_this.options.adapter.id] = 'jqc'.concat($.jqcUniqueKey.fetchIntradayKey());
                }
                var id = data[_this.options.adapter.id];
                item.attr('menuId', id);

                var _child = _this.options.adapter.child;
                if (data.hasOwnProperty(_child) && Array.isArray(data[_child]) && data[_child].length > 0) {
                    item.addClass('jqcMenuItem');
                    item.append(renderMenuBox.call(_this, data[_child]));
                } else {
                    item.addClass('jqcMenuLeaf');
                }
                _this.menuIndex.set(id, data);

                return item;
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
                    title: $.jqcLang.SETTING_CONFIG,
                    content: _this.settingPanel,
                    modal: false,
                    position: {
                        top: _this.options.top,
                        left: _this.options.width + 3
                    },
                    afterClose: function () {
                        _this.isSetting = false;
                    }
                });
                _this.settingDialog.open();

                _this.settingPanel.on('click.jqcMenu', '.jqcMenuConfigLeaf', function (e) {
                    if (e.target.tagName == 'INPUT') {
                        e.stopPropagation();
                        return;
                    }
                    _this.settingDialog.close();
                    _this.options.onSelect(_this.configurableMenuIndex.get($(e.target).parent().attr('menuConfigId')));
                });

                _this.settingPanel.on('change.jqcMenu', 'input', function (e) {
                    var $checkbox = $(e.target),
                        $menu = $checkbox.parent().parent();
                    var isLeaf = $menu.hasClass('jqcMenuConfigLeaf');
                    var parentId = $menu.attr('parentId');
                    var menu = _this.configurableMenuIndex.get($menu.attr('menuConfigId'));
                    if (e.target.checked) {
                        if (undefined != parentId && _this.menuIndex.has(parentId)) {
                            _this.mainMenu.find('[menuId="'.concat(parentId).concat('"]')).find('>ul').append(renderMenu.call(_this, menu));
                        } else {
                            _this.mainMenu.append(renderMenu.call(_this, menu));
                        }
                        $menu.find('input').prop('checked', true);
                    } else {
                        while (undefined != parentId && _this.menuIndex.has(parentId)) {
                            if ($menu.parent().find('input:checked').length < 1) {
                                $menu = $menu.parent().parent();
                                parentId = $menu.attr('parentId');
                            } else {
                                break;
                            }
                        }
                        menu = _this.configurableMenuIndex.get($menu.attr('menuConfigId'));
                        removeMenuBox.call(_this, menu);
                        $menu.find('input').prop('checked', false);
                    }
                });
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
                item.append($('<div>').text(data[_this.options.adapter.label]).append('<input type="checkbox"'.concat(_this.menuIndex.has(id) ? ' checked="checked"' : '').concat('>')));
                item.attr('menuConfigId', id);

                var _child = _this.options.adapter.child;
                if (data.hasOwnProperty(_child) && Array.isArray(data[_child]) && data[_child].length > 0) {
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

            function removeMenuBox(data) {
                var _this = this;
                if (Array.isArray(data)) {
                    data.forEach(function (value, index, array) {
                        removeMenu.call(_this, value);
                    });
                } else {
                    removeMenu.call(_this, data);
                }
            }

            function removeMenu(data) {
                var _this = this;
                var id = data[_this.options.adapter.id];
                _this.menuIndex.delete(id);
                _this.mainMenu.find('[menuId="'.concat(id).concat('"]')).remove();
                var _child = _this.options.adapter.child;
                if (data.hasOwnProperty(_child) && Array.isArray(data[_child]) && data[_child].length > 0) {
                    removeMenuBox.call(_this, data[_child]);
                }
            }
        });
}(jQuery));
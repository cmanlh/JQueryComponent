/**
 * author: mawenjie
 * lastModifyTime: 2018年7月9日15:55:45
 */
;(function ($) {
    $JqcLoader.importComponents('com.lifeonwalden.jqc', ['baseElement', 'uniqueKey', 'lang', 'dialog', 'zindex'])
        .importCss($JqcLoader.getCmpParentURL('com.lifeonwalden.jqc', 'menuTree').concat('css/menuTree.css'))
        .execute(function () {
            var pageHeight = window.innerHeight;
            const DEFAULT_OPTIONS = {
                data: null, // menu data
                speed: 200, //animate speed :ms
                width: 200, // menu item width
                position: 'fixed',
                top: 0, // top of position
                left: 0, // left of position
                autoHide: true, //mouseleave auto hidden 
                adapter: {
                    id: 'id',
                    label: 'label',
                    child: 'child'
                },
                configBoxWidth: 500, // dialog width
                displayed: true, // displayed after render
                allowedConfig: false,
                autoSkip: true,
                triggerFirst: false,
                configurableMenuData: null, // configurable menu data source
                onResettingMenu: null, // call back for resetting menu
                onSelect: null, //call back function for leaf menu be selected
                onHide: null,
                onShow: null
            };

            $.jqcMenuTree = function (params) {
                var _this = this;
                this.display = false;
                this.avavilable = {};
                if (arguments.length > 0) {
                    $.jqcBaseElement.apply(this, arguments);
                }
                this.options = $.extend(true, {}, DEFAULT_OPTIONS, params);
                this.data = (params.configurableMenuData && params.allowedConfig) ? [].concat(params.configurableMenuData) : [].concat(params.data);
                this.typeName = 'jqcMenuTree';
                this.elementId = 'jqc'.concat($.jqcUniqueKey.fetchIntradayKey());
                canIUse.call(this, this.options.data);
                createMenuBox.call(this);
                eventProxy.call(this);
                render.call(this, this.data);
                if (params.triggerFirst) {
                    setTimeout(function () {
                        _this.container.find('.jqcMenuTree-available').eq(0).trigger('click');
                    }, 500);
                }
            };
            // 继承
            $.jqcMenuTree.prototype = new $.jqcBaseElement();
            $.jqcMenuTree.prototype.constructor = $.jqcMenuTree;
            $.jqcMenuTree.prototype.show = function () {
                var _this = this;
                if (this.options.position == 'fixed') {
                    this.container.animate({
                        left: this.options.left
                    }, this.options.speed, function () {
                        _this.display = true;
                    });
                } else {
                    this.container.fadeIn();
                }
                this.switch.addClass('active');
                this.options.onShow && this.options.onShow(_this.options.width, _this.options.speed);
            };
            $.jqcMenuTree.prototype.hide = function () {
                var _this = this;
                if (this.options.position == 'fixed') {
                    this.container.animate({
                        left: -1 * this.options.width - this.options.left + 20
                    }, this.options.speed, function () {
                        _this.display = false;
                    });
                } else {
                    this.container.fadeOut();
                }
                this.switch.removeClass('active');
                this.options.onHide && this.options.onHide(_this.options.width, _this.options.speed);
                if (this.isSetting) {
                    this.settingDialog.close();
                }
            };
            $.jqcMenuTree.prototype.destroyed = function () {
                $(window).off('resize.jqcMenuTree');
            };

            function eventProxy() {
                var _this = this;
                if (this.options.autoHide) {
                    this.container.on('mouseleave.jqcMenuTree', function () {
                        if (_this.isSetting) {
                            return;
                        }
                        _this.debounceHandle = setTimeout(function () {
                            _this.hide();
                        }, 600);
                    });
                    this.container.on('mouseenter.jqcMenuTree', function () {
                        if (_this.debounceHandle) {
                            clearTimeout(_this.debounceHandle);
                        }
                    })
                }
                this.container.on('click', 'li', function (e) {
                    e.stopPropagation();
                    var child = $(this).children('ul');
                    if (child.is(':visible')) {
                        child.slideUp(100);
                        $(this).removeClass('active');
                    } else {
                        $(this).addClass('active');
                        child.slideDown(100);
                    }
                    var _child = $(this).siblings().children('ul');
                    _child.slideUp(100);
                    $(this).siblings().removeClass('active');
                    if (this.data) {
                        _this.options.onSelect && _this.options.onSelect.call(_this, this.data);
                    }
                });
                $(window).on('resize.jqcMenuTree', function () {
                    _this.container.css('height', this.innerHeight);
                })
                if (_this.options.displayed) {
                    _this.show();
                }
                this.switch.click(function (e) {
                    if (_this.display) {
                        _this.hide();
                    } else {
                        _this.show();
                    }
                })
            }
            function createMenuBox() {
                var _this = this;
                _this.container = $('<div>')
                    .addClass('jqcMenuTree')
                    .css({
                        'position': _this.options.position,
                        'width': _this.options.width,
                        'height': window.innerHeight - _this.options.top,
                        'top': _this.options.top,
                        'left': - _this.options.width + 20,
                        'z-index': $.jqcZindex.menu
                    });
                $('body').append(_this.container);
                this.scrollbox = $('<div>')
                    .addClass('jqcMenuTree-scrollbox');
                this.switch = $('<div>')
                    .addClass('jqcMenuTree-switch');
                this.ban = $('<div>')
                    .addClass('jqcMenuTree-limit');
                this.container.append(_this.scrollbox, this.switch, this.ban);
                if (this.options.allowedConfig && this.options.configurableMenuData) {
                    this.settingSwitch = $('<span>').addClass('jqcMenuTree-settingSwitch');
                    this.container.append(_this.settingSwitch)
                        .addClass('jqcMenuTree-canSetting');
                    this.settingSwitch.click(function () {
                        if (_this.settingDialog) {
                            _this.settingDialog.close();
                            _this.settingDialog = null;
                            _this.isSetting = false;
                        } else {
                            renderSettingPanel.call(_this);
                            setTimeout(function () {
                                _this.settingDialog.open();
                                _this.isSetting = true;
                            }, 100)
                        }
                        
                    })
                }
            }
            function render(data) {
                var _this = this;
                if (this.mainMenu) {
                    this.mainMenu.remove();
                }
                _this.mainMenu = renderMenuBox.call(_this, data);
                _this.scrollbox.append(_this.mainMenu);
            }

            function renderMenuBox(data) {
                var _this = this;
                var menuBox = $('<ul>').addClass('jqcMenuTree-item')
                    .css('width', _this.options.width);
                data.forEach(function (value, index, array) {
                    var id = value[_this.options.adapter.id];
                    if (_this.avavilable && _this.avavilable[id]) {
                        menuBox.append(renderMenu.call(_this, value));
                    }
                });
                return menuBox;
            }

            function renderMenu(data) {
                var _this = this;
                var _label = this.options.adapter.label;
                var _id = this.options.adapter.id;
                var _child = _this.options.adapter.child;
                var item = $('<li>');
                var _data = this.options.autoSkip ? simplifyData.call(_this, data) : data;
                var textBox = $('<div>');
                textBox.text(_data[_label]);
                item.append(textBox);
                item.attr('menuId', _data[_id]);
                if (_data[_child] && _data[_child].length > 0) {
                    item.addClass('hasChild');
                    item.append(renderMenuBox.call(_this, _data[_child]));
                } else {
                    item[0].data = _data;
                    item.addClass('jqcMenuTree-available');
                }
                return item;
            }

            function simplifyData(data) {
                var _this = this;
                var _child = this.options.adapter.child;
                var _id = this.options.adapter.id;
                // 没有child
                if (!data.hasOwnProperty(_child) || !Array.isArray(data[_child]) || data[_child].length === 0) {
                    return data;
                }
                // 有child
                child = data[_child].filter(item => (_this.avavilable[item[_id]]));
                var len = child.length;
                if (len >= 2) {
                    return data;
                }
                if (len === 1) {
                    return simplifyData.call(_this, child[0]);
                }
            }
            function canIUse(data) {
                var _this = this;
                var _child = this.options.adapter.child;
                var _id = this.options.adapter.id;
                data.forEach(item => {
                    _this.avavilable[item[_id]] = true;
                    if (item[_child]) {
                        canIUse.call(_this, item[_child]);
                    }
                });
            }
            function renderSettingPanel() {
                var _this = this;
                _this.settingPanel = $('<div>')
                    .addClass('jqcMenuTree-settingPanel');
                _this.options.configurableMenuData.forEach(function (value, index, array) {
                    _this.settingPanel.append(renderConfig.call(_this, value));
                });
                _this.settingPanel.find('>ul').css('width', _this.options.width * 1.2);
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
                        _this.settingDialog = null;
                    }
                });
                _this.settingPanel.on('click.jqcMenuTree', 'div', function (e) {
                    e.stopPropagation();
                    if ($(this).hasClass('hasChild')) {
                        return;
                    }
                    _this.settingDialog.close();
                    _this.options.onSelect && _this.options.onSelect(this.data);
                });
                // 防止input点击冒泡
                _this.settingPanel.on('click.jqcMenuTree-input', 'input', function (e) {
                    e.stopPropagation();
                });
                // 监听input改变
                _this.settingPanel.on('change.jqcMenuTree', 'input', function (e) {
                    var _checked = $(this).prop('checked');
                    var $li = $(this).parent().parent();
                    $li.find('input').prop('checked', _checked);

                    var $parent = $li.parents('li:first');
                    var $grandpa = $parent.parents('li:first');

                    if (_checked) {
                        $parent.find('input').eq(0).prop('checked', _checked);
                        $grandpa.find('input').eq(0).prop('checked', _checked);
                    } else {
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
                    reRender.call(_this);
                });
            }

            function reRender() {
                var _this = this;
                var input = this.settingPanel.find('input');
                for (var index = 0; index < input.length; index++) {
                    var element = input[index];
                    var _id = $(element).attr('data-id');
                    var _checked = $(element).prop('checked');
                    _this.avavilable[_id] = _checked;
                }
                setTimeout(function () {
                    var idQ = [];
                    for (var i in _this.avavilable) {
                        if (_this.avavilable[i]) {
                            idQ.push(i);
                        }
                    }
                    render.call(_this, _this.options.configurableMenuData);
                    if (_this.options.onResettingMenu) {
                        clearTimeout(_this.afterSetting);
                        _this.afterSetting = setTimeout(function () {
                            _this.options.onResettingMenu(idQ);
                        }, 3000);
                    }
                }, 50);
            }
            function renderConfig(data, parentId) {
                var _this = this;
                var menuBox = $('<ul>').addClass('jqcMenuTree-settingItem');
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
                var _label = this.options.adapter.label;
                var _child = _this.options.adapter.child;
                var _id = this.options.adapter.id;
                var id = data[_id];
                var $div = $('<div>')
                    .attr('data-menuId', id)
                    .text(data[_label]);
                var $input = $(`<input type="checkbox" data-id=${id}>`);
                if (this.avavilable[id]) {
                    $input.prop('checked', true);
                }
                var $fakeCheckbox = $('<span>');
                $div.append($input, $fakeCheckbox);
                item.append($div);
                if (data[_child] && data[_child].length > 0) {
                    item.append(renderConfig.call(_this, data[_child], id));
                    $div.addClass('hasChild');
                } else {
                    $div[0].data = data;
                }
                return item;
            }
        });
}(jQuery));
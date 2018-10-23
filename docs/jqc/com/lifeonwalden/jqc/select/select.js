/**
 * author: mawenjie
 * lastModifyTime: 2018年10月19日16:34:32
 * 下拉框组件：模拟原生下拉框
 */
;(function ($) {
    $JqcLoader.importComponents('com.lifeonwalden.jqc', ['baseElement', 'uniqueKey', 'valHooks'])
        .importCss($JqcLoader.getCmpParentURL('com.lifeonwalden.jqc', 'select').concat('css/select.css'))
        .execute(function () {
            const keyCode = {
                left: 37,
                up: 38,
                right: 39,
                down: 40,
                enter: 13
            };
            const empty = {
                '*': {
                    value: '',
                    label: '全部'
                },
                'null': {
                    value: '',
                    label: '空'
                }
            };

            $.jqcSelect = function (params) {
                var _this = this;
                if (!params.el || !(params.el instanceof jQuery)) {
                    throw new Error('jqcSelect: 缺少el参数或el参数非jQuery对象');
                }
                this._el = params.el;   // input
                if (this._el.data('jqcSelect') instanceof $.jqcSelect) {
                    this._el.data('jqcSelect').destroy();
                }
                this._defaultValue = null;
                if (params.defaultValue != undefined) {
                    this._defaultValue = params.defaultValue;
                }
                if (this._el.attr('defaultvalue') != undefined) {
                    this._defaultValue = this._el.attr('defaultvalue');
                }
                this._adapter = Object.assign({}, { value: 'value', label: 'label'}, (params.adapter || {})); // 适配
                this.currentIndex = -1;
                this.listLen = 0;
                this._data = params.data || [];
                this._observer();
                this.currentValue = this._defaultValue;
                this.init();
                this.bindEvent();
            }
            // 属性拦截器
            $.jqcSelect.prototype._observer = function () {
                var _this = this;
                Object.defineProperty(this, 'currentValue', {
                    set: value => {
                        _this._el.data('value', value);
                        if (value == '' && _this._el.attr('ext') != undefined) {
                            _this._el[0].value = empty[_this._el.attr('ext')].label;
                            _this._el.trigger('change', empty[_this._el.attr('ext')]);
                            return;
                        }
                        var _data = _this._data.filter(i => (i[_this._adapter.value] == value));
                        if (_data.length == 1) {
                            _this._el[0].value = _this.format(_data[0]);
                            _this._el.trigger('change', _data[0]);
                        } else {
                            _this._el[0].value = value;
                        }
                    },
                    get: () => {
                        return _this._el.data('value');
                    }
                });
            }            
            // 初始化 
            $.jqcSelect.prototype.init = function () {
                var _this = this;
                this._el.data('jqcSelect', this);
                this._el.addClass('jqcSelect-input')
                    .prop('readOnly', true)
                    .css('background-position', this._el.outerWidth() - 25);
            }
            // 绑定事件
            $.jqcSelect.prototype.bindEvent = function () {
                var _this = this;
                // input添加点击事件
                this._el.on('click.jqcSelect', function (e) {
                    e.stopPropagation();
                    var $this = $(this);
                    if ($this.hasClass('active')) {
                        _this.close();
                    } else {
                        $('.jqcSelect-input').removeClass('active');
                        _this.render();
                    }
                });
            },
            // 渲染
            $.jqcSelect.prototype.render = function () {
                var _this = this;
                var _label = this._adapter.label;
                var _value = this._adapter.value;
                this._el.addClass('active');
                var _width = this._el.outerWidth();
                var _height = this._el.outerHeight();
                var _offset = this._el.offset();
                var container = $('.jqcSelect-container');
                if (container.length) {
                    container.remove();
                }
                this.ul = $('<ul>').addClass('jqcSelect-items');
                var ext = this._el.attr('ext');
                if (ext != undefined) {
                    var _label = empty[ext].label;
                    var _value = empty[ext].value;
                    var _li = $('<li>').text(_label).attr('value', _value);
                    this.ul.append(_li);
                    _li.data({
                        value: _value,
                        data: empty[ext]
                    });
                    if (_value == _this.currentValue) {
                        _this.currentIndex = 0;
                        _li.addClass('active');
                    }
                }
                this._data.forEach(function(data, index) {
                    var value = data[_this._adapter.value];
                    var _li = $('<li>').text(_this.format(data)).attr('value', value);
                    if (value == _this.currentValue) {
                        _li.addClass('active');
                    }
                    _this.ul.append(_li);
                    _li.data({
                        value: value,
                        data: data
                    });
                });
                this.container = $('<div>')
                    .addClass('jqcSelect-container')
                    .css('width', _width)
                    .append(this.ul)
                    .css({
                        top: _offset.top + _height + 4,
                        left: _offset.left
                    });
                $('body').append(this.container);
                this.container.on('click', 'li', function (e) {
                    e.stopPropagation();
                    _this.currentValue = $(this).data('value');
                    _this.close();
                });
                $(document).on('keyup.jqcSelect-upAndDown', function (e) {
                    e.stopPropagation();
                    switch (e.keyCode) {
                        case keyCode.up:
                            _this.currentIndex = _this.currentIndex <= 0 ? _this.listLen - 1 : --_this.currentIndex;
                            _this.container.find('li').removeClass('active').eq(_this.currentIndex).addClass('active');
                            break;
                        case keyCode.down:
                            _this.currentIndex = _this.currentIndex >= _this.listLen - 1 ? 0 : ++_this.currentIndex;
                            _this.container.find('li').removeClass('active').eq(_this.currentIndex).addClass('active');
                            break;
                        case keyCode.enter:
                            _this.container.find('li').eq(_this.currentIndex).trigger('click');
                            break;
                        default:
                            break;
                    }
                });

                this.listLen = this.container.find('li').length;
                this.currentIndex = this.container.find('li.active').index();
                
                $(document).on('click.jqcSelect', function (e) {
                    _this.close();
                });
            }
            // 关闭
            $.jqcSelect.prototype.close = function () {
                var _this = this;
                this._el.removeClass('active');
                if (this.container) {
                    this.container.remove();
                    this.container = null;
                }
                $(document).off('keyup.jqcSelect-upAndDown');
                $(document).off('click.jqcSelect');
            }
            // 格式化
            $.jqcSelect.prototype.format = function (data) {
                var _this = this;
                var _label = '';
                if (typeof this._adapter.label == 'function') {
                    _label = this._adapter.label(data);
                } else {
                    _label = data[this._adapter.label];
                }
                return _label;
            }
            // 销毁
            $.jqcSelect.prototype.destroy = function () {
                var _this = this;
                this.close();
                this._el.data({
                    value: undefined,
                    jqcSelect: undefined
                }).removeClass('jqcSelect-input')
                    .off('click.jqcSelect')
                    .val('');
            }

        });
}(jQuery));
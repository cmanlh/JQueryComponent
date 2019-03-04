/**
 * checkbox
 * 
 */
;(function ($) {
    $JqcLoader.importComponents('com.lifeonwalden.jqc', ['baseElement', 'valHooks'])
        .importCss($JqcLoader.getCmpParentURL('com.lifeonwalden.jqc', 'checkbox').concat('css/checkbox.css'))
        .execute(function () {
            const defaultParams = {
                el: '',
                type: 'checkbox',
                mode: 'single',
                data: [],
                disabled: '',
                required: '',
                direction: 'row',
                defaultValue: '',
                trigger: 'all',
                adapter: {
                    label: 'label',
                    value: 'value'
                },
                width: '100%',
                onChange: null
            };

            $.jqcCheckbox = function (params) {
                var _this = this;
                var _adapter = Object.assign({
                    label: 'label',
                    value: 'value'
                }, params.adapter);
                Object.assign(this, defaultParams, params, {
                    adapter: _adapter
                });
                this.currentValue = [];
                if (this.el[0].value !== '') {
                    this.defaultValue = this.el[0].value;
                }
                if (this.defaultValue == '*') {
                    this.defaultValue = this.data.map(i => (i[this.adapter.value])).join(',');
                }
                if (!this.defaultValue) {
                    this.defaultValue = '';
                }
                this.currentValue = this.defaultValue.toString().split(',');
                this.init();
            }

            $.jqcCheckbox.prototype.init = function () {
                var _this = this;
                this.el.data('jqcInput', this);
                this.el.hide().prop('hidden', true);
                this.container = $('<div>').addClass('jqcCheckbox-container')
                    .addClass(this.type).addClass(this.direction)
                    .css({
                        width: this.width
                    });
                this.el.after(this.container);
                this.render();
                this.container.on('click', '.jqcCheckbox-item>p', function (e) {
                    var $p = $(this);
                    var $this = $(this).parent();
                    if ($this.hasClass('disabled')) {
                        return;
                    }
                    var _value = $this.data('value');
                    var _data = $this.data('data');
                    var _currentValue = [];
                    if (_this.mode == 'single') {
                        $this.addClass('active').siblings().removeClass('active');
                    } else if (_this.mode == 'multiple') {
                        $this.toggleClass('active');
                    }
                    $.each(_this.container.find('.jqcCheckbox-item'), function (index, el) {
                        var $item = $(el);
                        var $p = $item.find('p');
                        if (_this.trigger == 'icon') {
                            $p = $p.next();
                        }
                        var _data = $item.data('data');
                        $p.empty();
                        if ($item.hasClass('active')) {
                            _currentValue.push($(el).data('value'));
                            $p.append(_this._renderLabel(_data, true));
                        } else {
                            $p.append(_this._renderLabel(_data, false));
                        }
                    });
                    _this.currentValue = _currentValue;
                    var value = _this.getValue();
                    _this.onChange && _this.onChange(value);
                    _this.el.trigger('change', value);
                });
            }
            $.jqcCheckbox.prototype.render = function () {
                var _this = this;
                this.data.forEach(function(item) {
                    var $item = $('<div>').addClass('jqcCheckbox-item');
                    if (_this.el.prop('disabled') || _this.disabled == '*') {
                        $item.addClass('disabled')
                    }
                    var active = _this.currentValue.filter(i => (i == item[_this.adapter.value].toString()));
                    if (active.length) {
                        $item.addClass('active');
                    }
                    var disabled = _this.disabled.split(',').filter(i => (i == item[_this.adapter.value].toString()));
                    if (disabled.length) {
                        $item.addClass('disabled');
                    }
                    $item.data('value', item[_this.adapter.value].toString());
                    $item.data('data', item);
                    var $p = $('<p>').addClass('jqcCheckbox-target');
                    $item.append($p);
                    if (_this.trigger == 'icon') {
                        $p.css('margin-right', 0);
                        var $label = $('<div>').css({
                            'margin-right': 20,
                        }).append(_this._renderLabel(item, !!active.length));
                        $item.append($label);
                    } else {
                        $p.append(_this._renderLabel(item, !!active.length));
                    }
                    _this.container.append($item);
                });
            }
            $.jqcCheckbox.prototype._renderLabel = function (data, isChecked) {
                var _this = this;
                if (typeof this.adapter.label == 'function') {
                    return this.adapter.label(data, isChecked);
                }
                return data[this.adapter.label];
            }
            $.jqcCheckbox.prototype.setValue = function (val) {
                var _this = this;
                this.currentValue = val.split(',');
                $.each(this.container.find('.jqcCheckbox-item'), function (index, el) {
                    $(el).removeClass('active');
                    if (_this.currentValue.indexOf($(el).data('value')) > -1) {
                        $(el).addClass('active');
                    }
                });
            }
            $.jqcCheckbox.prototype.getValue = function () {
                return this.currentValue.join(',');
            }
        });
})(jQuery);
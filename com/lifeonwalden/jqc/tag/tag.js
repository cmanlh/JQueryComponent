/**
 * author: mawenjie
 * lastModifyTime: 2018年11月6日10:13:45
 * 下拉框组件：标签组件
 */
;(function ($) {
    $JqcLoader.importComponents('com.lifeonwalden.jqc', ['baseElement', 'uniqueKey', 'valHooks', 'notification', 'select'])
        .importCss($JqcLoader.getCmpParentURL('com.lifeonwalden.jqc', 'tag').concat('css/tag.css'))
        .execute(function () {
            const defaultParams = {
                width: 400,
                adapter: {
                    value: 'value',
                    label: 'label'
                },
                defaultValue: ''
            };
            $.jqcTag = function (params) {
                Object.assign(this, defaultParams, params);
                if (!this.el) {
                    throw new Error('jqcTag:缺少input标签');
                }
                this.el.data('jqcTag', this);
                this.currentValue = [];
                this.init();
            }
            $.jqcTag.prototype.init = function () {
                var _this = this;
                this.el.prop({
                    'readonly': true,
                    'hidden': true
                });
                this.render();
                this.bindEvent();
                var _val = this.el[0].value || this.defaultValue;
                this.setValue(_val);
            }
            $.jqcTag.prototype.render = function () {
                var _this = this;
                this.container = $('<div>').addClass('jqcTag-container')
                    .css({
                        width: _this.width
                    });
                this.el.after(this.container);
                this.createBtn = $('<p>').addClass('jqcTag-btn').text('新建');
                this.createInput = $('<input type="text">').addClass('jqcTag-input').attr('maxlength', 10);
                this.container.append(this.createBtn, this.createInput);
            }
            $.jqcTag.prototype.bindEvent = function () {
                var _this = this;
                this.createBtn.click(function (e) {
                    e.stopPropagation();
                    $(this).hide();
                    _this.createInput.show().focus();
                });
                if (Array.isArray(this.data)) {
                    new $.jqcSelect({
                        el: _this.createInput,
                        data: _this.data,
                        adapter: _this.adapter,
                        onSelect: function (data) {  
                            _this.logginTag();
                        }
                    });
                } else {
                    this.createInput.click(function (e) {
                        e.stopPropagation();
                    });
                    this.createInput.keyup(function (e) {
                        var _val = $(this).val();
                        if (_val.indexOf(';') > -1) {
                            $(this).val(_val.replace(/\;/g, ''));
                        }
                    });
                }
                $(document).on({
                    'click.jqcTag': function (e) {
                        if (_this.createInput.is(':visible')) {
                            _this.logginTag();
                        }
                    },
                    'keyup.jqcTag': function (e) {
                        if (_this.createInput.is(':visible')) {
                            if (e.keyCode != 13) {
                                return;
                            }
                            _this.logginTag();
                        }
                    }
                });
                this.container.on('click', 'span', function () {
                    var _tag = $(this).parent();
                    _this.currentValue = _this.currentValue.filter(i => (i !== _tag.text()));
                    _tag.remove();
                });
            }
            $.jqcTag.prototype.logginTag = function () {
                var _val = (this.createInput.val() || '').trim();
                this.createInput.hide().val('');
                this.createBtn.show();
                this.createTag(_val);
            }
            $.jqcTag.prototype.createTag = function (tagName) {
                var _this = this;
                if (tagName === '') {
                    return;
                }
                if (this.currentValue.indexOf(tagName) > -1) {
                    $.jqcNotification({
                        type: 'error',
                        title: `${tagName}已存在`
                    });
                    return;
                }
                this.currentValue.push(tagName);
                var _tag = $('<p>').text(tagName).addClass('jqcTag-item');
                var _close = $('<span>');
                this.createBtn.before(_tag);
                _tag.append(_close);
            }
            $.jqcTag.prototype.setValue = function (value) {
                var _this = this;
                this.currentValue = [];
                if (this.el.prop('disabled')) {
                    this.container.addClass('jqcTag-readOnly')
                } else {
                    this.el.removeClass('jqcTag-readOnly');
                }
                this.container.find('.jqcTag-item').remove();
                value.split(';').forEach(function(tagName) {
                    if (tagName !== '') {
                        _this.createTag(tagName);
                    }
                });
            }
            $.jqcTag.prototype.getValue = function () {
                var _this = this;
                return this.currentValue.join(';');
            }
        });
}(jQuery));
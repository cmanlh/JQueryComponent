/**
 * author: mawenjie
 * lastModifyTime: 2018年9月20日11:06:55
 */
;(function ($) {
    $JqcLoader.importComponents('com.lifeonwalden.jqc', ['baseElement', 'uniqueKey', 'valHooks'])
        .importCss($JqcLoader.getCmpParentURL('com.lifeonwalden.jqc', 'asyncSelect').concat('css/asyncSelect.css'))
        .execute(function () {
            const keyCode = {
                left: 37,
                up: 38,
                right: 39,
                down: 40,
                enter: 13
            };
            $.jqcAsyncSelect = function (params) {
                var _this = this;
                if (!params.el) {
                    throw new Error('jqcAsyncSelect: 缺少el参数');
                }
                if (!(params.el instanceof jQuery)) {
                    throw new Error('jqcAsyncSelect: el非jQuery对象');
                }
                if (params.el[0].nodeName != 'INPUT') {
                    throw new Error('jqcAsyncSelect: el非input标签');
                }
                if (!params.url) {
                    throw new Error('jqcAsyncSelect: 缺少url参数');
                }
                this.defaultValue = params.defaultValue || '';    // 默认值
                this.input = params.el;  // 需要组件化的input标签
                this.url = params.url;  // 异步请求的url
                this.wait = params.wait || 500; // 节流时间
                this.placeholder = params.placeholder || '输入选项值';   // searchbar搜索框placeholder
                this.max = params.max || 10;    // 同时显示的最大条数
                this.triggerLen = params.triggerLen || 0;
                this.requestData = params.requestData || function (value) { // 返回值为网络请求时需要带的参数
                    return {
                        data: value
                    };
                };
                this.getResult = params.getResult || function (res) {
                    return res.result || res.data || [];
                };
                this.adapter = params.adapter || {
                    value: 'value',
                    text: 'text'
                };
                this.format =params.format || function (item) {
                    return item[_this.adapter.text];
                },
                this.timer = null;  // 节流器
                params.el.data('jqcAsyncSelect', this);
                this.init();
            }
            $.jqcAsyncSelect.prototype.init = function () {
                this.input
                    .addClass('jqcAsyncSelect-input')
                    .prop('readOnly', true);
                this.elWidth = this.input.outerWidth();
                this.elHeight = this.input.outerHeight();
                this.input.css('background-position', this.elWidth - 25);
                this.bindEvent();
                // 有默认值情况
                if (this.defaultValue != undefined && this.defaultValue != '') {
                    this.input.data('value', this.defaultValue);
                    this.getAsyncData(true);
                }
            }
            $.jqcAsyncSelect.prototype.bindEvent = function () {
                var _this = this;
                // input添加点击事件
                this.input.off('click');
                this.input.click(function (e) {
                    e.stopPropagation();
                    var $this = $(this);
                    if ($this.hasClass('active')) {
                        return;
                    } else {
                        $('.jqcAsyncSelect-input').removeClass('active');
                        _this.render();
                    }
                });
                $(document).off('click.jqcAsyncSelect');
                $(document).on('click.jqcAsyncSelect', function (e) {
                    $('.jqcAsyncSelect-container').remove();
                    var $inputs = $('.jqcAsyncSelect-input');
                    $.each($inputs, function (index, el) {
                        var select = $(el).data('jqcAsyncSelect');
                        if (select) {
                            select.close();
                        }
                    });
                });
            }
            $.jqcAsyncSelect.prototype.close = function () {
                this.input.removeClass('active');
                if (this.container) {
                    this.container.remove();
                    this.container = null;
                }
                $(document).off('keyup.upAndDown');
            }
            $.jqcAsyncSelect.prototype.render = function () {
                var _this = this;
                var _offset = this.input.offset();
                this.input.addClass('active');
                var container = $('.jqcAsyncSelect-container');
                if (container.length) {
                    container.remove();
                }
                this.searchInput = $('<input>').addClass('jqcAsyncSelect-search')
                    .prop('placeholder', this.placeholder)
                    .css('width', this.elWidth);
                this.resetBtn = $('<button>').addClass('jqcAsyncSelect-reset').text('重置');
                var searchBar = $('<div>').addClass('jqcAsyncSelect-searchBar');
                searchBar.append(this.searchInput, this.resetBtn);
                this.ul = $('<ul>').addClass('jqcAsyncSelect-result-box').hide();
                this.container = $('<div>')
                    .addClass('jqcAsyncSelect-container')
                    .css('width', this.elWidth + 54)
                    .append(searchBar, this.ul)
                    .css({
                        top: _offset.top + this.elHeight + 4,
                        left: _offset.left
                    });
                $('body').append(this.container);
                this.searchInput.trigger('focus');
                this.container.click(function (e) {
                    e.stopPropagation();
                });
                this.searchInput.keyup(function (e) {
                    if (e.keyCode == keyCode.up || e.keyCode == keyCode.down || e.keyCode == keyCode.left || e.keyCode == keyCode.right || e.keyCode == keyCode.enter) {
                        // $(this).trigger('blur');
                        return;
                    }
                    _this.search();
                });
                this.resetBtn.click(function () {
                    _this.reset();
                })
            }
            $.jqcAsyncSelect.prototype.getAsyncData = function (hasDefaultValue) {
                var _this = this;
                var _val = null;
                if (this.ajax) {
                    this.ajax.abort();
                }
                if (hasDefaultValue) {
                    _val = this.input.data('value');
                } else {
                    _val = this.searchInput.val().trim();
                }

                if (_val == '' || _val.length < this.triggerLen) {
                    if (hasDefaultValue) {
                        _this.input[0].value = '';
                        _this.input.trigger('change', {});
                    } else {
                        this.renderResult([]);
                    }
                    return;
                }
                this.ajax = $.ajax({
                    url: this.url,
                    method: 'GET',
                    data: this.requestData(_val),
                    success: function (res) {
                        var data = _this.getResult(res);
                        if (hasDefaultValue) {
                            var _data = data.filter(i => (i[_this.adapter.value] == _val));
                            if (_data.length == 1) {
                                _this.input[0].value = (_this.format(_data[0]));
                                _this.input.trigger('change', _data[0]);
                            } else {
                                _this.input.data('value', _val);
                                _this.input[0].value = _val;
                                _this.input.trigger('change', {
                                    [_this.adapter.value]: _val,
                                    [_this.adapter.text]: _val
                                });
                                console.error('jqcAsyncSelect: 未查询到' + _val);
                            }
                        } else {
                            _this.renderResult(data);
                        }
                    }
                })
            }
            $.jqcAsyncSelect.prototype.search = function () {
                var _this = this;
                if (this.timer) {
                    clearTimeout(_this.timer);
                }
                this.timer = setTimeout(function() {
                    _this.getAsyncData();
                }, _this.wait);
            }
            $.jqcAsyncSelect.prototype.renderResult = function (data) {
                var _this = this;
                var _data = data.splice(0, this.max);
                this.ul.empty();
                var index = -1;
                if (!_data || !_data.length) {
                    var li = $('<li>').addClass('jqcAsyncSelect-item-none').text('无对应选项');
                    this.ul.append(li).show();
                    return;
                }
                var _value = this.adapter.value;
                var _text = this.adapter.text;
                if (_data[0][_value] == undefined) {
                    throw new Error('jqcAsyncSelect: adapter适配错误');
                }
                _data.forEach(function(item, index) {
                    var li = $('<li>').addClass('jqcAsyncSelect-item').text(_this.format(item));
                    li.data('data', item);
                    li.click(function (e) {
                        e.stopPropagation();
                        _this.input.data('value', item[_value]);
                        _this.input[0].value = (_this.format(item));
                        _this.close();
                        _this.input.trigger('change', item);
                    })
                    _this.ul.append(li);
                });
                this.ul.show();
                $(document).off('keyup.upAndDown');
                $(document).on('keyup.upAndDown', function (e) {
                    var items = _this.ul.find('li');
                    items.removeClass('active');
                    if (e.keyCode == keyCode.up) {
                        index --;
                        index = index < 0 ? _data.length - 1 : index;
                    } else if (e.keyCode == keyCode.down) {
                        index ++;
                        index = index >= _data.length ? 0 : index;
                    } else if (e.keyCode == keyCode.enter) {
                        if (index != -1) {
                            items.eq(index).trigger('click');
                        }
                        return;
                    } else {
                        return;
                    }
                    items.eq(index).addClass('active');
                });
            }
            $.jqcAsyncSelect.prototype.reset = function () {
                var _this = this;
                this.input.data('value', _this.defaultValue);
                this.getAsyncData(true);
                this.close();
            }
        });
}(jQuery));
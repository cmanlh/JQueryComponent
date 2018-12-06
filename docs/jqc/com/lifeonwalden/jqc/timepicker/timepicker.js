/**
 * author: mawenjie
 * lastModifyTime: 2018年11月2日14:55:35
 * 下拉框组件：模拟原生下拉框
 */
;(function ($) {
    $JqcLoader.importComponents('com.lifeonwalden.jqc', ['baseElement', 'uniqueKey', 'valHooks'])
        .importCss($JqcLoader.getCmpParentURL('com.lifeonwalden.jqc', 'timepicker').concat('css/timepicker.css'))
        .execute(function () {
            const keyCode = {
                left: 37,
                up: 38,
                right: 39,
                down: 40,
                enter: 13
            };
            const default_params = {
                format: 'HH:mm:ss',
                hoursStep: 1,
                hour: '00',
                minute: '00',
                second: '00',
                minutesStep: 1,
                secondsStep: 1,
                lock: false,
            };
            $.jqcTimepicker = function (params = {}) {
                Object.assign(this, default_params, params);
                if (!this.el) {
                    throw new Error('timepicker缺少input元素！');
                }
                this.defaultValue = this.el.value || params.defaultValue || this.format.replace(/[^\:]/g, '0');
                this.setValue(this.defaultValue);
                this.reset();
                this.init();
            }

            $.jqcTimepicker.prototype.init = function () {
                this.el.data('jqcInput', this).prop('readOnly', true).addClass('jqcTimepicker-element');
                this.bindEvent();
            }
            $.jqcTimepicker.prototype.bindEvent = function () {
                var _this = this;
                $(document).off('click.jqcTimepicker').on('click.jqcTimepicker', function () {
                    $('.jqcTimepicker-element').removeClass('active');
                    $.each($('.jqcTimepicker-element'), function (index, el) {
                        var instance = $(el).data('jqcInput');
                        instance.confirm();
                    });
                });
                this.el.click(function (e) {
                    e.stopPropagation();
                    if ($(this).hasClass('active')) {
                        _this.confirm();
                        return;
                    } else {
                        $(document).trigger('click.jqcTimepicker');
                        $(this).addClass('active');
                        _this.render();
                    }
                });
                this.el.blur(function () {
                    if (_this.lock) {
                        return;
                    }
                    _this.confirm();
                });
            }

            $.jqcTimepicker.prototype.render = function () {
                var _this = this;
                var _width = this.el.outerWidth();
                var _height = this.el.outerHeight();
                var _top = this.el.offset().top;
                var _left = this.el.offset().left;
                var wHeight = window.innerHeight;
                var top = _top + _height + 4;
                if (top + 190 > wHeight) {
                    top = _top - 180 -4;
                }
                this.box = $('<div>').addClass('jqcTimepicker-box').css({
                    width: _this.width || _width,
                    top: top,
                    left: _left
                });
                if (this.el.val() === '') {
                    this.el.val(this.currentValue);
                }
                this.container = $('<div>').addClass('jqcTimepicker-container');
                this.box.append(this.container);
                this.onShow && this.onShow(this.currentValue);
                $('body').append(this.box);
                this.box.mouseenter(function () {
                    _this.lock = true;
                }).mouseleave(function () {
                    _this.lock = false;
                });
                if (this.format.indexOf('HH') > -1) {
                    this.renderHoursColumn();
                }
                if (this.format.indexOf('mm') > -1) {
                    this.renderMinutesColumn();
                }
                if (this.format.indexOf('ss') > -1) {
                    this.renderSecondsColumn();
                }
                setTimeout(function () {
                    var _width = _this.container.find('.jqcTimepicker-column').innerWidth();
                    _this.container.find('li').css('width', _width);
                    var timer = null;
                    _this.container.on('click.jqcTimepicker', 'li', function (e) {
                        e.stopPropagation();
                        if ($(this).hasClass('disabled')) {
                            return;
                        }
                        var _filed = $(this).parent().data('value');
                        _this[_filed] = $(this).text();
                        $(this).addClass('active').siblings().removeClass('active');
                        _this.el.trigger('focus');
                        var _value = _this.format.replace('HH', _this.hour).replace('mm', _this.minute).replace('ss', _this.second)
                        _this.setValue(_value);
                        console.log(_this.lock);
                    })
                    $(window).on('scroll.jqcTimepicker', function (e) {
                        var _scrollTop = $(this).scrollTop();
                        var _top = _this.el.offset().top;
                        _this.box.css('top', _top + _height + 4 - _scrollTop);
                    });
                }, 0);
            }
            $.jqcTimepicker.prototype.renderHoursColumn = function () {
                var _this = this;
                var container = $('<div>').addClass('jqcTimepicker-column');
                this.container.append(container);
                var ul = $('<ul>').addClass('jqcTimepicker-items');
                ul.data('value', 'hour');
                container.append(ul);
                ul.mouseenter(function () {
                    var _index = _this.format.indexOf('HH');
                    _this.el[0].selectionStart = _index;
                    _this.el[0].selectionEnd = _index + 2;
                }).mouseleave(function () {
                    _this.el[0].selectionStart = 0;
                    _this.el[0].selectionEnd = 0;
                });
                for (var index = 0; index < 24; index++) {
                    var text = b0(index);
                    var li = $('<li>').text(text);
                    if (text == _this.hour) {
                        li.addClass('active');
                    }
                    ul.append(li);
                }
                setTimeout(function () {
                    ul.scrollTop(ul.find('.active').position().top);
                });
            }
            $.jqcTimepicker.prototype.renderMinutesColumn = function () {
                var _this = this;
                var container = $('<div>').addClass('jqcTimepicker-column');
                this.container.append(container);
                var ul = $('<ul>').addClass('jqcTimepicker-items');
                ul.data('value', 'minute');
                container.append(ul);
                ul.mouseenter(function () {
                    var _index = _this.format.indexOf('mm');
                    _this.el[0].selectionStart = _index;
                    _this.el[0].selectionEnd = _index + 2;
                }).mouseleave(function () {
                    _this.el[0].selectionStart = 0;
                    _this.el[0].selectionEnd = 0;
                });
                for (var index = 0; index < 60; index++) {
                    var text = b0(index);
                    var li = $('<li>').text(text);
                    if (text == _this.minute) {
                        li.addClass('active');
                    }
                    ul.append(li);
                }
                setTimeout(function () {
                    ul.scrollTop(ul.find('.active').position().top);
                });
            }
            $.jqcTimepicker.prototype.renderSecondsColumn = function () {
                var _this = this;
                var container = $('<div>').addClass('jqcTimepicker-column');
                this.container.append(container);
                var ul = $('<ul>').addClass('jqcTimepicker-items');
                ul.data('value', 'second');
                container.append(ul);
                ul.mouseenter(function (e) {
                    var _index = _this.format.indexOf('ss');
                    _this.el[0].selectionStart = _index;
                    _this.el[0].selectionEnd = _index + 2;
                }).mouseleave(function () {
                    _this.el[0].selectionStart = 0;
                    _this.el[0].selectionEnd = 0;
                });
                for (var index = 0; index < 60; index++) {
                    var text = b0(index);
                    var li = $('<li>').text(text);
                    if (text == _this.second) {
                        li.addClass('active');
                    }
                    ul.append(li);
                }
                setTimeout(function () {
                    ul.scrollTop(ul.find('.active').position().top);
                });
            }
            $.jqcTimepicker.prototype.setValue = function (val) {
                var _this = this;
                this.currentValue = val;
                if (this.format.indexOf('HH') > -1) {
                    this.hour = this.currentValue.substr(this.format.indexOf('HH'), 2);
                }
                if (this.format.indexOf('mm') > -1) {
                    this.minute = this.currentValue.substr(this.format.indexOf('mm'), 2);
                }
                if (this.format.indexOf('ss') > -1) {
                    this.second = this.currentValue.substr(this.format.indexOf('ss'), 2);
                }
                this.el[0].value = this.currentValue;
            }
            $.jqcTimepicker.prototype.getValue = function () {
                return this.currentValue;
            }
            $.jqcTimepicker.prototype.reset = function () {
                var _this = this;
                this.currentValue = this.defaultValue;
                var index = this.format.indexOf('HH');
                if (index > -1) {
                    this.hour = this.defaultValue.substr(index, 2);
                }
                index = this.format.indexOf('mm');
                if (index > -1) {
                    this.minute = this.defaultValue.substr(index, 2);
                }
                index = this.format.indexOf('ss');
                if (index > -1) {
                    this.second = this.defaultValue.substr(index, 2);
                }
                this.el.val(this.currentValue).removeClass('active');
                if (this.box) {
                    this.box.remove();
                }
            }
            $.jqcTimepicker.prototype.confirm = function () {
                var _this = this;
                if (this.box) {
                    this.box.remove();
                    this.onClose && this.onClose(this.currentValue);
                }
                this.el.removeClass('active');
            }



        });
    function b0(num) {
        return num <= 9 ? '0' + num : String(num);
    }
}(jQuery));
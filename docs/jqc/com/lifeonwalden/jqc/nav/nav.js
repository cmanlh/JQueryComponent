/**
 * nav
 * 
 */
;(function ($) {
    $JqcLoader.importComponents('com.lifeonwalden.jqc', ['icon'])
        .importCss($JqcLoader.getCmpParentURL('com.lifeonwalden.jqc', 'nav').concat('css/nav.css'))
        .execute(function () {
            var T = $.jqcToolkit;
            // 默认值
            var defaultParams = {
                el: null,
                height: 30,
                data: [],
                adapter: {
                    value: 'value',
                    label: 'label',
                    disabled: 'disabled',
                    children: 'children'
                },
                onSelect: null
            }
            $.jqcNav = function (params) {
                var _adapter = Object.assign({}, defaultParams.adapter, params.adapter);
                Object.assign(this, params, {
                    adapter: _adapter
                });
                this.lock = false;
                this.timer = null;
                this.init();
            }

            $.jqcNav.prototype.init = function () {
                this.render();
            }

            $.jqcNav.prototype.render = function () {
                var _this = this;
                var __value = this.adapter.value;
                var __label = this.adapter.label;
                var __children = this.adapter.children;
                var __disabled = this.adapter.disabled;
                this.container = $('<div>').addClass('jqcNav-container').css({
                    'line-height': isNaN(_this.height) ? _this.height : _this.height + 'px'
                });
                this.el.append(this.container);
                this.data.forEach(data => {
                    var $nav = $('<div>').addClass('jqcNav-item');
                    var text = '';
                    if (typeof __label === 'string') {
                        text = data[__label];
                    } else if (typeof __label === 'function') {
                        text = __label(data);
                    } else {
                        throw new Error('jqcNav.adapter is wrong!');
                    }
                    $nav.text(text);
                    if ($.isArray(data[__children])) {
                        var $arrow = $('<span>').addClass('jqcNav-icon-arrow');
                        $nav.append($arrow);
                        $nav.addClass('hasChildren');
                    }
                    if (data[__disabled]) {
                        $nav.addClass('disabled')
                    }
                    _this.container.append($nav);
                    $nav.data('data', data);
                });
                this.bindEvent();
            }
            $.jqcNav.prototype.bindEvent = function () {
                var _this = this;
                var __children = this.adapter.children;
                var __disabled = this.adapter.disabled;
                this.container.on('mouseenter', '.jqcNav-item', function (e) {
                    var $this = $(this);
                    _this.reset();
                    $this.addClass('hover');
                    var data = $this.data('data');
                    if (data[__children]) {
                        _this.lock = true;
                       var offset = $this.offset();
                       var _height = $this.outerHeight();
                       var _width = $this.outerWidth();
                       var x = offset.left;
                       var y = offset.top + _height + 4;
                       var sWidth = window.innerWidth;
                       if (x + 205 > sWidth) {
                           x = x - 204 + _width;
                       }
                       renderSubNav.call(_this, data[__children], x, y, $this[0]);
                    }
                }).on('mouseleave', '.jqcNav-item', function (e) {
                    _this.lock = false;
                    var el = this;
                    setTimeout(function () {
                        if (_this.lock) {
                            return;
                        }
                        targetReset(el);
                    }, 50);
                }).on('click', '.jqcNav-item', function (e) {
                    var data = $(this).data('data');
                    if (data[__disabled]) {
                        return;
                    }
                    if (data[__children]) {
                        return;
                    }
                    _this.onSelect && _this.onSelect(data);
                    _this.reset();
                });
            }
            $.jqcNav.prototype.reset = function () {
                var _this = this;
                var $items = this.container.find('.jqcNav-item');
                $.each($items, function (index, el) {
                    targetReset(el);
                });
                $('body').find('.jqcNav-subContainer').remove();
                this.lock = false;
            }

            function targetReset(target) {
                if (target.subContainer) {
                    target.subContainer.remove();
                    target.subContainer = undefined;
                }
                $(target).removeClass('hover');
            }

            function renderSubNav(data, x, y, target) {
                var _this = this;
                var __value = this.adapter.value;
                var __label = this.adapter.label;
                var __children = this.adapter.children;
                var __disabled = this.adapter.disabled;
                target.subContainer = $('<div>').addClass('jqcNav-subContainer').css({
                    top: y || 0,
                    left: x || 0
                });
                target.subContainer.mouseenter(function () {
                    _this.lock = true;
                }).mouseleave(function () {
                    _this.lock = false;
                    setTimeout(function () {
                        if (!_this.lock) {
                            targetReset(target);
                        }
                    }, 50);
                });

                $('body').append(target.subContainer);
                data.forEach(item => {
                    var $nav = $('<div>').addClass('jqcNav-subItem');
                    target.subContainer.append($nav);
                    var text = '';
                    if (typeof __label === 'string') {
                        text = item[__label];
                    } else if (typeof __label === 'function') {
                        text = __label(item);
                    } else {
                        throw new Error('jqcNav.adapter is wrong!');
                    }
                    var $text = $('<p>').text(text).attr('title', text);
                    $nav.append($text);
                    if ($.isArray(item[__children])) {
                        var $arrow = $('<span>').addClass('jqcNav-icon-arrow');
                        $nav.append($arrow);
                    }
                    if (item[__disabled]) {
                        $nav.addClass('disabled')
                    }
                    $nav.data('data', item);
                    $nav.mouseenter(function () {
                        $(this).addClass('hover');
                        var $siblings = $(this).siblings();
                        $.each($siblings, function (index, el) {
                            targetReset(el);
                        });
                        if ($.isArray(item[__children])) {
                            if (this.subContainer) {
                                return;
                            }
                            var offset = $nav.offset();
                            var _height = $nav.outerHeight();
                            var _width = $nav.outerWidth();
                            var sWidth = window.innerWidth;
                            var x = offset.left + _width + 4;
                            if (x + 205 > sWidth) {
                                x = offset.left - 204;
                            }
                            var y = offset.top;
                            renderSubNav.call(_this, item[__children], x, y, $nav[0]);
                        }
                    }).mouseleave(function () {
                        var $this = $(this);
                        setTimeout(function () {
                            if (_this.lock) {
                                return;
                            }
                            _this.reset();
                        }, 50);
                    }).click(function () {
                        if (item[__children]) {
                            return;
                        }
                        if (item[__disabled]) {
                            return;
                        }
                        _this.onSelect && _this.onSelect(item);
                        _this.reset();
                    });
                });
            }
        });
})(jQuery);
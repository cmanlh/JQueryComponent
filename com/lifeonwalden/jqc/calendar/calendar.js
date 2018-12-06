/**
 * confirm
 * 
 */
;(function ($) {
    $JqcLoader.importComponents('com.lifeonwalden.jqc', ['baseElement', 'uniqueKey', 'valHooks', 'select', 'timepicker', 'notification', 'contextmenu', 'datetimepicker', 'dateUtil'])
        .importCss($JqcLoader.getCmpParentURL('com.lifeonwalden.jqc', 'datetimepicker').concat('css/datetimepicker.css'))
        .importCss($JqcLoader.getCmpParentURL('com.lifeonwalden.jqc', 'calendar').concat('css/calendar.css'))
        .execute(function () {
            const today = new Date();
            const adapter = {
                type: 0,
                startTime: 'startTime',
                endTime: 'endTime',
                content: 'content',
                tip: 'tip'
            };
            const defaultParams = {
                title: '',
                currentYear: today.getFullYear(),
                currentMonth: today.getMonth() + 1,
                currentDate: today.getDate(),
                startYear: today.getFullYear() - 10,
                endYear: today.getFullYear() + 10,
                cellHeight: 90,
                cellTextAlign: 'center',
                status: 'view',
                data: [],
                memo: [],
                adapter: adapter,
                cache: {},
                cellRender: function (data, cell, fillData) {
                    var x = [];
                    if (data.day == 6 || data.day == 7) {
                        cell.addClass('error');
                    }
                    if (fillData) {
                        x = x.concat(fillData);
                    }
                    return x;
                },
            };
            const week = ['一', '二', '三', '四', '五', '六', '日'];
            const color = ['', 'warn', 'success', 'info', 'error'];
            const colorMap = [{
                color: '#AEB3D3',
                value: 0,
                label: '默认'
            }, {
                color: '#EFC27B',
                value: 1,
                label: '一般'                
            }, {
                color: '#A8CADD',
                value: 2,
                label: '主要'                
            }, {
                color: '#E9A78F',
                value: 3,
                label: '重要'                
            }, {
                color: '#E27275',
                value: 4,
                label: '特别重要'                
            }];

            $.jqcCalendar = function (params) {
                Object.assign(this, defaultParams, params);
                if (params.adapter) {
                    this.adapter = Object.assign({}, adapter, params.adapter);
                }
                if (!this.el) {
                    throw new Error('jqcCalendar:缺少el参数');
                }
                this.yearData = [];
                for (var index = this.startYear; index <= this.endYear; index++) {
                    this.yearData.push({
                        value: index,
                        label: `${index}`
                    });              
                }
                this.monthData = new Array(12).fill(1).map((i, index) => ({
                    value: index + 1,
                    label: `${index+1}月`
                }));
                this.init();
            }
            $.jqcCalendar.prototype.init = function () {
                var _this = this;
                this.el.addClass('jqcCalendar-container');
                this.decodeData();
                this.renderHeader();
                if (this.canEditor) {
                    this.body.addClass('canEditor');
                    this.renderContextmenu();
                }
            }
            $.jqcCalendar.prototype.renderHeader = function () {
                var _this = this;
                this.header = $('<div>').addClass('jqcCalendar-header');
                this.el.append(this.header);
                this.titleEl = $('<p>').addClass('jqcCalendar-title');
                var selectBox = $('<div>').addClass('jqcCalendar-select');
                var _box = $('<div>').addClass('jqcCalendar-switch-box');
                this.prev = $('<span>').addClass('jqcCalendar-prev-btn');
                this.currentInfo = $('<span>').addClass('jqcCalendar-currentInfo');
                this.next = $('<span>').addClass('jqcCalendar-next-btn');
                _box.append(this.prev, this.currentInfo, this.next);
                this.header.append(this.titleEl, _box, selectBox);
                this.yearSelect = $('<input type="text"/>').addClass('jqcCalendar-yearSelect');
                this.monthSelect = $('<input type="text"/>').addClass('jqcCalendar-monthSelect');
                selectBox.append(this.yearSelect, this.monthSelect);
                this.renderBody();
                new $.jqcSelect({
                    el: this.yearSelect,
                    data: this.yearData,
                    defaultValue: this.currentYear,
                    onSelect: function (data) {
                        _this.currentYear = data.value;
                        if (_this.lockYear) {
                            _this.lockYear = false;
                            return;
                        }
                        _this.fillBody();
                        _this.onMonthChange && _this.onMonthChange(_this.currentYear, _this.currentMonth);
                    }
                });
                new $.jqcSelect({
                    el: this.monthSelect,
                    data: this.monthData,
                    defaultValue: this.currentMonth,
                    onSelect: function (data) {
                        _this.currentMonth = data.value;
                        _this.fillBody();
                        _this.onMonthChange && _this.onMonthChange(_this.currentYear, _this.currentMonth);
                    }
                });
                this.prev.click(function () {
                    _this.toPrev();
                });
                this.next.click(function () {
                    _this.toNext();
                });
            }
            $.jqcCalendar.prototype.renderBody = function () {
                var _this = this;
                var weekBox = $('<div>').addClass('jqcCalendar-week');
                this.body = $('<div>').addClass('jqcCalendar-body');
                this.el.append(weekBox, this.body);
                week.forEach(item => {
                    var $div = $('<div>').text(item);
                    weekBox.append($div);
                });
                this.body.on('click.jqcCalendar', '>div>div', function (e) {
                    var data = $(this).data('value');
                    var memos = $(this).data('memos');
                    if ($(this).hasClass('jqcCalendar-prevMonth')) {
                        _this.toPrev();
                        return;
                    }
                    if ($(this).hasClass('jqcCalendar-nextMonth')) {
                        _this.toNext();
                        return;
                    }
                    _this.onSelect && _this.onSelect(data, memos);
                });
                this.body.on('click', '.jqcCalendar-item-more', function (e) {
                    e.stopPropagation();
                    if (_this.contextmenu && _this.contextmenu.box) {
                        _this.contextmenu.box.remove();
                    }
                    if ($(this).hasClass('active')) {
                        _this.removeMore();
                    } else {
                        var clone = $(this).siblings().clone(true, true);
                        var parent = $(this).parent().parent();
                        var position = parent.position();
                        var offsetTop = parent.offset().top;
                        var pWidth = parent.outerWidth();
                        var pHeight = parent.outerHeight();
                        var wHeight = window.innerHeight;
                        var top = position.top + pHeight;
                        var sTop = $(this).position().top;
                        var isBottom = false;
                        if (clone.length * 22 + 28 + offsetTop + pHeight > wHeight) {
                            top = top - clone.length * 22 - 22 - pHeight + sTop;
                            isBottom = !!1;
                        }
                        var value = parent.data('value');
                        _this.renderMore(position.left, top, clone, pWidth, value, isBottom);
                        $(this).addClass('active');
                    }
                });
                this.body.on('click', '.jqcCalendar-item-tips', function (e) {
                    e.stopPropagation();
                    var index = $(this).attr('data-index');
                    _this.onMemoSelect && _this.onMemoSelect(_this.memos[index]);
                }).on('mouseenter', '.jqcCalendar-item-tips', function () {
                    var index = $(this).attr('data-index');
                    _this.body.find('[data-index='+index+']').addClass('hover');
                }).on('mouseleave', '.jqcCalendar-item-tips', function () {
                    var index = $(this).attr('data-index');
                    _this.body.find('[data-index='+index+']').removeClass('hover');
                });
                this.decodeMemo();
            }
            $.jqcCalendar.prototype.fillBody = function () {
                var _this = this;
                this.body.empty();
                var firstDay = new Date(+this.currentYear, +this.currentMonth - 1, 1);
                var lastDay = new Date(+this.currentYear, +this.currentMonth, 0);
                var day = firstDay.getDay() || 7;
                var totalDay = lastDay.getDate();
                var data = new Array(totalDay).fill(1).map((i, index) => ({
                    date: index + 1,
                    day: (index + day) % 7 || 7,
                    data: [this.currentYear, this.currentMonth, index + 1]
                }));
                var prevDay = +firstDay;
                for (var index = 1; index < day; index++) {
                    prevDay -= 24*3600*1000;
                    var _date = new Date(prevDay);
                    var year = _date.getFullYear();
                    var month = _date.getMonth() + 1;
                    var date = _date.getDate();
                    data.unshift({
                        date: date,
                        day: (day - index) || 7,
                        data: [year, month, date],
                        type: 'prev'
                    });
                }
                day = lastDay.getDay() || 7;
                var nextDay = +lastDay;
                for (var index = day + 1; index <= 7; index++) {
                    nextDay += 24*3600*1000;
                    var _date = new Date(nextDay);
                    var year = _date.getFullYear();
                    var month = _date.getMonth() + 1;
                    var date = _date.getDate();
                    data.push({
                        date: date,
                        day: index || 7,
                        data: [year, month, date],
                        type: 'next'
                    });
                }
                var box = null;
                data.forEach((item, index) => {
                    if (index % 7 == 0) {
                        box = $('<div>').addClass('jqcCalendar-row');
                        this.body.append(box);
                    }
                    var $item = $('<div>').addClass('jqcCalendar-item').css({
                        height: _this.cellHeight
                    });
                    $item.data('value', item);
                    box.append($item);
                    var $span = $('<span>').addClass('jqcCalendar-date').text(b0(item.date));
                    $item.append($span);
                    var cellObj = {};
                    var time = item.data.map(i => (b0(i))).join('-');
                    var memos = this.cache[time];
                    $item.data('memos', memos);
                    var $el = $('<div>').addClass('jqcCalendar-item-container').text(cellObj.content || '');
                    $item.append($el);
                    var contentData = [].concat(this.cellRender(item, $item, memos) || {});
                    var index = 0;
                    var _contentHeight = $el.innerHeight();
                    var last = null;
                    contentData.forEach(function (data) {
                        if (!data || !data.data) {
                            return;
                        }
                        var _memo = data.data;
                        if (_memo.content === undefined || _memo.content === '') {
                            return;
                        }
                        if (index != -1) {
                            // return;
                            index ++;
                        }
                        if (index * 22 - 4 > _contentHeight) {
                            var more = $('<div>').addClass('jqcCalendar-item-more').append($('<p>').text('···'), $('<p>').text('查看全部日程'));
                            if (last) {
                                last.before(more);
                            } else {
                                $el.append(more);
                            }
                            index = -1;
                        }
                        var type = _memo.type || 0;
                        last = $('<div>').addClass('jqcCalendar-item-tips').addClass(color[type]);
                        var content = _memo.content || '';
                        var p = $('<p>').text(content).attr('title', content);
                        last.attr('data-index', _memo.__index__);
                        last.append(p);
                        var tip = '';
                        if (typeof _memo.tip == 'function') {
                            tip = _time.tip(rowData);
                        } else if (typeof _memo.tip == 'string') {
                            tip = _memo.tip;
                        }
                        if (tip) {
                            var $tip = $('<p>').addClass('jqcCalendar-item-tip');
                            last.append($tip);
                            $tip.text(tip);
                        }
                        $el.append(last);
                    });
                    if (item.type == 'prev') {
                        $item.addClass('jqcCalendar-prevMonth');
                    } else if (item.type == 'next') {
                        $item.addClass('jqcCalendar-nextMonth');
                    }
                    if (item.data[2] == today.getDate() && item.data[1] == today.getMonth() + 1 && item.data[0] == today.getFullYear()) {
                        $item.addClass('jqcCalendar-today');
                    }
                });
                this.setTitle();
                this.currentInfo.text(`${b0(this.currentYear)}/${b0(this.currentMonth)}`);
            }
            $.jqcCalendar.prototype.toPrev = function () {
                var month = this.currentMonth - 1;
                var year = this.currentYear;
                if (month < 1) {
                    month = 12;
                    year --;
                }
                if (year < this.startYear) {
                    month = 1;
                    year = this.startYear;
                }
                if (this.currentYear != year) {
                    this.lockYear = true;
                    this.yearSelect.val(year);
                }
                if (this.currentMonth != month) {
                    this.monthSelect.val(month);
                }
            }
            $.jqcCalendar.prototype.toNext = function () {
                var month = this.currentMonth + 1;
                var year = this.currentYear;
                if (month > 12) {
                    month = 1;
                    year ++;
                }
                if (year > this.endYear) {
                    month = 12;
                    year = this.endYear;
                }
                if (this.currentYear != year) {
                    this.lockYear = true;
                    this.yearSelect.val(year);
                }
                if (this.currentMonth != month) {
                    this.monthSelect.val(month);
                }
            }
            $.jqcCalendar.prototype.renderContextmenu = function () {
                var _this = this;
                this.contextmenu = new $.jqcContextMenu({
                    menus: [{
                        id: 0,
                        text: '查看日程',
                        valid: function (rowData) {
                            return rowData.type == 'item';
                        }
                    }, {
                        id: 1,
                        text: '新增日程',
                        valid: function (rowData) {
                            return rowData.type == 'all';
                        }
                    }, {
                        id: 2,
                        text: '编辑日程',
                        valid: function (rowData) {
                            return rowData.type == 'item';
                        }
                    }, {
                        id: 3,
                        text: '删除日程',
                        valid: function (rowData) {
                            return rowData.type == 'item';
                        }
                    }],
                    onSelect: function (data) {
                        var id = data.menu.id;
                        var rowData = data.showData.data;
                        var target = data.showData.target;
                        switch (id) {
                            case 0:
                                _this.viewMemo(rowData, target);
                                break;
                            case 1:
                                _this.addMemo(rowData, target);
                                break;
                            case 2:
                                _this.editorMemo(rowData, target);
                                break;
                            case 3:
                                _this.deleteMemo(rowData);
                                break;
                            default:
                                break;
                        }
                    }
                });
                this.body.on('contextmenu.jqcCalendar', '.jqcCalendar-item,.jqcCalendar-more-container', function (e) {
                    e.preventDefault();
                    var data = $(this).data('value');
                    var target = $(e.target);
                    var temp = null;
                    if (target.hasClass('jqcCalendar-item-tips')) {
                        temp = target;
                    } else {
                        temp = target.parents('.jqcCalendar-item-tips');
                    }
                    if (temp.length == 1 && temp.attr('data-index') > -1) {
                        var index = temp.attr('data-index');
                        _this.contextmenu.show({
                            type: 'item',
                            data: index,
                            target: temp
                        });
                    } else {
                        _this.contextmenu.show({
                            type: 'all',
                            data: data,
                            target
                        });
                    }
                });

            }
            $.jqcCalendar.prototype.setTitle = function (title) {
                var _this = this;
                if (title) {
                    this.title = title;
                    this.titleEl.text(this.title);
                    return;
                }
                if (typeof this.title == 'string') {
                    this.titleEl.text(this.title);
                    return;
                }
                if (typeof this.title == 'function') {
                    var _title = this.title(this.currentYear, this.currentMonth);
                    this.titleEl.text(_title);
                }
            }
            $.jqcCalendar.prototype.reRender = function (data) {
                var _this = this;
                if (data) {
                    this.data = [].concat(data);
                }
                this.decodeData();
                setTimeout(function () {
                    _this.decodeMemo();
                },20);
            }
            $.jqcCalendar.prototype.decodeData = function () {
                var _this = this;
                var _type = this.adapter.type;
                var _startTime = this.adapter.startTime;
                var _endTime = this.adapter.endTime;
                var _content = this.adapter.content;
                var _tip = this.adapter.tip;
                this.memos = [];
                this.data.forEach(i => {
                    var memo = {};
                    if (typeof _type == 'function') {
                        memo.type = _type(i);
                    } else {
                        memo.type = i[_type];
                    }
                    if (typeof _startTime == 'function') {
                        memo.startTime = _startTime(i);
                    } else {
                        memo.startTime = i[_startTime];
                    }
                    if (typeof _endTime == 'function') {
                        memo.endTime = _endTime(i);
                    } else {
                        memo.endTime = i[_endTime];
                    }
                    if (typeof _content == 'function') {
                        memo.content = _content(i);
                    } else {
                        memo.content = i[_content];
                    }
                    if (typeof _tip == 'function') {
                        memo.tip = _tip(i);
                    } else if (typeof _tip == 'string') {
                        memo.tip = i[_tip];
                    }
                    _this.memos.push({
                        data: memo,
                        dataSource: i
                    });
                });
            }
            $.jqcCalendar.prototype.renderMore = function (x, y, clone, width, value, isBottom) {
                var _this = this;
                this.removeMore();
                var box = $('<div>').addClass('jqcCalendar-more-container').css({
                    'width': width,
                    'top': y,
                    'left': x
                });
                box.data('value', value);
                box.append(clone);
                this.body.append(box);
                if (isBottom) {
                    box.addClass('is-bottom');
                }
                $(document).off('click.jqcCalendar-more');
                $(document).on('click.jqcCalendar-more', function (e) {
                    if (e.button == 2) {
                        return;
                    }
                    _this.removeMore();
                    $(document).off('click.jqcCalendar-more');
                });
            }
            $.jqcCalendar.prototype.removeMore = function () {
                var _this = this;
                this.body.find('.jqcCalendar-more-container').remove();
                this.body.find('.jqcCalendar-item-more').removeClass('active');
            }
            $.jqcCalendar.prototype.createMemoEditor = function (memo, target, readOnly) {
                var _this = this;
                var offset = target.offset();
                var width = target.outerWidth();
                var tWidth = window.innerWidth;
                var box = $('<div>').addClass('jqcCalendar-memo-editor');
                var pos = {
                    left: offset.left + width + 5,
                    top: offset.top - 12
                }
                if ((pos.left + 164) >= tWidth) {
                    pos.left = offset.left - 5 - 164;
                    box.addClass('jqcCalendar-memo-editor-arrow-right');
                }
                // this.body.append(box);
                $('body').append(box);
                box.css(pos);
                var memoContent = $('<div>').css('position', 'relative');
                var _content = $('<textarea>').addClass('jqcCalendar-memo-editor-textarea').attr('placeholder', '新建日程').attr('maxlength', 140);
                var _pre = $('<pre>');
                memoContent.append(_pre).append(_content);
                _content.on('input', function (e) {
                    _pre.text($(this).val());
                });
                var timebox = $('<div>').addClass('jqcCalendar-memo-editor-timebox');
                var _start = $('<input>').addClass('jqcCalendar-memo-editor-start').attr('placeholder', '添加起始时间').prop('readonly', true);
                var _startTime = $('<input>').addClass('jqcCalendar-memo-editor-start-time');
                var _end = $('<input>').addClass('jqcCalendar-memo-editor-start').attr('placeholder', '添加结束时间').prop('readonly', true);
                var _endTime = $('<input>').addClass('jqcCalendar-memo-editor-end-time');
                timebox.append(_start, _startTime, _end, _endTime);
                var _type = $('<div>').addClass('jqcCalendar-memo-editor-type');
                var _color = $('<span>');
                var $type = $('<input type="text">').addClass('jqcCalendar-memo-type');
                _type.append(_color, $type);
                box.append(memoContent, timebox, _type);
                new $.jqcSelect({
                    el: $type,
                    data: colorMap,
                    defaultValue: 0,
                    cellRender: function (label, data) {
                        var span = $('<span>').css({
                            'background': data.color,
                            'width': 12,
                            'height': 12,
                            'border-radius': 2,
                            'display': 'inline-block',
                            'margin-right': 10
                        });
                        var div = $('<div>').append(span, label);
                        return div;
                    },
                    onSelect: function (data) {
                        _color.css({
                            'background': data.color,
                            'width': 8,
                            'height': 8,
                            'border-radius': 1,
                            'display': 'inline-block',
                            'margin-right': 10
                        });
                    }
                });
                var $mask = $('<div>').addClass('jqcCalendar-mask');
                $('body').append($mask);
                var open = false;
                if (!readOnly) {
                    _start.datetimepicker({
                        onShow: function () {
                            open = true;
                        },
                        onClose: function () {
                            setTimeout(function () {
                                open = false;
                            }, 100);
                        },
                        onChangeDateTime: function (time) {
                            var end = new Date(_end.val() || time);
                            _end.datetimepicker({
                                minDateTime: $.jqcDateUtil.format(time, 'yyyy-MM-dd HH:mm')
                            });
                            var start = new Date(_start.val());
                            if (start > end) {
                                start = end;
                                _start.datetimepicker({
                                    value: start
                                });
                            }
                        }
                    });
                    _end.datetimepicker({
                        onShow: function () {
                            open = true;
                        },
                        onClose: function () {
                            setTimeout(function () {
                                open = false;
                            }, 100);
                        },
                        onChangeDateTime: function (time) {
                            var start = new Date(_start.val() || time);
                            _start.datetimepicker({
                                maxDateTime: $.jqcDateUtil.format(time, 'yyyy-MM-dd HH:mm'),
                            });
                            var end = new Date(_end.val());
                            if (start > end) {
                                end = start;
                                _end.datetimepicker({
                                    value: end
                                });
                            }
                        }
                    });
                    new $.jqcTimepicker({
                        el: _startTime,
                        width: 150,
                        format: 'HH:mm',
                        onShow: function (time) {
                            open = true;
                        }
                    });
                    new $.jqcTimepicker({
                        el: _endTime,
                        width: 150,
                        format: 'HH:mm',
                        onShow: function (time) {
                            open = true;
                        }
                    });
                }
                _content.keyup(function (e) {
                    if (e.keyCode == 13) {
                        add();
                    }
                });
                $mask.click(function (e) {
                    if (readOnly) {
                        $(document).off('keyup.memo');
                        box.remove();
                        $(this).remove();
                        return;
                    }
                    if (open) {
                        open = false;
                        return;
                    }
                    add();
                });
                // 回显
                if (memo) {
                    var startDate = $.jqcDateUtil.format(memo.startTime);
                    var startTime = $.jqcDateUtil.format(memo.startTime, 'HH:mm');
                    var endDate = $.jqcDateUtil.format(memo.endTime);
                    var endTime = $.jqcDateUtil.format(memo.endTime, 'HH:mm');
                    _content.val(memo.content);
                    _start.val(startDate);
                    _startTime.val(startTime)
                    _end.val(endDate);
                    _endTime.val(endTime);
                    _pre.text(memo.content);
                    $type.val(memo.type || 0);
                }
                if (readOnly) {
                    _content.prop('disabled', true);
                    _start.prop('disabled', true);
                    _end.prop('disabled', true);
                    $type.prop('disabled', true);
                    _startTime.prop('disabled', true);
                    _endTime.prop('disabled', true);
                }
                function add() {
                    var content = _content.val().trim();
                    var startTime = +new Date((_start.val()+ ' ' +_startTime.val()).replace(/\-/g, '/'));
                    var endTime = +new Date((_end.val()+ ' ' +_endTime.val()).replace(/\-/g, '/'));
                    if (content == '') {
                        $.jqcNotification({
                            type: 'warn',
                            title: '取消添加日程',
                        });
                        $mask.remove();
                        box.remove();
                        return;
                    }
                    if (startTime > endTime) {
                        $.jqcNotification({
                            type: 'error',
                            title: '开始时间必须小于等于结束时间',
                        });
                        return;
                    }
                    var type = $type.val();
                    _start.datetimepicker('destroy');
                    _end.datetimepicker('destroy');
                    $mask.remove();
                    box.remove();
                    var obj = {
                        content,
                        startTime,
                        endTime,
                        type
                    };
                    var temp = {};
                    if (memo && memo.__index__ != undefined) {
                        temp = {
                            data: obj,
                            dataSource: Object.assign({}, _this.memos[memo.__index__].dataSource, obj)
                        };
                        _this.memos[memo.__index__] = temp;
                        _this.onMemoUpdate && _this.onMemoUpdate(temp);
                    } else {
                        temp = {
                            data: obj,
                            dataSource: obj
                        };
                        _this.memos.push(temp);
                        _this.onMemoAdd && _this.onMemoAdd(temp);
                    }
                    $(document).off('keyup.memo');
                    _this.onMemoChange && _this.onMemoChange(temp, _this.memos);
                    _this.decodeMemo();
                    
                }
                box.click(function (e) {
                    e.stopPropagation();
                });

                $(document).off('keyup.memo').on('keyup.memo', function (e) {
                    console.log(123);
                    if (e.keyCode == 27) {
                        $(document).off('keyup.memo');
                        box.remove();
                        $mask.remove();
                    }
                });
            }
            $.jqcCalendar.prototype.addMemo = function (time, target) {
                this.createMemoEditor({
                    startTime: +new Date(time.data),
                    endTime: +new Date(time.data)
                }, target);
            }
            $.jqcCalendar.prototype.editorMemo = function (index, target) {
                var memo = this.memos[index].data;
                this.createMemoEditor(memo, target);
            }
            $.jqcCalendar.prototype.viewMemo = function (index, target) {
                var memo = this.memos[index].data;
                this.createMemoEditor(memo, target, true);
            }
            $.jqcCalendar.prototype.deleteMemo = function (index) {
                var temp = this.memos[index];
                this.onMemoDelete && this.onMemoDelete(temp);
                this.memos.splice(index, 1);
                this.onMemoChange && this.onMemoChange(temp, this.memos);
                this.decodeMemo();
            }
            $.jqcCalendar.prototype.decodeMemo = function () {
                var _this = this;
                this.cache = {};
                this.memos.forEach((memo, index) => {
                    var _startTime = memo.data.startTime || memo.data.endTime;
                    var _endTime = memo.data.endTime || memo.data.startTime;
                    var time = [];
                    var data = Object.assign({}, memo.data, {
                        __index__: index
                    });
                    memo.data.__index__ = index;
                    if (_startTime == _endTime) {
                        time.push($.jqcDateUtil.format(_startTime));
                    } else {
                        _startTime = $.jqcDateUtil.format(_startTime);
                        _endTime = $.jqcDateUtil.format(_endTime);
                        while (_startTime <= _endTime) {
                            time.push(_startTime);
                            var _temp = $.jqcDateUtil.plusDays(_startTime, 1);
                            _startTime = $.jqcDateUtil.format(_temp);
                        }
                    }
                    time.forEach(i => {
                        if (!this.cache[i]) {
                            this.cache[i] = [];
                        }
                        this.cache[i].push(memo);
                    });
                });
                setTimeout(function () {
                    _this.fillBody();
                }, 20);
            }
        });
        function b0(num) {
            return num <= 9 ? '0' + num : String(num);
        }
})(jQuery);
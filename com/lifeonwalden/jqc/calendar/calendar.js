/**
 * confirm
 * 
 */
;(function ($) {
    $JqcLoader.importComponents('com.lifeonwalden.jqc', ['baseElement', 'uniqueKey', 'valHooks', 'select'])
        .importCss($JqcLoader.getCmpParentURL('com.lifeonwalden.jqc', 'calendar').concat('css/calendar.css'))
        .execute(function () {
            const today = new Date();
            const defaultParams = {
                title: '',
                currentYear: today.getFullYear(),
                currentMonth: today.getMonth() + 1,
                currentDate: today.getDate(),
                startYear: today.getFullYear() - 10,
                endYear: today.getFullYear() + 10,
                cellHeight: 100,
                cellTextAlign: 'center',
                status: 'view',
                data: [],
                adapter: 'time',
                cache: {}
            };
            const week = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'];

            $.jqcCalendar = function (params) {
                Object.assign(this, defaultParams, params);
                if (!this.el) {
                    throw new Error('jqcCalendar:缺少el参数');
                }
                this.yearData = [];
                for (var index = this.startYear; index <= this.endYear; index++) {
                    this.yearData.push({
                        value: index,
                        label: `${index}年`
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
            }
            $.jqcCalendar.prototype.renderHeader = function () {
                var _this = this;
                this.header = $('<div>').addClass('jqcCalendar-header');
                this.el.append(this.header);
                this.titleEl = $('<p>').addClass('jqcCalendar-title');
                var selectBox = $('<div>').addClass('jqcCalendar-select');
                this.header.append(this.titleEl, selectBox);
                this.yearSelect = $('<input type="text"/>').addClass('jqcCalendar-yearSelect');
                this.monthSelect = $('<input type="text"/>').addClass('jqcCalendar-monthSelect');
                selectBox.append(this.yearSelect, this.monthSelect);
                // 编辑模式
                if (this.canEditor) {
                    this.status = 'view';
                    this.save = $('<button>').addClass('jqcCalendar-save').text('编辑');
                }
                selectBox.append(this.save);
                this.renderBody();
                new $.jqcSelect({
                    el: this.yearSelect,
                    data: this.yearData,
                    defaultValue: this.currentYear,
                    onSelect: function (data) {
                        _this.currentYear = data.value;
                        _this.fillBody();
                    }
                });
                new $.jqcSelect({
                    el: this.monthSelect,
                    data: this.monthData,
                    defaultValue: this.currentMonth,
                    onSelect: function (data) {
                        _this.currentMonth = data.value;
                        _this.fillBody();
                    }
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
                this.body.on('click.jqcCalendar', '>div', function (e) {
                    var data = $(this).data('value');
                    if ($(this).hasClass('jqcCalendar-prevMonth') || $(this).hasClass('jqcCalendar-nextMonth')) {
                        _this.currentYear = data.data[0];
                        _this.currentMonth = data.data[1];
                        _this.yearSelect.val(_this.currentYear);
                        _this.monthSelect.val(_this.currentMonth);
                        _this.fillBody();
                        return;
                    }
                    _this.onSelect && _this.onSelect(data);
                });
                if (this.canEditor) {
                    this.body.on('keyup.jqcCalendar', 'textarea', function (e) {
                        var data = $(this).parent().data('value');
                        var val = $(this).val();
                        var time = data.data.map(i => (b0(i))).join('-');
                        _this.cache[time] = {
                            time: time,
                            content: val
                        };
                    });
                    this.save.click(function (e) {
                        var data = Object.keys(_this.cache).map(i => _this.cache[i]);
                        var text = '';
                        if (_this.status == 'view') {
                            _this.status = 'editor';
                            text = '保存';
                        } else {
                            _this.onSave && _this.onSave(data);
                            _this.status = 'view';
                            text = '编辑';
                        }
                        $(this).text(text);
                        _this.fillBody();
                    });
                }
                this.fillBody();
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
                data.forEach(item => {
                    var $item = $('<div>').addClass('jqcCalendar-item').css({
                        height: _this.cellHeight,
                        'text-align': _this.cellTextAlign,
                    });
                    $item.data('value', item);
                    this.body.append($item);
                    var $span = $('<span>').addClass('jqcCalendar-date').text(item.date);
                    $item.append($span);
                    var cellObj = {};
                    var time = item.data.map(i => (b0(i))).join('-');
                    var rowData = this.cache[time];
                    if (this.cellRender) {
                        cellObj = this.cellRender(item, $item, rowData) || {};
                    }
                    if (cellObj.type) {
                        $item.addClass(cellObj.type);
                    }
                    var $el = null;
                    if (this.status == 'editor') {
                        $el = $('<textarea>').text(cellObj.content || '');
                    } else {
                        $el = $('<p>').text(cellObj.content || '');
                    }
                    $item.append($el);
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
                if (data) {
                    this.data = [].concat(data);
                }
                this.decodeData();
                this.fillBody();
            }
            $.jqcCalendar.prototype.decodeData = function () {
                var _this = this;
                var _time = this.adapter;
                this.cache = {};
                this.data.forEach(i => {
                    var time = null;
                    if (typeof _time == 'function') {
                        time = _time(i);
                    } else {
                        if (i.hasOwnProperty(_time)) {
                            time = i[_time];
                        } else {
                            console.error('jqcCalendar: adapter匹配不正确');
                            return;
                        }
                    }
                    _this.cache[time] = i;
                });
            }

            
        });
        function b0(num) {
            return num <= 9 ? '0' + num : String(num);
        }
})(jQuery);
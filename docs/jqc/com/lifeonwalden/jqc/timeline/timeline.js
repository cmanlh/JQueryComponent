/**
 * timeline
 * 
 */
;(function ($) {
    $JqcLoader.importComponents('com.lifeonwalden.jqc', ['echarts'])
        .importCss($JqcLoader.getCmpParentURL('com.lifeonwalden.jqc', 'timeline').concat('css/timeline.css'))
        .execute(function () {
            var result = ['', '等待', '运行', '暂停', '完成', '失败']
            var now = new Date();
            const defaultParams = {
                el: '', // 视图jQuery对象
                title: '',  // title
                data: [],   // 数据源
                adapter: {
                    name: 'name',
                    id: 'id',
                    startTime: 'startTime',
                    endTime: 'endTime'
                },
                min: +now,
                max: +now,
                height: 800
            };
            $.jqcTimeline = function (params) {
                var adapter = Object.assign({}, defaultParams.adapter, params.adapter);
                Object.assign(this, defaultParams, params, {adapter});
                if (!this.el) {
                    throw new Error('jqcTimeline: el expects a jquery object.');
                }
                this.init();
            }
            $.jqcTimeline.prototype.init = function () {
                var _this = this;
                this.el.addClass('jqcTimeline-container');
                if (!this.el.height()) {
                    this.el.css('height', this.height);
                }
                this.chart = echarts.init(this.el[0]);
                this.render();
                $(window).resize(function () {
                    _this.resize();
                });
            }
            $.jqcTimeline.prototype.resize = function () {
                if (this.chart && this.el.is(':visible')) {
                    this.chart.resize();
                }
            }
            $.jqcTimeline.prototype.decodeData = function (data) {
                var _this = this;
                var _id = this.adapter.id;
                var _name = this.adapter.name;
                var _startTime = this.adapter.startTime;
                var _endTime = this.adapter.endTime;
                this.categorys = [];
                var status = {};
                var index = 0;
                this.min = +now,
                this.max = 0,
                this.chartData = [];
                data.forEach(item => {
                    _this.min = _this.min > item[_startTime] ? item[_startTime] : _this.min;
                    _this.max = _this.max < item[_endTime] ? item[_endTime] : _this.max;
                    if (status[item[_id]] == undefined) {
                        status[item[_id]] = {
                            index: index,
                            color: colorRandom()
                        };
                        _this.categorys.push({
                            label: item[_name] || item[_id],
                            value: item[_id]
                        });
                        index ++;
                    }
                    _this.chartData.push({
                        name: item[_name] || item[_id],
                        value: [
                            item[_name] || item[_id],
                            +item[_startTime],
                            +item[_endTime],
                            item[_endTime] - item[_startTime],
                            result[item.result]
                        ],
                        itemStyle: {
                            normal: {
                                color: status[item[_id]].color
                            }
                        }
                    });
                });
            }
            $.jqcTimeline.prototype.drawChart = function () {
                var _this = this;
                this.chartOption = Object.assign({
                    grid: {
                        bottom: '15%',
                        left: '10%',
                    },
                    tooltip: {
                        formatter: function (params) {
                            return `${params.marker}${params.name}\n开始时间: ${timeFormat(params.value[1])}\n结束时间: ${timeFormat(params.value[2])}\n耗时: ${calculateSpendTime(params.value[3])}\n状态: ${params.value[4]}`;
                        },
                        extraCssText:'width:175px; white-space:pre-wrap;padding:10px;opacity:0.8;background: #767FA0;box-shadow: 0 0 4px 1px rgba(235,235,235,0.80);border-radius: 2px;',
                        axisPointer: {
                            type: 'corss',
                            shadowStyle: {
                                color: '#ff0000'
                            },
                            axis: 'y'
                        },
                        textStyle: {
                            fontSize: 10
                        }
                    },
                    title: {
                        text: _this.title
                    },
                    yAxis: {
                        data: _this.categorys.map(i => (i.label)),
                        axisLabel: {
                            // rotate: 65,
                            fontSize: 12,
                            color: '#999'
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#d9d9d9'
                            }
                        },
                        splitLine: {
                            lineStyle: {
                                color: '#f2f2f2'
                            }
                        },
                        axisTick: {
                            show: false
                        }
                    },
                    xAxis: {
                        min: +_this.min,
                        max: +_this.max,
                        scale: true,
                        axisLabel: {
                            formatter: function (data, index) {
                                return timeFormat(+data, true);
                            },
                            fontSize: 12,
                            color: '#999'
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#d9d9d9'
                            }
                        },
                        splitLine: {
                            lineStyle: {
                                color: '#f2f2f2'
                            }
                        },
                        axisTick: {
                            show: false
                        }
                    },
                    dataZoom: [{
                        type: 'slider',
                        filterMode: 'weakFilter',
                        showDataShadow: false,
                        top: '95%',
                        height: 10, 
                        start: 0,
                        end: 100,
                        borderColor: 'transparent',
                        backgroundColor: '#d9d9d9',
                        handleIcon: 'M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7v-1.2h6.6z M13.3,22H6.7v-1.2h6.6z M13.3,19.6H6.7v-1.2h6.6z', // jshint ignore:line
                        handleSize: 20,
                        handleStyle: {
                            shadowBlur: 6,
                            shadowOffsetX: 1,
                            shadowOffsetY: 2,
                            shadowColor: '#999'
                        },
                        labelFormatter: ''
                    }, {
                        type: 'inside',
                        filterMode: 'weakFilter'
                    }],
                    series: [{
                        type: 'custom',
                        renderItem: renderItem,
                        itemStyle: {
                            normal: {
                                opacity: 0.8
                            }
                        },
                        encode: {
                            x: [1, 2],
                            y: 0
                        },
                        data: _this.chartData
                    }]
                }, this.option);
                setTimeout(function () {
                    _this.chart.setOption(_this.chartOption);
                }, 100);
            }
            $.jqcTimeline.prototype.render = function (params) {
                var _this = this;
                var data = params || this.data || [];
                this.decodeData(data);
                setTimeout(function () {
                    _this.drawChart();
                    _this.afterRender && _this.afterRender(_this.categorys, _this.chartOption.xAxis.min, _this.chartOption.xAxis.max);
                }, 20);
            };
            $.jqcTimeline.prototype.reRender = function (obj) {
                var categorys = obj.categorys || this.chartOption.yAxis.data;
                var min = +obj.min || this.chartOption.xAxis.min;
                if (min < this.min) {
                    min = +this.min
                }
                var max = +obj.max || this.chartOption.xAxis.max;
                if (max > this.max) {
                    max = +this.max
                }
                var _this = this;
                var _categorys = [];
                var _data = [];
                var temp = {};
                this.chartData.forEach(item => {
                    var index = categorys.indexOf(item.value[0]);
                    if (index == -1) {
                        return;
                    }
                    if (item.value[2] >= min && item.value[1] <= max) {
                        _data.push(item);
                        if (!temp[item.value[0]]) {
                            temp[item.value[0]] = true;
                            _categorys.push(item.value[0]);
                        }
                    }
                });
                setTimeout(function () {
                    _this.chartOption.yAxis.data = _categorys;
                    _this.chartOption.xAxis.min = min;
                    _this.chartOption.xAxis.max = max;
                    _this.chartOption.series[0].data = _data;
                    _this.chart.setOption(_this.chartOption);
                }, 20)
            }

        });
        

        function timeFormat(timestamp, isBreak) {
            var time = new Date(+timestamp);
            var year = b0(time.getFullYear());
            var month = b0(time.getMonth() + 1);
            var date = b0(time.getDate());
            var hour = b0(time.getHours());
            var minute = b0(time.getMinutes());
            var second = b0(time.getSeconds());
            if (isBreak) {
                return `${year}-${month}-${date}\n${hour}:${minute}:${second}`;
            }
            return `${year}-${month}-${date} ${hour}:${minute}:${second}`;
        }
        function b0(num) {
            return num <=9 ? '0' + num : String(num);
        }
        function calculateSpendTime(time) {
            var _time = +time;
            var millisecond = _time % 1000;
            var second = (_time / 1000) % 60 | 0;
            var minute = ((_time % 3600000 / 1000 - second) / 60) | 0;
            var hour = (_time / 3600000) | 0;
            return `${hour}小时${minute}分${second}秒${millisecond}毫秒`;
        }
        function renderItem(params, api) {
            var categoryIndex = api.value(0);
            var start = api.coord([api.value(1), categoryIndex]);
            var end = api.coord([api.value(2), categoryIndex]);
            var height = api.size([0, 1])[1] * 0.6;

            var rectShape = echarts.graphic.clipRectByRect({
                x: start[0],
                y: start[1] - height / 2,
                width: end[0] - start[0],
                height: height
            }, {
                x: params.coordSys.x,
                y: params.coordSys.y,
                width: params.coordSys.width,
                height: params.coordSys.height
            });

            return rectShape && {
                type: 'rect',
                shape: rectShape,
                style: api.style()
            };
        }
        function colorRandom() {
            var colors = ['#4668B6', '#4A3878', '#B8151B', '#F15350', '#EEBCBD', '#DFB4D8', '#C4A9EF', '#8E95E9', '#83A8FF', '#A0CAF2'];
            var x = (Math.random() * colors.length) | 0;
            return colors[x];
        }
})(jQuery);
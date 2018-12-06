$JqcLoader.importScript('../../../../../qunit/jquery-3.1.1.js')
    .importScript('../../../../../qunit/version.js')
    .importScript('../../../../../qunit/keycode.js')
    .importScript('../../../../../qunit/qunit-2.1.1.js')
    .importCss('../../../../../qunit/qunit-2.1.1.css').execute(function () {
        $JqcLoader.registerModule($JqcLoader.newModule('com.lifeonwalden.jqc', '../../../../../')
            .registerComponent('baseElement')
            .registerComponent('select')
            .registerComponent('valHooks')
            .registerComponent('uniqueKey')
            .registerComponent('toolkit')
            .registerComponent('contextmenu')
            .registerComponent('timepicker')
            .registerComponent('datetimepicker')
            .registerComponent('notification')
            .registerComponent('zindex')
            .registerComponent('dateUtil')
            .registerComponent('tip')
            .registerComponent('calendar'));

        $JqcLoader.importComponents('com.lifeonwalden.jqc', ['calendar']).execute(function () {
            var A_data = [{
                type: 1,
                time: '2018-12-26',
                content: '测试测试测试12.26',
                tip: '11:23'
            }, {
                time: '2018-12-28',
                content: '测试测试测试测试12.28'
            }, {
                time: '2018-12-29',
                content: '测试测试测试测试12.29'
            }, {
                time: '2018-11-30',
                content: '测试测试测试测试11.30',
                id: 100,
                tip: '12:25'
            }, {
                time: '2018-12-01',
                content: '测试测试测试测试12.1'
            }, {
                time: '2018-12-02',
                content: '测试测试测试测试12.2'
            }];
            var calendar = new $.jqcCalendar({
                title: '银行间节假日',
                el: $('.calendar'),
                startYear: 2018,
                endYear: 2020,
                data: A_data,
                canEditor: true,
                adapter: {
                    startTime: function (data) {
                        return +new Date(data.time);
                    },
                    endTime: function (data) {
                        return +new Date(data.time);
                    },
                    type: function (data) {
                        return data.type || 4
                    },
                    tip: function (data) {
                        return data.tip
                    }
                },
                // cellRender: function (data, cell, memos) {
                //     var x = [];
                //     if (data.day == 6 || data.day == 7) {
                //         cell.addClass('error');
                //         var config1 = {};
                //         config1.type = '2';
                //         config1.content = '周末';
                //         x.push({data: config1});
                //     }
                //     return memos;
                //     // return x.concat(memos);
                // },
                onSelect: function (data, memos) {
                    console.log(data, memos);
                },
                onMemoSelect: function (memo) {
                    console.log(memo);
                },
                onMemoChange: function (memo) {
                    console.log('change', memo);
                },
                onMemoDelete: function (memo) {
                    console.log('delete',memo);
                },
                onMemoAdd: function (memo) {
                    console.log('add',memo);
                },
                onMemoUpdate: function (memo) {
                    console.log('update',memo);
                },
                onMonthChange: function (year, month) {
                    console.log(year, month);
                }
            });
        });
    });
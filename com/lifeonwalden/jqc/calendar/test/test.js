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
            .registerComponent('calendar'));

        $JqcLoader.importComponents('com.lifeonwalden.jqc', ['calendar']).execute(function () {
            var A_data = [];
            window.a = new $.jqcCalendar({
                title: function (year, month) {
                    return `${year}年${month}月 - 默认`
                },
                el: $('.calendar'), 
                cellHeight: 100,
                startYear: 2018,
                endYear: 2019,
                // cellTextAlign: 'left',
                data: A_data,
                adapter: 'time',
                cellRender: function (data, cell, fillData) {
                    var config = {};
                    if (data.day == 6 || data.day == 7) {
                        config.type = 'success';
                    } else {
                        config.type = 'error'
                    }
                    if (fillData) {
                        config.type = 'warn';
                        config.content = fillData.content;
                    }
                    return config;
                },
                onSelect: function (data) {
                    console.log(data);
                },
                onSave: function (data) {
                    console.log(data);
                }
            });

            window.b = new $.jqcCalendar({
                title: function (year, month) {
                    return `${year}年${month}月 - 可编辑`
                },
                el: $('.calendar2'), 
                cellHeight: 100,
                startYear: 2018,
                endYear: 2019,
                adapter: function (rowData) {
                    return rowData.time;
                },
                data: [{
                    time: '2019-01-01',
                    content: '123456'
                }],
                canEditor: true,
                cellRender: function (data, cell, fillData) {
                    var config = {};
                    if (data.day == 6 || data.day == 7) {
                        config.type = 'success';
                    } else {
                        config.type = 'error'
                    }
                    if (fillData) {
                        config.type = 'warn';
                        config.content = fillData.content;
                    }
                    return config;
                },
                mode: 'editor',
                onSave: function (data) {
                    A_data = data;
                    console.log(data);
                    a.reRender(data);
                }
            });
        });
    });
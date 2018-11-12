$JqcLoader.importComponents('com.lifeonwalden.jqc', ['calendar']).execute(function () {
    new $.jqcCalendar({
        el: $('.calendar'),
        title: function (year, month) {
            return `${year}年${month}月`
        },
        data: [{
            date: '2018-11-11',
            text: '光棍节'
        }, {
            date: '2018-10-01',
            text: '国庆节'
        }],
        adapter: 'date',
        cellRender: function (data, cell, fillData) {
            var config = {};
            if (fillData) {
                config.type = 'error';  // success|error|warn|info
                config.content = fillData.text;
            }
            return config;
        }
    });
    new $.jqcCalendar({
        el: $('.calendar2'),
        canEditor: true,
        cellRender: function (data, cell, fillData) {
            var config = {};
            if (fillData) {
                config.content = fillData.content;
            }
            return config;
        },
        onSave: function (data) {
            console.log(data);
        }
    });
});
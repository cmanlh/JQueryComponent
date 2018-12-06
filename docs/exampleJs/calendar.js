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
        adapter: {
            content: 'text',
            startTime: function ({date}) {
                return +new Date(date);
            },
            endTime: function ({date}) {
                return +new Date(date);
            }
        }
    });
    new $.jqcCalendar({
        el: $('.calendar2'),
        canEditor: true,
        onMemoAdd: function (memo) {
            console.log(memo);
        }
    });
});
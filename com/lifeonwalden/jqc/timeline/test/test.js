$JqcLoader.importScript('../../../../../qunit/jquery-3.1.1.js')
    .importScript('../../../../../qunit/version.js')
    .importScript('../../../../../qunit/keycode.js')
    .importScript('../../../../../qunit/qunit-2.1.1.js')
    .importCss('../../../../../qunit/qunit-2.1.1.css').execute(function () {
        $JqcLoader.registerModule($JqcLoader.newModule('com.lifeonwalden.jqc', '../../../../../')
            .registerComponent('baseElement')
            .registerComponent('valHooks')
            .registerComponent('pinyin')
            .registerComponent('uniqueKey')
            .registerComponent('checkbox')
            .registerComponent('event')
            .registerComponent('datetimepicker')
            .registerComponent('dateUtil')
            .registerComponent('echarts')
            .registerComponent('timeline'));

        $JqcLoader.importComponents('com.lifeonwalden.jqc', ['timeline']).execute(function () {
            console.log(123);
            var myChart = echarts.init($('.timeline')[0]);
            myChart.setOption({});
            $.ajax('./test.json').then(res => {
                console.log(res);
                new $.jqcTimeline({
                    el: $('.timeline'),
                    data: res.result,
                    adapter: {
                        id: 'workId'
                    }
                });
            })
        });
    });
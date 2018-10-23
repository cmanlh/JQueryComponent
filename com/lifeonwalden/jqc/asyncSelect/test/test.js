$JqcLoader.importScript('../../../../../qunit/jquery-3.1.1.js')
    .importScript('../../../../../qunit/version.js')
    .importScript('../../../../../qunit/keycode.js')
    .importScript('../../../../../qunit/qunit-2.1.1.js')
    .importCss('../../../../../qunit/qunit-2.1.1.css').execute(function () {
        $JqcLoader.registerModule($JqcLoader.newModule('com.lifeonwalden.jqc', '../../../../../')
            .registerComponent('baseElement')
            .registerComponent('asyncSelect')
            .registerComponent('valHooks')
            .registerComponent('uniqueKey'));

        $JqcLoader.importComponents('com.lifeonwalden.jqc', ['asyncSelect']).execute(function () {
            new $.jqcAsyncSelect({
                el: $('#input1'),
                url: 'http://172.29.114.86:8080/pt/reportUnit/queryDepartmentByParentGrp',
                requestData: function (val) {
                    return {
                        unitId: val
                    };
                },
                format: function (item) {
                    return "VX-" + item.text + "_" + item.value;
                },
                defaultValue: 'D0012'
            });
            new $.jqcAsyncSelect({
                el: $('#input2'),
                url: 'aps/213',
                max: 2
            });
            new $.jqcAsyncSelect({
                el: $('#input3'),
                url: 'aps/213'
            });
        });
    });
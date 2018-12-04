$JqcLoader.importScript('../../../../../qunit/jquery-3.1.1.js')
    .importScript('../../../../../qunit/version.js')
    .importScript('../../../../../qunit/keycode.js')
    .importScript('../../../../../qunit/qunit-2.1.1.js')
    .importCss('../../../../../qunit/qunit-2.1.1.css').execute(function () {
        $JqcLoader.registerModule($JqcLoader.newModule('com.lifeonwalden.jqc', '../../../../../')
            .registerComponent('baseElement')
            .registerComponent('timepicker')
            .registerComponent('valHooks')
            .registerComponent('uniqueKey'));

        $JqcLoader.importComponents('com.lifeonwalden.jqc', ['timepicker']).execute(function () {
            // $('.timepicker').timepicker();
            new $.jqcTimepicker({
                el: $('.timepicker'),
                defaultValue: '10:12:35'
            });
            new $.jqcTimepicker({
                el: $('.timepicker2')
            });
        });
    });
$JqcLoader.importScript('../../../../../qunit/jquery-3.1.1.js')
    .importScript('../../../../../qunit/version.js')
    .importScript('../../../../../qunit/keycode.js')
    .importScript('../../../../../qunit/qunit-2.1.1.js')
    .importCss('../../../../../qunit/qunit-2.1.1.css').execute(function () {
        $JqcLoader.registerModule($JqcLoader.newModule('com.lifeonwalden.jqc', '../../../../../')
            .registerComponent('baseElement')
            .registerComponent('uniqueKey')
            .registerComponent('zindex')
            .registerComponent('loading'));

        $JqcLoader.importComponents('com.lifeonwalden.jqc', ['loading']).execute(function () {
            var a = new $.jqcLoading({
                show: true,
            });
            $('#btn1').click(function (e) {
                e.stopPropagation();
                a.show();
            });
            $(document).click(function () {
                a.hide();
            });
        });
    });
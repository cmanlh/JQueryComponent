$JqcLoader.importScript('../../../../../qunit/jquery-3.1.1.js')
    .importScript('../../../../../qunit/qunit-2.1.1.js')
    .importCss('../../../../../qunit/qunit-2.1.1.css').execute(function () {
    $JqcLoader.registerModule($JqcLoader.newModule('com.lifeonwalden.jqc', '../../../../../')
        .registerComponent('datetimepicker').registerComponent('dateUtil').registerComponent('tip').registerComponent('formUtil'));

    $JqcLoader.importComponents('com.lifeonwalden.jqc', ['formUtil']).execute(function () {
        $('[datatype="date"]').datetimepicker();
    });
});
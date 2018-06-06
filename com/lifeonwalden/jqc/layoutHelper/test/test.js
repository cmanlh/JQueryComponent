$JqcLoader.importScript('../../../../../qunit/jquery-3.1.1.js')
    .importScript('../../../../../qunit/version.js')
    .importScript('../../../../../qunit/keycode.js')
    .importScript('../../../../../qunit/qunit-2.1.1.js')
    .importCss('../../../../../qunit/qunit-2.1.1.css').execute(function () {
    $JqcLoader.registerModule($JqcLoader.newModule('com.lifeonwalden.jqc', '../../../../../')
        .registerComponents(['baseElement', 'format', 'uniqueKey', 'valHooks', 'inputNumber', 'layoutHelper', 'formUtil', 'datetimepicker', 'dateUtil', 'tip', 'lang']));

    $JqcLoader.importComponents('com.lifeonwalden.jqc', ['layoutHelper', 'formUtil']).execute(function () {
        $('.content').computerSize();
        $.formUtil.format($('.content'));
    });
});
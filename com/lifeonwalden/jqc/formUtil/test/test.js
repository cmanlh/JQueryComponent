$JqcLoader.importScript('../../../../../qunit/jquery-3.1.1.js')
    .importScript('../../../../../qunit/qunit-2.1.1.js')
    .importScript('../../../../../qunit/keycode.js')
    .importCss('../../../../../qunit/qunit-2.1.1.css').execute(function () {
    $JqcLoader.registerModule($JqcLoader.newModule('com.lifeonwalden.jqc', '../../../../../')
        .registerComponent('datetimepicker').registerComponent('valHooks').registerComponent('baseElement').registerComponent('format').registerComponent('uniqueKey')
        .registerComponent('dateUtil').registerComponent('inputNumber').registerComponent('tip').registerComponent('formUtil'));

    $JqcLoader.importComponents('com.lifeonwalden.jqc', ['formUtil']).execute(function () {
        var ctx = $('#ctx'), txt = $('#txt');
        $('#init').click(function () {
            var json = {};
            if (txt.val())
                json = JSON.parse(txt.val());
            $.formUtil.init(ctx, {userName: 'init', age: 100}, json);
        });
        $('#fetchData').click(function () {
            var data = $.formUtil.fetch(ctx);
            txt.val(JSON.stringify(data));
        });
        $('#fillData').click(function () {
            var json = {};
            if (txt.val())
                json = JSON.parse(txt.val());
            $.formUtil.fill(ctx, json);
        });
        $('#add').click(function () {
            var group = $('[datagroup]:last');
            var clone = group.clone();
            group.after(clone);
        });
    });
});
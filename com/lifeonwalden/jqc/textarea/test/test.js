$JqcLoader.importScript('../../../../../qunit/jquery-3.1.1.js')
    .importScript('../../../../../qunit/version.js')
    .importScript('../../../../../qunit/keycode.js')
    .importScript('../../../../../qunit/qunit-2.1.1.js')
    .importCss('../../../../../qunit/qunit-2.1.1.css').execute(function () {
        $JqcLoader.registerModule($JqcLoader.newModule('com.lifeonwalden.jqc', '../../../../../')
            .registerComponent('baseElement')
            .registerComponent('zindex')
            .registerComponent('uniqueKey')
            .registerComponent('loading')
            .registerComponent('textarea'));

        $JqcLoader.importComponents('com.lifeonwalden.jqc', ['textarea', 'loading']).execute(function () {
            var loading = new $.jqcLoading();
            window.a = new $.jqcTextarea({
                el: $('#textarea'),
                placeholder: 'placeholder...',
                closeByModal: true
            });
            window.b = new $.jqcTextarea({
                el: $('#textarea2'),
                title: '异步保存',
                beforeSave: function (value, next) {
                    console.log(value);
                    loading.show('保存中...');
                    setTimeout(() => {
                        loading.hide();
                        next();
                    }, 2000);
                }
            });
        });
    });
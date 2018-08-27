$JqcLoader.importScript('../../../../../qunit/jquery-3.1.1.js')
    .importScript('../../../../../qunit/version.js')
    .importScript('../../../../../qunit/keycode.js')
    .importScript('../../../../../qunit/qunit-2.1.1.js')
    .importCss('../../../../../qunit/qunit-2.1.1.css').execute(function () {
        $JqcLoader.registerModule($JqcLoader.newModule('com.lifeonwalden.jqc', '../../../../../')
            .registerComponent('confirm'));

        $JqcLoader.importComponents('com.lifeonwalden.jqc', ['confirm']).execute(function () {
            $('#btn').click(function () {
                console.log('click');
                $.jqcConfirm({
                    title: '我是抬头我是抬头我是抬头我是抬头我是抬头我是抬头我是抬头我是抬头我是抬头我是抬头我是抬头我是抬头我是抬头',
                    content: '我是内容我是内容我是内容我是',
                    // btnPosition: 'center',
                    // icon: false,
                    onCancel: function () {
                        console.log('cancel');
                    },
                    onConfirm: function () {
                        console.log('confirm');
                    }
                });
            });
        });
    });
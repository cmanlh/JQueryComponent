$JqcLoader.importScript('../../../../../qunit/jquery-3.1.1.js')
    .importScript('../../../../../qunit/version.js')
    .importScript('../../../../../qunit/keycode.js')
    .importScript('../../../../../qunit/qunit-2.1.1.js')
    .importCss('../../../../../qunit/qunit-2.1.1.css').execute(function () {
        $JqcLoader.registerModule($JqcLoader.newModule('com.lifeonwalden.jqc', '../../../../../')
            .registerComponent('baseElement')
            .registerComponent('tag')
            .registerComponent('valHooks')
            .registerComponent('notification')
            .registerComponent('toolkit')
            .registerComponent('zindex')
            .registerComponent('select')
            .registerComponent('uniqueKey'));

        $JqcLoader.importComponents('com.lifeonwalden.jqc', ['tag']).execute(function () {
            new $.jqcTag({
                el: $('.tag'),
                width: 800
            });
            new $.jqcTag({
                el: $('.tag2'),
                data: [{
                    key: '1',
                    value: 'a1'
                }, {
                    key: '2',
                    value: 'a2'
                }],
                adapter: {
                    value: 'value',
                    label: 'value'
                },
                defaultValue: '123;456;789'
            });
            new $.jqcTag({
                el: $('.tag3')
            });
        });
    });
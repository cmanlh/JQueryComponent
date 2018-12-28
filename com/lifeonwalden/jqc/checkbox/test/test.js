$JqcLoader.importScript('../../../../../qunit/jquery-3.1.1.js')
    .importScript('../../../../../qunit/version.js')
    .importScript('../../../../../qunit/keycode.js')
    .importScript('../../../../../qunit/qunit-2.1.1.js')
    .importCss('../../../../../qunit/qunit-2.1.1.css').execute(function () {
        $JqcLoader.registerModule($JqcLoader.newModule('com.lifeonwalden.jqc', '../../../../../')
            .registerComponent('baseElement')
            .registerComponent('checkbox')
            .registerComponent('valHooks'));

        $JqcLoader.importComponents('com.lifeonwalden.jqc', ['checkbox']).execute(function () {
            const dataSource = [{
                    label: '测试1',
                    value: 1
                }, {
                    label: '测试2',
                    value: 2
                }, {
                    label: '测试3',
                    value: 3
                }, {
                    label: '测试4',
                    value: 4
                }, {
                    label: '测试5',
                    value: 5
                }, {
                    label: '测试6',
                    value: 6
                }];

            new $.jqcCheckbox({
                el: $('#default'),
                data: dataSource,
            });
            new $.jqcCheckbox({
                el: $('#readOnly'),
                data: dataSource,
                disabled: '*',
                defaultValue: '1,2'
            });
            new $.jqcCheckbox({
                el: $('#radio'),
                data: dataSource,
                type: 'radio',
            });
            new $.jqcCheckbox({
                el: $('#multiple'),
                data: dataSource,
                mode: 'multiple',
            });
            new $.jqcCheckbox({
                el: $('#defaultVal'),
                data: dataSource,
                mode: 'multiple',
                defaultValue: '1,3,5'
            });
            new $.jqcCheckbox({
                el: $('#disabled'),
                data: dataSource,
                disabled: '1,2,3'
            });
            new $.jqcCheckbox({
                el: $('#column'),
                data: dataSource,
                direction: 'column'
            });
            window.a = new $.jqcCheckbox({
                el: $('#custom'),
                data: dataSource,
                direction: 'column',
                mode: 'multiple',
                adapter: {
                    label: function (data, isChecked) {
                        var str = `label=${data.label},value=${data.value}，我的选中状态${isChecked}`;
                        return str;
                    }
                },
            });
            
            
        });
    });
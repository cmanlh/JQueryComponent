$JqcLoader.importScript('../../../../../qunit/jquery-3.1.1.js')
    .importScript('../../../../../qunit/version.js')
    .importScript('../../../../../qunit/keycode.js')
    .importScript('../../../../../qunit/qunit-2.1.1.js')
    .importCss('../../../../../qunit/qunit-2.1.1.css').execute(function () {
        $JqcLoader.registerModule($JqcLoader.newModule('com.lifeonwalden.jqc', '../../../../../')
            .registerComponent('baseElement')
            .registerComponent('select')
            .registerComponent('valHooks')
            .registerComponent('uniqueKey'));

        $JqcLoader.importComponents('com.lifeonwalden.jqc', ['select']).execute(function () {
            new $.jqcSelect({
                el: $('#input1'),
                data: [{
                    id: '1',
                    name: '马文杰'
                }, {
                    id: '2',
                    name: '打的'
                }],
                adapter: {
                    value: 'id',
                    label: 'name'
                }
            });
            new $.jqcSelect({
                el: $('#input2'),
                data: [{
                    value: '1',
                    label: '就到分手的而且热情而且爱吃发的发的发打发打发'
                }, {
                    value: '2',
                    label: '去'
                }],
                adapter: {
                    label: function (data) {
                        return data.value + '--' +  data.label;
                    }
                },
                defaultValue: '1'
            });
            new $.jqcSelect({
                el: $('#input3'),
                data: [{
                    value: '1',
                    label: '非'
                }, {
                    value: '2',
                    label: '啊'
                }],
                defaultValue: ''
            });
            new $.jqcSelect({
                el: $('#input4'),
                data: [{
                    value: '1'
                }, {
                    value: '2'
                }],
                adapter: {
                    label: 'value'
                }
            });
        });
    });
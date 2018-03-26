$JqcLoader.importScript('../../../../../qunit/jquery-3.1.1.js')
    .importScript('../../../../../qunit/version.js')
    .importScript('../../../../../qunit/keycode.js')
    .importScript('../../../../../qunit/qunit-2.1.1.js')
    .importCss('../../../../../qunit/qunit-2.1.1.css').execute(function () {
        $JqcLoader.registerModule($JqcLoader.newModule('com.lifeonwalden.jqc', '../../../../../')
            .registerComponent('baseElement')
            .registerComponent('uniqueKey')
            .registerComponent('contextmenu'));

        $JqcLoader.importComponents('com.lifeonwalden.jqc', ['contextmenu']).execute(function () {
            var contextMenu = new $.jqcContextMenu({
                element: $('#table1'),
                operations: [{
                    label: '操作1',
                    id: 1,
                    child: [{
                        label: '测试101',
                        id: 101
                    }, {
                        label: '测试102',
                        id: 102
                    }, {
                        label: '测试103',
                        id: 103
                    }, {
                        label: '测试104',
                        id: 104
                    }]
                }, {
                    label: '操作2',
                    id: 2
                }, {
                    label: '操作3',
                    id: 3
                }, {
                    label: '操作4',
                    id: 4
                }, {
                    label: '操作5',
                    id: 5
                }, {
                    label: '操作6',
                    id: 6
                }, {
                    label: '操作7',
                    id: 7
                }, {
                    label: '操作8',
                    id: 8
                }, {
                    label: '操作9',
                    id: 9
                }, {
                    label: '操作10',
                    id: 10,
                    child: [{
                        label: '测试101',
                        id: 101
                    }, {
                        label: '测试102',
                        id: 102
                    }]
                }],
                selector: 'tr',
                selectorId: 'targetId',
                max: 5,
                onSelect: function (data) {
                    console.log(data);
                }
            });


            new $.jqcContextMenu({
                element: $('#div1'),
                selector: 'li',
                selectorId: 'data-id',
                operations: [{
                    label: '删除',
                    id: 1
                }, {
                    label: '撤销',
                    id: 2
                }, {
                    label: '发送',
                    id: 3
                }],
                onSelect: function (data) {
                    console.log(data);
                }
            });

            new $.jqcContextMenu({
                element: $('#div2'),
                selector: '.test',
                selectorId: 'data-did',
                operations: [{
                    label: 'test1',
                    id: 1
                }, {
                    label: 'test2',
                    id: 2
                }, {
                    label: 'test3',
                    id: 3
                }, {
                    label: 'test4',
                    id: 4
                }, {
                    label: 'test5',
                    id: 5
                }],
                onSelect: function (data) {
                    console.log(data);
                }
            });
        });
    });
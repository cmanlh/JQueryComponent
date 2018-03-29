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
            function create_data() {
                var create_three = function (num) {
                    return new Array(10).fill(1).map((item, index) => ({
                        label: '三级菜单' + num + index,
                        id: num.toString() + index
                    }));
                };
                var create_two = function (num) {
                    return new Array(10).fill(1).map((item, index) => ({
                        label: '二级菜单' + num + index,
                        id: num.toString() + index,
                        child: create_three(num.toString() + index)
                    }));
                };
                return new Array(10).fill(1).map((item, index) => ({
                    label: '一级菜单' + index,
                    id: index,
                    child: create_two(index)
                }));
            }

            var data = create_data();

            var contextMenu = new $.jqcContextMenu({
                element: $('#table1'),
                operations: data,
                selector: 'tr',
                selectorId: 'targetId',
                onSelect: function (data) {
                    console.log(data);
                }
            });


            new $.jqcContextMenu({
                element: $('#div1'),
                selector: 'li',
                selectorId: 'data-id',
                operations: data,
                max: 5,
                onSelect: function (data) {
                    console.log(data);
                }
            });

            new $.jqcContextMenu({
                element: $('#div2'),
                selector: '.test',
                selectorId: 'data-did',
                operations: data,
                onSelect: function (data) {
                    console.log(data);
                }
            });
        });
    });
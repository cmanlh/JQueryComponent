$JqcLoader.importScript('../../../../../qunit/jquery-3.1.1.js')
    .importScript('../../../../../qunit/version.js')
    .importScript('../../../../../qunit/keycode.js')
    .importScript('../../../../../qunit/qunit-2.1.1.js')
    .importCss('../../../../../qunit/qunit-2.1.1.css').execute(function () {
        $JqcLoader.registerModule($JqcLoader.newModule('com.lifeonwalden.jqc', '../../../../../')
            .registerComponent('baseElement')
            .registerComponent('pinyin')
            .registerComponent('uniqueKey')
            .registerComponent('search'));

        $JqcLoader.importComponents('com.lifeonwalden.jqc', ['search']).execute(function () {
            function create_data() {
                var create_three = function (num) {
                    return new Array(3).fill(1).map((item, index) => ({
                        label: '三级菜单' + num + index,
                        id: num.toString() + index
                    }));
                };
                var create_two = function (num) {
                    return new Array(3).fill(1).map((item, index) => ({
                        label: '二级菜单' + num + index,
                        id: num.toString() + index,
                        child: create_three(num.toString() + index)
                    }));
                };
                return new Array(3).fill(1).map((item, index) => ({
                    label: '一级菜单' + index,
                    id: index,
                    child: create_two(index)
                }));
            }




            var search = new $.jqcSearch({
                element: $('#div1'),
                data: create_data(),
                placeholder: 'test',
                onSelect: function (data) {
                    console.log(data);
                }
            })
        });
    });
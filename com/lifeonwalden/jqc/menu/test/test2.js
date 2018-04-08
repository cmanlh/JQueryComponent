$JqcLoader.importScript('../../../../../qunit/jquery-3.1.1.js')
    .importScript('../../../../../qunit/version.js')
    .importScript('../../../../../qunit/keycode.js')
    .importScript('../../../../../qunit/qunit-2.1.1.js')
    .importCss('../../../../../qunit/qunit-2.1.1.css').execute(function () {
        $JqcLoader.registerModule($JqcLoader.newModule('com.lifeonwalden.jqc', '../../../../../')
            .registerComponent('baseElement')
            .registerComponent('resizeable')
            .registerComponent('uniqueKey')
            .registerComponent('lang')
            .registerComponent('dialog')
            .registerComponent('blocker')
            .registerComponent('zindex')
            .registerComponent('menu')
            .registerComponent('draggable'));

        $JqcLoader.importComponents('com.lifeonwalden.jqc', ['menu']).execute(function () {

            var data = [{
                id: '1',
                label: '一级菜单',
                child: [{
                    id: '3',
                    label: '二级菜单01-02',
                    href: 'http://www.jd.com'
                }, {
                    id: '4',
                    label: '二级菜单01-03',
                    zid: 18,
                    eid: 20,
                    child: [{
                        id: '5',
                        label: '三级菜单01-03-01',
                        href: 'http://www.qq.com'
                    }]
                }]
            }, {
                id: '91',
                label: '三级菜单01-03-01',
                href: 'http://www.qq.com'
            }, {
                id: '1031',
                label: '三级菜单01-03-01',
                href: 'http://www.qq.com'
            }, {
                id: '111',
                label: '三级菜单01-03-01',
                href: 'http://www.qq.com'
            }];
            var configurableMenuData = [{
                id: '1',
                label: '一级菜单',
                child: [{
                    id: '2',
                    label: '二级菜单01-01',
                    age: 15
                }, {
                    id: '3',
                    label: '二级菜单01-02',
                    href: 'http://www.jd.com'
                }, {
                    id: '4',
                    label: '二级菜单01-03',
                    zid: 18,
                    eid: 20,
                    child: [{
                        id: '5',
                        label: '三级菜单01-03-01',
                        href: 'http://www.qq.com'
                    }]
                }]
            }, {
                id: '6',
                label: '一级菜单02',
                child: [{
                    id: '61',
                    label: '三级菜单01-03-01',
                    href: 'http://www.qq.com'
                }]
            }, {
                id: '7',
                label: '一级菜单02',
                child: [{
                    id: '71',
                    label: '三级菜单01-03-01',
                    href: 'http://www.qq.com'
                }]
            }, {
                id: '8',
                label: '一级菜单02',
                child: [{
                    id: '81',
                    label: '三级菜单01-03-01',
                    href: 'http://www.qq.com'
                }]
            }, {
                id: '9',
                label: '一级菜单02',
                child: [{
                    id: '91',
                    label: '三级菜单01-03-01',
                    href: 'http://www.qq.com'
                }]
            }, {
                id: '10',
                label: '一级菜单02',
                child: [{
                    id: '101',
                    label: '二级菜单01-01',
                    age: 15
                }, {
                    id: '102',
                    label: '二级菜单01-02',
                    href: 'http://www.jd.com'
                }, {
                    id: '103',
                    label: '二级菜单01-03',
                    zid: 18,
                    eid: 20,
                    child: [{
                        id: '1031',
                        label: '三级菜单01-03-01',
                        href: 'http://www.qq.com'
                    }]
                }]
            }, {
                id: '11',
                label: '一级菜单02',
                child: [{
                    id: '111',
                    label: '三级菜单01-03-01',
                    href: 'http://www.qq.com'
                }]
            }];
            var menu = new $.jqcMenu({
                data: data,
                top: 10,
                allowedConfig: true,
                configurableMenuData: configurableMenuData,
                onSelect: function (menu) {
                    console.log(menu);
                }
            });
            setTimeout(function () {
                menu.hide();
                setTimeout(function () {
                    menu.show();
                }, 2000);
            }, 2000);
        });
    });
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
                label: '一级菜单01',
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
                label: '二级菜单05-01',
                href: 'http://www.qq.com'
            }, {
                id: '1031',
                label: '三级菜单06-03-01',
                href: 'http://www.qq.com'
            }, {
                id: '111',
                label: '二级菜单07-01',
                href: 'http://www.qq.com'
            }];
            var configurableMenuData = [{
                id: '1',
                label: '一级菜单01',
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
                    label: '二级菜单02-01',
                    href: 'http://www.qq.com'
                }]
            }, {
                id: '7',
                label: '一级菜单03',
                child: [{
                    id: '71',
                    label: '二级菜单03-01',
                    href: 'http://www.qq.com'
                }]
            }, {
                id: '8',
                label: '一级菜单04'
            }, {
                id: '9',
                label: '一级菜单05',
                child: [{
                    id: '91',
                    label: '二级菜单05-01',
                    href: 'http://www.qq.com'
                }]
            }, {
                id: '10',
                label: '一级菜单06',
                child: [{
                    id: '101',
                    label: '二级菜单06-01',
                    age: 15
                }, {
                    id: '102',
                    label: '二级菜单06-02',
                    href: 'http://www.jd.com'
                }, {
                    id: '103',
                    label: '二级菜单06-03',
                    zid: 18,
                    eid: 20,
                    child: [{
                        id: '1031',
                        label: '三级菜单06-03-01',
                        href: 'http://www.qq.com'
                    }, {
                        id: '1032',
                        label: '三级菜单06-03-02',
                        href: 'http://www.qq.com'    
                    }]
                }]
            }, {
                id: '11',
                label: '一级菜单07',
                child: [{
                    id: '111',
                    label: '二级菜单07-01',
                    href: 'http://www.qq.com'
                }, {
                    id: '112',
                    label: '二级菜单07-02',
                    href: 'http://www.qq.com'
                }]
            }];
            var menu = new $.jqcMenu({
                data: data,
                top: 10,
                left: 10,
                // autoSkip: false,
                allowedConfig: true,
                configBoxWidth: 500,
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
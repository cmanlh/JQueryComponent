$JqcLoader.importScript('../../../../../qunit/jquery-3.1.1.js')
    .importScript('../../../../../qunit/version.js')
    .importScript('../../../../../qunit/keycode.js')
    .importScript('../../../../../qunit/qunit-2.1.1.js')
    .importCss('../../../../../qunit/qunit-2.1.1.css').execute(function () {
        $JqcLoader.registerModule($JqcLoader.newModule('com.lifeonwalden.jqc', '../../../../../')
            .registerComponent('baseElement')
            .registerComponent('uniqueKey')
            .registerComponent('menu'));

        $JqcLoader.importComponents('com.lifeonwalden.jqc', ['menu']).execute(function () {
            var data = [{
                label: '一级菜单',
                child: [{
                    label: '二级菜单01-01',
                    age: 15
                }, {
                    label: '二级菜单01-02',
                    href: 'http://www.jd.com'
                }, {
                    label: '二级菜单01-03',
                    zid: 18,
                    eid: 20,
                    child: [{
                        label: '三级菜单01-03-01',
                        href: 'http://www.qq.com'
                    }]
                }]
            }, {
                label: '一级菜单02',
                child: [{
                    label: '二级菜单02-01',
                    href: 'http://www.baidu.com',
                    img: 'a.jpg'
                }, {
                    label: '二级菜单02-02',
                    href: 'http://www.baidu.com',
                    audio: 'b.mp3'
                }, {
                    label: '二级菜单02-03'
                }]
            }, {
                label: '一级菜单03',
                child: [{
                    label: '二级菜单03-01',
                    child: [{
                        label: '三级菜单03-01-01'
                    }, {
                        label: '三级菜单03-01-02'
                    }, {
                        label: '三级菜单03-01-03'
                    }]
                }, {
                    label: '二级菜单03-02',
                    href: 'http://www.baidu.com'
                }]
            }, {
                label: '一级菜单04'
            }, {
                label: '一级菜单05',
                child: [{
                    label: '二级菜单05-01'
                }, {
                    label: '二级菜单01-01',
                    age: 15
                }, {
                    label: '二级菜单01-02',
                    href: 'http://www.jd.com'
                }, {
                    label: '二级菜单01-03',
                    zid: 18,
                    eid: 20,
                    child: [{
                        label: '三级菜单01-03-01',
                        href: 'http://www.qq.com'
                    }]
                }, {
                    label: '二级菜单01-01',
                    age: 15
                }, {
                    label: '二级菜单01-02',
                    href: 'http://www.jd.com'
                }, {
                    label: '二级菜单01-03',
                    zid: 18,
                    eid: 20,
                    child: [{
                        label: '三级菜单01-03-01',
                        href: 'http://www.qq.com'
                    }]
                }, {
                    label: '二级菜单01-01',
                    age: 15
                }, {
                    label: '二级菜单01-02',
                    href: 'http://www.jd.com'
                }, {
                    label: '二级菜单01-03',
                    zid: 18,
                    eid: 20,
                    child: [{
                        label: '三级菜单01-03-01',
                        href: 'http://www.qq.com'
                    }]
                }, {
                    label: '二级菜单01-01',
                    age: 15
                }, {
                    label: '二级菜单01-02',
                    href: 'http://www.jd.com'
                }, {
                    label: '二级菜单01-03',
                    zid: 18,
                    eid: 20,
                    child: [{
                        label: '三级菜单01-03-01',
                        href: 'http://www.qq.com'
                    }]
                }, {
                    label: '二级菜单01-01',
                    age: 15
                }, {
                    label: '二级菜单01-02',
                    href: 'http://www.jd.com'
                }, {
                    label: '二级菜单01-03',
                    zid: 18,
                    eid: 20,
                    child: [{
                        label: '三级菜单01-03-01',
                        href: 'http://www.qq.com'
                    }]
                }, {
                    label: '二级菜单01-02',
                    href: 'http://www.jd.com'
                }, {
                    label: '二级菜单01-03',
                    zid: 18,
                    eid: 20,
                    child: [{
                        label: '三级菜单01-03-01',
                        href: 'http://www.qq.com'
                    }]
                }, {
                    label: '二级菜单01-02',
                    href: 'http://www.jd.com'
                }, {
                    label: '二级菜单01-03',
                    zid: 18,
                    eid: 20,
                    child: [{
                        label: '三级菜单01-03-01',
                        href: 'http://www.qq.com'
                    }]
                }, {
                    label: '二级菜单01-02',
                    href: 'http://www.jd.com'
                }, {
                    label: '二级菜单01-03',
                    zid: 18,
                    eid: 20,
                    child: [{
                        label: '三级菜单01-03-01',
                        href: 'http://www.qq.com'
                    }]
                }, {
                    label: '二级菜单01-02',
                    href: 'http://www.jd.com'
                }, {
                    label: '二级菜单01-03',
                    zid: 18,
                    eid: 20,
                    child: [{
                        label: '三级菜单01-03-01',
                        href: 'http://www.qq.com'
                    }]
                }]
            }];
            var menu = new $.jqcMenu({
                data: data,
                show: true,
                speed: 200,
                onSelect: function (menu) {
                    $('#div2').text(JSON.stringify(menu));
                }
            });
        });
    });
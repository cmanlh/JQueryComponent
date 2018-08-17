$JqcLoader.importComponents('com.lifeonwalden.jqc', ['menuTree']).execute(function () {
    var basicData = [{
        id: '1',
        label: '菜单一01',
    }, {
        id: '2',
        label: '菜单一02',
    }, {
        id: '3',
        label: '菜单一03',
    }, {
        id: '4',
        label: '菜单一04',
    }];

    var menu1;
    $('.basic_btn_1').one('click', function () {
        menu1 = new $.jqcMenuTree({
            data: basicData
        });
    });
    $('.basic_btn_2').click(function () {
        menu1 && menu1.hide();
    });
    $('.basic_btn_3').click(function () {
        menu1 && menu1.show();
    });


    var atypicalData = [{
        uid: '1',
        name: '菜单二01',
    }, {
        uid: '2',
        name: '菜单二02',
    }, {
        uid: '3',
        name: '菜单二03',
    }, {
        uid: '4',
        name: '菜单二04',
    }];

    var menu2;
    $('.atypical_btn_1').one('click', function () {
        menu2 = new $.jqcMenuTree({
            data: atypicalData,
            adapter: {
                id: 'uid',
                label: 'name',
                child: 'child'
            },
            left: 200
        });
    });

    var data2 = [{
        id: 1,
        label: '菜单三01',
        child: [{
            id: 11,
            label: '菜单三01-01',
            child: [{
                id: 111,
                label: '菜单三01-01-01'
            }]
        }]
    }];

    $('.default_btn').one('click', function () {
        new $.jqcMenuTree({
            data: data2,
            left: 500
        })
    });
    $('.noskip_btn').one('click', function () {
        new $.jqcMenuTree({
            data: data2,
            left: 700,
            autoSkip: false,
        })
    });

    var data4 = [{
        id: '1',
        label: '菜单四01',
        child: [{
            id: '2',
            label: '菜单四01-01',
            age: 15
        }, {
            id: '3',
            label: '菜单四01-02',
        }]
    }, {
        id: '11',
        label: '菜单四07',
        child: [{
            id: '111',
            label: '菜单四07-01',
        },]
    }];

    var configurableMenuData = [{
        id: '1',
        label: '菜单四01',
        child: [{
            id: '2',
            label: '菜单四01-01',
        }, {
            id: '3',
            label: '菜单四01-02',
        }, {
            id: '4',
            label: '菜单四01-03',
            child: [{
                id: '5',
                label: '菜单四01-03-01',
            }]
        }]
    }, {
        id: '6',
        label: '菜单四02',
        child: [{
            id: '61',
            label: '菜单四02-01',
        }]
    }, {
        id: '7',
        label: '菜单四03',
        child: [{
            id: '71',
            label: '菜单四03-01',
        }]
    }, {
        id: '8',
        label: '菜单四04'
    }, {
        id: '9',
        label: '菜单四05',
        child: [{
            id: '91',
            label: '菜单四05-01',
        }]
    }, {
        id: '10',
        label: '菜单四06',
        child: [{
            id: '101',
            label: '菜单四06-01',
        }, {
            id: '102',
            label: '菜单四06-02',
        }, {
            id: '103',
            label: '菜单四06-03',
            child: [{
                id: '1031',
                label: '菜单四06-03-01',
            }, {
                id: '1032',
                label: '菜单四06-03-02',   
            }]
        }]
    }, {
        id: '11',
        label: '菜单四07',
        child: [{
            id: '111',
            label: '菜单四07-01',
        }, {
            id: '112',
            label: '菜单四07-02',
        }]
    }];

    $('.setting_btn').one('click', function () {
        new $.jqcMenuTree({
            data: data4,
            allowedConfig: true,
            configurableMenuData: configurableMenuData,
            top: 200
        });
    });
});
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
        eid: 20
        // child: [{
        //     label: '三级菜单01-03-01',
        //     href: 'http://www.qq.com'
        // }]
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
        // child: [{
        //     label: '三级菜单03-01-01'
        // }, {
        //     label: '三级菜单03-01-02'
        // }, {
        //     label: '三级菜单03-01-03'
        // }]
    }, {
        label: '二级菜单03-02',
        href: 'http://www.baidu.com'
    }]
}, {
    label: '一级菜单04'
}];
var menu;
$('#btn_create').one('click', function () {
    menu = new $.jqcMenu({
        data: data,
        onSelect: function (data) {
            $('#div1').text(JSON.stringify(data));
        }
    });
});

$('#btn_show').click(function () {
    if (menu) {
        menu.showMenu();
    }
});
$('#btn_hide').click(function () {
    if (menu) {
        menu.hideMenu();
    }
});
$('#btn_select').click(function () {
    if (menu) {
        menu.showMenu();
        menu.setCurrentLabel('二级菜单02-03');
    }
});
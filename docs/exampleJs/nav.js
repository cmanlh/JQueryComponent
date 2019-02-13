$JqcLoader.importComponents('com.lifeonwalden.jqc', ['nav']).execute(function () {
    var btns = [{
        label: '一级菜单-1',
        children: [{
            label: '二级菜单-1'
        }, {
            label: '二级菜单-特别长特别长特别长特别长',
            children: [{
                label: '三级菜单-1'
            }, {
                label: '三级菜单-特别长特别长特别长特别长'
            }, {
                label: '三级菜单-3',
                disabled: true
            }, {
                label: '三级菜单-4'
            }]
        }, {
            label: '二级菜单-3',
            disabled: true
        }, {
            label: '二级菜单-4'
        }]
    }, {
        label: '一级菜单-2'
    }, {
        label: '一级菜单-3',
        disabled: true
    }, {
        label: '一级菜单-4'
    }, {
        label: '一级菜单-5'
    }];

    new $.jqcNav({
        el: $('.nav'),
        data: btns,
        onSelect: function (data) {
            console.log(data);
        }
    });
});
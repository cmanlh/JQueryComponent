new $.jqcContextMenu({
    element: $('#argumentsTable'),
    selector: 'tr',
    selectorId: 'argument-name',
    onSelect: function (data) {
        $('#input1').val(JSON.stringify(data));     
    },
    operations: [{
        label: '产品',
        id: 1
    }, {
        label: '设计',
        id: 2
    }, {
        label: '前端',
        id: 3
    }, {
        label: '后台',
        id: 4
    }, {
        label: '项目',
        id: 5
    }, {
        label: '发布',
        id: 6
    }]
});
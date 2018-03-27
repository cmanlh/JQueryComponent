new $.jqcContextMenu({
    element: $('#argumentsTable'),
    selector: 'tr',
    selectorId: 'argument-name',
    onSelect: function (data) {
        $('#input1').val(JSON.stringify(data));     
    },
    operations: [{
        label: '产品',
        id: 1,
        child: [{
            label: '一',
            id: 11,
            child: [{
                label: 'aa1',
                id: 111
            }, {
                label: 'aa2',
                id: 112
            }, {
                label: 'aa3',
                id: 113
            }, {
                label: 'aa4',
                id: 114
            }, {
                label: 'aa5',
                id: 115
            }, {
                label: 'aa6',
                id: 116
            }]
        }, {
            label: '二',
            id: 12
        }, {
            label: '三',
            id: 13
        }]
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
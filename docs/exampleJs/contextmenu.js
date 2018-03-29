// example
var example_data = [{
    label: 'example1',
    id: 1,
    child: [{
        label: 'example2',
        id: 11,
        child: [{
            label: 'example3',
            id: 111
        }]
    }]
}];


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


new $.jqcContextMenu({
    element: $('#argumentsTable'),
    selector: 'tr',
    selectorId: 'argument-name',
    onSelect: function (data) {
        $('#input1').val(JSON.stringify(data));     
    },
    operations: create_data()
});
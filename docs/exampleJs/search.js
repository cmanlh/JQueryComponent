var simpleData = [{
    label: '测试1',
    id: 1
}, {
    label: '测试2',
    id: 2   
}, {
    label: '拼音3',
    id: 3   
}];

new $.jqcSearch({
    element: $('#div1'),
    placeholder: '我是搜索框1',
    data: simpleData,
    onSelect: function (data) {
        console.log(data);
    }
});

var data = [{
    label: '测试1',
    child: [{
        label: '测试1-1',
        id: 1
    }]
}, {
    label: '测试2',
    id: 2
}, {
    label: '拼音',
    child: [{
        label: '拼音1',
        id: 3
    }, {
        label: '拼音2',
        id: 4
    }]
}];

new $.jqcSearch({
    element: $('#div2'),
    placeholder: 'I am div2.',
    data: data,
    onSelect: function (data) {
        console.log(data);
    }
});
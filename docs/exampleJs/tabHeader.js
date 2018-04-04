var tab1 = new $.jqcTabHeader({
    element: $('#div1'),
    defaultTab: {
        tabName: 'test1',
        html: '<span>test1</span>'
    }
});
$('#btn1').click(function () {
    var _id = (Math.random() * 10000000 | 0).toString(16);
    tab1.addTab(_id, '<span>'+ _id +'</span>');
});

var tab2 = new $.jqcTabHeader({
    element: $('#div2'),
    search: {
        data: [{
            label: 'test1',
            id: 1
        }, {
            label: 'test2',
            id: 2
        }, {
            label: 'test3',
            id: 3
        }],
        placeholder: '标签栏带搜索框',
        onSelect: function (data) {
            tab2.addTab(data.label, '<span>'+ data.label +'</span>');
        }
    }
});

var tab3 = new $.jqcTabHeader({
    element: $('#div3'),
    defaultTab: {
        tabName: 'test1',
        html: '<span>test1</span>'
    }
});
$('#list li').click(function () {
    var _tabName = $(this).text();
    if (tab3.hasTab(_tabName)) {
        tab3.showTab(_tabName);
    } else {
        //在请求成功的回调函数里调用 addTab方法；
        tab3.addTab(_tabName, '<span>'+ _tabName +'</span>');
    }
});
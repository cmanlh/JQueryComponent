var tab1 = new $.jqcTabHeader({
    element: $('#div1'),
    defaultTab: {
        label: 'test1',
        id: 1
    }
});
$('#btn1').click(function () {
    var _id = Math.random() * 10000000 | 0;
    tab1.addTab({
        label: _id.toString(16),
        id: _id
    });
});

var tab2 = new $.jqcTabHeader({
    element: $('#div2'),
    defaultTab: {
        label: 'test1',
        id: 1
    },
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
        placeholder: '标签栏带搜索框'
    }
});
$('#btn2').click(function () {
    tab2.addTab({
        label: 'test2',
        id: 2
    });
});
$('#btn3').click(function () {
    tab2.addTab({
        label: 'test3',
        id: 3
    });
});
$('#btn4').click(function () {
    tab2.addTab({
        label: 'test1',
        id: 1
    });
});

var $tabContainer = $('#tab_container');

var tab3 = new $.jqcTabHeader({
    element: $('#div3'),
    defaultTab: {
        label: 'test1',
        id: '1'
    },
    onAddTab: function (data) {
        var _container = $('<div>')
            .attr('data-id', data.id)
            .text(data.label);
        $tabContainer.append(_container);
    },
    onSelect: function (data) {
        $tabContainer.find('[data-id='+data.id+']')
            .show()
            .siblings()
            .hide();
    },
    onClose: function (data) {
        $tabContainer.find('[data-id='+data.id+']')
            .remove();
    }
});

$('#list li').click(function () {
    var _label = $(this).text();
    var _id = $(this).attr('data-uid');
    tab3.addTab({
        label: _label,
        id: _id
    });
});
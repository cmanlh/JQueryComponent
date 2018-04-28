$JqcLoader.importComponents('com.lifeonwalden.jqc', ['contextmenu']).execute(function () {
    var data1 = [{
        text: '一级菜单01',
        child: [{
            id: 1,
            text: '二级菜单01'
        }, {
            id: 2,
            text: '二级菜单02'
        }],
        valid: function (showData) {
            return showData === 1;
        }
    }, {
        text: '一级菜单02',
        child: [{
            id: 3,
            text: '二级菜单03'
        }, {
            id: 4,
            text: '二级菜单04'
        }],
        valid: function (showData) {
            return showData > 1;
        }
    }, {
        text: '一级菜单03',
        child: [{
            id: 5,
            text: '二级菜单05'
        }, {
            id: 6,
            text: '二级菜单06'
        }],
        valid: function (showData) {
            return showData > 1;
        }
    }];

    var menus1 = new $.jqcContextMenu({
        menus: data1,
    });

    $('#div1').on('contextmenu', function (e) {
        e.preventDefault();
        menus1.show();
    });
    
    $('#div2').on('contextmenu', function (e) {
        e.preventDefault();
        menus1.show(1);
    });    
    $('#div3').on('contextmenu', function (e) {
        e.preventDefault();
        menus1.show(2);
    });
    // 带滚动条 演示省略id
    var data2 = [{
        text:'test'
    }, {
        text:'test'
    }, {
        text:'test'
    }, {
        text:'test'
    }, {
        text:'test'
    }, {
        text:'test'
    }, {
        text:'test'
    }, {
        text:'test'
    }, {
        text:'test'
    }, {
        text:'test'
    }];

    var menus2 = new $.jqcContextMenu({
        menus: data2,
        max: 5
    });

    $('#div4').on('contextmenu', function (e) {
        e.preventDefault();
        menus2.show();
    });
    // 自动越级 因演示省略id
    var data3 = [{
        text: '我是一级',
        child: [{
            text: '我是二级',
            child: [{
                text: '我是三级'
            }]
        }]
    }];

    var autoSkip = new $.jqcContextMenu({
        menus: data3
    });

    var noAutoSkip = new $.jqcContextMenu({
        menus: data3,
        autoSkip: false
    });

    $('#div5').on('contextmenu', function (e) {
        e.preventDefault();
        autoSkip.show();
    });
    
    $('#div6').on('contextmenu', function (e) {
        e.preventDefault();
        noAutoSkip.show();
    });


    var big = new $.jqcContextMenu({
        menus: data1,
        width: 240,
        height: 48
    });

    $('#div7').on('contextmenu', function (e) {
        e.preventDefault();
        big.show();
    });

    //订单示例，status 1：已支付  2：未支付  3: 已发货   4：已取消   5：已收货   6:已完成
    var orderMenus = [{
        id: 1,
        text: '支付订单',
        valid: function (showData) {
            return showData.status === 2;
        }
    }, {
        id: 2,
        text: '确认收货',
        valid: function (showData) {
            return showData.status === 3;
        }
    }, {
        id: 3,
        text: '取消订单',
        valid: function (showData) {
            return showData.status === 2 || showData.status === 1 || showData.status === 3;
        }
    }, {
        id: 4,
        text: '完成订单',
        valid: function (showData) {
            return showData.status === 5;
        }
    },{
        id: 5,
        text: '删除订单',
        valid: function (showData) {
            return showData.status === 2 || showData.status === 4 || showData.status === 6;
        }
    }];

    var orderMenu = new $.jqcContextMenu({
        menus: orderMenus,
        onSelect: function (data) {
            manageOrder(data);              //data.menu 触发该事件的menu信息  data.showData 显示菜单时传入的参数
        }
    });

    $('#orderList > li').on('contextmenu', function (e) {
        e.preventDefault();
        var orderId = +$(this).attr('data-orderId');
        var status = +$(this).attr('data-status');
        orderMenu.show({
            orderId,
            status
        });
    });

    function manageOrder(data) {
        var orderId = data.showData.orderId; 
        var doneId = data.menu.id;
        var $element = $('#orderList li[data-orderId='+ orderId +']');
        switch (doneId) {
            case 1:
                $element.attr('data-status', 1)
                    .text(`${orderId}号订单，状态：已支付`);
                break;
            case 2:
                $element.attr('data-status', 5)
                    .text(`${orderId}号订单，状态：已收货`);
                break;
            case 3:
                $element.attr('data-status', 4)
                    .text(`${orderId}号订单，状态：已取消`);
                break;
            case 4:
                $element.attr('data-status', 6)
                    .text(`${orderId}号订单，状态：已完成`);
                break;
            case 5:
                $element.remove();
                break;
        }
    }



    function create_data() {
        var create_three = function (num) {
            return new Array(10).fill(1).map((item, index) => ({
                label: '三级菜单' + num + index,
                id: num.toString() + index,
            }));
        };
        var create_two = function (num) {
            return new Array(10).fill(1).map((item, index) => ({
                label: '二级菜单' + num + index,
                id: num.toString() + index,
                child: create_three(num.toString() + index),
            }));
        };
        return new Array(10).fill(1).map((item, index) => ({
            label: '一级菜单' + index,
            id: index,
            child: create_two(index),
        }));
    }

    var data = create_data();
    var all = new $.jqcContextMenu({
        menus: data,
        adapter: {
            id: 'id',
            text: 'label',
            child: 'child',
            valid: 'valid'
        },
    });
    $('#div8').on('contextmenu', function (e) {
        e.preventDefault();
        all.show();
    });
});
$JqcLoader.importScript('../../../../../qunit/jquery-3.1.1.js')
    .importScript('../../../../../qunit/version.js')
    .importScript('../../../../../qunit/keycode.js')
    .importScript('../../../../../qunit/qunit-2.1.1.js')
    .importCss('../../../../../qunit/qunit-2.1.1.css').execute(function () {
        $JqcLoader.registerModule($JqcLoader.newModule('com.lifeonwalden.jqc', '../../../../../')
            .registerComponent('baseElement')
            .registerComponent('uniqueKey')
            .registerComponent('toolkit')
            .registerComponent('contextmenu'));

        $JqcLoader.importComponents('com.lifeonwalden.jqc', ['contextmenu']).execute(function () {
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
                width: 200,
                height: 40
            });
            $('.box3').on('contextmenu', function (e) {
                e.preventDefault();
                all.show();
            });

            var menus1 = [{
                id: 1,
                text: '始终显示',
            }, {
                id: 2,
                text: '偶数显示',
                valid: function (num) {
                    return num % 2 === 0;
                }
            }, {
                id: 3,
                text: '奇数显示',
                valid: function (num) {
                    return num % 2 === 1;
                }
            }, {
                id: 4,
                text: '大于等于5的显示',
                valid: function (num) {
                    return num >= 5;
                }
            }, {
                id: 5,
                text: '小于5的显示',
                valid: function (num) {
                    return num < 5;
                }
            }, {
                id: 6,
                text: '带child',
                child: [{
                    id: 7,
                    text: '始终显示'
                }, {
                    id: 8,
                    text: '小于10显示',
                    valid: function (num) {
                        return num < 10;
                    },
                    child: [{
                        id: 10,
                        text: '小于9显示',
                        valid: function (num) {
                            return num < 9;
                        }
                    }, {
                        id: 11,
                        text: '大于5显示',
                        valid: function (num) {
                            return num > 5;
                        }
                    }]
                }, {
                    id: 9,
                    text: '大于10显示',
                    valid: function (num) {
                        return num > 10;
                    }
                }]
            }];

            var b = new $.jqcContextMenu({
                menus: menus1,
                onSelect: function (data) {
                    console.log(data);
                },
                autoSkip: false,
                width: 160,
                height: 32
            });
            
            $('.box1 > p').on('contextmenu', function (e) {
                e.preventDefault();
                var _index = $(this).index();
                if (_index === 0) {
                    b.show();
                } else {
                    b.show(_index);
                }
            });


            //status 1：已支付  2：未支付  3: 已发货   4：已取消   5：已收货   6:已完成
            var menus2 = [{
                id: 1,
                text: '支付订单',
                valid: function (showData) {
                    console.log(showData)
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


            var c = new $.jqcContextMenu({
                menus: menus2,
                onSelect: function (data) {
                    if (!data.showData) {
                        return;
                    }
                    var id = data.showData.id;
                    var oid = data.menu.id;
                    manageOrder(id, oid);
                },
                width: 200,
                height: 40
            });


            $('.box2 > p').on('contextmenu', function (e) {
                e.preventDefault();
                var status = $(this).attr('data-status');
                var id = $(this).attr('data-id');
                if (status !== undefined && id !== undefined) {
                    c.show({
                        id: +id,
                        status: +status
                    });
                } else {
                    c.show();
                }
            });

            function manageOrder(orderId, doneId) {
                var $element = $('.box2 p[data-id='+ orderId +']');
                switch (doneId) {
                    case 1:
                        $element.attr('data-status', 1)
                            .text('1.已支付');
                        break;
                    case 2:
                        $element.attr('data-status', 5)
                            .text('5.已收货');
                        break;
                    case 3:
                        $element.attr('data-status', 4)
                            .text('4.已取消');
                        break;
                    case 4:
                        $element.attr('data-status', 6)
                            .text('6.已完成');
                        break;
                    case 5:
                        $element.remove();
                        break;
                }
            }
        });
    });
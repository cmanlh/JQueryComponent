$JqcLoader.importComponents('com.lifeonwalden.jqc', ['apisBox']).execute(function () {
    var mock = {
        api: '/api/login',
        method: 'post',
        apiName: '登录',
        note: '用户名和密码需要前端正则验证（规则详见@123456），以减少后台压力。',
        params: {
            username: {
                __info__: {
                    type: 'String',
                    required: true,
                    description: '用户名',
                    note: '用户名不能为空。'
                }
            },
            password: {
                __info__: {
                    type: 'String',
                    required: true,
                    description: '密码',
                    note: '密码不能为空，最长20字符。'
                }
            }
        },
        response: {
            code: {
                __info__: {
                    type: 'Number',
                    default: 0,
                    description: '状态码'
                }
            },
            msg: {
                __info__: {
                    type: 'String',
                    default: 'success',
                    description: '消息'
                }
            }
        }
    };

    var apis1 = new $.jqcApisBox({
        element: $('#div1'),
        data: [mock]
    });

    var _getMock = {
        api: '/api/order/query',
        method: 'get',
        apiName: '查询订单',
        note: '可以不传参数，status默认为0。',
        params: {
            status: {
                __info__: {
                    type: 'Number',
                    default: 0,
                    optional: '0：全部；1：已完成；2：未完成；3：已交付；4：已取消。',
                    description: '订单状态'
                }
            }
        },
        response: {
            code: {
                __info__: {
                    type: 'Number',
                    default: 0,
                    description: '状态码'
                }
            },
            msg: {
                __info__: {
                    type: 'String',
                    default: 'successsuccesssucssess',
                    description: '消息'
                }
            },
            result: {
                __info__: {
                    type: 'Array Object',
                    default: '[]',
                    description: '查询结果',
                    note: '未查询到结果，返回空数组。'
                },
                status: {
                    __info__: {
                        type: 'Number',
                        description: '订单状态'
                    }
                },
                info: {
                    __info__: {
                        type: 'Object',
                        description: '订单信息'
                    },
                    count: {
                        __info__: {
                            type: 'Number',
                            default: 1,
                            description: '数量'
                        }
                    },
                    size: {
                        __info__: {
                            type: 'String',
                            default: 'S',
                            description: '尺寸'
                        }
                    }
                }
            }
        }
    };

    var _putMock = {
        api: '/api/order/update',
        method: 'PuT',
        apiName: '更新订单',
        note: '更新订单数据。'
    };
    var _deleteMock = {
        api: '/api/order/delete',
        method: 'delete',
        apiName: '删除订单',
    };
    var api2 = new $.jqcApisBox({
        element: $('#div2'),
        data: [_getMock, mock, _putMock, _deleteMock]
    });

    $('.btn1').click(function () {
        api2.add(mock);
    });
    $('.btn2').click(function () {
        api2.add([_getMock, mock, _putMock, _deleteMock]);
    });
});
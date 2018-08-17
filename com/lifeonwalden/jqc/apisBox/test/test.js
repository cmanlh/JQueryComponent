$JqcLoader.importScript('../../../../../qunit/jquery-3.1.1.js')
    .importScript('../../../../../qunit/version.js')
    .importScript('../../../../../qunit/keycode.js')
    .importScript('../../../../../qunit/qunit-2.1.1.js')
    .importCss('../../../../../qunit/qunit-2.1.1.css').execute(function () {
        $JqcLoader.registerModule($JqcLoader.newModule('com.lifeonwalden.jqc', '../../../../../')
            .registerComponent('baseElement')
            .registerComponent('uniqueKey')
            .registerComponent('toolkit')
            .registerComponent('apisBox'));

        $JqcLoader.importComponents('com.lifeonwalden.jqc', ['apisBox']).execute(function () {
            var mockData = {
                api: '/api/query',
                apiName: '查询数据',
                method: 'GET',
                note: '我是详细说明。',
                params: {
                    startTime: {
                        __info__: {
                            type: 'Number',
                            description: '开始时间',
                            optional: '0-100000000',
                            note: '我是开始时间。'       
                        }
                    },
                    endTime: {
                        __info__: {
                            type: 'Number',
                            description: '结束时间',
                            note: '我是结束时间'
                        }
                    },
                    condition: {
                        __info__: {
                            type: 'Object',
                            required: true,
                            default: '{}',
                            description: '查询条件',
                            note: '我是查询条件'
                        },
                        type: {
                            __info__: {
                                type: 'Number',
                                required: true,
                                default: 1,
                                optional: '1,2,3,4,5',
                                description: '种类'
                            },
                            subType: {
                                __info__: {
                                    type: 'Number',
                                    required: true,
                                    default: 0,
                                    optional: 123456,
                                    description: '二级种类'
                                }
                            }
                        }
                    }
                },
                response: {
                    code: {
                        __info__: {
                            type: 'Number',
                            description: '状态码'
                        }
                    },
                    msg: {
                        __info__: {
                            type: 'String',
                            description: '消息'
                        }
                    },
                    result: {
                        __info__: {
                            type: 'Array Object',
                            default: [],
                            description: '返回结果'
                        },
                        type: {
                            __info__: {
                                type: 'Number',
                                description: '类型',
                            }
                        },
                        info: {
                            __info__: {
                                type: 'Object',
                                description: '详细信息'
                            },
                            createTime: {
                                __info__: {
                                    type: 'Number',
                                    description: '创建时间'
                                }
                            },
                            startTime: {
                                __info__: {
                                    type: 'Number',
                                    description: '开始时间'
                                }
                            },
                            endTime: {
                                __info__: {
                                    type: 'Number',
                                    description: '结束时间'
                                }
                            }
                        },
                        info2: {
                            __info__: {
                                type: 'Object',
                                description: '详细信息2'
                            },
                            createTime: {
                                __info__: {
                                    type: 'Number',
                                    description: '创建时间'
                                }
                            },
                            startTime: {
                                __info__: {
                                    type: 'Number',
                                    description: '开始时间'
                                }
                            },
                            endTime: {
                                __info__: {
                                    type: 'Number',
                                    description: '结束时间'
                                }
                            }
                        }
                    },
                    test: {
                        __info__: {
                            type: 'Number',
                            default: 1000000000,
                            description: '测试测试测试'
                        }
                    },
                    test2: {
                        __info__: {
                            type: 'Number',
                            default: 99999999999999,
                            description: '测试测试测试'
                        }
                    },
                    test3: {
                        __info__: {
                            type: 'Number',
                            default: 98888888888,
                            description: '测试测试测试'
                        }
                    }
                }
            };
            var _get = mockData;
            var _post = Object.assign({}, mockData, {method: 'post'});
            var _put = Object.assign({}, mockData, {method: 'Put'});
            var _delete = Object.assign({}, mockData, {method: 'delete'});
            var apis = new $.jqcApisBox({
                element: $('#div1'),
                data: [_get, _post, _put, _delete]
            });

            $('.btn1').click(function () {
                apis.add(_get);
            });
            $('.btn2').click(function () {
                apis.add([_get, _post, _put, _delete]);
            });
        });
    });
$JqcLoader.importScript('../../../../../qunit/jquery-3.1.1.js')
    .importScript('../../../../../qunit/version.js')
    .importScript('../../../../../qunit/keycode.js')
    .importScript('../../../../../qunit/qunit-2.1.1.js')
    .importCss('../../../../../qunit/qunit-2.1.1.css').execute(function () {
        $JqcLoader.registerModule($JqcLoader.newModule('com.lifeonwalden.jqc', '../../../../../')
            .registerComponent('icon')
            .registerComponent('nav'));

        $JqcLoader.importComponents('com.lifeonwalden.jqc', ['nav']).execute(function () {
            var a = new $.jqcNav({
                el: $('.nav_box'),
                data: [{
                    id: 'btn1',
                    text: '处理中心'
                }, {
                    id: 'btn2',
                    text: '我的工作台',
                    children: [{
                        id: 'btn2-1',
                        text: '选项1选项1选项1选项1选项1选项1选项1选项1'
                    }, {
                        id: 'btn2-2',
                        text: '选项2',
                        disabled: true,
                    }, {
                        id: 'btn2-3',
                        text: '选项3选项3选项3选项3选项3选项3选项3选项3选项3',
                        children: [{
                            id: '234',
                            text: '测试测试测试测试测试测试测试测试测试测试测试测试'
                        }]
                    }]
                }, {
                    id: 'btn3',
                    text: '消息中心',
                    disabled: true
                }, {
                    id: 'btn4',
                    text: '关于我们'
                }, {
                    id: 'btn2',
                    text: '我的工作台',
                    children: [{
                        id: 'btn2-1',
                        text: '选项1'
                    }, {
                        id: 'btn2-2',
                        text: '选项2',
                    }, {
                        id: 'btn2-3',
                        text: '选项3',
                        children: [{
                            id: '234',
                            text: '测试'
                        }]
                    }]
                }],
                adapter: {
                    value: 'id',
                    label: 'text'
                },
                onSelect: function (data) {
                    console.log(data);
                }
            })
        });
    });
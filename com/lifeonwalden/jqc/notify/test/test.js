$JqcLoader.importScript('../../../../../qunit/jquery-3.1.1.js')
    .importScript('../../../../../qunit/version.js')
    .importScript('../../../../../qunit/keycode.js')
    .importScript('../../../../../qunit/qunit-2.1.1.js')
    .importCss('../../../../../qunit/qunit-2.1.1.css').execute(function () {
        $JqcLoader.registerModule($JqcLoader.newModule('com.lifeonwalden.jqc', '../../../../../')
            .registerComponent('dateUtil')
            .registerComponent('notify'));

        $JqcLoader.importComponents('com.lifeonwalden.jqc', ['notify']).execute(function () {
            window.a = new $.jqcNotify({
                el: $('.notify'),
                data: [{
                    title: '测试测试测试测试测试测试测试测试测试测试测试测试测试测试',
                    content: '1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890'
                }, {
                    title: '测试测试',
                    content: '123456789j343'
                }, {
                    title: '测试测试测试测试测试测试测试测试测试测试测试测试测试测试',
                    content: '1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890'
                }, {
                    title: '测试测试',
                    content: '123456789j343'
                }, {
                    title: '测试测试测试测试测试测试测试测试测试测试测试测试测试测试',
                    content: '1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890'
                }, {
                    title: '测试测试',
                    content: '123456789j343'
                }],
                position: 'left',
                onOpen: function () {
                    console.log('open');
                },
                tip: function (data) {
                    return '123';
                },
                // onSelect: function (data) {
                //     console.log(data);
                // }
                onMore: function () {
                    console.log('more');
                    this.close();
                },
                onClose: function () {
                    console.log('close');
                }
            });
        });
    });
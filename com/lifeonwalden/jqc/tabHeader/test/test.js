$JqcLoader.importScript('../../../../../qunit/jquery-3.1.1.js')
    .importScript('../../../../../qunit/version.js')
    .importScript('../../../../../qunit/keycode.js')
    .importScript('../../../../../qunit/qunit-2.1.1.js')
    .importCss('../../../../../qunit/qunit-2.1.1.css').execute(function () {
        $JqcLoader.registerModule($JqcLoader.newModule('com.lifeonwalden.jqc', '../../../../../')
            .registerComponent('baseElement')
            .registerComponent('uniqueKey')
            .registerComponent('pinyin')
            .registerComponent('search')
            .registerComponent('tabHeader'));

        $JqcLoader.importComponents('com.lifeonwalden.jqc', ['tabHeader']).execute(function () {
            var tab = new $.jqcTabHeader({
                element: $('#div1'),
                defaultTab: {
                    tabName: 'test1',
                    html: '<span>123</span>'
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
                    placeholder: 'test123',
                    onSelect: function (data) {
                        if (!tab.hasTab(data.label)) {
                            tab.addTab(data.label, '<span>' + data.label + '</span>');
                        } else {
                            tab.showTab(data.label);
                        }
                    }
                },
            });
            $('#btn').click(function () {
                var _tabName = $('#input').val();
                if (!tab.hasTab(_tabName)) {
                    tab.addTab(_tabName, '<div>' + _tabName + '</div>');
                } else {
                    tab.showTab(_tabName);
                }
            });
            var flag = true;
            $('#btn2').click(function () {
                if (flag) {
                    $('body').css('padding-left', 200);
                } else {
                    $('body').css('padding-left', 0)
                }
                flag = !flag;
            })
        });
    });
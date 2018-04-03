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
                    label: 'test1',
                    id: 1
                },
                onSelect: function (data) {
                    $('#div2').find('[data-id='+data.id+']')
                        .show()
                        .siblings()
                        .hide();   
                },
                onClose: function (data) {
                    $('#div2').find('[data-id='+data.id+']')
                        .remove();
                },
                onAddTab: function (data) {
                    var _tabContainer = $('<div>')
                        .attr('data-id', data.id)
                        .text(data.label);
                    $('#div2').append(_tabContainer);
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
                    placeholder: 'test123'
                },
            });
            $('#btn').click(function () {
                tab.addTab({
                    label: $('#input').val(),
                    id: Math.random() * 100 | 0
                });
            });
        });
    });
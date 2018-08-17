$JqcLoader.importScript('../../../../../qunit/jquery-3.1.1.js')
    .importScript('../../../../../qunit/version.js')
    .importScript('../../../../../qunit/keycode.js')
    .importScript('../../../../../qunit/qunit-2.1.1.js')
    .importCss('../../../../../qunit/qunit-2.1.1.css').execute(function () {
        $JqcLoader.registerModule($JqcLoader.newModule('com.lifeonwalden.jqc', '../../../../../')
            .registerComponent('baseElement')
            .registerComponent('uniqueKey')
            .registerComponent('lang')
            .registerComponent('tab'));

        $JqcLoader.importComponents('com.lifeonwalden.jqc', ['tab']).execute(function () {
            var tab = new $.jqcTab({
                element: $('#tabContainer'),
                position: 'absolute'
            });

            $('#addBtn').on('click', function (e) {
                var id = Math.round(Math.random() * 1000);
                tab.add({
                    id: id,
                    title: "Title".concat(id),
                    content: '<span>'.concat('content ').concat(id).concat('</span>')
                });
            });
        });
    });
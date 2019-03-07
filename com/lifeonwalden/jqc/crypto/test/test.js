$JqcLoader.importScript('../../../../../qunit/jquery-3.1.1.js')
    .importScript('../../../../../qunit/qunit-2.1.1.js')
    .importCss('../../../../../qunit/qunit-2.1.1.css').execute(function () {
        $JqcLoader.registerModule($JqcLoader.newModule('com.lifeonwalden.jqc', '../../../../../')
            .registerComponents(['charUtil', 'crypto']));

        $JqcLoader.importComponents('com.lifeonwalden.jqc', ['crypto']).execute(function () {
            $.crypto.aesGenerateKeyAsync().then(key => console.log(key),reason=>console.log('failed :'.concat(reason)));
        });
    });
$JqcLoader.importScript('../../../../../qunit/jquery-3.1.1.js')
    .importScript('../../../../../qunit/version.js')
    .importScript('../../../../../qunit/keycode.js')
    .importScript('../../../../../qunit/qunit-2.1.1.js')
    .importCss('../../../../../qunit/qunit-2.1.1.css').execute(function () {
        $JqcLoader.registerModule($JqcLoader.newModule('com.lifeonwalden.jqc', '../../../../../')
            .registerComponents(['baseElement', 'format', 'uniqueKey', 'valHooks', 'inputNumber']));

        $JqcLoader.importComponents('com.lifeonwalden.jqc', ['inputNumber']).execute(function () {
            new $.jqcInputNumber({
                element: $('input[name=intNumber]')
            });

            new $.jqcInputNumber({
                element: $('input[name=floatNumber0]'),
                decimals: 1
            });

            new $.jqcInputNumber({
                element: $('input[name=floatNumber00]'),
                decimals: 2
            });

            new $.jqcInputNumber({
                element: $('input[name=floatNumber000]'),
                decimals: 3
            });

            new $.jqcInputNumber({
                element: $('input[name=floatNumber0000]'),
                decimals: 4
            });

            new $.jqcInputNumber({
                element: $('input[name=font-family1]')
            });
            new $.jqcInputNumber({
                element: $('input[name=font-family2]')
            });
            new $.jqcInputNumber({
                element: $('input[name=intNumber_disabled]')
            });
            var flag = true;
            $('.btn').click(function () {
                flag = !flag;
                $('#test').prop('disabled', flag);
            });
        });
    });
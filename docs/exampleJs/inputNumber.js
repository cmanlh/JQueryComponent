$JqcLoader.importComponents('com.lifeonwalden.jqc', ['inputNumber']).execute(function () {
    new $.jqcInputNumber({
        element: $('input[name=basic]')
    });

    new $.jqcInputNumber({
        element: $('input[name=withDecimals]'),
        decimals: 2
    });
});
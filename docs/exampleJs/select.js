$JqcLoader.importComponents('com.lifeonwalden.jqc', ['select']).execute(function () {
    const normalData = [{
        value: 0,
        label: '广兰路'
    }, {
        value: 1,
        label: '金科路'
    }];

    new $.jqcSelect({
        el: $('#normal'),
        data: normalData
    });

    new $.jqcSelect({
        el: $('#all'),
        data: normalData
    });

    new $.jqcSelect({
        el: $('#empty'),
        data: normalData
    });

    new $.jqcSelect({
        el: $('#default1'),
        data: normalData,
        defaultValue: 1
    });

    new $.jqcSelect({
        el: $('#default2'),
        data: normalData,
        defaultValue: 1
    });

    const adapterData = [{
        id: 1,
        name: '广兰路'
    }, {
        id: 2,
        name: '金科路'
    }];
    new $.jqcSelect({
        el: $('#adapter'),
        data: adapterData,
        adapter: {
            value: 'id',
            label: 'name'
        },
        onSelect: function (data) {
            console.log(data);
        }
    });
});
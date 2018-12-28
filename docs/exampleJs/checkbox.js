$JqcLoader.importComponents('com.lifeonwalden.jqc', ['checkbox']).execute(function () {
    const dataSource = [{
            label: '测试1',
            value: 1
        }, {
            label: '测试2',
            value: 2
        }, {
            label: '测试3',
            value: 3
        }, {
            label: '测试4',
            value: 4
        }, {
            label: '测试5',
            value: 5
        }, {
            label: '测试6',
            value: 6
        }];

    new $.jqcCheckbox({
        el: $('#default'),
        data: dataSource,
        defaultValue: '4'
    });
    new $.jqcCheckbox({
        el: $('#multiple'),
        data: dataSource,
        mode: 'multiple',
        defaultValue: '1,3,5'
    });
    new $.jqcCheckbox({
        el: $('#radio'),
        data: dataSource,
        type: 'radio'
    });
    new $.jqcCheckbox({
        el: $('#column'),
        data: dataSource,
        direction: 'column'
    });
    const dataSource1 = [{
        id: 0,
        name: '佩奇'
    }, {
        id: 1,
        name: '乔治'
    }];
    new $.jqcCheckbox({
        el: $('#adapter'),
        data: dataSource1,
        defaultValue: 0,
        direction: 'column',
        adapter: {
            label: function (data, isChecked) {
                return `我是小猪${data.name}${isChecked?',哼哼哼':''}！`
            },
            value: 'id'
        }
    });
});
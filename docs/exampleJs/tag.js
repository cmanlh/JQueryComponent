$JqcLoader.importComponents('com.lifeonwalden.jqc', ['tag']).execute(function () {
    new $.jqcTag({
        el: $('#tag1')
    });

    new $.jqcTag({
        el: $('#tag2'),
        data: [{
            id: 1,
            text: '简单'
        }, {
            id: 2,
            text: '普通'            
        }, {
            id: 3,
            text: '困难'            
        }, {
            id: 4,
            text: '深渊'            
        }],
        adapter: {
            value: 'text',
            label: 'text'
        }
    });
    new $.jqcTag({
        el: $('#tag3'),
        defaultValue: '新手;顽强'
    });
});
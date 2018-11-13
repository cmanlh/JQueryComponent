$JqcLoader.importComponents('com.lifeonwalden.jqc', ['notify']).execute(function () {
    new $.jqcNotify({
        el: $('.notify1')
    });
    
    new $.jqcNotify({
        el: $('.notify2'),
        data: [{
            title: '抬头1',
            content: '内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容',
            createTime: 1542009959382
        }],
        adapter: {
            time: function (data) {
                return new Date(data.createTime);
            }
        },
        tip: function (data) {
            return `${data.length}条未读`;
        }
    });
});
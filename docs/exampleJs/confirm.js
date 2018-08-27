$JqcLoader.importComponents('com.lifeonwalden.jqc', ['confirm']).execute(function () {
    $('#btn1').click(function () {
        $.jqcConfirm({
            title: '我是title',
            content: '我是内容',
            onConfirm: function () {
                console.log('confirm');
            },
            onCancel: function () {
                console.log('cancel');
            }
        });
    });
});
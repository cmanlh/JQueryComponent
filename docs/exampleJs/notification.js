$JqcLoader.importComponents('com.lifeonwalden.jqc', ['notification']).execute(function () {
    $('#btn1').click(function () {
        $.jqcNotification({
            type: 'success',
            title: '我是title',
            content: '内容内容内容内容内容内容内容'
        });
    });
    $('#btn2').click(function () {
        $.jqcNotification({
            type: 'error',
            title: '我是title',
            content: '内容内容内容内容内容内容内容'
        });
    });
    $('#btn3').click(function () {
        $.jqcNotification({
            type: 'warn',
            title: '我是title',
            content: '内容内容内容内容内容内容内容'
        });
    });
    $('#btn4').click(function () {
        $.jqcNotification({
            type: 'info',
            title: '我是title',
            content: '内容内容内容内容内容内容内容'
        });
    });
    $('#btn5').click(function () {
        $.jqcNotification({
            type: 'success',
            title: '我不会主动消失',
            content: '我需要点击关闭',
            duration: 0
        });
    });
});
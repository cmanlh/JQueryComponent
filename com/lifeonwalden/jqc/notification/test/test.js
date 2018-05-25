$JqcLoader.importScript('../../../../../qunit/jquery-3.1.1.js')
    .importScript('../../../../../qunit/version.js')
    .importScript('../../../../../qunit/keycode.js')
    .importScript('../../../../../qunit/qunit-2.1.1.js')
    .importCss('../../../../../qunit/qunit-2.1.1.css').execute(function () {
        $JqcLoader.registerModule($JqcLoader.newModule('com.lifeonwalden.jqc', '../../../../../')
            .registerComponent('baseElement')
            .registerComponent('zindex')
            .registerComponent('toolkit')
            .registerComponent('notification'));

        $JqcLoader.importComponents('com.lifeonwalden.jqc', ['notification']).execute(function () {
            $('.btn1').click(function () {
                $.jqcNotification({
                    type: 'success',
                    title: '我是自定义不关闭',
                    content: 'content',
                    duration: 0
                });
            });
            $('.btn2').click(function () {
                $.jqcNotification({
                    type: 'error',
                    title: '我是自定义5秒关闭',
                    content: 'content',
                    duration: 5000
                });
            });
            $('.btn3').click(function () {
                $.jqcNotification({
                    type: 'warn',
                    title: '我是默认3秒关闭',
                    content: 'content'
                });
            });
            $('.btn4').click(function () {
                $.jqcNotification({
                    type: 'info',
                    title: '我是tittle',
                    content: 'content'
                });
            });
            $('.btn5').click(function () {
                $.jqcNotification({
                    title: '我是tittle',
                    content: 'content'
                });
            });
            $('.btn6').click(function () {
                $.jqcNotification({
                    title: 'only titleonly titleonly titleonly titleonly titleonly titleonly titleonly titleonly titleonly title'
                });
            });
            $('.btn7').click(function () {
                $.jqcNotification({
                    content: 'only contentonly contentonly contentonly contentonly contentonly contentonly contentonly content'
                });
            });
            $('.btn8').click(function () {
                $.jqcNotification({
                    type: 'success',
                    title: '我是title我是title我是title我是title我是title'
                });
            });
            $('.btn9').click(function () {
                $.jqcNotification({
                    type: 'success',
                    content: 'only contentonly contentonly contentonly contentonly contentonly contentonly contentonly content'
                });
            });
            $('.btn10').click(function () {
                $.jqcNotification({
                    type: 'success'
                });
            });
        });
    });
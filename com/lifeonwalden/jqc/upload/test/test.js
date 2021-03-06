$JqcLoader.importScript('../../../../../qunit/jquery-3.1.1.js')
    .importScript('../../../../../qunit/version.js')
    .importScript('../../../../../qunit/keycode.js')
    .importScript('../../../../../qunit/qunit-2.1.1.js')
    .importCss('../../../../../qunit/qunit-2.1.1.css').execute(function () {
        $JqcLoader.registerModule($JqcLoader.newModule('com.lifeonwalden.jqc', '../../../../../')
            .registerComponent('baseElement')
            .registerComponent('toolkit')
            .registerComponent('zindex')
            .registerComponent('notification')
            .registerComponent('icon')
            .registerComponent('upload'));

        $JqcLoader.importComponents('com.lifeonwalden.jqc', ['upload']).execute(function () {
            window.a = new $.jqcUpload({
                el: $('.single'),
                url: 'http://172.29.114.86:7001/upload',
                accept: 'image',
                maxSize: 800,
                name: 'test',
                data: function () {
                    return {
                        username: $('.username').val(),
                        password: $('.password').val()
                    };
                },
                placeholder: '请选择文件',
                check: function (data, upload) {
                    console.log('check', data);
                    if (data.username == '') {
                        alert('用户名不能为空');
                        return false;
                    }
                    if (data.password == '') {
                        alert('密码不能为空');
                        return false;
                    }
                    return true;
                },
                success: function (data, success, error) {
                    // 根据接口返回结果自定义成功与失败
                    if (data) {
                        success(data);
                    } else {
                        error();
                    }
                }
            }); 
           window.b = new $.jqcUpload({
                el: $('.multiple'),
                url: 'http://172.29.114.86:7001/upload',
                accept: ['xlsx', 'txt', 'jpg'],
                mode: 'multiple',
                maxSize: 800,
                data: function () {
                    return {a: Math.random()};
                },
                placeholder: '请选择图片,我是placeholder',
                success: function (data, success, error) {
                    if (data) {
                        success(data);
                    } else {
                        error();
                    }
                },
                onRemove: function (id, success, error) {
                    setTimeout(function () {
                        success('删除成功');
                    }, 1000);
                }
            });
        });
    });
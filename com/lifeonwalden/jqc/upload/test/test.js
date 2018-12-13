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
            new $.jqcUpload({
                el: $('.single'),
                url: 'http://172.29.114.86:7001/upload',
                accept: 'image',
                maxSize: 800,
                name: 'test',
                data: {
                    username: 'mawenjie',
                    password: '111111'
                },
                placeholder: 'placeholder',
                success: function (data, success, error) {
                    // 根据接口返回结果自定义成功与失败
                    if (data) {
                        success();
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
                success: function (data, next) {
                    var files = data.filename;
                    files.forEach(function(name) {
                        console.log(`http://172.29.114.86:7001/${name}`);
                    });
                    next();
                }
            });
        });
    });
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
        placeholder: 'placeholder'
    });

    new $.jqcUpload({
        el: $('.multiple'),
        url: 'http://172.29.114.86:7001/upload',
        accept: ['xlsx', 'txt', 'jpg'],
        mode: 'multiple',
        placeholder: '请选择xlsx、txt、jpg格式文件,我是placeholder'
    });
});
$JqcLoader.importComponents('com.lifeonwalden.jqc', ['textarea', 'loading']).execute(function () {
    var loading = new $.jqcLoading();
    new $.jqcTextarea({
        el: $('#textarea1')
    });
    new $.jqcTextarea({
        el: $('#textarea2'),
        beforeSave: function (value, next) {
            loading.show('保存中，2秒后关闭...');
            setTimeout(() => {
                loading.hide();
                next();
            }, 2000);
        }
    });
});
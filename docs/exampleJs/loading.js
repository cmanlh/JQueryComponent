$JqcLoader.importComponents('com.lifeonwalden.jqc', ['loading']).execute(function () {
    var loading = new $.jqcLoading();
    
    $('#btn1').click(function () {
        loading.show('我5秒后消失');
        setTimeout(function () {
            loading.hide();
        }, 5000);
    });
});
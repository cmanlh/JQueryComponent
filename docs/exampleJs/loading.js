$JqcLoader.importComponents('com.lifeonwalden.jqc', ['loading']).execute(function () {
    var loading = new $.jqcLoading();
    
    $('#btn1').click(function () {
        loading.show();
        setTimeout(function () {
            loading.hide();
        }, 5000);
    });
});
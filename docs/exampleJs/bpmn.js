$JqcLoader.importComponents('com.lifeonwalden.jqc', ['bpmn']).execute(function () {
    var bpmn = new $.jqcBpmn({
        container: '.bpmn_container'
    });
    $('.openFile').click(function () {
        bpmn.openFile();
    });
    $('.exportBpmn').click(function () {
        bpmn.exportBpmn();
    });
    $('.exportSvg').click(function () {
        bpmn.exportSvg();
    });
});
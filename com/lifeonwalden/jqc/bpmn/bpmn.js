/**
 * bpmn
 * keywords: bpmn-js bpmn2.0
 */
;(function ($) {
    const PATH = $JqcLoader.getCmpParentURL('com.lifeonwalden.jqc', 'bpmn');
    $JqcLoader.importCss(PATH.concat('css/bpmn.css'))
        .importCss(PATH.concat('css/diagram-js.css'))
        .importScript(PATH.concat('bpmn-modeler.js'))
        .importScript(PATH.concat('bpmn-navigated-viewer.js'))
        .execute(function () {
            $.jqcBpmn = function (params) {
                var _this = this;
                BpmnJS.call(this, params);
                this.init();
                this.importXML(`
                    <?xml version="1.0" encoding="UTF-8"?>
                    <bpmn2:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn2="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" xsi:schemaLocation="http://www.omg.org/spec/BPMN/20100524/MODEL BPMN20.xsd" id="sample-diagram" targetNamespace="http://bpmn.io/schema/bpmn">
                    <bpmn2:process id="Process_1" isExecutable="false">
                        <bpmn2:startEvent id="StartEvent_1"/>
                    </bpmn2:process>
                    <bpmndi:BPMNDiagram id="BPMNDiagram_1">
                        <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">
                        <bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="StartEvent_1">
                            <dc:Bounds height="36.0" width="36.0" x="412.0" y="240.0"/>
                        </bpmndi:BPMNShape>
                        </bpmndi:BPMNPlane>
                    </bpmndi:BPMNDiagram>
                    </bpmn2:definitions>
                `);
            }
            $.jqcBpmn.prototype = new BpmnJS();
            $.jqcBpmn.prototype.constructor = $.jqcBpmn;
            $.jqcBpmn.prototype.init = function () {
                var _this = this;
                this.link = $('<a>').hide();
                this.input = $('<input type="file" accept="text/bpmn">').hide();
                $('body').append(this.link, this.input);
                this.input.on('change', function (e) {
                    _this.__openFile(e.target.files[0]);
                });
                this.on('canvas.destroy', function () {
                    _this.link.remove();
                    _this.input.remove();
                });
            }
            $.jqcBpmn.prototype.exportBpmn = function () {
                var _this = this;
                this.saveXML({
                    format: true
                }, function (err, xml) {
                    var encodeData = encodeURIComponent(xml);
                    _this.link.attr({
                        'href': 'data:application/bpmn20-xml;charset=UTF-8,' + encodeData,
                        'download': 'download.bpmn'
                    });
                    setTimeout(function () {
                        _this.link[0].click();
                    }, 0);
                })
            }
            $.jqcBpmn.prototype.exportSvg = function () {
                var _this = this;
                this.saveSVG(function (err, xml) {
                    var encodeData = encodeURIComponent(xml);
                    _this.link.attr({
                        'href': 'data:application/bpmn20-xml;charset=UTF-8,' + encodeData,
                        'download': 'download.svg'
                    });
                    setTimeout(function () {
                        _this.link[0].click();
                    }, 0);
                })
            }
            $.jqcBpmn.prototype.__openFile = function (xml) {
                var _this = this;
                if (!xml) {
                    return;
                }
                var reader = new FileReader();
                reader.onload = function (e) {
                    var result = e.target.result;
                    _this.importXML(result);
                }
                reader.readAsText(xml);
            }
            $.jqcBpmn.prototype.openFile = function () {
                this.input.trigger('click');
            }


            $.jqcBpmnViewer = function (params) {
                var _this = this;
                BpmnViewer.call(this, params);
                this.init();
            }
            $.jqcBpmnViewer.prototype = new BpmnViewer();
            $.jqcBpmnViewer.prototype.constructor = $.jqcBpmnViewer;
            $.jqcBpmnViewer.prototype.init = function () {
                var _this = this;
                this.link = $('<a>').hide();
                this.input = $('<input type="file" accept="text/bpmn">').hide();
                $('body').append(this.link, this.input);
                this.input.on('change', function (e) {
                    _this.__openFile(e.target.files[0]);
                });
                this.on('canvas.destroy', function () {
                    _this.link.remove();
                    _this.input.remove();
                });
            }
            $.jqcBpmnViewer.prototype.exportBpmn = function () {
                var _this = this;
                this.saveXML({
                    format: true
                }, function (err, xml) {
                    var encodeData = encodeURIComponent(xml);
                    _this.link.attr({
                        'href': 'data:application/bpmn20-xml;charset=UTF-8,' + encodeData,
                        'download': 'download.bpmn'
                    });
                    setTimeout(function () {
                        _this.link[0].click();
                    }, 0);
                })
            }
            $.jqcBpmnViewer.prototype.exportSvg = function () {
                var _this = this;
                this.saveSVG(function (err, xml) {
                    var encodeData = encodeURIComponent(xml);
                    _this.link.attr({
                        'href': 'data:application/bpmn20-xml;charset=UTF-8,' + encodeData,
                        'download': 'download.svg'
                    });
                    setTimeout(function () {
                        _this.link[0].click();
                    }, 0);
                })
            }
            $.jqcBpmnViewer.prototype.__openFile = function (xml) {
                var _this = this;
                if (!xml) {
                    return;
                }
                var reader = new FileReader();
                reader.onload = function (e) {
                    var result = e.target.result;
                    _this.importXML(result);
                }
                reader.readAsText(xml);
            }
            $.jqcBpmnViewer.prototype.openFile = function () {
                this.input.trigger('click');
            }
        });
})(jQuery);
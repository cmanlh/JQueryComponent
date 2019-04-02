$JqcLoader.importScript('../../../../../qunit/jquery-3.1.1.js')
    .importScript('../../../../../qunit/qunit-2.1.1.js')
    .importCss('../../../../../qunit/qunit-2.1.1.css').execute(function () {
        $JqcLoader.registerModule($JqcLoader.newModule('com.lifeonwalden.jqc', '../../../../../')
            .registerComponent('charUtil'));

        $JqcLoader.importComponents('com.lifeonwalden.jqc', ['charUtil']).execute(function () {
            QUnit.test("String", function (assert) {
                var source = "加密数据处理tools";
                var _encodedString = $.charUtil.textToU64(source);
                assert.equal(1, 1, _encodedString);
                var _decodeString = $.charUtil.u64ToText(_encodedString);
                assert.equal(_decodeString, source, _decodeString);
            });

            QUnit.test("ArrayBuffer", function (assert) {
                var source = new ArrayBuffer(20);
                var view = new DataView(source);
                view.setUint32(0, 11101);
                view.setUint32(4, 11102);
                view.setUint32(8, 11103);
                view.setUint32(12, 11104);
                view.setUint32(16, 11105);

                var _encodedString = $.charUtil.byteToU64(source);
                assert.equal(1, 1, _encodedString);
                var _decodeArrayBuffer = $.charUtil.u64ToByte(_encodedString);
                var target = '';
                var decodeView = new Uint32Array(_decodeArrayBuffer);
                assert.equal(decodeView.join(), (new Uint32Array(source)).join(), (new Uint32Array(source)).join());
            });
        });
    });
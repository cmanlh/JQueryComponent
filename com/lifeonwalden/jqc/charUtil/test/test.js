$JqcLoader.importScript('../../../../../qunit/jquery-3.1.1.js')
    .importScript('../../../../../qunit/qunit-2.1.1.js')
    .importCss('../../../../../qunit/qunit-2.1.1.css').execute(function () {
        $JqcLoader.registerModule($JqcLoader.newModule('com.lifeonwalden.jqc', '../../../../../')
            .registerComponent('charUtil'));

        $JqcLoader.importComponents('com.lifeonwalden.jqc', ['charUtil']).execute(function () {
            QUnit.test("String", function (assert) {
                var source = "加密数据处理tools";
                var _encodedString = $.charUtil.encodeString(source);
                assert.equal(1, 1, _encodedString);
                var _decodeString = $.charUtil.decodeString(_encodedString);
                assert.equal(_decodeString, source, _decodeString);
            });

            QUnit.test("ArrayBuffer", function (assert) {
                var source = new ArrayBuffer(20);
                var view = new Uint32Array(source);
                view.set([11101, 11102, 11103, 11104, 11105]);
                var _encodedString = $.charUtil.encodeArrayBuffer(source);
                assert.equal(1, 1, _encodedString);
                var _decodeArrayBuffer = $.charUtil.decodeArrayBuffer(_encodedString);
                var target = '';
                var decodeView = new Uint32Array(_decodeArrayBuffer);
                assert.equal(decodeView.join(), view.join(), view.join());
            });
        });
    });
$JqcLoader.importScript('../../../../../qunit/jquery-3.1.1.js')
    .importScript('../../../../../qunit/qunit-2.1.1.js')
    .importCss('../../../../../qunit/qunit-2.1.1.css').execute(function () {
        $JqcLoader.registerModule($JqcLoader.newModule('com.lifeonwalden.jqc', '../../../../../')
            .registerComponents(['charUtil', 'crypto']));

        $JqcLoader.importComponents('com.lifeonwalden.jqc', ['crypto']).execute(function () {
            QUnit.test("String", function (assert) {
                assert.expect(2);
                let done = assert.async(2);
                $.crypto.aesGenerateKeyAsync()
                    .then(key => {
                        assert.equal(1, 1, key);
                        done();

                        $.crypto.importKeyAsync(key)
                            .then(importedKey => {
                                crypto.subtle.exportKey('raw', importedKey).then(exportedKey => {
                                    assert.equal($.charUtil.encodeArrayBuffer(exportedKey), key, $.charUtil.encodeArrayBuffer(exportedKey));
                                    done();
                                });
                            });
                    });
            });
        });
    });
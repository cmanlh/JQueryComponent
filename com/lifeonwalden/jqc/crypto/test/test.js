$JqcLoader.importScript('../../../../../qunit/jquery-3.1.1.js')
    .importScript('../../../../../qunit/qunit-2.1.1.js')
    .importCss('../../../../../qunit/qunit-2.1.1.css').execute(function () {
        $JqcLoader.registerModule($JqcLoader.newModule('com.lifeonwalden.jqc', '../../../../../')
            .registerComponents(['charUtil', 'crypto']));

        $JqcLoader.importComponents('com.lifeonwalden.jqc', ['crypto']).execute(function () {
            QUnit.test("key", function (assert) {
                assert.expect(2);
                let done = assert.async(2);
                $.crypto.aesGenerateKeyAsync()
                    .then(key => {
                        assert.equal(1, 1, key);
                        done();

                        $.crypto.importKeyAsync(key)
                            .then(importedKey => {
                                crypto.subtle.exportKey('raw', importedKey).then(exportedKey => {
                                    assert.equal($.charUtil.byteToU64(exportedKey), key, $.charUtil.byteToU64(exportedKey));
                                    done();
                                });
                            });
                    });
            });
            QUnit.test("encrypt", function (assert) {
                let text = "AES-GCM加密测试";
                let done = assert.async(2);
                $.crypto.aesGenerateKeyAsync()
                    .then(key => {
                        $.crypto.importKeyAsync(key)
                            .then(importedKey => {
                                $.crypto.encryptAesGcmAsync(importedKey, text)
                                    .then(result => {
                                        assert.equal(1, 1, result.text);
                                        done();

                                        $.crypto.decryptAesGcmAsync(importedKey, result.text, result.iv)
                                            .then(decryptedText => {
                                                assert.equal(decryptedText, text, decryptedText);
                                                done();
                                            })
                                            .catch(err => {
                                                assert.equal(1, 0, err);
                                                console.error(err);
                                                done();
                                            });
                                    });
                            });
                    });
            });
        });
    });
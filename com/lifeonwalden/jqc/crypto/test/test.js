$JqcLoader.importScript('../../../../../qunit/jquery-3.1.1.js')
    .importScript('../../../../../qunit/qunit-2.1.1.js')
    .importCss('../../../../../qunit/qunit-2.1.1.css').execute(function () {
        $JqcLoader.registerModule($JqcLoader.newModule('com.lifeonwalden.jqc', '../../../../../')
            .registerComponents(['charUtil', 'crypto']));

        $JqcLoader.importComponents('com.lifeonwalden.jqc', ['crypto']).execute(function () {
            QUnit.test("key", function (assert) {
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
            QUnit.test("AES", function (assert) {
                let text = "AES-GCM加解密测试";
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
            QUnit.test("RSA", function (assert) {
                let text = "RSA-OAEP加解密测试RSA-OAEP加RSA-OAEP加解密测试RSA-OAEP加解密测试RSA-OAEP加解密测试解密测试RSA-OAEP加解密测试RSA-OAEP加解密测试RSA-OAEP加解密测试";
                let done = assert.async(2);
                $.crypto.rsaGenerateKeyAsync()
                    .then(key => {
                        $.crypto.importKeyAsync(key.publicKey, 'spki', {
                            name: 'RSA-OAEP',
                            hash: "SHA-256",
                        }, ['encrypt'])
                            .then(importedPublicKey => {
                                $.crypto.encryptRsaAsync(importedPublicKey, text)
                                    .then(encryptedText => {
                                        assert.equal(1, 1, encryptedText);
                                        done();

                                        $.crypto.importKeyAsync(key.privateKey, 'pkcs8', {
                                            name: 'RSA-OAEP',
                                            modulusLength: 2048,
                                            publicExponent: new Uint8Array([1, 0, 1]),
                                            hash: "SHA-256",
                                        }, ['decrypt'])
                                            .then(importedPrivate => {
                                                $.crypto.decryptRsaAsync(importedPrivate, encryptedText)
                                                    .then(decryptedText => {
                                                        assert.equal(decryptedText, text, decryptedText);
                                                        done();
                                                    })
                                                    .catch(err => {
                                                        assert.equal(1, 0, err);
                                                        done();
                                                    });
                                            })
                                            .catch(err => console.error(err));

                                    })
                                    .catch(err => console.error(err));
                            })
                            .catch(err => console.error(err));
                    })
                    .catch(err => console.error(err));
            });
            QUnit.test("digest", function (assert) {
                let done = assert.async(5);
                let text = 'SHA256信息摘要测试~a!b@c#d$e%f^c&d*e(f)h`i1j2k3l4m5l6u7v8w9x0y-z=+';
                $.crypto.digestAsync(text)
                    .then(digestAsync1 => {
                        assert.ok(digestAsync1);
                        done();

                        $.crypto.digestAsync(text)
                            .then(digestAsync2 => {
                                assert.ok(digestAsync2, digestAsync1, digestAsync2);
                                done();
                            });

                        $.crypto.digestAsync(text)
                            .then(digestAsync3 => {
                                assert.ok(digestAsync3, digestAsync1, digestAsync3);
                                done();
                            });

                        $.crypto.digestAsync(text)
                            .then(digestAsync4 => {
                                assert.ok(digestAsync4, digestAsync1, digestAsync4);
                                done();
                            });

                        $.crypto.digestAsync(text)
                            .then(digestAsync5 => {
                                assert.ok(digestAsync5, digestAsync1, digestAsync5);
                                done();
                            });
                    });
            });
        });
    });
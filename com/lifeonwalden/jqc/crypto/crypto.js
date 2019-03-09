/*
   Copyright 2018 cmanlh

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
/**
 * crypto utility
 */
(function ($) {
    $JqcLoader.importComponents('com.lifeonwalden.jqc', ['charUtil'])
        .execute(function () {
            var subtle = window.crypto.subtle;
            function ivPreprocess(iv) {
                let _iv = iv;
                if (null == _iv || (null == _iv.byteBuffer && null == _iv.text)) {
                    _iv = {};
                    _iv.byteBuffer = window.crypto.getRandomValues(new Uint8Array(12));
                    _iv.text = $.charUtil.byteToU64(_iv.byteBuffer);
                } else {
                    if (null == _iv.byteBuffer && null != _iv.text) {
                        _iv.byteBuffer = new Uint8Array($.charUtil.u64ToByte(_iv.text));
                    } else if (null != _iv.byteBuffer && null == _iv.text) {
                        _iv.text = $.charUtil.byteToU64(_iv.byteBuffer);
                    }
                }

                return _iv;
            }

            $.crypto = {
                aesGenerateKeyAsync: function (name = 'AES-GCM', size = 256, usage = ['encrypt', 'decrypt']) {
                    return new Promise((resolve, reject) => {
                        subtle.generateKey({
                            name: name,
                            length: size
                        }, true, usage).then(key => {
                            subtle.exportKey('raw', key).then(exportKey => {
                                resolve($.charUtil.byteToU64(exportKey));
                            });
                        }).catch(err => reject(err));
                    });
                },
                importKeyAsync: function (key, format = 'raw', name = 'AES-GCM', usage = ['encrypt', 'decrypt']) {
                    return new Promise((resolve, reject) => {
                        subtle.importKey(format, $.charUtil.u64ToByte(key), name, true, usage)
                            .then(importedKey => resolve(importedKey))
                            .catch(err => reject(err));
                    });
                },
                encryptAesGcmAsync: function (key, text, iv) {
                    let _iv = ivPreprocess(iv);
                    let algorithm = {
                        name: 'AES-GCM',
                        iv: _iv.byteBuffer
                    };
                    return new Promise((resolve, reject) => {
                        subtle.encrypt(algorithm, key, new Uint8Array($.charUtil.textToByte(text)))
                            .then(encrypted => resolve({
                                text: $.charUtil.byteToU64(encrypted),
                                iv: _iv
                            }))
                            .catch(err => reject(err));
                    });
                },
                decryptAesGcmAsync: function (key, text, iv) {
                    let _iv = ivPreprocess(iv);
                    let algorithm = {
                        name: 'AES-GCM',
                        iv: _iv.byteBuffer
                    };
                    return new Promise((resolve, reject) => {
                        subtle.decrypt(algorithm, key, new Uint8Array($.charUtil.u64ToByte(text)))
                            .then(decrypted => resolve($.charUtil.byteToText(new Uint8Array(decrypted))))
                            .catch(err => reject(err));
                    });
                }
            };
        });
}(jQuery));
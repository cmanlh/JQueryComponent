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
            $.crypto = {
                aesGenerateKeyAsync: function (name = 'AES-GCM', size = 256, usage = ['encrypt', 'decrypt']) {
                    return new Promise((resolve, reject) => {
                        subtle.generateKey({
                            name: name,
                            length: size
                        }, true, usage).then(key => {
                            subtle.exportKey('raw', key).then(exportKey => {
                                resolve($.charUtil.encodeArrayBuffer(exportKey));
                            });
                        }).catch(err => reject(err));
                    });
                },
                importKeyAsync: function (key, format = 'raw', name = 'AES-GCM', usage = ['encrypt', 'decrypt']) {
                    return new Promise((resolve, reject) => {
                        subtle.importKey(format, $.charUtil.decodeArrayBuffer(key), name, true, usage)
                            .then(importedKey => resolve(importedKey))
                            .catch(err => reject(err));
                    });
                }
            };
        });
}(jQuery));
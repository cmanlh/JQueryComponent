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
 * It's not standard base64 algorithm converter, just for converting text to String which can be included in JSON String
 */
(function ($) {
    const CHAR_SET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    const CHAR_MAP = {
        "A": 0,
        "B": 1,
        "C": 2,
        "D": 3,
        "E": 4,
        "F": 5,
        "G": 6,
        "H": 7,
        "I": 8,
        "J": 9,
        "K": 10,
        "L": 11,
        "M": 12,
        "N": 13,
        "O": 14,
        "P": 15,
        "Q": 16,
        "R": 17,
        "S": 18,
        "T": 19,
        "U": 20,
        "V": 21,
        "W": 22,
        "X": 23,
        "Y": 24,
        "Z": 25,
        "a": 26,
        "b": 27,
        "c": 28,
        "d": 29,
        "e": 30,
        "f": 31,
        "g": 32,
        "h": 33,
        "i": 34,
        "j": 35,
        "k": 36,
        "l": 37,
        "m": 38,
        "n": 39,
        "o": 40,
        "p": 41,
        "q": 42,
        "r": 43,
        "s": 44,
        "t": 45,
        "u": 46,
        "v": 47,
        "w": 48,
        "x": 49,
        "y": 50,
        "z": 51,
        "0": 52,
        "1": 53,
        "2": 54,
        "3": 55,
        "4": 56,
        "5": 57,
        "6": 58,
        "7": 59,
        "8": 60,
        "9": 61,
        "+": 62,
        "/": 63
    };

    $.charUtil = {
        textToByte: function (text) {
            return new TextEncoder().encode(text).buffer;
        },
        byteToText: function (buffer) {
            return new TextDecoder().decode(new Uint8Array(buffer));
        },
        byteToU64: function (buffer) {
            var target = '';
            var leftBitLength = (buffer.byteLength * 8) % 32, uint32Count = Math.floor(buffer.byteLength / 4);
            if (0 == leftBitLength) {
                let dataView = new DataView(buffer);
                for (let i = 0; i < uint32Count; i++) {
                    let val = dataView.getUint32(i * 4);
                    target = target.concat('=')
                        .concat(this.uintToU64(val));
                }
            } else {
                target = target.concat('=-'.concat(uint32Count + 2));
                if (uint32Count > 0) {
                    let dataView = new DataView(buffer.slice(0, uint32Count * 4));
                    for (let i = 0; i < uint32Count; i++) {
                        let val = dataView.getUint32(i * 4);
                        target = target.concat('=')
                            .concat(this.uintToU64(val));
                    }
                }
                new Uint8Array(buffer.slice(uint32Count * 4)).forEach(val => {
                    target = target.concat('=')
                        .concat(this.uintToU64(val));
                });
            }

            return target;
        },
        u64ToByte: function (u64Text) {
            var charArray = u64Text.split('=');
            let size = charArray.length;
            if (charArray[1].indexOf('-') > -1) {
                let uint8Index = parseInt(charArray[1].substring(1));

                let buffer = new ArrayBuffer((uint8Index - 2) * 4 + size - uint8Index);
                let dataView = new DataView(buffer);
                for (let i = 2; i < uint8Index; i++) {
                    dataView.setUint32((i - 2) * 4, this.u64ToUint(charArray[i]));
                }
                for (let k = uint8Index; k < size; k++) {
                    dataView.setUint8((uint8Index - 2) * 4 + k - uint8Index, this.u64ToUint(charArray[k]));
                }

                return buffer;
            } else {
                let buffer = new ArrayBuffer((size - 1) * 4);
                let dataView = new DataView(buffer);
                for (let i = 1; i < size; i++) {
                    dataView.setUint32((i - 1) * 4, this.u64ToUint(charArray[i]));
                }

                return buffer;
            }
        },
        textToU64: function (text) {
            var target = '';

            for (var i in text) {
                target = target.concat('=')
                    .concat(this.uintToU64(text.charCodeAt(i)));
            }

            return target;
        },
        u64ToText: function (u64Text) {
            var target = '';

            var charArray = u64Text.split('=');
            var size = charArray.length;

            for (var i = 1; i < size; i++) {
                target = target.concat(this.u64ToChar(charArray[i]));
            }

            return target;
        },
        uintToU64: function (val) {
            var buf = '',
                mask = 63;
            do {
                buf = buf.concat(CHAR_SET[val & mask]);
                val >>>= 6;
            } while (val != 0);

            return buf;
        },
        u64ToChar: function (u64) {
            var len = 0,
                val = 0;
            for (let i in u64) {
                val |= CHAR_MAP[u64[i]] << (len++ * 6);
            }

            return String.fromCodePoint(val);
        },
        u64ToUint: function (u64) {
            var len = 0,
                val = 0;
            for (let i in u64) {
                val |= CHAR_MAP[u64[i]] << (len++ * 6);
            }

            return val;
        }
    };
}(jQuery));
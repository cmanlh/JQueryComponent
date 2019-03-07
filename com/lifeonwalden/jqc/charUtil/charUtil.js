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
        encodeArrayBuffer: function (source) {
            var target = '';

            new Uint32Array(source).forEach(val => {
                target = target.concat('=')
                    .concat(this.charToU64(val));
            });

            return target;
        },
        decodeArrayBuffer: function (source) {
            var target = '';

            var charArray = source.split('=');
            var size = charArray.length;
            var buffer = new Uint32Array(size - 1);
            for (var i = 1; i < size; i++) {
                buffer[i - 1] = this.u64ToChar(charArray[i]).charCodeAt(0);
            }

            return buffer.buffer;
        },
        encodeString: function (source) {
            var target = '';

            for (var i in source) {
                target = target.concat('=')
                    .concat(this.charToU64(source.charCodeAt(i)));
            }

            return target;
        },
        decodeString: function (source) {
            var target = '';

            var charArray = source.split('=');
            var size = charArray.length;

            for (var i = 1; i < size; i++) {
                target = target.concat(this.u64ToChar(charArray[i]));
            }

            return target;
        },
        charToU64: function (val) {
            var buf = '',
                mask = 63;
            do {
                buf = buf.concat(CHAR_SET[val & mask]);
                val >>= 6;
            } while (val != 0);

            return buf;
        },
        u64ToChar: function (u64) {
            var len = 0,
                val = 0;
            for (var i in u64) {
                val += CHAR_MAP[u64[i]] << (len++ * 6);
            }

            return String.fromCharCode(val);
        }
    };
}(jQuery));
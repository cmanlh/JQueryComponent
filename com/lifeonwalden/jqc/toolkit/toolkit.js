/*
   Copyright 2017 cmanlh

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
 * author: mawenjie
 * modify time: 2018年4月18日14:24:50
 * last modify time: 2018年4月18日14:25:14
 */
(function ($) {
    /**
     *  获取数据真实类型 
     * @param {*} any 
     */
    function rawType(any) {
        var _toString = Object.prototype.toString;
        return _toString.call(any).slice(8, -1);
    }
    /**
     * 生成随机字符串
     * @param {Number} len 
     */
    function uuid(len) {
        var _len = len || 8;
        var _uuid = '';
        for (var index = 0; index <_len; index++) {
            _uuid += (Math.random() * 16 | 0).toString(16);
        }
        return _uuid;
    }
    
    $.jqcToolkit = {
        rawType: rawType,
        uuid: uuid,
    };
})(jQuery);
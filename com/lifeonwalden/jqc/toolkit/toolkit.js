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
     * 
     * @param {*} any 
     */
    function rawType(any) {
        var _toString = Object.prototype.toString;
        return _toString.call(any).slice(8, -1);
    }

    $.jqcToolkit = {
        rawType: rawType
    };
})(jQuery);
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
 * A tool to generate unique key
 */
(function ($) {
    const DAY_MILLISECONDS_SIZE = 9;
    const RANDOM_NUMBER_SIZE = 11;
    $.jqcUniqueKey = {
        /**
         * not a critical unique key generator, don't use it for global business key requirments
         * In a single application and an intraday business, only 1~2 duplicate key in 100*6000000 times
         */
        fetchIntradayKey: function () {
            var key = ''.concat(Date.now()).substr(4);
            key = key.concat(''.concat(Math.random()).substr(2, RANDOM_NUMBER_SIZE));
            return key;
        }
    };
}(jQuery));
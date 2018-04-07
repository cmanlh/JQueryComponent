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
 * format utility
 */
(function ($) {
    $.jqcFormat = {
        /**
         * This (modified) excellent number formatting method from locutus.io
         * http://locutus.io/php/strings/number_format/
         * 
         * @param float number          : the number to format
         * @param int decimals          : the number of decimal. Default is 0.
         * @param string thousands_sep  : the characer to use as a thousands separator. Default is ','.
         * @param boolean toRound       : round the number. Default is true.
         */
        number: function (_number, options) {
            var defaultOptions = {
                decimals: 0,
                decPoint: '.',
                thousandsSep: ',',
                toRound: true
            };
            var _options = $.extend(true, {}, defaultOptions, options);
            _number = (_number + '').replace(/[^0-9+\-Ee.]/g, '');
            var n = !isFinite(+_number) ? 0 : +_number;
            var prec = !isFinite(+_options.decimals) ? (_options.toRound ? 0 : 1) : (_options.toRound ? Math.abs(_options.decimals) : Math.abs(_options.decimals) + 1);
            var sep = _options.thousandsSep;
            var dec = _options.decPoint;
            var s = '';
            var toFixedFix = function (n, prec) {
                var k = Math.pow(10, prec)
                return '' + (Math.round(n * k) / k)
                    .toFixed(prec)
            }
            // @todo: for IE parseFloat(0.55).toFixed(0) = 0;
            s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.')
            if (s[0].length > 3) {
                s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep)
            }
            if ((s[1] || '').length < prec) {
                s[1] = s[1] || ''
                s[1] += new Array(prec - s[1].length + 1).join('0')
            }
            if (!_options.toRound) {
                if (1 >= (s[1] || '').length) {
                    s.pop();
                } else {
                    s[1] = s[1].substr(0, prec - 1);
                }
            }
            return s.join(dec)
        }
    };
}(jQuery));
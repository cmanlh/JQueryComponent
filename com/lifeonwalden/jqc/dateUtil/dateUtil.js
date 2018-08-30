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
 * date utility
 */
(function ($) {
    const ONE_DAY_IN_MILLISECONDS = 86400000;
    const ONE_HOUR_IN_MILLISECONDS = 3600000;
    const TIME_EXP_REGEXP = /^([-+]?\d+Y)?([-+]?\d+M)?([-+]?\d+D)?([-+]?\d+H)?$/i;

    $.jqcDateUtil = {
        toMilliSeconds: function (date, onlyKeepDate = true) {
            var _date = this.toDate(date).getTime();

            if (onlyKeepDate) {
                return _date - (_date - 57600000) % ONE_DAY_IN_MILLISECONDS;
            } else {
                return _date;
            }
        },
        toDate: function (date) {
            var _date = null;
            if (typeof (date) == 'string') {
                var _temp = isNaN(+date) ? date : +date;
                _date = new Date(_temp);
            } else if (typeof (date) == 'number') {
                _date = new Date(date);
            } else {
                _date = date;
            }

            if (_date instanceof(Date) && !isNaN(_date.valueOf())) {
                return _date;
            } else {
                throw new Error("invalid date parameter.");
            }
        },
        format: function (date, fmt) {
            var dt = this.toDate(date);
            var _fmt = fmt || 'yyyy-MM-dd';
            return formatDate(dt, _fmt);
        },
        plusHours: function (date, num, toMilliSeconds) {
            var milliseconds = this.toMilliSeconds(date) + num * ONE_HOUR_IN_MILLISECONDS;
            if (toMilliSeconds) {
                return milliseconds;
            } else {
                return new Date(milliseconds);
            }
        },
        plusDays: function (date, num, toMilliSeconds) {
            var milliseconds = this.toMilliSeconds(date) + num * ONE_DAY_IN_MILLISECONDS;
            if (toMilliSeconds) {
                return milliseconds;
            } else {
                return new Date(milliseconds);
            }
        },
        plusMonths: function (date, num, toMilliSeconds) {
            var _date = new Date(this.toMilliSeconds(date));
            _date.setMonth(_date.getMonth() + num);
            if (toMilliSeconds) {
                return _date.getTime();
            } else {
                return _date;
            }
        },
        plusYears: function (date, num, toMilliSeconds) {
            var _date = new Date(this.toMilliSeconds(date));
            _date.setFullYear(_date.getFullYear() + num);
            if (toMilliSeconds) {
                return _date.getTime();
            } else {
                return _date;
            }
        },
        plus: function (date, num, toMilliSeconds) {
            if (typeof (num) !== 'string' || $.trim(num).length == 0) {
                return null;
            }

            var timeExpPieces = num.match(TIME_EXP_REGEXP);
            if (!timeExpPieces) {
                return null;
            }

            var _date = date;
            var year = timeExpPieces[1];
            if (year) {
                _date = this.plusYears(_date, parseInt(year.substr(0, year.length - 1)));
            }
            var month = timeExpPieces[2];
            if (month) {
                _date = this.plusMonths(_date, parseInt(month.substr(0, month.length - 1)));
            }
            var day = timeExpPieces[3];
            if (day) {
                _date = this.plusDays(_date, parseInt(day.substr(0, day.length - 1)));
            }
            var hour = timeExpPieces[4];
            if (hour) {
                _date = this.plusHours(_date, parseInt(hour.substr(0, hour.length - 1)));
            }

            if (toMilliSeconds) {
                return _date.getTime();
            } else {
                return _date;
            }
        },
        diff: function (date1, date2) {
            return (this.toMilliSeconds(date2, true) - this.toMilliSeconds(date1, true)) / ONE_DAY_IN_MILLISECONDS;
        }
    };

    function formatDate(date, fmt) {
        if (!fmt) {
            throw new Error('fmt cannot null');
        }
        var o = {
            'y+': date.getFullYear(),
            'M+': date.getMonth() + 1,
            'd+': date.getDate(),
            'H+': date.getHours(),
            'm+': date.getMinutes(),
            's+': date.getSeconds(),
            'S+': date.getMilliseconds()
        };
        for (var i in o) {
            var re = new RegExp('(' + i + ')');
            if (re.exec(fmt)) {
                var m = RegExp.$1.length;
                var v = String(o[i]).slice(-m);
                while (v.length < m) {
                    v = '0' + v;
                }
                fmt = fmt.replace(RegExp.$1, v);
            }
        }
        return fmt;
    }
}(jQuery));
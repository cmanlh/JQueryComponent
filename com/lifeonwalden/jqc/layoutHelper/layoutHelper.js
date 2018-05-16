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
 * layout helper
 * 
 * @author leihuating
 * 
 */
;
(function($) {
    const
        KCODE = {
            LEFT: 37,
            UP: 38,
            RIGHT: 39,
            DOWN: 40,
            INSERT: 45,
            DELETE: 46,
            CTRL: 17
        };
    var ctrl = false;
    $.fn.extend({
        computerSize: function() {
            var selectCss = 'over',
                obj = $(this),
                textarea = $('<textarea>'),
                target = null,
                tlist = [],
                tmp;
            // 创建css样式
            $('<style>.'.concat(selectCss, '{outline: red dashed;}</style>')).appendTo('head');
            this.parent().append(textarea);
            obj.on('click', 'div', function(e) {
                if (tlist.length > 0 && !ctrl) {
                    while (tmp = tlist.pop())
                        tmp.removeClass(selectCss);
                }
                target = $(e.target).closest('div[class!=row]');
                if (!target.parent('div').hasClass('row')) {
                    target = null;
                    return;
                }
                var cstr = target.attr('class');
                if (cstr) {
                    var arr = cstr.split(' '),
                        hc = [],
                        nc = [];
                    for (v in arr) {
                        if (!arr[v].match(/^col-/)) {
                            nc.push(arr[v]);
                        } else {
                            hc.push(arr[v]);
                        }
                    }
                    if (hc.length <= 0) {
                        hc.push('col-md-1 col-lg-1');
                    }
                    target.attr('class', hc.concat(nc).join(' '));
                }
                target.addClass(selectCss);
                tlist.push(target);

                $(document).off('keydown');
                $(document).on({
                    'keydown': function(e) {
                        ctrl = false;
                        var _tlist = obj.find('.' + selectCss);
                        if (_tlist.length <= 0)
                            return;
                        var size = 0,
                            offset = 0;
                        switch (e.keyCode) {
                            case KCODE.LEFT:
                            case KCODE.DOWN:
                                size = -1;
                                break;
                            case KCODE.UP:
                            case KCODE.RIGHT:
                                size = 1;
                                break;
                            case KCODE.INSERT: // insert
                                offset = 1;
                                break;
                            case KCODE.DELETE: // delete
                                offset = -1;
                                break;
                            case KCODE.CTRL: // ctrl
                                ctrl = true;
                            default:
                                return;
                        }
                        for (var j = 0; j < _tlist.length; j++) {
                            var arr = [],
                                m, _size = size,
                                _offset = offset;
                            var _target = $(_tlist[j]);
                            var c = (_target.attr('class') || '').split(' ');
                            arr = [];
                            for (var i = 0; i < c.length; i++) {
                                m = c[i].match(/^col-/);
                                if (m) {
                                    var num = 0,
                                        mN = c[i].match(/(\d+)/);
                                    if (mN) {
                                        num = +mN[1];
                                    }
                                    if (c[i].match(/offset-/)) {
                                        _offset = offset + num;
                                    } else {
                                        _size = size + num;
                                    }
                                } else {
                                    arr.push(c[i]);
                                }
                            }

                            var cstr = '';
                            if ((size != 0 && _size > 0) || _size > 0) {
                                cstr = cstr.concat('col-md-' + _size + ' col-lg-' + _size);
                            }
                            if ((offset != 0 && _offset > 0) || _offset > 0) {
                                if (cstr) {
                                    cstr = cstr.concat(' ');
                                }
                                cstr = cstr.concat('col-md-offset-' + _offset + ' col-lg-offset-' + _offset);
                            }
                            arr.unshift(cstr);
                            _target.attr('class', arr.join(' '));
                        }
                        for (var i = 0; i < tlist.length; i++) {
                            tlist[i].removeClass(selectCss);
                        }
                        textarea.val(obj.html());
                        for (var i = 0; i < tlist.length; i++) {
                            tlist[i].addClass(selectCss);
                        }
                    },
                    'keyup': function(e) {
                        ctrl = false;
                    }
                });
            });
        }
    });
})(jQuery);
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
(function ($) {
    const KCODE = {
        LEFT: 37,
        UP: 38,
        RIGHT: 39,
        DOWN: 40,
        INSERT: 45,
        DELETE: 46,
        CTRL: 17
    }, SELECTED_CSS = 'over';
    /**
     * 去除属性内容{'属性值':[内容(以空格分隔),'']},属性值是数组
     * 去除属性{'属性值':true}
     * 可以使用正则表达式(须是全匹配)
     */
    const excludeAttrs = {
        '^class$': [SELECTED_CSS],//去除属性内容
        '^jqc.*$': true,//去除属性
    };
    let ctrl = false;
    $.fn.extend({
        computerSize: function () {
            let obj = $(this), textarea = $('<textarea>'),
                target = null, tlist = [], tmp;
            // 创建css样式
            $('<style>.'.concat(SELECTED_CSS, '{outline: red dashed;}</style>')).appendTo('head');
            this.parent().append(textarea);
            obj.off('click.layout').on('click.layout', 'div.row>div', function (e) {
                if (tlist.length > 0 && !ctrl) {
                    while (tmp = tlist.pop())
                        tmp.removeClass(SELECTED_CSS);
                }
                target = $(e.target).closest('div[class!=row]');
                if (!target.parent('div').hasClass('row')) {
                    target = null;
                    return;
                }
                if (target.hasClass(SELECTED_CSS)) {
                    target.removeClass(SELECTED_CSS);
                    return;
                }
                target.addClass(SELECTED_CSS);
                let cstr = target.attr('class');
                if (cstr) {
                    let hc = [], nc = [];
                    cstr.split(' ').forEach(function (v) {
                        if (!v.match(/^col-/)) {
                            nc.push(v);
                        } else {
                            hc.push(v);
                        }
                    });
                    if (hc.length <= 0) {
                        hc.push('col-md-1 col-lg-1');
                    }
                }
                tlist.push(target);

                $(document).off('keydown.layout keyup.layout').on({
                    'keydown.layout': function (e) {
                        let start = +new Date;
                        ctrl = false;
                        let _tlist = obj.find('.' + SELECTED_CSS);
                        if (_tlist.length <= 0)
                            return;
                        let size = 0, offset = 0;
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
                                return;
                            default:
                                return;
                        }
                        for (let j = 0; j < _tlist.length; j++) {
                            let arr = [],
                                _size = size,
                                _offset = offset;
                            let _target = $(_tlist[j]);
                            (_target.attr('class') || '').split(' ').forEach(function (c) {
                                if (c.match(/^col-/)) {
                                    let num = 0, mN = c.match(/(\d+)/);
                                    if (mN) {
                                        num = +mN[1];
                                    }
                                    if (c.match(/offset-/)) {
                                        _offset = offset + num;
                                    } else {
                                        _size = size + num;
                                    }
                                } else {
                                    arr.push(c);
                                }

                            });

                            let cstr = '';
                            if ((size && _size > 0) || _size > 0) {
                                cstr = cstr.concat(`col-md-${_size} col-lg-${_size}`);
                            }
                            if ((offset && _offset > 0) || _offset > 0) {
                                if (cstr) {
                                    cstr = cstr.concat(' ');
                                }
                                cstr = cstr.concat(`col-md-offset-${_offset} col-lg-offset-${_offset}`);
                            }
                            arr.unshift(cstr);
                            _target.attr('class', arr.join(' '));
                        }
                        let _obj = $(obj).clone();
                        _obj.find('*').each(removeProp);
                        textarea.val(_obj.html());

                        console.log('cost: ' + (+new Date - start) + '(ms)');
                    },
                    'keyup.layout': function (e) {
                        ctrl = false;
                    }
                });
            });
        }
    });

    /**
     * 去除无用的属性值
     * @param index
     * @param obj
     */
    function removeProp(index, obj) {
        let _o = $(obj), attrs = obj.attributes;
        let rm_attrs = [];
        for (let i = 0; i < attrs.length; i++) {
            let attr = attrs[i], name = attr.nodeName, value = attr.nodeValue;
            for (let p in excludeAttrs) {
                let pv = excludeAttrs[p];
                if (new RegExp(p, 'g').test(name)) {
                    if (pv === true) {
                        rm_attrs.push(name);
                    } else if ($.isArray(pv)) {
                        let attr_vals = [];
                        pv.forEach(t => {
                            value.split(' ').forEach(v => {
                                if (!new RegExp(v, 'g').test(t)) {
                                    attr_vals.push(v);
                                }
                            });
                        });
                        _o.attr(name, attr_vals.join(' '));
                    }
                }
            }
        }
        _o.removeAttr(rm_attrs.join(' '));
    }
})(jQuery);
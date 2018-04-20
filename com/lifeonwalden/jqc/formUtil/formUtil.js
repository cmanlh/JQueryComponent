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
 * form util
 *
 */
(function ($) {
    $JqcLoader.importComponents('com.lifeonwalden.jqc', ['datetimepicker', 'dateUtil', 'inputNumber', 'tip'])
        .execute(function () {

            $.datetimepicker.setLocale('zh');

            $.formUtil = {
                validate: function ($form) {
                    if (!($form && $form instanceof $)) {
                        throw new Error(`${$form} should be jQuery object`);
                    }
                },
                thwErr: function (field, msg) {
                    field.tip(msg);
                    throw new Error(msg);
                }
            };
            /**
             * init form
             *
             * if passed data, and then fill form
             *
             * @argument $form the form container
             * @argument param the setup parameter
             * @argument data the form initial data
             */
            $.formUtil.init = function ($form, param, data) {
                this.validate($form);
                _format($form);
                this.fill($form, $.extend({}, data, param));
            };

            /**
             * fill the form with data
             *
             * @argument $form the form container
             * @argument data the form initial data
             */
            $.formUtil.fill = function ($form, data = {}) {
                this.validate($form);
                //datagroup暂不格式化
                _format($form, true, false);
                var _this = this;
                var beans = collectBind($form, function (field, prop, type) {
                    if (!prop) {
                        _this.thwErr(field, 'databind属性不能为空');
                    }
                });
                for (var i in beans) {
                    _fillField(beans[i], data);
                }
                var beanMap = collectGroupBind($form);
                for (var prop in beanMap) {
                    var groups = beanMap[prop];
                    var fields = [];
                    for (var g in groups) {
                        var group = groups[g], gf = group.target;
                        fields.push(gf);
                    }

                    var vals = deCahin(prop, data) || [];
                    while (vals.length > fields.length) {
                        var cloneNode = fields[0].clone();
                        fields[fields.length - 1].after(cloneNode);
                        fields.push(cloneNode);
                    }
                    //vals.length==fields.length
                    for (var i in fields) {
                        fields[i].find(':input').each(function (idx, obj) {
                            var f = $(obj), type = ($.trim(f.attr('datatype')) || $.trim(f.attr('type')) || 'string').toLowerCase();
                            _formatField(f);
                            _fillField(new Bean(f, $.trim(f.attr('name')), type), vals[i]);
                        });
                    }
                }
            };

            $.formUtil.fetch = function ($form) {
                this.validate($form);
                var data = {}, _this = this;
                var beans = collectBind($form, function (field, prop, dataType) {
                    if (0 == prop.length) {
                        _this.thwErr(field, field.attr('id') + ' databind属性为空');
                    }
                    if (field.attr('required') && !$.trim(field.val())) {
                        _this.thwErr(field, '必填字段，请输入相应的数据。');
                    }
                });
                //databind
                data = wrapBeanToData(beans);//data 不会为null
                //datagroup
                var beanMap = collectGroupBind($form, function (field) {
                    if (field.attr('required') && !$.trim(field.val())) {
                        _this.thwErr(field, '必填字段，请输入相应的数据。');
                    }
                });
                for (var prop in beanMap) {//beanMap[prop]={[target:xx,beans:xx]}
                    var groupBeans = beanMap[prop];
                    for (var i in groupBeans) {//groupBeans[i]是一个数组
                        var gp = groupBeans[i];
                        (data[prop] = data[prop] || []).push(wrapBeanToData(gp.beans));
                    }
                }

                return data;
            };

            function Bean(target, prop, type) {
                this.target = target;
                this.prop = prop;
                this.type = type;
            }

            Bean.prototype.getProp = function () {
                return this.prop;
            };
            Bean.prototype.getTarget = function () {
                return this.target;
            };
            Bean.prototype.getType = function () {
                return this.type;
            };

            function wrapBeanToData(beans) {
                var _this = $.formUtil;
                var data = {}, speciType = {};//保存radio、checkbox
                for (var i in beans) {
                    var bean = beans[i], field = bean.getTarget();
                    var dataType = bean.getType().toLowerCase(), prop = bean.getProp();
                    var save = true;//针对checkbox,radio
                    var _val = $.trim(field.val());
                    if (!_val) {
                        if (!(dataType == 'string' || dataType == 'text')) {
                            continue;
                        }
                    }
                    switch (dataType) {
                        case 'int':
                            _val = window.parseInt(_val);
                            if (isNaN(_val)) {
                                _this.thwErr(field, '非法值');
                            }
                            var min = $.trim(field.attr('min'));
                            var max = $.trim(field.attr('max'));
                            if ($.isNumeric(min) && window.parseInt(min) > _val) {
                                _this.thwErr(field, '允许输入的最小值为：'.concat(min));
                            }
                            if ($.isNumeric(max) && window.parseInt(max) < _val) {
                                _this.thwErr(field, '允许输入的最大值为：'.concat(max));
                            }
                            break;
                        case 'number':
                            _val = window.parseFloat(_val);
                            if (isNaN(_val)) {
                                _this.thwErr(field, '非法值');
                            }
                            var min = $.trim(field.attr('min'));
                            var max = $.trim(field.attr('max'));
                            if ($.isNumeric(min) && window.parseFloat(min) > _val) {
                                this.thwErr('允许输入的最小值为：'.concat(min));
                            }
                            if ($.isNumeric(max) && window.parseFloat(max) < _val) {
                                this.thwErr('允许输入的最大值为：'.concat(max));
                            }
                            break;
                        case 'date':
                            var fv = _val;
                            _val = new Date(_val).getTime();
                            if (!($.isNumeric(_val) && fv == $.jqcDateUtil.format(_val, 'yyyy-MM-dd'))) {
                                _this.thwErr(field, '非法日期参数，请更正');
                            }
                            break;
                        case 'string':
                        case 'text':
                            _val = _val || '';
                            break;
                        case 'radio':
                            if (field.is(':checked')) {
                                speciType[prop] = _val;
                            }
                            save = false;
                            break;
                        case 'checkbox':
                            if (field.is(':checked')) {
                                (speciType[prop] = speciType[prop] || []).push(_val);
                            }
                            save = false;
                            break;
                        default:
                            var maxlength = $.trim(field.attr('maxlength'));
                            if ($.isNumeric(maxlength) && _val.length > maxlength) {
                                _this.thwErr(field, '输入超出了允许的字符数限制，最多允许输入'.concat(maxlength).concat('个字符。'));
                            }
                    }
                    if (save)
                        Object.assign(data, enChain(prop, _val));
                }
                for (var p in speciType) {
                    Object.assign(data, enChain(p, speciType[p]));
                }
                return data;
            }

            function _formatField(field, dataType) {
                if (field.data('_formatField')) {
                    return;
                }
                if (!dataType) {
                    dataType = ($.trim(field.attr('datatype')) || $.trim(field.attr('type')) || 'string').toLowerCase();
                }
                switch (dataType) {
                    case 'int':
                        new $.jqcInputNumber({
                            element: field
                        });
                        break;
                    case 'number':
                        var dataScale = $.trim(field.attr('dataScale'));
                        if (dataScale.length <= 0) {
                            dataScale = 2;
                        }
                        new $.jqcInputNumber({
                            element: field,
                            decimals: dataScale
                        });
                        break;
                    case 'date':
                        field.datetimepicker();
                        field.attr('placeholder', 'yyyy-MM-dd');
                        break;
                    default://string do nothing
                }
                field.data('_formatField', true);
            }

            /**
             * 格式化字段
             * @param $form
             */
            function _format($form, b = true, g = true) {
                if (b)
                    collectBind($form, function (field, prop, dataType) {
                        _formatField(field, dataType);
                    });
                if (g)
                    collectGroupBind($form, function (field, prop, dataType) {
                        _formatField(field, dataType);
                    });
            }

            /**
             * 装配属性值
             * @param prop
             * @param val
             * @returns {*}
             */
            function enChain(prop, val) {
                var tmpVal = {};
                var propChain = prop.split('.');
                var size = propChain.length;
                for (var i = size - 1; i >= 0; i--) {
                    var _prop = $.trim(propChain[i]);
                    if (_prop.length > 0) {
                        tmpVal[_prop] = val;
                        val = tmpVal;
                        tmpVal = {};
                    }
                }
                return val;
            }

            /**
             * 解析字段的值
             * @param prop
             * @param data
             * @returns {*}
             */
            function deCahin(prop, data = {}) {
                var propChain = prop.split('.'), size = propChain.length;
                var val = null;
                for (var i = 0; i < size; i++) {
                    val = data[propChain[i]];
                    data = val;
                }
                return val;
            }

            /**
             * 获取datagroup属性
             * @param $form
             * @param callback
             */
            function collectGroupBind($form, callback) {
                var beanMap = {};
                $form.find('[datagroup]').each(function (idx, obj) {
                    var field = $(obj), prop = $.trim(field.attr('datagroup'));
                    var beans = [];
                    field.find(':input').each(function (i, o) {
                        var f = $(o), p = $.trim(f.attr('name')), type = ($.trim(f.attr('datatype')) || $.trim(f.attr('type')) || 'string').toLowerCase();
                        if (p) {//没有name忽略
                            if ($.type(callback) == 'function') {
                                callback(f, p, type);
                            }
                            beans.push(new Bean(f, p, type));
                        }
                    });
                    (beanMap[prop] = beanMap[prop] || []).push({target: field, beans: beans});
                });
                return beanMap;
            }

            /**
             * 获取普通databind属性
             * @param $form
             * @param callback
             * @returns {Array}
             */
            function collectBind($form, callback) {
                var beans = [];
                $form.find('[databind]').each(function (idx, obj) {
                    var field = $(obj), prop = $.trim(field.attr('databind'));
                    var dataType = ($.trim(field.attr('datatype')) || $.trim(field.attr('type')) || 'string').toLowerCase();
                    if ($.type(callback) == 'function') {
                        callback(field, prop, dataType);
                    }
                    beans.push(new Bean(field, prop, dataType));
                });
                return beans;
            }

            function _fillField(bean, data) {
                var field = bean.getTarget(), prop = bean.getProp(), dataType = bean.getType();
                var val = deCahin(prop, data);
                switch (dataType) {
                    case 'int':
                    case 'number':
                    case 'string':
                    case 'text':
                        field.val(val);
                        break;
                    case 'date':
                        if (val)
                            field.val($.jqcDateUtil.format(val, 'yyyy-MM-dd'));
                        break;
                    case 'checkbox':
                        if (val && $.type(val) == 'array') {
                            (field.get(0) || {}).checked = val.indexOf($.trim(field.val())) != -1;
                        }
                        break;
                    case 'radio':
                        if ($.trim(field.val()) == val) {
                            (field.get(0) || {}).checked = true;
                        }
                        break;
                }
            }

        });
}(jQuery));
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
    $JqcLoader.importComponents('com.lifeonwalden.jqc', ['datetimepicker', 'dateUtil', 'inputNumber', 'tip', 'lang', 'uniqueKey'])
        .execute(function () {
            $.formUtil = {};
            /**
             * format fields
             *
             * @argument $form the form container
             */
            $.formUtil.format = function ($form) {
                checkForm($form);
                _format($form);
            };

            /**
             * fill the form with data
             *
             * @argument $form the form container
             * @argument data the form initial data
             */
            $.formUtil.fill = function ($form, data = {}) {
                checkForm($form);
                //datagroup暂不格式化
                _format($form, true, false);
                var _this = this;
                bindProcess($form, false, function (field, prop, type) {
                    if (!prop) {
                        showError(field, $.jqcLang.FORM_UTIL_INVALID_DATABIND);
                    }
                    _fillField(field, prop, type, data);
                });
                var beanMap = groupBindProcess($form, true);
                beanMap.forEach((groupFields, prop, map) => {
                    var fields = [];
                    for (var i in groupFields) {
                        var groupField = groupFields[i];
                        fields.push(groupField.target);
                    }
                    var radioName = new Map();
                    fields[0].find('input[type=radio]').each(function (idx, el) {
                        radioName.set($(el).attr('name'), true);
                    });

                    var vals = decodeChain(prop, data) || [];
                    while (vals.length > fields.length) {
                        var cloneNode = fields[0].clone();
                        if (radioName.size > 0) {
                            radioName.forEach((val, key, map) => {
                                cloneNode.find('input[type=radio][name='.concat(key).concat(']')).attr('name', 'jqc'.concat($.jqcUniqueKey.fetchIntradayKey()));
                            });
                        }
                        fields[fields.length - 1].after(cloneNode);
                        fields.push(cloneNode);
                    }
                    for (var i in fields) {
                        fields[i].find('[gdatabind]').each(function (idx, obj) {
                            var f = $(obj),
                                type = ($.trim(f.attr('datatype')) || $.trim(f.attr('type')) || 'string').toLowerCase();
                            _formatField(f);
                            _fillField(f, $.trim(f.attr('gdatabind')), type, vals[i]);
                        });
                    }
                });
            };

            $.formUtil.fetch = function ($form) {
                checkForm($form);
                var data = {};
                var beans = bindProcess($form, true, function (field, prop, dataType) {
                    if (0 == prop.length) {
                        showError(field, $.jqcLang.FORM_UTIL_INVALID_DATABIND);
                    }
                    if (field.attr('required') && !$.trim(field.val())) {
                        showError(field, $.jqcLang.FORM_UTIL_INVALID_REQUIRED);
                    }
                    if (field.attr('required') && field.attr('strict') && !$.trim(field[0].value)) {
                        showError(field, $.jqcLang.FORM_UTIL_INVALID_REQUIRED);
                    }
                });
                //databind
                data = wrapBeanToData(beans); //data 不会为null

                var beanMap = groupBindProcess($form, true, function (field) {
                    if (field.attr('required') && !$.trim(field.val())) {
                        showError(field, $.jqcLang.FORM_UTIL_INVALID_REQUIRED);
                    }
                });
                beanMap.forEach((groupFields, prop, map) => {
                    for (var i in groupFields) {
                        var groupField = groupFields[i];
                        (data[prop] = data[prop] || []).push(wrapBeanToData(groupField.beans));
                    }
                });

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
                var data = {},
                    speciType = {}; //保存radio、checkbox
                for (var i in beans) {
                    var bean = beans[i],
                        field = bean.getTarget();
                    var dataType = bean.getType(),
                        prop = bean.getProp();
                    var save = true; //针对checkbox,radio
                    var _val = $.trim(field.val());
                    if (_val.length == 0 && !(dataType == 'string' || dataType == 'text')) {
                        continue;
                    }
                    switch (dataType) {
                        case 'int':
                            _val = window.parseInt(_val);
                            if (!$.isNumeric(_val)) {
                                showError(field, $.jqcLang.FORM_UTIL_INVALID_VALUE);
                            }
                            var min = $.trim(field.attr('min'));
                            if ($.isNumeric(min) && window.parseInt(min) > _val) {
                                showError(field, $.jqcLang.FORM_UTIL_INVALID_MIN.concat(min));
                            }
                            var max = $.trim(field.attr('max'));
                            if ($.isNumeric(max) && window.parseInt(max) < _val) {
                                showError(field, $.jqcLang.FORM_UTIL_INVALID_MAX.concat(max));
                            }
                            break;
                        case 'number':
                            _val = window.parseFloat(_val);
                            if (!$.isNumeric(_val)) {
                                showError(field, $.jqcLang.FORM_UTIL_INVALID_VALUE);
                            }
                            var min = $.trim(field.attr('min'));
                            if ($.isNumeric(min) && window.parseFloat(min) > _val) {
                                showError(field, $.jqcLang.FORM_UTIL_INVALID_MIN.concat(min));
                            }
                            var max = $.trim(field.attr('max'));
                            if ($.isNumeric(max) && window.parseFloat(max) < _val) {
                                showError(field, $.jqcLang.FORM_UTIL_INVALID_MAX.concat(max));
                            }
                            break;
                        case 'date':
                            try {
                                _val = $.jqcDateUtil.toMilliSeconds(_val, true);
                            } catch (err) {
                                showError(field, $.jqcLang.FORM_UTIL_INVALID_DATE);
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
                                showError(field, $.jqcLang.FORM_UTIL_INVALID_MAX_LENGTH.concat(maxlength));
                            }
                    }
                    if (save)
                        Object.assign(data, encodeChain(prop, _val));
                }
                for (var p in speciType) {
                    Object.assign(data, encodeChain(p, speciType[p]));
                }
                return data;
            }

            /**
             * 格式化字段
             * @param $form
             */
            function _format($form, databind = true, groupbind = true) {
                if (databind)
                    bindProcess($form, false, function (field, prop, dataType) {
                        _formatField(field, dataType);
                    });
                if (groupbind)
                    groupBindProcess($form, false, function (field, prop, dataType) {
                        _formatField(field, dataType);
                    });
            }

            /**
             * 组字段处理
             * 
             * 暂不支持组嵌套
             * 
             * @param {*}  
             * @param {*} collect 
             * @param {*} callback 
             */
            function groupBindProcess($form, collect = true, callback) {
                var beanMap = new Map();
                $form.find('[groupbind]').each(function (idx, obj) {
                    var groupContainer = $(obj),
                        prop = $.trim(groupContainer.attr('groupbind'));
                    var beans = [];
                    groupContainer.find('[gdatabind]').each(function (idx, obj) {
                        var field = $(obj),
                            prop = $.trim(field.attr('gdatabind')),
                            type = ($.trim(field.attr('datatype')) || $.trim(field.attr('type')) || 'string').toLowerCase();
                        if (prop) {
                            if (callback && $.type(callback) == 'function') {
                                callback(field, prop, type);
                            }
                            if (collect) {
                                beans.push(new Bean(field, prop, type));
                            }
                        }
                    });
                    if (collect) {
                        if (!beanMap.has(prop)) {
                            beanMap.set(prop, []);
                        }
                        beanMap.get(prop).push({
                            target: groupContainer,
                            beans: beans
                        });
                    }
                });
                return beanMap;
            }

            /**
             * 单字段处理
             * 
             * @param {*}  
             * @param {*} collect 
             * @param {*} callback 
             */
            function bindProcess($form, collect = true, callback) {
                var beans = [];
                $form.find('[databind]').each(function (idx, obj) {
                    var field = $(obj),
                        prop = $.trim(field.attr('databind'));
                    var dataType = ($.trim(field.attr('datatype')) || $.trim(field.attr('type')) || 'string').toLowerCase();
                    if (callback && $.type(callback) == 'function') {
                        callback(field, prop, dataType);
                    }
                    if (collect) {
                        beans.push(new Bean(field, prop, dataType));
                    }
                });

                return beans;
            }

            /**
             * 包装属性值
             * @param prop
             * @param val
             * @returns {*}
             */
            function encodeChain(prop, val) {
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
            function decodeChain(prop, data = {}) {
                var propChain = prop.split('.'),
                    size = propChain.length;
                var val = null;
                for (var i = 0; i < size; i++) {
                    val = data[propChain[i]];
                    data = val;
                }
                return val;
            }

            function _formatField(field, dataType) {
                if (field.data('_formatted')) {
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
                    case 'textnumber':
                        field.on({
                            'keyup': function () {
                                field.val((field.val() || '').replace(/\D/g, ''));
                            },
                            'paste': function (e) {
                                var val = '',
                                    original = e.originalEvent;
                                if (window.clipboardData && window.clipboardData.getData) { // IE
                                    val = window.clipboardData.getData('Text');
                                } else if (original.clipboardData && original.clipboardData.getData) {
                                    val = original.clipboardData.getData('text/plain');
                                }
                                field.val((val || '').replace(/\D/g, ''));
                                e.stopPropagation();
                            }
                        })
                        break;
                    case 'date':
                        field.datetimepicker();
                        field.attr('placeholder', 'yyyy-mm-dd');
                        break;
                    default: //string do nothing
                }
                field.data('_formatted', true);
            }

            function _fillField(field, prop, dataType, data) {
                var val = decodeChain(prop, data);
                switch (dataType) {
                    case 'date':
                        if (val) {
                            var _format = field.attr('format') || 'yyyy-MM-dd';
                            field.val($.jqcDateUtil.format(val, _format));
                        }   
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
                    default:
                        field.val(val);
                }
            }


            function checkForm($form) {
                if (!($form && $form instanceof $)) {
                    throw new Error(`${$form} should be jQuery object`);
                }
            }

            function showError(field, msg) {
                field.tip(msg);
                throw new Error(msg);
            }

        });
}(jQuery));
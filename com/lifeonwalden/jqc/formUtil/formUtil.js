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
    $JqcLoader.importComponents('com.lifeonwalden.jqc', ['datetimepicker', 'dateUtil', 'tip'])
        .execute(function () {
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
                $form.find('[databind]').each(function (idx, obj) {

                });
            };

            /**
             * fill the form with data
             *
             * @argument $form the form container
             * @argument data the form initial data
             */
            $.formUtil.fill = function ($form, data) {
                this.validate($form);
                data = data || {};
                var _this = this;
                $form.find('[databind]').each(function (idx, obj) {
                    var field = $(obj), prop = $.trim(field.attr('databind'));
                    var dataType = $.trim(field.attr('datatype')).toLowerCase();
                    if (!prop) {
                        _this.thwErr(field, 'databind属性不能为空');
                    }
                    if (!dataType) {
                        dataType = $.trim(field.attr('type')) || 'string';
                    }
                    var val = deCahin(prop, data);
                    switch (dataType) {
                        case 'int':
                        case 'number':
                        case 'date':
                        case 'string':
                        case 'text':
                            field.val(val);
                            break;
                        case 'checkbox':
                            if (val && $.type(val) == 'array') {
                                (field.get(0) || {}).checked = val.indexOf($.trim(field.val())) != -1;
                            }
                            break;
                        case 'radio':
                            if ($.trim(field.val()) == val) {
                                field.attr('checked', true);
                            }
                            break;
                    }
                });
            };

            $.formUtil.fetch = function ($form) {
                this.validate($form);
                var data = {}, _this = this;
                var speciType = {};//保存radio、checkbox
                $form.find('[databind]').each(function (idx, obj) {
                    var field = $(obj);
                    var prop = $.trim(field.attr('databind'));
                    if (0 == prop.length) {
                        _this.thwErr(field, field.attr('id') + ' databind属性为空');
                    }
                    var dataType = $.trim(field.attr('datatype'));
                    if (dataType.length <= 0) {
                        dataType = field.attr('type') || 'string';
                    }
                    dataType = dataType.toLowerCase();
                    var _val = $.trim(field.val());
                    if (_val.length <= 0) {
                        if (field.attr('required')) {
                            _this.thwErr(field, '必填字段，请输入相应的数据。');
                        } else if (dataType == 'string') {
                            _val = '';
                        } else if (dataType == 'text') {
                            _val = '';
                        } else {
                            return;
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
                        case 'radio':
                            if (field.is(':checked')) {
                                speciType[prop] = _val;
                            }
                            return;
                        case 'checkbox':
                            if (field.is(':checked')) {
                                (speciType[prop] = speciType[prop] || []).push(_val);
                            }
                            return;
                        default:
                            var maxlength = $.trim(field.attr('maxlength'));
                            if ($.isNumeric(maxlength) && _val.length > maxlength) {
                                _this.thwErr(field, '输入超出了允许的字符数限制，最多允许输入'.concat(maxlength).concat('个字符。'));
                            }
                    }
                    Object.assign(data, enChain(prop, _val));
                });
                for (var p in speciType) {
                    Object.assign(data, enChain(p, speciType[p]));
                }
                return data;
            };

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
            function deCahin(prop, data) {
                var propChain = prop.split('.'), size = propChain.length;
                var val = null;
                for (var i = 0; i < size; i++) {
                    val = data[propChain[i]];
                    data = val;
                }
                return val;
            }
        });
}(jQuery));
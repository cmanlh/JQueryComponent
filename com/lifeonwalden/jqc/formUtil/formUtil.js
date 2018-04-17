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
    $JqcLoader.importComponents('com.lifeonwalden.jqc', ['datetimepicker'])
        .execute(function () {
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

            };

            /**
             * fill the form with data
             *
             * @argument $form the form container
             * @argument data the form initial data
             */
            $.formUtil.fill = function ($form, data) {

            };

            $.formUtil.fetch = function ($form) {
                if (!($form && $form instanceof $)) {
                    throw new Error(`${$form} should be jQuery object`);
                }
                var data = {};
                var speciType={};//保存radio、checkbox
                $form.find('[databind]').each(function (idx, obj) {
                    var field = $(obj);
                    var prop = $.trim(field.attr('databind'));
                    if (0 == prop.length) {
                        throw new Error(field.attr('id') + ' databind属性为空');
                    }
                    var dataType = $.trim(field.attr('datatype'));
                    if (dataType.length <= 0) {
                        dataType = field.attr('type') || 'string';
                    }
                    dataType = dataType.toLowerCase();
                    var _val = $.trim(field.val());
                    if (_val.length <= 0) {
                        if (field.attr('required')) {
                            field.tip('必填字段，请输入相应的数据。');
                            throw new Error('必填字段无输入值');
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
                            var min = $.trim(field.attr('min'));
                            var max = $.trim(field.attr('max'));
                            if ($.isNumeric(min) && window.parseInt(min) > _val) {
                                field.tip('允许输入的最小值为：'.concat(min));
                                throw new Error('非法值');
                            }
                            if ($.isNumeric(max) && window.parseInt(max) < _val) {
                                field.tip('允许输入的最大值为：'.concat(max));
                                throw new Error('非法值');
                            }
                            break;
                        case 'number':
                            _val = window.parseFloat(_val);
                            var min = $.trim(field.attr('min'));
                            var max = $.trim(field.attr('max'));
                            if ($.isNumeric(min) && window.parseFloat(min) > _val) {
                                field.tip('允许输入的最小值为：'.concat(min));
                                throw new Error('非法值');
                            }
                            if ($.isNumeric(max) && window.parseFloat(max) < _val) {
                                field.tip('允许输入的最大值为：'.concat(max));
                                throw new Error('非法值');
                            }
                            break;
                        case 'date':
                            var fv = _val;
                            _val = new Date(_val).getTime();
                            if (!($.isNumeric(_val) && fv == $.format.data(_val, 'yyyy-MM-dd'))) {
                                field.tip('非法日期参数，请更正');
                                throw new RangeError('非法日期');
                            }
                            break;
                        case 'radio':
                            if(field.is(':checked')){
                                speciType[prop]=_val;
                            }
                            break;
                        case 'checkbox':
                            if(field.is(':checked')){
                                speciType[prop]=(speciType[prop]||[]).push(_val);
                            }
                            break;
                        default:
                            var maxlength = $.trim(field.attr('maxlength'));
                            if ($.isNumeric(maxlength) && _val.length > maxlength) {
                                field.tip('输入超出了允许的字符数限制，最多允许输入'.concat(maxlength).concat('个字符。'));
                                throw new Error('非法值');
                            }
                    }
                    Object.assign(data, enChain(prop, _val));
                });
                for(var p in speciType) {
                    Object.assign(data,enChain(p,speciType[p]));
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
        });
}(jQuery));
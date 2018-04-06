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
 * number input, support number formatting display
 * 
 */
(function ($) {
    $JqcLoader.importComponents('com.lifeonwalden.jqc', ['baseElement', 'valHooks', 'format', 'uniqueKey'])
        .execute(function () {
            $.jqcInputNumber = function (param) {
                var defaultOptions = {
                    element: null, // the jquery element for the target input,
                    decimals: 0 // the number of decimal
                };
                if (arguments.length > 0) {
                    $.jqcBaseElement.apply(this, arguments);
                }
                this.options = $.extend(true, {}, defaultOptions, param);
                this.el = this.options.element;
                this.input = this.el.get(0);
                this.typeName = 'jqcInputNumber';
                this.elementId = 'jqc'.concat($.jqcUniqueKey.fetchIntradayKey());
                this.el.attr($.jqcBaseElement.JQC_ELEMENT_TYPE, this.typeName);
                this.el.attr($.jqcBaseElement.JQC_ELEMENT_ID, this.elementId);
                $.jqcValHooksCtrl.addElement(this);

                this.currentVal = '';
                this.formatted = '';
                this.inputting = false;
                this.processing = false;

                var inputHanlder = null;
                var that = this;
                that.el.keyup(function (e) {
                    switch (e.keyCode) {
                        case $.ui.keyCode.LEFT:
                        case $.ui.keyCode.RIGHT:
                            return;
                        case $.ui.keyCode.DELETE:
                        case $.ui.keyCode.BACKSPACE:
                            if (that.formatted.indexOf('.') != -1 && that.input.value.indexOf('.') == -1) {
                                that.input.value = that.input.value.substr(0, that.input.selectionStart);
                            }
                    }

                    if (that.formatted == that.input.value) {
                        return;
                    }

                    if (that.processing) {
                        e.preventDefault();
                        return;
                    }

                    if (!that.inputting) {
                        that.inputting = true;
                    }

                    setupFormatProcessor(that);
                });
            }

            function setupFormatProcessor(that) {
                that.processing = true;

                var newValue = '';
                var newLength = that.input.value.length;
                if (newLength > 0) {
                    var cursorPosition = that.input.selectionStart,
                        realCursorPosition = 0;
                    var keepDeciaml = 0;
                    var duplicatePoint = false;
                    for (var i = 0; i < newLength; i++) {
                        var charCode = that.input.value.charCodeAt(i);
                        if (charCode > 47 && charCode < 58) {
                            if (duplicatePoint) {
                                if (keepDeciaml < that.options.decimals) {
                                    keepDeciaml++;
                                } else {
                                    break;
                                }
                            }
                            newValue = newValue.concat(that.input.value.charAt(i));

                            if (i < cursorPosition) {
                                realCursorPosition++;
                            }
                        } else if (46 == charCode || 12290 == charCode || 65294 == charCode) {
                            if (duplicatePoint) {
                                break;
                            }
                            newValue = newValue.concat('.');
                            duplicatePoint = true;
                            if (i < cursorPosition) {

                                realCursorPosition++;
                            }
                        } else if (charCode > 65295 && charCode < 65306) {
                            if (duplicatePoint) {
                                if (keepDeciaml < that.options.decimals) {
                                    keepDeciaml++;
                                } else {
                                    break;
                                }
                            }
                            newValue = newValue.concat(String.fromCharCode(charCode - 65248));

                            if (i < cursorPosition) {
                                realCursorPosition++;
                            }
                        } else if (0 == i && (45 == charCode || 65293 == charCode)) {
                            newValue = newValue.concat('-');

                            if (i < cursorPosition) {
                                realCursorPosition++;
                            }
                        }
                    }
                    that.formatted = that.input.value = $.jqcFormat.number(newValue, {
                        decimals: that.options.decimals,
                        toRound: false
                    });
                    var correctedPosition = (newValue.indexOf('.') == realCursorPosition ? that.formatted.indexOf('.') : CorrectCursorPosition(that.formatted, realCursorPosition));
                    that.input.setSelectionRange(correctedPosition, correctedPosition);
                    that.currentVal = newValue;
                } else {
                    that.currentVal = that.formatted = that.input.value = '';
                }
                that.processing = false;
                that.inputting = false;
            }

            function CorrectCursorPosition(string, position) {
                var correctedPosition = position;
                for (var i = 0, positionCounter = 0; positionCounter < position; i++) {
                    if (string.charCodeAt(i) == 44) {
                        correctedPosition++;
                    } else {
                        positionCounter++;
                    }
                }

                return correctedPosition;
            }

            $.jqcInputNumber.prototype = new $.jqcBaseElement();
            $.jqcInputNumber.prototype.constructor = $.jqcInputNumber;
            $.jqcInputNumber.prototype.updateCurrentVal = function (value) {
                if (null == value || undefined == value || value.length == 0) {
                    this.currentVal = this.formatted = '';
                } else {
                    this.formatted = $.jqcFormat.number(value, {
                        decimals: this.options.decimals,
                        toRound: false
                    });

                    var pointIdx = value.indexOf('.');
                    if (0 == this.options.decimals) {
                        this.currentVal = -1 == pointIdx ? value : value.substr(0, pointIdx);
                    } else {
                        this.currentVal = -1 == pointIdx ? value : value.substr(0, pointIdx + this.options.decimals + 1);
                    }
                }

                return this.formatted;
            };
        });
}(jQuery));
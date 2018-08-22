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
 * formToolBar
 * 
 */
(function ($) {
    $JqcLoader.importComponents('com.lifeonwalden.jqc', ['baseElement', 'uniqueKey', 'valHooks', 'selectbox'])
        .importCss($JqcLoader.getCmpParentURL('com.lifeonwalden.jqc', 'formToolBar').concat('css/formToolBar.css'))
        .execute(function () {
            const DEFAULT_OPTIONS = {
                element: null,
                conditionHtml: null,
                controlHtml: null,
                height: 50,
                background: '#fff',
                afterRender: null,
            };

            $.jqcFormToolBar = function (params) {
                var _this = this;
                this.options = Object.assign({}, DEFAULT_OPTIONS, params);
                this.el = this.options.element;
                this.status = 'fold';
                render.call(_this);
                bindEvent.call(_this);
                if (this.options.afterRender) {
                    setTimeout(function () {
                        _this.options.afterRender.call(_this);
                    }, 0);
                }
            };

            $.jqcFormToolBar.prototype = new $.jqcBaseElement();
            $.jqcFormToolBar.prototype.constructor = $.jqcFormToolBar;

            $.jqcFormToolBar.prototype.fold = function () {
                var _this = this;
                if (this.status === 'fold') {
                    return;
                }
                _this.switch.removeClass('active');
                _this.conditionBox.animate({
                    height: _this.options.height
                }, 50, function () {
                    _this.status = 'fold';
                });
            };

            $.jqcFormToolBar.prototype.spread = function () {
                var _this = this;
                if (this.status === 'spread') {
                    return;
                }
                _this.switch.addClass('active');
                _this.conditionBox.animate({
                    height: _this.height
                }, 50, function () {
                    _this.status = 'spread';
                });
            };

            $.jqcFormToolBar.prototype.resize = function () {
                var _this = this;
                // init
                this.box.removeClass('jqcFormToolBar-newline');
                this.conditionBox.removeClass('showmore-visible');
                _this.conditionBox.height('auto');
                var _height = this.box.height();
                if (_height > _this.options.height) {
                    this.box.addClass('jqcFormToolBar-newline');
                    var _conditionBox_height = this.conditionBox.height();
                    if (_conditionBox_height > this.options.height) {
                        this.height = _conditionBox_height;
                        this.conditionBox.addClass('showmore-visible').height(this.options.height);
                        this.fold();
                    }
                } else {
                    this.conditionBox.removeClass('showmore-visible');
                }
            };

            function render() {
                var _this = this;
                this.box = $('<div>')
                    .addClass('jqcFormToolBar')
                    .append(createConditionBox.call(_this))
                    .append(createControlBox.call(_this))
                    .css({
                        'background': _this.options.background,
                        'min-height': _this.options.height
                    });
                this.el.append(_this.box);
                var _height = this.box.height();
                if (_height > _this.options.height) {
                    this.box.addClass('jqcFormToolBar-newline');
                    var _conditionBox_height = this.conditionBox.height();
                    if (_conditionBox_height > this.options.height) {
                        this.conditionBox.addClass('showmore-visible').height(this.options.height);
                        this.height = _conditionBox_height;
                    }
                }
            }
            
            function createConditionBox() {
                var _this = this;
                this.conditionBox = $('<div>')
                    .addClass('jqcFormToolBar-conditionBox');
                this.switch = $('<div>')
                    .addClass('jqcFormToolBar-conditionBox-switch');
                this.conditionBox.append(this.switch);
                this.options.conditionHtml && this.conditionBox.append($(_this.options.conditionHtml));
                return this.conditionBox;
            }

            function createControlBox() {
                var _this = this;
                this.controlBox = $('<div>')
                    .addClass('jqcFormToolBar-controlBox');
                this.options.controlHtml && this.controlBox.append($(_this.options.controlHtml));
                return this.controlBox;
            }

            function createShowMore() {
                var _this = this;
                this.showMore = $('<div>')
                    .addClass('jqcFormToolBar-showMore')
                    .click(function (e) {
                        if (_this.status === 'fold') {
                            _this.spread();
                        } else {
                            _this.fold();
                        }
                    }).css('background-color', _this.options.background);
                return this.showMore;
            }

            function bindEvent() {
                var _this = this;
                $(window).resize(function () {
                    _this.resize();
                });
                this.switch.click(function () {
                    if (_this.status === 'fold') {
                        _this.spread();
                    } else {
                        _this.fold();
                    }
                })
            }
        });
}(jQuery));
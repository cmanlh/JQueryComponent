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
 * menu
 * 
 */
(function ($) {
    $JqcLoader.importComponents('com.lifeonwalden.jqc', ['baseElement', 'uniqueKey'])
        .importCss($JqcLoader.getCmpParentURL('com.lifeonwalden.jqc', 'menu').concat('css/menu.css'))
        .execute(function () {
            var $body = $('body');
            var DEFAULT_OPTIONS = {
                data: null,         //data source
                speed: 200,         //animate speed :ms
                onSelect: null,     //call back function
                defaultLabel: null, //default label
                show: false,        //auto show
                img: '',
                activeClass: 'jqcMenu-active'
            };
            $.jqcMenu = function (params) {
                this.options = $.extend(true, {}, DEFAULT_OPTIONS, params);
                this.typeName = 'jqcMenu';
                this.elementId = 'jqc'.concat($.jqcUniqueKey.fetchIntradayKey());
                this.render();
            }
            $.jqcMenu.prototype = new $.jqcBaseElement();
            $.jqcMenu.prototype.constructor = $.jqcMenu;
            $.jqcMenu.prototype.render = function () {
                var _this = this;
                this.menuBox = $('<div></div>').addClass('jqcMenuBox').css('left', -200);
                this.menuMainBtn = $('<div><span></span><span></span><span></span></div>').addClass('jqcMenu-main-btn');
                this.menuBox.attr($.jqcBaseElement.JQC_ELEMENT_TYPE, this.typeName);
                this.menuBox.attr($.jqcBaseElement.JQC_ELEMENT_ID, this.elementId);
                this.menuMainBtn.attr($.jqcBaseElement.JQC_ELEMENT_TYPE, this.typeName);
                this.menuMainBtn.attr($.jqcBaseElement.JQC_ELEMENT_ID, this.elementId);
                $body.append(_this.menuMainBtn);
                $body.append(_this.menuBox);
                if (this.options.img) {
                    this.imgBox = $('<div><img src=' + this.options.img + '></div>').addClass('jqcMenuImg2');
                } else {
                    this.imgBox = $('<div></div>').addClass('jqcMenuImg');
                }
                this.menuBox.append(_this.imgBox);
                this.menu = $('<div></div>').addClass('jqcMenuContainer');
                renderMenu(this.options.data, this.menu, this);
                this.menuBox.append(_this.menu);
                this.bindEvent();
            }
            $.jqcMenu.prototype.bindEvent = function () {
                var _this = this;
                this.menuMainBtn.click(function () {
                    _this.showMenu();
                });
                this.imgBox.click(function () {
                    _this.hideMenu();
                });
                if (this.options.show) {
                    this.menuMainBtn.trigger('click');
                }
                this.setCurrentLabel(_this.options.defaultLabel);
            }

            $.jqcMenu.prototype.showMenu = function () {
                var _this = this;
                this.menuBox.animate({
                    'left': 0
                }, _this.options.speed);
                this.menuMainBtn.hide();
                $body.animate({
                    'padding-left': 200
                }, _this.options.speed);
            };
            $.jqcMenu.prototype.hideMenu = function () {
                var _this = this;
                this.menuBox.animate({
                    'left': -200
                }, _this.options.speed);
                $body.animate({
                    'padding-left': 0
                }, _this.options.speed);
                this.menuMainBtn.show();
            }

            $.jqcMenu.prototype.setCurrentLabel = function (val) {
                var _this = this;
                if (val) {
                    this.menu.find('.isCollapes').removeClass('isCollapes');
                    var _el = this.menu.find('[label='+ val +']');
                    var _parents = _el.parentsUntil('.jqcMenuContainer').addClass('isCollapes');
                    if (_el.hasClass('hasChild')) {
                        _el.addClass('isCollapes');
                    } else {
                        _el.trigger('click');
                    }    
                }
            }
            function renderMenu(data, container, _this) {
                data.forEach(function(element) {
                    var _el = $('<div>' + element.label + '</div>');
                    _el.attr('label', element.label);
                    if (element.child) {
                        _el.addClass('hasChild');
                        _el.click(function (e) {
                            e.stopPropagation();
                            if (!$(this).hasClass('isCollapes')) {
                                $(this).siblings().removeClass('isCollapes');
                                $(this).children().removeClass('isCollapes');
                                $(this).addClass('isCollapes');
                            } else {
                                $(this).removeClass('isCollapes');
                            }
                        });
                        renderMenu(element.child, _el, _this);
                    } else {
                        _el.click(function (e) {
                            e.stopPropagation();
                            $(this).siblings().removeClass('isCollapes');
                            _this.menuBox.find('.'.concat(_this.options.activeClass)).removeClass(_this.options.activeClass);
                            $(this).addClass(_this.options.activeClass);
                            if (_this.options.onSelect) {
                                _this.options.onSelect(element);
                            }
                        });
                    }
                    container.append(_el);                    
                });
            }
        });
}(jQuery));
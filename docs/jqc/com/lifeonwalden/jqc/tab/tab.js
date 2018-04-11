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
 * Tab
 */
(function ($) {
    $JqcLoader.importComponents('com.lifeonwalden.jqc', ['baseElement', 'uniqueKey', 'lang', 'selectbox', 'zindex'])
        .importCss($JqcLoader.getCmpParentURL('com.lifeonwalden.jqc', 'tab').concat('css/tab.css'))
        .execute(function () {
            $.jqcTab = function (params) {
                const DEFAULT_OPTIONS = {
                    data: null, // menu data
                    speed: 200, //animate speed :ms
                    width: 150, // menu item width
                    position: 'fixed',
                    top: 0, // top of position
                    left: 0, // left of position
                    adapter: {
                        id: 'id',
                        label: 'label',
                        child: 'child'
                    },
                    displayed: true, // displayed after render
                    allowedConfig: false,
                    configurableMenuData: null, // configurable menu data source
                    onRemoveMenu: null, // call back for remove menu in configuration
                    onAddMenu: null, // call back for add menu in configuration
                    onSelect: null, //call back function for leaf menu be selected
                };
                if (arguments.length > 0) {
                    $.jqcBaseElement.apply(this, arguments);
                }
                this.options = $.extend(true, {}, DEFAULT_OPTIONS, params);
                this.typeName = 'jqcMenu';
                this.elementId = 'jqc'.concat($.jqcUniqueKey.fetchIntradayKey());
                if (this.options.allowedConfig) {
                    if (!this.options.data[0].hasOwnProperty(this.options.adapter.id)) {
                        throw new Error("Configuration menu require [id] property in the menu object.");
                    }
                }
                this.menuIndex = new Map();
                render.call(this);
                eventBind.call(this);
            };

            $.jqcMenu.prototype = new $.jqcBaseElement();
            $.jqcMenu.prototype.constructor = $.jqcMenu;
            $.jqcMenu.prototype.show = function () {
                if (this.options.position == 'fixed') {
                    this.container.animate({
                        left: 0
                    }, this.options.speed);
                } else {
                    this.container.fadeIn();
                }
            };
            $.jqcMenu.prototype.hide = function () {
                if (this.options.position == 'fixed') {
                    this.container.animate({
                        left: -1 * this.options.width
                    }, this.options.speed);
                } else {
                    this.container.fadeOut();
                }
            };
        });
}(jQuery));
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
 * contextmenu
 * 
 */
(function ($) {
    $JqcLoader.importComponents('com.lifeonwalden.jqc', ['baseElement', 'uniqueKey'])
        .importCss($JqcLoader.getCmpParentURL('com.lifeonwalden.jqc', 'contextmenu').concat('css/contextmenu.css'))
        .execute(function () {

            /**
             * menus数据解析，为menu数组
             * 
             * {
             *  id: optional,
             *  text : requried,
             *  valid : true, function(data) optional, default value: true
             * }
             */
            const DEFAULT_OPTIONS = {
                menus: [], // 构建菜单的数据
                max: null,
                onSelect: null,
                adapter: {
                    id: 'id',
                    text: 'text',
                    valid: 'valid'
                }
            };
            $.jqcContextMenu = function (params) {
                if (arguments.length > 0) {
                    $.jqcBaseElement.apply(this, arguments);
                }
                this.options = $.extend(true, {}, DEFAULT_OPTIONS, params);
                render.call(this);
            };

            $.jqcContextMenu.prototype = new $.jqcBaseElement();
            $.jqcContextMenu.prototype.constructor = $.jqcContextMenu;

            /**
             * 根据传入数据，弹性显示菜单项，并在菜单被选择时，将data作为参数，并上menu数据传回给onSelect
             */
            $.jqcContextMenu.prototype.show = function (data) {};

            function render() {
                this.el = $('<div>').addClass('jqcContextMenuBox');
                this.typeName = 'jqcContextMenu';
                this.elementId = 'jqc'.concat($.jqcUniqueKey.fetchIntradayKey());
                this.el.attr($.jqcBaseElement.JQC_ELEMENT_TYPE, this.typeName);
                this.el.attr($.jqcBaseElement.JQC_ELEMENT_ID, this.elementId);

                this.maxHeight = this.options.max ? this.options.max * 32 : 'auto';
                this.contextMenuFirstLevel = $('<div class="jqcContextMenuScrollBox"></div>').css('max-height', this.maxHeight);

                $('body').append(this.el);
            }
        });
}(jQuery));
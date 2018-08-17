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
 * jquery value hooks
 * 
 */
(function ($) {
    $JqcLoader.importComponents('com.lifeonwalden.jqc', ['baseElement'])
        .execute(function () {
            function JQCValHooksCtrl() {
                this.typeCache = new Map();
            }

            JQCValHooksCtrl.prototype.addElement = function (jqcElementBase) {
                var typeName = jqcElementBase.getJqcTypeName(),
                    elementId = jqcElementBase.getJqcElementId();
                if (typeName && elementId) {
                    var cache = this.typeCache.get(typeName);
                    if (!cache) {
                        cache = new Map();
                        this.typeCache.set(typeName, cache);
                    }
                    cache.set(elementId, jqcElementBase);
                } else {
                    if (typeName) {
                        throw new Error("valHooks request a jqc element id.");
                    }
                    if (elementId) {
                        throw new Error("valHooks request a jqc type name.");
                    }
                }
            };

            JQCValHooksCtrl.prototype.getElement = function (e) {
                var typeName = e.attr($.jqcBaseElement.JQC_ELEMENT_TYPE),
                    elementId = e.attr($.jqcBaseElement.JQC_ELEMENT_ID);
                if (typeName && elementId) {
                    var cache = this.typeCache.get(typeName);
                    if (cache) {
                        return cache.get(elementId);
                    }

                    return undefined;
                } else {
                    return undefined;
                }
            };

            $.jqcValHooksCtrl = new JQCValHooksCtrl();

            var origHookGet = null,
                origHookSet = null;
            if ($.isPlainObject($.valHooks.text)) {
                if ($.isFunction($.valHooks.text.get))
                    origHookGet = $.valHooks.text.get;
                if ($.isFunction($.valHooks.text.set))
                    origHookSet = $.valHooks.text.set;
            } else {
                $.valHooks.text = {};
            }

            $.valHooks.text.get = function (el) {
                var jqcElement = $.jqcValHooksCtrl.getElement($(el));
                if (jqcElement) {
                    return jqcElement.getCurrentVal();
                } else {
                    if ($.isFunction(origHookGet)) {
                        return origHookGet(el);
                    } else {
                        return undefined;
                    }
                }
            };

            $.valHooks.text.set = function (el, val) {
                var jqcElement = $.jqcValHooksCtrl.getElement($(el));
                if (jqcElement) {
                    return el.value = jqcElement.updateCurrentVal(val);
                } else {
                    if ($.isFunction(origHookSet)) {
                        return origHookSet(el, val);
                    } else {
                        return undefined;
                    }
                }
            };
        });
}(jQuery));
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
 * jqc ui base element
 * 
 */
(function ($) {
    $.jqcBaseElement = function () {
        this.typeName = null;
        this.elementId = null;
        this.currentVal = null;
        this.subElementList = [];
    }

    $.jqcBaseElement.JQC_ELEMENT_ID = "jqcElementId";
    $.jqcBaseElement.JQC_ELEMENT_TYPE = "jqcElementType";

    $.jqcBaseElement.prototype.getJqcTypeName = function () {
        return this.typeName;
    };

    $.jqcBaseElement.prototype.getJqcElementId = function () {
        return this.elementId;
    };

    $.jqcBaseElement.prototype.getCurrentVal = function () {
        return this.currentVal;
    };

    $.jqcBaseElement.prototype.updateCurrentVal = function (val) {
        this.currentVal = val;

        return this.currentVal;
    };

    $.jqcBaseElement.prototype.destroy = function () {
        this.subElementList.forEach(function (element) {
            element.destroy();
        });
    };

    $.jqcBaseElement.prototype.subElementRegister = function (element) {
        this.subElementList.push(element);
    };
}(jQuery));
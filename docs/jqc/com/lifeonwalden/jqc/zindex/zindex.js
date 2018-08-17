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
 * css zindex
 * 
 * basic framework
 * blocker
 * dialog
 * confirm
 * selectbox
 * notification
 * waiting
 */
(function ($) {
    $.jqcZindex = {};
    $.jqcZindex.menu = 50;
    $.jqcZindex.popup = 100;
    $.jqcZindex.selectbox = 300;
    $.jqcZindex.notification = 400;
    $.jqcZindex.waiting = 500;
    $.jqcZindex.notification = 550;
    $.jqcZindex.loading = 600;

    var popupZindexStack = [];
    $.jqcZindex.popupMgr = {
        fetchIndex: function () {
            do {
                var last = popupZindexStack.pop();
                if (undefined == last) {
                    break;
                } else if (last) {
                    popupZindexStack.push(true);
                    break;
                }
            } while (true);
            popupZindexStack.push(true);

            return popupZindexStack.length + $.jqcZindex.popup - 1;
        },
        returnIndex: function (zindex) {
            popupZindexStack[zindex - $.jqcZindex.popup] = false;
        },
        isTop: function (zindex) {
            if ((popupZindexStack.length + $.jqcZindex.popup - 1) == zindex) {
                return true;
            } else {
                return false;
            }
        }
    };
}(jQuery));
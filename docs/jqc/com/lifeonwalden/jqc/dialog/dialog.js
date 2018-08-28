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
 * dialog
 * 
 */
(function ($) {
    $JqcLoader.importComponents('com.lifeonwalden.jqc', ['baseElement', 'lang', 'draggable', 'resizeable', 'zindex', 'blocker'])
        .importCss($JqcLoader.getCmpParentURL('com.lifeonwalden.jqc', 'dialog').concat('css/dialog.css'))
        .execute(function () {
            function MinimizeBar(param) {
                var that = this;
                that.mgr = param.mgr;
                that.ui = $('<div class="jqcDialogMinimizeBar" style="display:none;" title="'.concat($.jqcLang.DIALOG_MAXIMUN).concat('">placeHolder</div>'));
                that.ui.css('z-index', $.jqcZindex.popup + 99);
                that.ui.on('click', function (e) {
                    that.hide();
                    if (that.index != that.mgr.onboardLength) {
                        that.mgr.onboard[that.index - 1] = false;
                        that.mgr.reLayout();
                    } else {
                        that.mgr.onboard.pop();
                    }
                    that.mgr.idle.push(that);
                    that.dialog.container.show();
                    that.dialog.minimizeBar = null;
                    that.dialog = null;
                    that.mgr.onboardLength--;
                });
                $('body').append(that.ui);

                return that;
            }

            MinimizeBar.prototype.bindDialog = function (dialog) {
                var that = this;
                that.dialog = dialog;
                that.dialog.minimizeBar = that;
                that.ui.html(dialog.options.title);
            };

            MinimizeBar.prototype.show = function () {
                var that = this;
                that.ui.show();
                // that.blink();
            };

            MinimizeBar.prototype.blink = function () {
                var that = this;
                if (true == that.isBlink) {
                    return;
                }
                that.isBlink = true;
                var oldCss = that.ui.css('box-shadow');
                var blinkChoice = ["0 0 15px red", oldCss];
                blink(that, 0, blinkChoice);
            };

            function blink(bar, times, blinkChoice) {
                if (6 == times) {
                    bar.isBlink = false;
                    return;
                }
                bar.ui.css('box-shadow', blinkChoice[times % 2]);
                setTimeout(function () {
                    blink(bar, times + 1, blinkChoice);
                }, 500);
            }

            MinimizeBar.prototype.reLayout = function (bottom, left) {
                var that = this;
                that.ui.css('bottom', bottom);
                that.ui.css('left', left);
            }

            MinimizeBar.prototype.hide = function () {
                var that = this;
                that.ui.hide();
            };

            function MinimizeBarMgr() {
                var that = this;
                var bar = new MinimizeBar({
                    mgr: that
                });
                that.idle = [];
                that.onboard = [];
                that.onboardLength = 0;
                that.idle.push(bar);

                that.barWidth = bar.ui.outerWidth();
                that.barHeight = bar.ui.outerHeight();
                that.maxColumn = Math.floor(window.innerWidth / (that.barWidth + 5));

                $(window).on('resize', function (e) {
                    var newMaxColumn = Math.floor(window.innerWidth / (that.barWidth + 5));
                    if (newMaxColumn != that.maxColumn) {
                        that.maxColumn = newMaxColumn;
                        that.reLayout();
                    }
                });

                return that;
            }

            MinimizeBarMgr.prototype.bindDialog = function (dialog) {
                var that = this;
                var bar = that.idle.pop();
                if (!bar) {
                    bar = new MinimizeBar({
                        mgr: that
                    });
                }
                that.onboardLength++;
                bar.index = that.onboardLength;
                that.onboard[bar.index - 1] = bar;

                var row = Math.floor((that.onboardLength - 1) / that.maxColumn);
                var col = Math.floor(that.onboardLength % that.maxColumn);
                var _col = 0 == col ? that.maxColumn : col;

                bar.reLayout(row * (that.barHeight + 5), (_col - 1) * (that.barWidth + 5));
                bar.bindDialog(dialog);
                bar.show();
            };

            MinimizeBarMgr.prototype.reLayout = function () {
                var that = this;
                var index = 0;
                var newOnboard = []
                that.onboard.forEach(function (e) {
                    if (e) {
                        var row = Math.floor(index / that.maxColumn);
                        var col = Math.floor((index + 1) % that.maxColumn);
                        var _col = 0 == col ? that.maxColumn : col;
                        e.index = index + 1;
                        newOnboard.push(e);
                        e.reLayout(row * (that.barHeight + 5), (_col - 1) * (that.barWidth + 5));
                        index++;
                    }
                });
                that.onboard = newOnboard;
            };

            function renderDialog(dialog) {
                dialog.title = $('<span class="jqcDialogTitle">');
                dialog.closeBtn = $('<span class="jqcDialogCloseBtn" title="'.concat($.jqcLang.DIALOG_CLOSE).concat('">'));
                dialog.minimizeBtn = $('<span class="jqcDialogMinimizeBtn" title="'.concat($.jqcLang.DIALOG_MINIMIZE).concat('">'));

                dialog.titleBar = $('<div class="jqcDialogTitleBar" title="'.concat($.jqcLang.DIALOG_MOVE).concat('">'));
                dialog.titleBar.append(dialog.title).append(dialog.closeBtn).append(dialog.minimizeBtn);

                dialog.content = $('<div class="jqcDialogContent">');

                dialog.resizeHandleE = $('<div class="jqcDialogResizeHandleE" title="resize">');

                dialog.container = $('<div class="jqcDialogContainer" style="display:none;">');
                dialog.container.append(dialog.titleBar).append(dialog.content).append(dialog.resizeHandleE).appendTo('body');
            }

            function bindEventForDialog(dialog) {
                dialog.closeBtn.on('mousedown click', function (e) {
                    dialog.close();
                });

                dialog.minimizeBtn.on('mousedown click', function (e) {
                    dialog.minimize();
                });

                dialog.titleBar.on('mousedown click', function (e) {
                    if (e.target.className.indexOf('jqcDialogTitleBar') < 0) {
                        return;
                    }
                    if (!$.jqcZindex.popupMgr.isTop(dialog.zindex)) {
                        $.jqcZindex.popupMgr.returnIndex(dialog.zindex);
                        dialog.zindex = $.jqcZindex.popupMgr.fetchIndex();
                        dialog.container.css('z-index', dialog.zindex);
                    }
                });

                new $.jqcDraggable({
                    dragHandler: dialog.titleBar,
                    movableBox: dialog.container
                });

                new $.jqcResizeable({
                    dragHandler: dialog.resizeHandleE,
                    resizeableBox: dialog.container,
                    minWidth: dialog.options.width
                });
            }

            function renderBiz(dialog) {
                dialog.title.html(dialog.options.title);
                var width = DIALOG_MIN_WIDTH;
                if (width < dialog.options.width) {
                    width = dialog.options.width;
                }
                dialog.container.width(width);
                var _position = dialog.options.position;
                var _top = 100,
                    _left = 0;
                if (typeof (_position) === 'string') {
                    switch (_position.toUpperCase()) {
                        case 'AUTO':
                        default:
                            {
                                if (width > window.innerWidth) {
                                    _left = 0;
                                } else {
                                    _left = (window.innerWidth - width) / 2;
                                }
                            }
                    }
                } else {
                    _top = _position.top;
                    _left = _position.left;
                }
                dialog.container.css('top', _top);
                dialog.container.css('left', _left);
                dialog.content.html(dialog.options.content);
                dialog.content.css("max-height", $.jqcDialog.getContainerMaxHeight() + 5);
                if (dialog.container.outerHeight() > window.innerHeight) {
                    dialog.heightOverflow = true;
                    dialog.content.height($.jqcDialog.getContainerMaxHeight() + 5);
                }
                if (dialog.options.modal) {
                    dialog.modalBox = new $.jqcBlocker();
                    dialog.modalBox.addListener('click.dialog', function (e) {
                        if (dialog.minimizeBar) {
                            // dialog.minimizeBar.blink();
                        }
                    });
                }
            }

            var DIALOG_DEFAULT_OPTIONS = {
                modal: true, // is it a modal box. Default is true
                position: 'auto',
                width: 680,
                content: null, // content that appended to dialog
                title: null, // dialog title
                beforeClose: null, // callback before dialog close
                afterClose: null, // callback after dialog close
                beforeOpen: null, // callback before dialog open
                afterOpen: null // callback after dialog open
            };
            const DIALOG_CACHE = [];
            const minimizeBarMgr = new MinimizeBarMgr();
            const DIALOG_MIN_WIDTH = 350;

            $.jqcDialog = function (param) {
                var that = DIALOG_CACHE.pop();
                if (!that) {
                    if (arguments.length > 0) {
                        $.jqcBaseElement.apply(this, arguments);
                    }

                    var that = this;
                    that.options = $.extend(true, {}, DIALOG_DEFAULT_OPTIONS, param);
                    renderDialog(that);
                    bindEventForDialog(that);
                } else {
                    that.options = $.extend(true, {}, DIALOG_DEFAULT_OPTIONS, param);
                }
                renderBiz(that);

                return that;
            };

            $.jqcDialog.prototype = new $.jqcBaseElement();
            $.jqcDialog.prototype.constructor = $.jqcDialog;

            $.jqcDialog.prototype.open = function (param) {
                var that = this;
                if (that.options.beforeOpen) {
                    that.options.beforeOpen();
                }
                if (that.options.modal) {
                    that.modalBox.show();
                }
                that.zindex = $.jqcZindex.popupMgr.fetchIndex();
                that.container.css('z-index', that.zindex);
                that.container.fadeIn();
                if (that.options.afterOpen) {
                    that.options.afterOpen();
                }
            };

            $.jqcDialog.prototype.close = function (param) {
                var that = this;
                if (that.options.beforeClose) {
                    that.options.beforeClose();
                }
                that.container.hide();
                that.content.height('');
                that.heightOverflow = false;
                $.jqcZindex.popupMgr.returnIndex(that.zindex);
                if (that.options.modal) {
                    that.modalBox.close();
                }
                DIALOG_CACHE.push(that);
                if (that.options.afterClose) {
                    that.options.afterClose();
                }
            };

            $.jqcDialog.prototype.minimize = function (param) {
                var that = this;
                that.container.hide();
                minimizeBarMgr.bindDialog(that);
            };

            $.jqcDialog.prototype.getContainer = function (param) {
                var that = this;
                return that.content;
            };

            $.jqcDialog.getContainerMaxHeight = function () {
                return window.innerHeight - 60;
            };
        });
}(jQuery));
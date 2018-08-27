/**
 * confirm
 * 
 */
;(function ($) {
    $JqcLoader.importCss($JqcLoader.getCmpParentURL('com.lifeonwalden.jqc', 'confirm').concat('css/confirm.css'))
        .execute(function () {
            var T = $.jqcToolkit;
            var $body = $('body');
            const DEFAULT_OPTIONS = {
                width: 400,
                title: '',
                content: '',
                onConfirm: null,
                onCancel: null,
                cancelText: '取消',
                confirmText: '确定',
                btnPosition: 'right',
                icon: 'error',
            };

            function Confirm() {

            }

            Confirm.prototype.show = function (params) {
                this.options = $.extend({}, DEFAULT_OPTIONS, params);
                this.render();
            };
            Confirm.prototype.render = function () {
                if (this.mask && this.mask instanceof jQuery) {
                    this.mask.remove();
                }
                this.container = $('<div>').addClass('jqcConfirm-container').width(this.options.width);
                if (!this.options.icon) {
                    this.container.addClass('no-icon')
                } else {
                    this.container.addClass(this.options.icon);
                }
                if (this.options.title) {
                    var _title = $('<div>').addClass('jqcConfirm-title').text(this.options.title);
                    this.container.append(_title);
                }
                if (this.options.content) {
                    var _content = $('<div>').addClass('jqcConfirm-content').append(this.options.content);
                    this.container.append(_content);
                }
                this.btnBox = $('<div>').addClass('jqcConfirm-btn-box').addClass(this.options.btnPosition);
                this.cancelBtn = $('<button>').addClass('jqcConfirm-cancel-btn').text(this.options.cancelText);
                this.confirmBtn = $('<button>').addClass('jqcConfirm-confirm-btn').text(this.options.confirmText);
                this.btnBox.append(this.cancelBtn, this.confirmBtn);
                this.container.append(this.btnBox);
                this.mask = $('<div>').addClass('jqcConfirm-mask');
                this.mask.append(this.container);
                $body.append(this.mask);
                this.bindEvent();
            };
            Confirm.prototype.bindEvent = function () {
                var _this = this;
                this.cancelBtn.off();
                this.confirmBtn.off();
                this.cancelBtn.on('click', function () {
                    _this.options.onCancel && _this.options.onCancel();
                    _this.close();
                });
                this.confirmBtn.on('click', function () {
                    _this.options.onConfirm && _this.options.onConfirm();
                    _this.close();
                })
            };
            Confirm.prototype.close = function () {
                this.mask.remove();
                this.container = null;
                this.btnBox = null;
                this.cancelBtn = null;
                this.confirmBtn = null;
                this.mask = null;
                this.options = {};
            };

            var _confirm = new Confirm();
            $.jqcConfirm =  _confirm.show.bind(_confirm);
        });
})(jQuery);
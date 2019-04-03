/**
 * textarea
 */
(function ($) {
    $JqcLoader.importCss($JqcLoader.getCmpParentURL('com.lifeonwalden.jqc', 'textarea').concat('css/textarea.css'))
        .execute(function () {
            const defaultParams = {
                title: '编辑',
                placeholder: '请输入内容...',
                cancelBtnText: '取消',
                saveBtnText: '保存',
                closeByModal: false,
                beforeSave: function (value, next) {
                    next();
                }
            }
            /**
             * textarea
             */
            $.jqcTextarea = function (params) {
                Object.assign(this, defaultParams, params);
                if (!this.el || !(this.el instanceof $)) {
                    throw new Error('jqcTextarea: el参数有误！');
                }
                this.el.prop('readonly', true).css('cursor', 'text');
                bindEvent.call(this);
            }
            /**
             * 编辑
             */
            $.jqcTextarea.prototype.edit = function () {
                createEditor.call(this);
            }
            /**
             * 取消编辑
             */
            $.jqcTextarea.prototype.cancelEdit = function () {
                this.mask && this.mask.remove();
                this.mask = null;
                $(document).off('keyup.jqcTextareaESC');
            }
            /**
             * 保存编辑
             */
            $.jqcTextarea.prototype.save = function () {
                var _this = this;
                var _val = '';
                if (this.editor) {
                    _val = this.editor.val();
                }
                this.beforeSave(_val, function () {
                    _this.el.val(_val);
                    _this.cancelEdit();
                });
            }
            /**
             * 绑定事件
             */
            function bindEvent() {
                var _this = this;
                this.el.click(function (e) {
                    _this.edit();
                })
            }
            function createEditor(params) {
                var _this = this;
                $(document).off('keyup.jqcTextareaESC');
                this.mask = $('<div>').addClass('jqcTextarea-mask');
                $('body').append(this.mask);
                this.editorBox = $('<div>').addClass('jqcTextarea-editorBox');
                this.mask.append(this.editorBox);
                this.editorTitle = $('<div>').addClass('jqcTextarea-editorTitle').text(this.title);
                this.editorBox.append(this.editorTitle);
                var _val = this.el.val();
                this.editor = $('<textarea>').addClass('jqcTextarea-editor').attr('placeholder', this.placeholder).val(_val);
                this.editorBox.append(this.editor);
                this.footer = $('<div>').addClass('jqcTextarea-footer');
                this.editorBox.append(this.footer);
                this.editor.focus();
                this.cancelBtn = $('<button>').addClass('jqcTextarea-cancelBtn').text(this.cancelBtnText);
                this.saveBtn = $('<button>').addClass('jqcTextarea-saveBtn').text(this.saveBtnText);
                this.footer.append(this.cancelBtn, this.saveBtn);
                this.cancelBtn.click(function () {
                    _this.cancelEdit();
                });
                this.saveBtn.click(function () {
                    _this.save();
                });
                if (this.closeByModal) {
                    this.mask.click(function () {
                        _this.cancelEdit();
                    });
                    this.editorBox.click(function (e) {
                        e.stopPropagation();
                        _this.editor.focus();
                    });
                } else {
                    this.mask.click(function () {
                        _this.editor.focus();
                    });
                }
                $(document).on('keyup.jqcTextareaESC', function (e) {
                    if (e.keyCode == 27) {
                        _this.cancelEdit();
                    }
                });
            }
        });
}(jQuery));
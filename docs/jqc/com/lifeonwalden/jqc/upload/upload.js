/**
 * upload
 * 
 */
;
(function ($) {
    $JqcLoader.importComponents('com.lifeonwalden.jqc', ['baseElement', 'icon', 'notification'])
        .importCss($JqcLoader.getCmpParentURL('com.lifeonwalden.jqc', 'upload').concat('css/upload.css'))
        .importCss($JqcLoader.getCmpParentURL('com.lifeonwalden.jqc', 'upload').concat('css/common.css'))
        .execute(function () {
            const mimeType = {
                "image": 'image/vnd.dwg,image/vnd.dxf,image/gif,image/jp2,image/jpeg,image/png,image/vnd.svf,image/tiff',   // 常用图片兼容
                "word": 'application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document',   // word文档兼容
                "excel": 'application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',  // excel表格兼容
                "audio": "audio/*",
                "video": "video/*",
                "xlsx": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                "xltx": "application/vnd.openxmlformats-officedocument.spreadsheetml.template",
                "potx": "application/vnd.openxmlformats-officedocument.presentationml.template",
                "ppsx": "application/vnd.openxmlformats-officedocument.presentationml.slideshow",
                "pptx": "application/vnd.openxmlformats-officedocument.presentationml.presentation",
                "sldx": "application/vnd.openxmlformats-officedocument.presentationml.slide",
                "docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                "dotx": "application/vnd.openxmlformats-officedocument.wordprocessingml.template",
                "xlsm": "application/vnd.ms-excel.addin.macroEnabled.12",
                "xlsb": "application/vnd.ms-excel.sheet.binary.macroEnabled.12",
                "3gpp": "audio/3gpp, video/3gpp",
                "ac3": "audio/ac3",
                "asf": "allpication/vnd.ms-asf",
                "au": "audio/basic",
                "css": "text/css",
                "csv": "text/csv",
                "doc": "application/msword",
                "dot": "application/msword",
                "dtd": "application/xml-dtd",
                "dwg": "image/vnd.dwg",
                "dxf": "image/vnd.dxf",
                "gif": "image/gif",
                "htm": "text/html",
                "html": "text/html",
                "jp2": "image/jp2",
                "jpe": "image/jpeg",
                "jpeg": "image/jpeg",
                "jpg": "image/jpeg",
                "js": "text/javascript, application/javascript",
                "json": "application/json",
                "mp2": "audio/mpeg, video/mpeg",
                "mp3": "audio/mpeg",
                "mp4": "audio/mp4, video/mp4",
                "mpeg": "video/mpeg",
                "mpg": "video/mpeg",
                "mpp": "application/vnd.ms-project",
                "ogg": "application/ogg, audio/ogg",
                "pdf": "application/pdf",
                "png": "image/png",
                "pot": "application/vnd.ms-powerpoint",
                "pps": "application/vnd.ms-powerpoint",
                "ppt": "application/vnd.ms-powerpoint",
                "rtf": "application/rtf, text/rtf",
                "svf": "image/vnd.svf",
                "tif": "image/tiff",
                "tiff": "image/tiff",
                "txt": "text/plain",
                "wdb": "application/vnd.ms-works",
                "wps": "application/vnd.ms-works",
                "xhtml": "application/xhtml+xml",
                "xlc": "application/vnd.ms-excel",
                "xlm": "application/vnd.ms-excel",
                "xls": "application/vnd.ms-excel",
                "xlt": "application/vnd.ms-excel",
                "xlw": "application/vnd.ms-excel",
                "xml": "text/xml, application/xml",
                "zip": "aplication/zip"
            };

            const defaultParams = {
                el: '', // 容器
                url: 'upload_component_expect_url', // url
                data: {}, // 需要一起提交的数据,
                accept: [], // input accept
                mode: 'single', // 上传类型 single||multiple,
                name: 'file',
                uploadBtnText: '上传数据',
                placeholder: '',
                selectFilesText: '选取文件',
                files: [],
                maxSize: 0,
                success: function (data, next) {
                    next();
                },
                error: function (data, next) {
                    next();
                },
            };

            $.jqcUpload = function (params) {
                Object.assign(this, defaultParams, params);
                this.init();
            }
            $.jqcUpload.prototype.init = function () {
                var _this = this;
                if (!this.el || !(this.el instanceof $)) {
                    throw new Error('jqcUpload: 缺少el容器！');
                }
                this.container = $('<div>').addClass('jqcUpload-container');
                this.btn = $('<button>').addClass('jqcUpload-btn').text(this.uploadBtnText);
                this.loading = $('<i>').addClass('el-icon-loading jqcUpload-loading');
                this.btn.append(this.loading);
                this.inputMask = $('<div>').addClass('jqcUpload-input-mask');
                this.el.append(this.container);
                this.mode = this.mode.toLowerCase();
                if (this.mode === 'single') {
                    this.renderSlingleMode();
                } else if (this.mode === 'multiple') {
                    this.renderMultipleMode();
                } else {
                    throw new Error('jqcUpload: 请设置正确的mode （single,multipe）');
                }
                this.bindEvent();
            }
            $.jqcUpload.prototype.bindEvent = function () {
                var _this = this;
                // 选择文件
                this.input.change(function (e) {
                    // 单文件上传
                    if (_this.mode === 'single') {
                        _this.files = [];
                        if (this.files.length) {
                            console.log(this.files)
                            if (_this.maxSize && this.files[0].size > (_this.maxSize * 1024 * 1024)) {
                                $.jqcNotification({
                                    type: 'error',
                                    title: `所选文件大小必须小于等于${(_this.maxSize).toFixed(2)}MB`
                                });
                                $(this).val('');
                                return;
                            }
                            _this.icon.removeClass('el-icon-success').addClass('el-icon-folder');
                            _this._input.val(this.files[0].name);
                            _this.files.push(this.files[0]);
                        } else {
                            _this._input.val('');
                        }
                    } else {
                        if (this.files.length) {
                            _this.addFiles(this.files);
                        } else {

                        }
                    }
                });
                // 上传
                this.btn.click(function () {
                    if (_this.uploading) {
                        return;
                    }
                    if (!_this.files.length) {
                        $.jqcNotification({
                            type: 'error',
                            title: '请选择文件'
                        });
                        return;
                    }
                    _this.container.addClass('loading');
                    _this.uploading = true;
                    _this.input.prop('disabled', true);
                    var formData = new FormData();
                    for (var key in _this.data) {
                        if (_this.data.hasOwnProperty(key)) {
                            var value = _this.data[key];
                            formData.append(key, value);            
                        }
                    }
                    _this.files.forEach(file => {
                        if (!file.hasUpload) {
                            formData.append(_this.name, file, file.name);
                        }
                    });
                    $.ajax({
                        type: 'POST',
                        url: _this.url,
                        dataType: "json",
                        data: formData,
                        processData: false,
                        contentType: false,
                        success: function(data) {
                            _this.success && _this.success(data, () => {
                                $.jqcNotification({
                                    type: 'success',
                                    title: '上传成功'
                                });
                                if (_this.mode == 'single') {
                                    _this.icon.removeClass('el-icon-folder').addClass('el-icon-success');
                                } else {
                                    _this.files.forEach(file => {
                                        file.hasUpload = true;
                                    });
                                }
                                _this.reset();
                            });
                        },
                        error: function (data) {
                            _this.error && _this.error(data, () => {
                                $.jqcNotification({
                                    type: 'error',
                                    title: '上传失败'
                                });
                                _this.reset();
                            });
                        }
                    });
                });
                // 删除 仅多文件上传
                if (this.mode == 'multiple') {
                    this.container.on('click', '.close', function () {
                        if (_this.uploading) {
                            return;
                        }
                        var index = $(this).attr('index');
                        _this.files.splice(index, 1);
                        _this.fillFilesList();
                    });
                }
            }
            // 单文件上传
            $.jqcUpload.prototype.renderSlingleMode = function () {
                var _this = this;
                console.log('single');
                this.input = createInput(this.accept);
                this._input = $('<input>').attr('placeholder', this.placeholder).addClass('jqcUpload-file-name');
                this.icon = $('<span>').addClass('el-icon-folder');
                this.inputMask.append(this._input, this.icon, this.input);
                this.container.addClass('jqcUpload-single').append(this.inputMask, this.btn);
            }
            // 多文件上传
            $.jqcUpload.prototype.renderMultipleMode = function () {
                var _this = this;
                console.log('multiple');
                var header = $('<div>').addClass('jqcUpload-header');
                this.input = createInput(this.accept, true);
                var span = $('<span>').text(this.selectFilesText).addClass('jqcUpload-select-files');
                this.inputMask.append(span, this.input);
                header.append(this.inputMask, this.btn);
                this.container.addClass('jqcUpload-multiple').append(header);
                if (this.placeholder) {
                    var placeholder = $('<p>').addClass('jqcUpload-placeholder').text(this.placeholder);
                    this.container.append(placeholder);
                }
                this.filesList = $('<div>').addClass('jqcUpload-files-list');
                this.container.append(this.filesList);
            }
            // 多文件渲染 添加文件
            $.jqcUpload.prototype.addFiles = function (files) {
                var _this = this;
                for (var index = 0; index < files.length; index++) {
                    if (files[index].size > (_this.maxSize*1024*1024)) {
                        $.jqcNotification({
                            type: 'error',
                            title: `所选文件大小必须小于等于${(_this.maxSize).toFixed(2)}MB`,
                            content: files[index].name
                        });
                    } else {
                        this.files.unshift(files[index]);
                    }
                }
                setTimeout(function () {
                    _this.fillFilesList();
                    _this.input.val('');
                });
            }
            // 多文件渲染文件列表
            $.jqcUpload.prototype.fillFilesList = function () {
                var _this = this;
                this.filesList.empty();
                for (var index = 0; index < this.files.length; index++) {
                    var item = $('<div>').addClass('jqcUpload-files-item');
                    var icon = $('<span>').addClass('el-icon-document');
                    var p = $('<p>').text(this.files[index].name);
                    var close = $('<span>').addClass('close el-icon-').attr('index', index);
                    if (this.files[index].hasUpload) {
                        close.addClass('uploaded')
                    }
                    item.append(icon, p, close);
                    this.filesList.append(item);
                }
            }
            // reset
            $.jqcUpload.prototype.reset = function () {
                var _this = this;
                this.container.removeClass('loading');
                this.uploading = false;
                this.input.prop('disabled', false);
                if (this.mode == 'single') {
                    this.files = [];
                } else {
                    this.input.val('');
                    this.fillFilesList();
                }
            }
            // 创建input
            function createInput(accept, isMultiple) {
                var $input = $('<input type="file">').addClass('jqcUpload-input');
                if (isMultiple) {
                    $input.prop('multiple', true);
                }
                if (typeof accept == 'string') {
                    accept = [accept];
                }
                var accepts = [];
                accept.forEach(function (i) {
                    if (mimeType[i]) {
                        accepts.push(mimeType[i]);
                    }
                });
                var attrAccept = accepts.join(',');
                if (attrAccept) {
                    $input.attr('accept', attrAccept);
                }
                return $input;
            }
        });
})(jQuery);
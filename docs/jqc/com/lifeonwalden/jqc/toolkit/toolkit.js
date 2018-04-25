/**
 * author: mawenjie
 * modify time: 2018年4月18日14:24:50
 * last modify time: 2018年4月18日14:25:14
 */
(function ($) {
    /**
     *  获取数据真实类型 
     * @param {*} any 
     */
    function rawType(any) {
        var _toString = Object.prototype.toString;
        return _toString.call(any).slice(8, -1);
    }
    /**
     * 生成随机字符串
     * @param {Number} len 
     */
    function uuid(len) {
        var _len = len || 8;
        var _uuid = '';
        for (var index = 0; index <_len; index++) {
            _uuid += (Math.random() * 16 | 0).toString(16);
        }
        return _uuid;
    }
    
    $.jqcToolkit = {
        rawType: rawType,
        uuid: uuid,
    };
})(jQuery);
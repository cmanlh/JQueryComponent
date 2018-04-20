/**
 * author: mawenjie
 * modify time: 2018年4月18日14:24:50
 * last modify time: 2018年4月18日14:25:14
 */
(function ($) {
    /**
     * 
     * @param {*} any 
     */
    function rawType(any) {
        var _toString = Object.prototype.toString;
        return _toString.call(any).slice(8, -1);
    }

    $.jqcToolkit = {
        rawType: rawType
    };
})(jQuery);
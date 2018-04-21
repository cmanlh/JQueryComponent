(function ($) {
    $JqcLoader.importComponents('com.lifeonwalden.jqc', [])
        .importCss($JqcLoader.getCmpParentURL('com.lifeonwalden.jqc', 'tip').concat('css/tip.css'))
        .execute(function () {
            var tipCache = [];

            function Tip() {
                this.container = $('<div class="jqcTip"></div>');
                this.triangle = $('<div class="jqcTipTriangle"></div>');
                this.contentBlock = $('<div class="jqcTipContentBlock"><span class="jqcTipIcon"></span></div>');
                this.content = $('<span class="jqcTipContent"></span>');
                this.contentBlock.append(this.content);

                this.container.append(this.triangle);
                this.container.append(this.contentBlock);
                this.container.appendTo('body');

                this.autohideTime = 1000;
            }

            Tip.prototype.show = function (param) {
                var targetOffset = param.target.offset();
                var targetOuterHeight = param.target.outerHeight();
                var bodyWidth = $('body').width();
                var maxWidth = bodyWidth - targetOffset.left - 50;
                this.container.css('max-width', maxWidth);
                this.container.css('left', targetOffset.left);
                this.container.css('top', targetOffset.top + targetOuterHeight + 2);
                this.content.html(param.content);
                this.container.show();

                var _this = this;
                setTimeout(function () {
                    _this.container.hide();
                    tipCache.push(_this);

                }, this.autohideTime);
            };

            function fetchTipCmp() {
                var tip = tipCache.pop();
                if (!tip) {
                    tip = new Tip();
                }

                return tip;
            }

            $.fn.tip = function (msg) {
                var tip = fetchTipCmp();
                tip.show({
                    target: this,
                    content: msg
                });
            };

        });
})(jQuery);
"use strict";!function(t){$JqcLoader.importComponents("com.lifeonwalden.jqc",["baseElement","zindex"]).execute(function(){var i=[];t.jqcBlocker=function(e){var o=i.pop();if(o)return o;0<arguments.length&&t.jqcBaseElement.apply(this,arguments),(o=this).ui=t("<div style='display:none;position:fixed;background-color:#777777;opacity: 0.1;filter: alpha(opacity=10);top:0px;left:0px;'>"),t(window).on("resize.jqcBlocker",function(e){o.resize()}),t("body").append(o.ui)},t.jqcBlocker.prototype=new t.jqcBaseElement,t.jqcBlocker.prototype.constructor=t.jqcBlocker,t.jqcBlocker.prototype.resize=function(){this.ui.width(window.innerWidth),this.ui.height(window.innerHeight)},t.jqcBlocker.prototype.show=function(){var e=this;e.zidex=t.jqcZindex.popupMgr.fetchIndex(),e.ui.css("z-index",e.zidex),e.resize(),e.ui.show()},t.jqcBlocker.prototype.close=function(){var e=this;e.ui.hide(),t.jqcZindex.popupMgr.returnIndex(e.zidex),i.push(e)},t.jqcBlocker.prototype.addListener=function(e,o){this.ui.on(e,o)},t.jqcBlocker.prototype.removeListener=function(e){this.ui.off(e)}})}(jQuery);
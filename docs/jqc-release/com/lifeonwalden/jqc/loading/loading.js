"use strict";!function(e){$JqcLoader.importComponents("com.lifeonwalden.jqc",["baseElement","uniqueKey","zindex"]).importCss($JqcLoader.getCmpParentURL("com.lifeonwalden.jqc","loading").concat("css/loading.css")).execute(function(){var s,i={show:!1,width:300,height:150,speed:1};function o(t){this.options=Object.assign({},i,t),this.body=e("body"),function(){e("body").append(function(){return this.mask=e("<div>").addClass("jqcLoading-mask").css("z-index",e.jqcZindex.loading).append(function(){this.box=e("<div>").addClass("jqcLoading-body");var t=e("<div>").addClass("jqcLoading-svg-container"),s=e('<svg><circle class="jqcLoading-circle" cx="50" cy="50" r="20" fill="none"/></svg>').addClass("jqcLoading-svg").attr("viewBox","25 25 50 50");return t.append(s),this.box.append(t),this.text=e("<p>").addClass("jqcLoading-text").text(this.options.text),this.box.append(this.text),this.box}.call(this)),this.mask}.call(this))}.call(this),this.options.show&&this.show(),this.status=this.options.show?"show":"hide",this.typeName="jqcMenu",this.elementId="jqc".concat(e.jqcUniqueKey.fetchIntradayKey())}((o.prototype=new e.jqcBaseElement).constructor=o).prototype.show=function(t){if(!this.locked){this.status="show",this.mask.css("display","flex"),null!=t?this.text.text(t).show():this.text.hide(),function(){this.scrollStatus=this.body.css("overflow"),this.body.css("overflow","hidden")}.call(this)}},o.prototype.hide=function(){if(!this.locked&&"hide"!==this.status){this.status="hide",this.mask.hide(),function(){this.scrollStatus&&this.body.css("overflow",this.scrollStatus)}.call(this)}},o.prototype.lock=function(t){var s=this;this.locked=!0,t&&setTimeout(function(){s.locked=!1},t)},o.prototype.unlock=function(){this.locked=!1},e.jqcLoading=function(t){return s||(s=new o(t)),s}})}(jQuery);
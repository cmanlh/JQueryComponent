"use strict";!function(v){$JqcLoader.importComponents("com.lifeonwalden.jqc",["icon"]).importCss($JqcLoader.getCmpParentURL("com.lifeonwalden.jqc","nav").concat("css/nav.css")).execute(function(){v.jqcToolkit;var a={value:"value",label:"label",disabled:"disabled",children:"children"};function h(t){t.subContainer&&(t.subContainer.remove(),t.subContainer=void 0),v(t).removeClass("hover")}v.jqcNav=function(t){var e=Object.assign({},a,t.adapter);Object.assign(this,t,{adapter:e}),this.lock=!1,this.timer=null,this.init()},v.jqcNav.prototype.init=function(){this.render()},v.jqcNav.prototype.render=function(){var n=this,o=(this.adapter.value,this.adapter.label),s=this.adapter.children,r=this.adapter.disabled;this.container=v("<div>").addClass("jqcNav-container").css({"line-height":isNaN(n.height)?n.height:n.height+"px"}),this.el.append(this.container),this.data.forEach(function(t){var e=v("<div>").addClass("jqcNav-item"),a="";if("string"==typeof o)a=t[o];else{if("function"!=typeof o)throw new Error("jqcNav.adapter is wrong!");a=o(t)}if(e.text(a),v.isArray(t[s])){var i=v("<span>").addClass("jqcNav-icon-arrow");e.append(i),e.addClass("hasChildren")}t[r]&&e.addClass("disabled"),n.container.append(e),e.data("data",t)}),this.bindEvent()},v.jqcNav.prototype.bindEvent=function(){var c=this,d=this.adapter.children,a=this.adapter.disabled;this.container.on("mouseenter",".jqcNav-item",function(t){var e=v(this);c.reset(),e.addClass("hover");var a=e.data("data");if(a[d]){c.lock=!0;var i=e.offset(),n=e.outerHeight(),o=e.outerWidth(),s=i.left,r=i.top+n+4;window.innerWidth<s+205&&(s=s-204+o),function c(t,e,a,i){var d=this;this.adapter.value;var n=this.adapter.label;var l=this.adapter.children;var o=this.adapter.disabled;i.subContainer=v("<div>").addClass("jqcNav-subContainer").css({top:a||0,left:e||0});i.subContainer.mouseenter(function(){d.lock=!0}).mouseleave(function(){d.lock=!1,setTimeout(function(){d.lock||h(i)},50)});v("body").append(i.subContainer);t.forEach(function(s){var r=v("<div>").addClass("jqcNav-subItem");i.subContainer.append(r);var t="";if("string"==typeof n)t=s[n];else{if("function"!=typeof n)throw new Error("jqcNav.adapter is wrong!");t=n(s)}var e=v("<p>").text(t).attr("title",t);if(r.append(e),v.isArray(s[l])){var a=v("<span>").addClass("jqcNav-icon-arrow");r.append(a)}s[o]&&r.addClass("disabled"),r.data("data",s),r.mouseenter(function(){v(this).addClass("hover");var t=v(this).siblings();if(v.each(t,function(t,e){h(e)}),v.isArray(s[l])){if(this.subContainer)return;var e=r.offset(),a=(r.outerHeight(),r.outerWidth()),i=window.innerWidth,n=e.left+a+4;i<n+205&&(n=e.left-204);var o=e.top;c.call(d,s[l],n,o,r[0])}}).mouseleave(function(){v(this);setTimeout(function(){d.lock||d.reset()},50)}).click(function(){s[l]||s[o]||(d.onSelect&&d.onSelect(s),d.reset())})})}.call(c,a[d],s,r,e[0])}}).on("mouseleave",".jqcNav-item",function(t){c.lock=!1;var e=this;setTimeout(function(){c.lock||h(e)},50)}).on("click",".jqcNav-item",function(t){var e=v(this).data("data");e[a]||e[d]||(c.onSelect&&c.onSelect(e),c.reset())})},v.jqcNav.prototype.reset=function(){var t=this.container.find(".jqcNav-item");v.each(t,function(t,e){h(e)}),v("body").find(".jqcNav-subContainer").remove(),this.lock=!1}})}(jQuery);
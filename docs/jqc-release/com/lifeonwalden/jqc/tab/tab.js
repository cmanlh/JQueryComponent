"use strict";!function(s){$JqcLoader.importComponents("com.lifeonwalden.jqc",["baseElement","uniqueKey","lang"]).importCss($JqcLoader.getCmpParentURL("com.lifeonwalden.jqc","tab").concat("css/tab.css")).execute(function(){var e={element:null,position:"relative"};function n(t){this.activeOne.inactive(),this.activeOne=this.index.get(t),this.activeOne.active(),this.activeOne.getTab().parent().hasClass("jqcTabMoreContainer")&&(this.container.prepend(this.activeOne.getTab()),i.call(this))}function i(){var t=this.container.find(">.jqcTabInactive:last");t.position().left+t.outerWidth()+64<this.container.width()||(this.hasMore||(this.moreBtn.show(),this.hasMore=!0),this.moreContainer.prepend(t),i.call(this))}function a(t){this.owner=t.owner,this.id="".concat(t.id),this.isActive=!0,this.tab=s("<span>").addClass("jqcTabInactive").addClass("jqcTabActive").attr("tabId",this.id).text(t.title).attr("title",t.title),this.close=s("<span>").attr("closeId",this.id).addClass("jqcTabClose").attr("title","关闭"+t.title),this.tab.append(this.close),this.panel=s("<div>").addClass("jqcTabPanel").append(t.content),this.beforeDestroy=t.beforeDestroy,this.owner.container.prepend(this.tab),this.owner.el.append(this.panel),this.owner.index.set(this.id,this)}s.jqcTab=function(t){0<arguments.length&&s.jqcBaseElement.apply(this,arguments),this.options=s.extend(!0,{},e,t),this.typeName="jqcTab",this.elementId="jqc".concat(s.jqcUniqueKey.fetchIntradayKey()),this.el=this.options.element,this.el.attr(s.jqcBaseElement.JQC_ELEMENT_TYPE,this.typeName),this.el.attr(s.jqcBaseElement.JQC_ELEMENT_ID,this.elementId),this.el.css("position",this.options.position),this.activeOne=null,this.hasMore=!1,this.index=new Map,function(){this.container=s("<div>").addClass("jqcTabContainer"),this.moreBtn=s("<span>").addClass("jqcTabMoreBtn").attr("title",s.jqcLang.TAB_MORE_CLOSE).hide(),this.moreContainer=s("<div>").addClass("jqcTabMoreContainer").hide(),this.container.append(this.moreBtn).append(this.moreContainer),this.el.append(this.container)}.call(this),function(){var e=this;this.container.on("click.tabClose",".jqcTabClose",function(t){t.stopPropagation(),function(t){var e=this.index.get(t),i=e.getStatus();e.beforeDestroy&&"function"==typeof e.beforeDestroy&&e.beforeDestroy();e.remove();var n=this.container.find(">.jqcTabInactive:first");{if(0==n.length)return;i&&(this.activeOne=this.index.get(n.attr("tabId")),this.activeOne.active()),function t(){if(0==this.hasMore)return;var e=this.moreContainer.find(">.jqcTabInactive:first");var i=this.container.find(">.jqcTabInactive:last");if(i.position().left+i.outerWidth()+64+e.outerWidth()>=this.container.width())return;this.container.append(e);0==this.moreContainer.find(">.jqcTabInactive").length?(this.moreBtn.hide(),this.hasMore=!1):t.call(this)}.call(this)}}.call(e,s(t.target).attr("closeId"))}),this.container.on("click.tab",".jqcTabInactive",function(t){n.call(e,s(t.target).attr("tabId"))}),this.moreBtn.on("click.moreBtn",function(t){t.stopPropagation(),e.moreContainer.toggle()});var i=null;this.moreBtn.mouseenter("mouseover.tab",function(t){clearTimeout(i),e.moreContainer.show()}).mouseleave(function(){clearTimeout(i),i=setTimeout(function(){e.moreContainer.hide()},300)}),this.moreContainer.on("mouseleave.tab",function(t){var e=this;clearTimeout(i),i=setTimeout(function(){s(e).hide()},300)}).mouseenter(function(t){clearTimeout(i)})}.call(this)},s.jqcTab.prototype=new s.jqcBaseElement,s.jqcTab.prototype.constructor=s.jqcTab,s.jqcTab.prototype.add=function(t){this.index.has(t.id)?n.call(this,t.id):(this.activeOne&&this.activeOne.inactive(),this.activeOne=new a({owner:this,id:t.id,title:t.title,content:t.content,beforeDestroy:t.beforeDestroy}),i.call(this),t.afterRender&&t.afterRender(this.activeOne.getPanel()))},a.prototype.remove=function(){this.tab.remove(),this.panel.remove(),this.owner.index.delete(this.id)},a.prototype.inactive=function(){this.tab.removeClass("jqcTabActive"),this.panel.hide(),this.isActive=!1},a.prototype.active=function(){this.tab.addClass("jqcTabActive"),this.panel.fadeIn(),s.jqcEvent&&s.jqcEvent.emit("show.tab",this.id),this.isActive=!0},a.prototype.getStatus=function(){return this.isActive},a.prototype.getPanel=function(){return this.panel},a.prototype.getTab=function(){return this.tab}})}(jQuery);
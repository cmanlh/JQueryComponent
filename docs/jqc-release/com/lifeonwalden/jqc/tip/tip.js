"use strict";!function(c){$JqcLoader.importComponents("com.lifeonwalden.jqc",[]).importCss($JqcLoader.getCmpParentURL("com.lifeonwalden.jqc","tip").concat("css/tip.css")).execute(function(){var s=[];function i(){this.container=c('<div class="jqcTip"></div>'),this.triangle=c('<div class="jqcTipTriangle"></div>'),this.contentBlock=c('<div class="jqcTipContentBlock"><span class="jqcTipIcon"></span></div>'),this.content=c('<span class="jqcTipContent"></span>'),this.contentBlock.append(this.content),this.container.append(this.triangle),this.container.append(this.contentBlock),this.container.appendTo("body"),this.autohideTime=1e3}i.prototype.show=function(t){var n=t.target.offset(),i=t.target.outerHeight(),e=c("body").width()-n.left-50;this.container.css("max-width",e),this.container.css("left",n.left),this.container.css("top",n.top+i+2),this.content.html(t.content),this.container.show();var o=this;setTimeout(function(){o.container.hide(),s.push(o)},this.autohideTime)},c.fn.tip=function(t){var n;((n=s.pop())||(n=new i),n).show({target:this,content:t})}})}(jQuery);
"use strict";!function(s){$JqcLoader.importCss($JqcLoader.getCmpParentURL("com.lifeonwalden.jqc","confirm").concat("css/confirm.css")).execute(function(){s.jqcToolkit;var i=s("body"),t={width:400,title:"",content:"",onConfirm:null,onCancel:null,cancelText:"取消",confirmText:"确定",btnPosition:"right",icon:"error"};function n(){}n.prototype.show=function(n){this.options=s.extend({},t,n),this.render()},n.prototype.render=function(){if(this.mask&&this.mask instanceof jQuery&&this.mask.remove(),this.container=s("<div>").addClass("jqcConfirm-container").width(this.options.width),this.options.icon?this.container.addClass(this.options.icon):this.container.addClass("no-icon"),this.options.title){var n=s("<div>").addClass("jqcConfirm-title").text(this.options.title);this.container.append(n)}if(this.options.content){var t=s("<div>").addClass("jqcConfirm-content").append(this.options.content);this.container.append(t)}this.btnBox=s("<div>").addClass("jqcConfirm-btn-box").addClass(this.options.btnPosition),this.cancelBtn=s("<button>").addClass("jqcConfirm-cancel-btn").text(this.options.cancelText),this.confirmBtn=s("<button>").addClass("jqcConfirm-confirm-btn").text(this.options.confirmText),this.btnBox.append(this.cancelBtn,this.confirmBtn),this.container.append(this.btnBox),this.mask=s("<div>").addClass("jqcConfirm-mask"),this.mask.append(this.container),i.append(this.mask),this.bindEvent()},n.prototype.bindEvent=function(){var n=this;this.cancelBtn.off(),this.confirmBtn.off(),this.cancelBtn.on("click",function(){n.options.onCancel&&n.options.onCancel(),n.close()}),this.confirmBtn.on("click",function(){n.options.onConfirm&&n.options.onConfirm(),n.close()})},n.prototype.close=function(){this.mask.remove(),this.container=null,this.btnBox=null,this.cancelBtn=null,this.confirmBtn=null,this.mask=null,this.options={}};var o=new n;s.jqcConfirm=o.show.bind(o)})}(jQuery);
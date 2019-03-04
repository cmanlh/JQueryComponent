"use strict";!function(i){function r(t,e){var a=new Date(+t),i=h(a.getFullYear()),n=h(a.getMonth()+1),o=h(a.getDate()),r=h(a.getHours()),c=h(a.getMinutes()),s=h(a.getSeconds());return e?"".concat(i,"-").concat(n,"-").concat(o,"\n").concat(r,":").concat(c,":").concat(s):"".concat(i,"-").concat(n,"-").concat(o," ").concat(r,":").concat(c,":").concat(s)}function h(t){return t<=9?"0"+t:String(t)}function n(t,e){var a=e.value(0),i=e.coord([e.value(1),a]),n=e.coord([e.value(2),a]),o=.6*e.size([0,1])[1],r=echarts.graphic.clipRectByRect({x:i[0],y:i[1]-o/2,width:n[0]-i[0],height:o},{x:t.coordSys.x,y:t.coordSys.y,width:t.coordSys.width,height:t.coordSys.height});return r&&{type:"rect",shape:r,style:e.style()}}$JqcLoader.importComponents("com.lifeonwalden.jqc",["echarts"]).importCss($JqcLoader.getCmpParentURL("com.lifeonwalden.jqc","timeline").concat("css/timeline.css")).execute(function(){var l=["","等待","运行","暂停","完成","失败"],e=new Date,a={el:"",title:"",data:[],adapter:{name:"name",id:"id",startTime:"startTime",endTime:"endTime"},min:+e,max:+e,height:800};i.jqcTimeline=function(t){var e=Object.assign({},a.adapter,t.adapter);if(Object.assign(this,a,t,{adapter:e}),!this.el)throw new Error("jqcTimeline: el expects a jquery object.");this.init()},i.jqcTimeline.prototype.init=function(){var t=this;this.el.addClass("jqcTimeline-container"),this.el.height()||this.el.css("height",this.height),this.chart=echarts.init(this.el[0]),this.render(),i(window).resize(function(){t.resize()})},i.jqcTimeline.prototype.resize=function(){this.chart&&this.el.is(":visible")&&this.chart.resize()},i.jqcTimeline.prototype.decodeData=function(t){var i=this,n=this.adapter.id,o=this.adapter.name,r=this.adapter.startTime,c=this.adapter.endTime;this.categorys=[];var s={},h=0;this.min=+e,this.max=0,this.chartData=[],t.forEach(function(t){var e,a;i.min=i.min>t[r]?t[r]:i.min,i.max=i.max<t[c]?t[c]:i.max,null==s[t[n]]&&(s[t[n]]={index:h,color:(e=["#4668B6","#4A3878","#B8151B","#F15350","#EEBCBD","#DFB4D8","#C4A9EF","#8E95E9","#83A8FF","#A0CAF2"],a=Math.random()*e.length|0,e[a])},i.categorys.push({label:t[o]||t[n],value:t[n]}),h++),i.chartData.push({name:t[o]||t[n],value:[t[o]||t[n],+t[r],+t[c],t[c]-t[r],l[t.result]],itemStyle:{normal:{color:s[t[n]].color}}})})},i.jqcTimeline.prototype.drawChart=function(){var t=this;this.chartOption=Object.assign({grid:{bottom:"15%",left:"10%"},tooltip:{formatter:function(t){return"".concat(t.marker).concat(t.name,"\n开始时间: ").concat(r(t.value[1]),"\n结束时间: ").concat(r(t.value[2]),"\n耗时: ").concat((e=t.value[3],a=+e,i=a%1e3,n=a/1e3%60|0,o=(a%36e5/1e3-n)/60|0,"".concat(a/36e5|0,"小时").concat(o,"分").concat(n,"秒").concat(i,"毫秒")),"\n状态: ").concat(t.value[4]);var e,a,i,n,o},extraCssText:"width:175px; white-space:pre-wrap;padding:10px;opacity:0.8;background: #767FA0;box-shadow: 0 0 4px 1px rgba(235,235,235,0.80);border-radius: 2px;",axisPointer:{type:"corss",shadowStyle:{color:"#ff0000"},axis:"y"},textStyle:{fontSize:10}},title:{text:t.title},yAxis:{data:t.categorys.map(function(t){return t.label}),axisLabel:{fontSize:12,color:"#999"},axisLine:{lineStyle:{color:"#d9d9d9"}},splitLine:{lineStyle:{color:"#f2f2f2"}},axisTick:{show:!1}},xAxis:{min:+t.min,max:+t.max,scale:!0,axisLabel:{formatter:function(t,e){return r(+t,!0)},fontSize:12,color:"#999"},axisLine:{lineStyle:{color:"#d9d9d9"}},splitLine:{lineStyle:{color:"#f2f2f2"}},axisTick:{show:!1}},dataZoom:[{type:"slider",filterMode:"weakFilter",showDataShadow:!1,top:"95%",height:10,start:0,end:100,borderColor:"transparent",backgroundColor:"#d9d9d9",handleIcon:"M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7v-1.2h6.6z M13.3,22H6.7v-1.2h6.6z M13.3,19.6H6.7v-1.2h6.6z",handleSize:20,handleStyle:{shadowBlur:6,shadowOffsetX:1,shadowOffsetY:2,shadowColor:"#999"},labelFormatter:""},{type:"inside",filterMode:"weakFilter"}],series:[{type:"custom",renderItem:n,itemStyle:{normal:{opacity:.8}},encode:{x:[1,2],y:0},data:t.chartData}]},this.option),setTimeout(function(){t.chart.setOption(t.chartOption)},100)},i.jqcTimeline.prototype.render=function(t){var e=this,a=t||this.data||[];this.decodeData(a),setTimeout(function(){e.drawChart(),e.afterRender&&e.afterRender(e.categorys,e.chartOption.xAxis.min,e.chartOption.xAxis.max)},20)},i.jqcTimeline.prototype.reRender=function(t){var e=t.categorys||this.chartOption.yAxis.data,a=+t.min||this.chartOption.xAxis.min;a<this.min&&(a=+this.min);var i=+t.max||this.chartOption.xAxis.max;i>this.max&&(i=+this.max);var n=this,o=[],r=[],c={};this.chartData.forEach(function(t){-1!=e.indexOf(t.value[0])&&t.value[2]>=a&&t.value[1]<=i&&(r.push(t),c[t.value[0]]||(c[t.value[0]]=!0,o.push(t.value[0])))}),setTimeout(function(){n.chartOption.yAxis.data=o,n.chartOption.xAxis.min=a,n.chartOption.xAxis.max=i,n.chartOption.series[0].data=r,n.chart.setOption(n.chartOption)},20)}})}(jQuery);
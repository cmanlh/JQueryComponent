"use strict";!function(i){i.jqcZindex={},i.jqcZindex.menu=50,i.jqcZindex.popup=100,i.jqcZindex.selectbox=300,i.jqcZindex.notification=400,i.jqcZindex.waiting=500,i.jqcZindex.notification=550,i.jqcZindex.loading=600;var e=[];i.jqcZindex.popupMgr={fetchIndex:function(){for(;;){var n=e.pop();if(null==n)break;if(n){e.push(!0);break}}return e.push(!0),e.length+i.jqcZindex.popup-1},returnIndex:function(n){e[n-i.jqcZindex.popup]=!1},isTop:function(n){return e.length+i.jqcZindex.popup-1==n}}}(jQuery);
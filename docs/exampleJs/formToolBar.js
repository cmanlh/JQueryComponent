$JqcLoader.importComponents('com.lifeonwalden.jqc', ['formToolBar']).execute(function () {
    var bar1 = new $.jqcFormToolBar({
        element: $('#div1'),
        conditionHtml: '<div class="condition"><label><span>姓名：</span><input type="text"/></label><label><span>姓名：</span><input type="text"/></label><label><span>姓名：</span><input type="text"/></label><label><span>姓名：</span><input type="text"/></label><label><span>姓名：</span><input type="text"/></label><label><span>姓名：</span><input type="text"/></label><label><span>姓名：</span><input type="text"/></label><label><span>姓名：</span><input type="text"/></label><label><span>姓名：</span><input type="text"/></label></div>',
        controlHtml: '<div><button>测试1</button><button>测试2</button><button>测试3</button></div>'
    });

    $('.btn1').click(function () {
        bar1.spread();
    });

    $('.btn2').click(function () {
        bar1.fold();
    });

    $('.btn3').click(function () {
        var _height = $('.condition').height();
        _height = _height === 36 ? 'auto' : 36;
        $('.condition').height(_height);
        bar1.resize();
    });
});
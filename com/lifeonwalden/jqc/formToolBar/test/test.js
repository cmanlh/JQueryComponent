$JqcLoader.importScript('../../../../../qunit/jquery-3.1.1.js')
    .importScript('../../../../../qunit/version.js')
    .importScript('../../../../../qunit/keycode.js')
    .importScript('../../../../../qunit/qunit-2.1.1.js')
    .importCss('../../../../../qunit/qunit-2.1.1.css').execute(function () {
        $JqcLoader.registerModule($JqcLoader.newModule('com.lifeonwalden.jqc', '../../../../../')
            .registerComponent('baseElement')
            .registerComponent('uniqueKey')
            .registerComponent('valHooks')
            .registerComponent('pinyin')
            .registerComponent('selectbox')
            .registerComponent('formToolBar'));

        $JqcLoader.importComponents('com.lifeonwalden.jqc', ['formToolBar']).execute(function () {
            
            var a = new $.jqcFormToolBar({
                element: $('#div2'),
                height: 50,
                conditionHtml: '<div class="condition"><label><span>姓名：</span><input type="text"/></label><label><span>姓名：</span><input type="text"/></label><label><span>姓名：</span><input type="text"/></label><label><span>姓名：</span><input type="text"/></label><label><span>姓名：</span><input type="text"/></label><label><span>姓名：</span><input type="text"/></label></div>',
                // conditionHtml: '<div class="condition"><span>123</span>域我是条件区域我是条件区域我是条件区域我是条件区域我是条件区域我是条件区域</div>',
                controlHtml: '<div class="control"><button>搜索</button><button>搜索</button><button>搜索</button></div>',
                afterRender: function () {
                    // console.log(this);
                }
            });

            var b = new $.jqcFormToolBar({
                element: $('#div1'),
                conditionHtml: '<div class="condition"><label><span>姓名：</span><input type="text"/></label><label><span>姓名：</span><input type="text"/></label><label><span>姓名：</span><input type="text"/></label><label><span>姓名：</span><input type="text"/></label><label><span>姓名：</span><input type="text"/></label><label><span>姓名：</span><input type="text"/></label><label><span>姓名：</span><input type="text"/></label><label><span>姓名：</span><input type="text"/></label><label><span>姓名：</span><input type="text"/></label><label><span>姓名：</span><input type="text"/></label><label><span>姓名：</span><input type="text"/></label></div>',
                // conditionHtml: '<div class="condition"><span>123</span>域我是条件区域我是条件区域我是条件区域我是条件区域我是条件区域我是条件区域</div>',
                controlHtml: '<div class="control"><button>搜索</button><button>搜索</button><button>搜索</button></div>',
            });

            $('.btn1').click(function () {
                b.spread();
            });
            $('.btn2').click(function () {
                b.fold();
            });
            $('.btn3').click(function () {
                b.resize();
            });
        });
    });
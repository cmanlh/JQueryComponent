$JqcLoader.importScript('../../../../../qunit/jquery-3.1.1.js')
    .importScript('../../../../../qunit/version.js')
    .importScript('../../../../../qunit/keycode.js')
    .importScript('../../../../../qunit/qunit-2.1.1.js')
    .importCss('../../../../../qunit/qunit-2.1.1.css').execute(function () {
        $JqcLoader.registerModule($JqcLoader.newModule('com.lifeonwalden.jqc', '../../../../../')
            .registerComponent('baseElement')
            .registerComponent('uniqueKey')
            .registerComponent('toolkit')
            .registerComponent('msg'));

        $JqcLoader.importComponents('com.lifeonwalden.jqc', ['msg']).execute(function () {

            var a = new $.jqcMsg({
                element: $('#div1'),
                data: [{
                    text: '111111111111'
                }, {
                    text: '2222222222222'
                }, {
                    text: '3333333333333'
                }, {
                    text: '444444444444'
                }, {
                    text: '555555555555'
                }],
                width: 500,
                click: function (data) {
                    alert(data.text);
                }
            });


            $('.btn1').click(function () {
                var val = $('.input1').val();
                if (val) {
                    a.add({
                        text: val
                    });
                    $('.input1').val('');
                }
            })

            $('.btn2').click(function () {
                a.add([{
                    text: '多条1'
                }, {
                    text: '多条2'
                }, {
                    text: '多条3'
                }, {
                    text: '多条4'
                }]);
            })
            // console.log(a);
        });
    });
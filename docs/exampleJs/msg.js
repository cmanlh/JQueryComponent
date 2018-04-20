$JqcLoader.importComponents('com.lifeonwalden.jqc', ['msg']).execute(function () {
    var msg = new $.jqcMsg({
        element: $('#div1'),
        data: [{
            label: '11111111',
        }, {
            label: '22222222',
        }],
        adapter: {
            text: 'label'
        },
        width: 500,
        click: function (data) {
            alert(data.label);
        }
    });

    $('.btn1').click(function () {
        var _val = $('#input1').val();
        if (_val) {
            msg.add({
                label: _val
            });
            $('#input1').val('');
        }
    });

    $('.btn2').click(function () {
        msg.add([{
            label: '多条1'
        }, {
            label: '多条2'
        }, {
            label: '多条3'
        }, {
            label: '多条4'
        }]);
    })
});
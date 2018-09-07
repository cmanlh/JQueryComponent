window.onload = function () {
    var line = {
        title: {
            text: '折线图'
        },
        tooltip: {},
        xAxis: {
            show: true,
            data: ['001', '002', '003', '004', '005', '006']
        },
        yAxis: {
            show: true
        },
        series: {
            type: 'line',
            name: '交易量',
            data: [1000, 2000, 1500, 400, 5000, 3000]
        }
    };

    var bar = {
        title: {
            text: '折线图'
        },
        tooltip: {},
        xAxis: {
            show: true,
            data: ['001', '002', '003', '004', '005', '006']
        },
        yAxis: {
            show: true
        },
        series: {
            type: 'bar',
            name: '交易量',
            data: [1000, 2000, 1500, 400, 5000, 3000]
        }
    };

    var pie = {
        title: {
            text: '饼图'
        },
        tooltip: {},
        xAxis: {
            show: false
        },
        yAxis: {
            show: false
        },
        series: {
            type: 'pie',
            name: '交易量',
            data: [{
                name: '001',
                value: 1000
            }, {
                name: '002',
                value: 2000
            }, {
                name: '003',
                value: 1500
            }, {
                name: '004',
                value: 400
            }, {
                name: '005',
                value: 5000
            }, {
                name: '006',
                value: 3000
            }]
        }
    };
    var div1 = document.getElementById('div1');
    var charts = echarts.init(div1);
    charts.setOption(line);

    $('#btn1').click(function () {
        charts.setOption(line);
    });

    $('#btn2').click(function () {
        charts.setOption(bar);
    });

    $('#btn3').click(function () {
        charts.setOption(pie);
    });
};
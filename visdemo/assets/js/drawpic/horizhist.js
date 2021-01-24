// 采用立即执行函数(function(){})();
(function() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('youxiajiao'));

    // 指定图表的配置项和数据
    option = {
        title: {
            top: '0%',
            left: 'center',
            text: 'Rank of Case Number',
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },

        dataset: {
            source: [
                ['score', 'amount', 'townname'],
                [89.3, 58212, 'QuShi'],
                [57.1, 78254, 'HeShun'],
                [74.4, 41032, 'WuHe'],
                [50.1, 12755, 'XinHua'],
                [89.7, 20145, 'JieTou'],
                [68.1, 79146, 'MaZhan'],
                [19.6, 91852, 'HeHua'],
                [10.6, 101852, 'MangBang'],
                [32.7, 20112, 'TuanTian'],
                [89.3, 58212, 'QingShui'],
                [57.1, 78254, 'BeiHai'],
                [74.4, 41032, 'PuChan'],
                [50.1, 12755, 'GuDong'],
                [89.7, 20145, 'ZhongHe'],
                [68.1, 79146, 'TengYue'],
                [19.6, 91852, 'DianTan'],
                [10.6, 101852, 'MingGuang'],
                [32.7, 20112, 'HouQiao']
            ]
        },
        grid: { containLabel: true },
        xAxis: { name: 'amount' },
        yAxis: {
            type: 'category',
            // name: 'Town Name',
            axisLabel: {
                show: true,
                textStyle: {
                    // color: '#fff',
                    fontSize: '9'
                }
            },
            inverse: true
        },
        visualMap: {
            orient: 'horizontal',
            left: 'center',
            min: 10,
            max: 100,
            text: ['High Score', 'Low Score'],
            // Map the score column to color
            dimension: 0,
            inRange: {
                color: ['#65B581', '#FFCE34', '#FD665F']
            },
            show: false
        },
        grid: {
            left: '11%',
            top: '8%',
            right: '10%',
            bottom: '10%',
            // containLabel: true

        },
        series: [{

            type: 'bar',
            encode: {
                // Map the "amount" column to X axis.
                x: 'amount',
                // Map the "townname" column to Y axis
                y: 'townname'
            }
        }]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);


    // 把配置项给实例对象，跟着浏览器同比例缩放
    window.addEventListener('resize', function() {
        myChart.resize();
    })


})();


(function() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('youxiajiao1'));

    // 指定图表的配置项和数据
    option = {
        title: {
            text: '世界人口总量',
            subtext: '数据来自网络'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            data: ['2011年', '2012年']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01]
        },
        yAxis: {
            type: 'category',
            data: ['巴西', '印尼', '美国', '印度', '中国', '世界人口(万)']
        },
        series: [{
                name: '2011年',
                type: 'bar',
                data: [18203, 23489, 29034, 104970, 131744, 630230]
            },
            {
                name: '2012年',
                type: 'bar',
                data: [19325, 23438, 31000, 121594, 134141, 681807]
            }
        ]
    };


    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);

})();
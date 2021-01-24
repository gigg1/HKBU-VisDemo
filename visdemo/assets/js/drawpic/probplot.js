// 采用立即执行函数(function(){})();
(function() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('youzhongjian'));

    // 指定图表的配置项和数据
    var hours = ['Bhamo', 'Kambaiti', 'Keng Tung', 'KoKang', 'Laiza', 'Lashio',
        'Muse', 'Myitkyina', 'Panghsang', 'Wa State'
    ];
    var days = ['QuShi', 'HeShun', 'WuHe',
        'XinHua', 'JieTou', 'MaZhan', 'HeHua',
        'MangBang', 'TuanTian', 'QingShui', 'BeiHai',
        'PuChan', 'GuDong', 'ZhongHe', 'TengYue',
        'DianTan', 'MingGuang', 'HouQiao'
    ];

    var data = [
        [0, 0, 7],
        [0, 1, 3],
        [0, 2, 8],
        [0, 3, 4],
        [0, 4, 5],
        [0, 5, 9],
        [0, 6, 1],
        [0, 7, 6],
        [0, 8, 2],
        [0, 9, 9],

        [1, 0, 6],
        [1, 1, 1],
        [1, 2, 9],
        [1, 3, 4],
        [1, 4, 8],
        [1, 5, 6],
        [1, 6, 2],
        [1, 7, 7],
        [1, 8, 5],
        [1, 9, 3],

        [2, 0, 9],
        [2, 1, 3],
        [2, 2, 8],
        [2, 3, 2],
        [2, 4, 7],
        [2, 5, 5],
        [2, 6, 9],
        [2, 7, 1],
        [2, 8, 6],
        [2, 9, 4],

        [3, 0, 7],
        [3, 1, 3],
        [3, 2, 8],
        [3, 3, 4],
        [3, 4, 5],
        [3, 5, 9],
        [3, 6, 1],
        [3, 7, 6],
        [3, 8, 2],
        [3, 9, 9],

        [4, 0, 9],
        [4, 1, 3],
        [4, 2, 8],
        [4, 3, 2],
        [4, 4, 7],
        [4, 5, 5],
        [4, 6, 9],
        [4, 7, 1],
        [4, 8, 6],
        [4, 9, 4],

        [5, 0, 6],
        [5, 1, 1],
        [5, 2, 9],
        [5, 3, 4],
        [5, 4, 8],
        [5, 5, 6],
        [5, 6, 2],
        [5, 7, 7],
        [5, 8, 5],
        [5, 9, 3],

        [6, 0, 1],
        [6, 1, 5],
        [6, 2, 4],
        [6, 3, 9],
        [6, 4, 3],
        [6, 5, 5],
        [6, 6, 2],
        [6, 7, 7],
        [6, 8, 3],
        [6, 9, 8],

        [7, 0, 7],
        [7, 1, 3],
        [7, 2, 8],
        [7, 3, 4],
        [7, 4, 5],
        [7, 5, 9],
        [7, 6, 1],
        [7, 7, 6],
        [7, 8, 2],
        [7, 9, 9],

        [8, 0, 6],
        [8, 1, 1],
        [8, 2, 9],
        [8, 3, 4],
        [8, 4, 8],
        [8, 5, 6],
        [8, 6, 2],
        [8, 7, 7],
        [8, 8, 5],
        [8, 9, 3],

        [9, 0, 9],
        [9, 1, 3],
        [9, 2, 8],
        [9, 3, 2],
        [9, 4, 7],
        [9, 5, 5],
        [9, 6, 9],
        [9, 7, 1],
        [9, 8, 6],
        [9, 9, 4],

        [10, 0, 7],
        [10, 1, 3],
        [10, 2, 8],
        [10, 3, 4],
        [10, 4, 5],
        [10, 5, 9],
        [10, 6, 1],
        [10, 7, 6],
        [10, 8, 2],
        [10, 9, 9],

        [11, 0, 9],
        [11, 1, 3],
        [11, 2, 8],
        [11, 3, 2],
        [11, 4, 7],
        [11, 5, 5],
        [11, 6, 9],
        [11, 7, 1],
        [11, 8, 6],
        [11, 9, 4],

        [12, 0, 6],
        [12, 1, 1],
        [12, 2, 9],
        [12, 3, 4],
        [12, 4, 8],
        [12, 5, 6],
        [12, 6, 2],
        [12, 7, 7],
        [12, 8, 5],
        [12, 9, 3],

        [13, 0, 1],
        [13, 1, 5],
        [13, 2, 4],
        [13, 3, 9],
        [13, 4, 3],
        [13, 5, 5],
        [13, 6, 2],
        [13, 7, 7],
        [13, 8, 3],
        [13, 9, 8],


        [14, 0, 7],
        [14, 1, 3],
        [14, 2, 8],
        [14, 3, 4],
        [14, 4, 5],
        [14, 5, 9],
        [14, 6, 1],
        [14, 7, 6],
        [14, 8, 2],
        [14, 9, 9],

        [15, 0, 9],
        [15, 1, 3],
        [15, 2, 8],
        [15, 3, 2],
        [15, 4, 7],
        [15, 5, 5],
        [15, 6, 9],
        [15, 7, 1],
        [15, 8, 6],
        [15, 9, 4],

        [16, 0, 6],
        [16, 1, 1],
        [16, 2, 9],
        [16, 3, 4],
        [16, 4, 8],
        [16, 5, 6],
        [16, 6, 2],
        [16, 7, 7],
        [16, 8, 5],
        [16, 9, 3],

        [17, 0, 1],
        [17, 1, 5],
        [17, 2, 4],
        [17, 3, 9],
        [17, 4, 3],
        [17, 5, 5],
        [17, 6, 2],
        [17, 7, 7],
        [17, 8, 3],
        [17, 9, 8],

        [18, 0, 7],
        [18, 1, 3],
        [18, 2, 8],
        [18, 3, 4],
        [18, 4, 5],
        [18, 5, 9],
        [18, 6, 1],
        [18, 7, 6],
        [18, 8, 2],
        [18, 9, 9]
    ];

    data = data.map(function(item) {
        return [item[1], item[0], item[2] || '-'];
    });

    option = {
        title: {
            top: '0%',
            left: 'center',
            text: 'Probability of Population Mobility',
            // bottom: '5%'
        },


        tooltip: {
            position: 'top'
        },
        // grid: {
        //     height: '50%',
        //     top: '10%'
        // },

        grid: {
            left: '9%',
            top: '17%',
            right: '0%',
            bottom: '0%',
            // containLabel: true

        },

        xAxis: {
            position: 'top',
            type: 'category',
            data: hours,
            splitArea: {
                show: true
            },
            // // 柱状图的x轴文字纵向显示
            // axisLabel: {
            //     formatter: function(value) {
            //         return value.split("").join("\n");
            //     }
            // }
            // 关于 echarts X轴坐标名称过长显示问题
            axisLabel: {
                // 坐标轴刻度标签的相关设置。
                show: true,
                interval: 0,
                formatter: function(value) { //关键代码
                    var res = value
                    if (res.length > 7) {
                        res = res.substring(0, 6) + '..'
                    }
                    return res
                },
            },

        },
        yAxis: {
            type: 'category',
            data: days,
            splitArea: {
                show: true
            },
            axisLabel: {
                show: true,
                textStyle: {
                    // color: '#fff',
                    fontSize: '9'
                }
            },
            inverse: true

            // boundaryGap: [0.5, 0.5]
        },
        visualMap: {
            min: 0,
            max: 10,
            type: 'continuous',
            // 是否显示拖拽用的手柄（手柄能拖拽调整选中范围）。
            calculable: true,
            show: false,
            orient: 'horizontal',
            left: 'center',
            bottom: '15%'
        },

        series: [{
            name: 'Probility',
            type: 'heatmap',
            data: data,
            // 是否显示数字
            // label: {
            //     show: true
            // },
            // tooltip: {
            //     formatter: '{a}, {b}，{c0}'
            // },
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }]
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);


})();

(function() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('youzhongjian1'));

    // 指定图表的配置项和数据
    function getVirtulData(year) {
        year = year || '2017';
        var date = +echarts.number.parseDate(year + '-01-01');
        var end = +echarts.number.parseDate((+year + 1) + '-01-01');
        var dayTime = 3600 * 24 * 1000;
        var data = [];
        for (var time = date; time < end; time += dayTime) {
            data.push([
                echarts.format.formatTime('yyyy-MM-dd', time),
                Math.floor(Math.random() * 10000)
            ]);
        }
        return data;
    }

    option = {
        title: {
            top: 30,
            left: 'center',
            text: '2016年某人每天的步数'
        },
        tooltip: {},
        visualMap: {
            min: 0,
            max: 10000,
            type: 'piecewise',
            orient: 'horizontal',
            left: 'center',
            top: 65,
            textStyle: {
                color: '#000'
            }
        },
        calendar: {
            top: 120,
            left: 30,
            right: 30,
            cellSize: ['auto', 13],
            range: '2016',
            itemStyle: {
                borderWidth: 0.5
            },
            yearLabel: { show: false }
        },
        series: {
            type: 'heatmap',
            coordinateSystem: 'calendar',
            data: getVirtulData(2016)
        }
    };



    // 使用刚指定的配置项和数据显示图表。
    if (option && typeof option === "object") {
        myChart.setOption(option, true);
    }

})();
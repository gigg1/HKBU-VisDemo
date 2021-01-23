// 采用立即执行函数(function(){})();

(function() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('zuoxiajiao'));

    // 指定图表的配置项和数据
    var base = +new Date(2006, 12, 30);
    // var oneDay = 24 * 3600 * 1000;
    var oneMonth = 30 * 24 * 3600 * 1000;
    // var oneYear = 12 * 30 * 24 * 3600 * 1000;
    var date = [];

    var data = [Math.random() * 300];
    var data1 = [Math.random() * 300];
    var data2 = [Math.random() * 300];
    var data3 = [Math.random() * 300];
    var data4 = [Math.random() * 300];

    // var data = [50, 100, 200, 60, 10, 200, 80, 100, 30, 200, 50, 100];
    // var data1 = [10, 200, 80, 100, 30, 200, 60, 10, 200, 80, 60, 10];

    // console.log(Math.random() * 300)

    for (var i = 1; i < 156; i++) {
        // var now = new Date(base += oneDay);
        var now = new Date(base += oneMonth);
        // var now = new Date(base += oneYear);
        // date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'));
        date.push([now.getFullYear(), now.getMonth()].join('/'));
        // round() 方法可把一个数字舍入为最接近的整数; 对于0.5，该方法将进行上舍入。
        data.push(Math.round((Math.random() - 0.5) * 10 + data[i - 1]));
        data1.push(Math.round((Math.random() - 0.5) * 50 + data1[i - 1]));
        data2.push(Math.round((Math.random() - 0.5) * 100 + data1[i - 1]));
        data3.push(Math.round((Math.random() - 0.5) * 150 + data1[i - 1]));
        data4.push(Math.round((Math.random() - 0.5) * 200 + data1[i - 1]));
        // data.push(Math.round(data[i - 1]));
        // data1.push(Math.round(data1[i - 1]));
    }



    option = {
        // tooltip: {
        //     trigger: 'axis',
        //     position: function(pt) {
        //         return [pt[0], '10%'];
        //     }
        // },
        tooltip: {
            trigger: 'item',
            formatter: '-->{c}'
        },
        legend: {
            y: 'top',
            x: 'center',
            // 'scroll'：可滚动翻页的图例。当图例数量较多时可以使用。
            type: 'scroll',
            // 在legend里加上top属性，可直接写数字top：5，代表具体的5像素；也可以写top: ‘5%’，具体参考echarts官方文档配置手册里 legend。
            top: '5%',
            // data: ['Growth', 'Budget 2011', 'Budget 2012'],
            // itemGap: 5
        },

        title: {
            left: 'center',
            text: 'Number of case Monthly',
        },
        toolbox: {
            feature: {
                dataZoom: {
                    yAxisIndex: 'none'
                },
                restore: {},
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            name: 'Month',
            boundaryGap: false,
            data: date
        },
        yAxis: {
            type: 'value',
            name: 'The number of case',
            boundaryGap: [0, '100%']
        },
        dataZoom: [{
            type: 'inside',
            // 拉条一开始显示的范围
            start: 0,
            // end: 10
            end: 100
        }, {
            start: 0,
            end: 10
        }],
        series: [{
                name: 'Qushi',
                type: 'line',
                // 标记的图形
                symbol: 'none',
                // 采用 Largest-Triangle-Three-Bucket 算法，可以最大程度保证采样后线条的趋势，形状和极值。
                sampling: 'lttb',
                // 线的颜色
                itemStyle: {
                    color: 'rgb(255, 70, 131)'
                },
                data: data
            }, {
                name: 'HeShun',
                type: 'line',
                symbol: 'none',
                sampling: 'lttb',
                itemStyle: {
                    color: 'rgb(252, 170, 131)'
                },
                data: data1
            }, {
                name: 'WuHe',
                type: 'line',
                // 标记的图形
                symbol: 'none',
                // 采用 Largest-Triangle-Three-Bucket 算法，可以最大程度保证采样后线条的趋势，形状和极值。
                sampling: 'lttb',
                // 线的颜色
                itemStyle: {
                    color: 'rgb(255, 74, 101)'
                },
                data: data2
            }, {
                name: 'XinHua',
                type: 'line',
                // 标记的图形
                symbol: 'none',
                // 采用 Largest-Triangle-Three-Bucket 算法，可以最大程度保证采样后线条的趋势，形状和极值。
                sampling: 'lttb',
                // 线的颜色
                itemStyle: {
                    color: 'rgb(25, 20, 31)'
                },
                data: data3
            }, {
                name: 'JieTou',
                type: 'line',
                // 标记的图形
                symbol: 'none',
                // 采用 Largest-Triangle-Three-Bucket 算法，可以最大程度保证采样后线条的趋势，形状和极值。
                sampling: 'lttb',
                // 线的颜色
                itemStyle: {
                    color: 'rgb(235, 20, 231)'
                },
                data: data4
            }


        ]
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);

    myChart.on('mouseover', function(params) { // 鼠标移入
        // myChart.dispatchAction({
        //     type: 'highlight',
        //     seriesName: params.seriesName,
        // })

        myChart.setOption({ // 设置 鼠标移入后想要的样式
            series: {
                name: params.seriesName,
                symbolSize: 20,
                lineStyle: {
                    width: 20
                }
            }
        })
    })

    myChart.on('mouseout', function(params) { // 鼠标移出
        // myChart.dispatchAction({
        //     type: 'downplay',
        //     seriesName: params.seriesName,
        // })

        myChart.setOption({ // 将样式复原
            series: {
                name: params.seriesName,
                symbolSize: 2,
                lineStyle: {
                    width: 2
                }
            }
        })
    })


})();


(function() {

    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('zuoxiajiao1'));

    // 指定图表的配置项和数据
    var base = +new Date(1968, 9, 3);
    var oneDay = 24 * 3600 * 1000;
    var date = [];

    var data = [Math.random() * 300];

    for (var i = 1; i < 20000; i++) {
        var now = new Date(base += oneDay);
        date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'));
        data.push(Math.round((Math.random() - 0.5) * 20 + data[i - 1]));
    }

    option = {
        tooltip: {
            trigger: 'axis',
            position: function(pt) {
                return [pt[0], '10%'];
            }
        },
        title: {
            left: 'center',
            text: '大数据量面积图',
        },
        toolbox: {
            feature: {
                dataZoom: {
                    yAxisIndex: 'none'
                },
                restore: {},
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: date
        },
        yAxis: {
            type: 'value',
            boundaryGap: [0, '100%']
        },
        dataZoom: [{
            type: 'inside',
            start: 0,
            end: 10
        }, {
            start: 0,
            end: 10,
            handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
            handleSize: '80%',
            handleStyle: {
                color: '#fff',
                shadowBlur: 3,
                shadowColor: 'rgba(0, 0, 0, 0.6)',
                shadowOffsetX: 2,
                shadowOffsetY: 2
            }
        }],
        series: [{
            name: '模拟数据',
            type: 'line',
            smooth: true,
            symbol: 'none',
            sampling: 'average',
            itemStyle: {
                color: 'rgb(255, 70, 131)'
            },
            areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgb(255, 158, 68)'
                }, {
                    offset: 1,
                    color: 'rgb(255, 70, 131)'
                }])
            },
            data: data
        }]
    };


    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
})();
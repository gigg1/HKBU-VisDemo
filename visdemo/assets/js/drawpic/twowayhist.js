// 采用立即执行函数(function(){})();
(function() {

    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('youshangjiao'));

    // 指定图表的配置项和数据
    var xAxisData = [];
    var data1 = [];
    var data2 = [];
    var data3 = [];
    var data4 = [];

    for (var i = 0; i < 20; i++) {
        xAxisData.push('Class' + i);
        if (i % 2 == 0)
            data1.push((Math.random() * 2).toFixed(2));
        // data2.push((Math.random() * 5).toFixed(2));
        // data3.push((Math.random() + 0.3).toFixed(2));
        data1.push(-Math.random().toFixed(2));
    }

    var emphasisStyle = {
        itemStyle: {
            shadowBlur: 10,
            shadowColor: 'rgba(0,0,0,0.3)'
        }
    };

    option = {
        title: {
            left: 'center',
            text: 'Weight of 20-socio-Economic Indicators',
        },
        // legend: {
        //     // data: ['bar', 'bar2', 'bar3', 'bar4'],
        //     data: ['bar', 'bar4'],
        //     // left: '10%',
        //     y: 'top',
        //     x: 'center',
        //     // 'scroll'：可滚动翻页的图例。当图例数量较多时可以使用。
        //     type: 'scroll',
        //     // 在legend里加上top属性，可直接写数字top：5，代表具体的5像素；也可以写top: ‘5%’，具体参考echarts官方文档配置手册里 legend。
        //     top: '8%',
        //     left: '30%',
        // },
        // brush: {
        //     toolbox: ['rect', 'polygon', 'lineX', 'lineY', 'keep', 'clear'],
        //     xAxisIndex: 0
        // },
        // toolbox: {
        //     feature: {
        //         magicType: {
        //             type: ['stack', 'tiled']
        //         },
        //         dataView: {}
        //     }
        // },
        tooltip: {},
        xAxis: {
            data: xAxisData,
            name: 'X Axis',
            show: false,
            axisLine: { onZero: true },
            splitLine: { show: false },
            splitArea: { show: false },
            // 柱状图的x轴文字纵向显示
            axisLabel: {
                formatter: function(value) {
                    return value.split("").join("\n");
                }
            }
        },
        yAxis: {
            name: 'Relatively Value',
        },
        // grid: {
        //     bottom: 100
        // },
        grid: {
            left: '8%',
            top: '20%',
            right: '0%',
            bottom: '4%',
            // containLabel: true

        },
        series: [{
                name: 'bar',
                type: 'bar',
                stack: 'one',
                emphasis: emphasisStyle,
                data: data1,
                barWidth: 20,
                // barGap: '10%',
                /*多个并排柱子设置柱子之间的间距*/
                // barCategoryGap: '50%',
                /*多个并排柱子设置柱子之间的间距*/

                // 为每个柱子给定颜色
                // itemStyle: {
                //     normal: {　　　　　　　　 //这里是重点
                //         color: function(params) {
                //             //注意，如果颜色太少的话，后面颜色不会自动循环，最好多定义几个颜色
                //             var colorList = ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622'];
                //             return colorList[params.dataIndex]
                //         }
                //     }
                // }

                // 为每个柱子给定颜色，不够的话开始循环
                // itemStyle: {
                //     normal: {
                //         //这里是重点
                //         color: function(params) {
                //             //注意，如果颜色太少的话，后面颜色不会自动循环，最好多定义几个颜色
                //             var colorList = ['#c23531','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83', '#ca8622'];
                //             var index;
                //             //给大于颜色数量的柱体添加循环颜色的判断
                //             if (params.dataIndex >= colorList.length) {
                //                index = params.dataIndex - colorList.length;
                //                return colorList[index];
                //             }
                //             return colorList[params.dataIndex];
                //         }
                //     }
                // },

                // 为每个柱子给定颜色，不够的话开始循环
                itemStyle: {
                    normal: {
                        //这里是重点
                        // 循环这样子方便点 
                        color: function(params) {
                            var colorList = ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622'];
                            return colorList[params.dataIndex % colorList.length];
                        }
                    }
                }
            },
            {
                name: 'bar2',
                type: 'bar',
                stack: 'one',
                emphasis: emphasisStyle,
                data: data2
            },
            {
                name: 'bar3',
                type: 'bar',
                stack: 'two',
                emphasis: emphasisStyle,
                data: data3
            },
            {
                name: 'bar4',
                type: 'bar',
                stack: 'two',
                emphasis: emphasisStyle,
                data: data4
            }
        ]
    };

    // myChart.on('brushSelected', renderBrushed);

    // function renderBrushed(params) {
    //     var brushed = [];
    //     var brushComponent = params.batch[0];

    //     for (var sIdx = 0; sIdx < brushComponent.selected.length; sIdx++) {
    //         var rawIndices = brushComponent.selected[sIdx].dataIndex;
    //         brushed.push('[Series ' + sIdx + '] ' + rawIndices.join(', '));
    //     }

    //     myChart.setOption({
    //         title: {
    //             backgroundColor: '#333',
    //             text: 'SELECTED DATA INDICES: \n' + brushed.join('\n'),
    //             bottom: 0,
    //             right: '10%',
    //             width: 100,
    //             textStyle: {
    //                 fontSize: 12,
    //                 color: '#fff'
    //             }
    //         }
    //     });
    // }
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);

    // 把配置项给实例对象，跟着浏览器同比例缩放
    window.addEventListener('resize', function() {
        myChart.resize();
    })

})();


(function() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('youshangjiao1'));

    // 指定图表的配置项和数据
    var xAxisData = [];
    var data1 = [];
    var data2 = [];
    var data3 = [];
    var data4 = [];

    for (var i = 0; i < 10; i++) {
        xAxisData.push('Class' + i);
        data1.push((Math.random() * 2).toFixed(2));
        data2.push(-Math.random().toFixed(2));
        data3.push((Math.random() * 5).toFixed(2));
        data4.push((Math.random() + 0.3).toFixed(2));
    }

    var emphasisStyle = {
        itemStyle: {
            barBorderWidth: 1,
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            shadowColor: 'rgba(0,0,0,0.5)'
        }
    };

    option = {
        backgroundColor: '#eee',
        legend: {
            data: ['bar', 'bar2', 'bar3', 'bar4'],
            left: 10
        },
        brush: {
            toolbox: ['rect', 'polygon', 'lineX', 'lineY', 'keep', 'clear'],
            xAxisIndex: 0
        },
        toolbox: {
            feature: {
                magicType: {
                    type: ['stack', 'tiled']
                },
                dataView: {}
            }
        },
        tooltip: {},
        xAxis: {
            data: xAxisData,
            name: 'X Axis',
            axisLine: { onZero: true },
            splitLine: { show: false },
            splitArea: { show: false }
        },
        yAxis: {
            inverse: true,
            splitArea: { show: false }
        },
        grid: {
            left: 100
        },
        visualMap: {
            type: 'continuous',
            dimension: 1,
            text: ['High', 'Low'],
            inverse: true,
            itemHeight: 200,
            calculable: true,
            min: -2,
            max: 6,
            top: 60,
            left: 10,
            inRange: {
                colorLightness: [0.4, 0.8]
            },
            outOfRange: {
                color: '#bbb'
            },
            controller: {
                inRange: {
                    color: '#2f4554'
                }
            }
        },
        series: [{
                name: 'bar',
                type: 'bar',
                stack: 'one',
                emphasis: emphasisStyle,
                data: data1
            },
            {
                name: 'bar2',
                type: 'bar',
                stack: 'one',
                emphasis: emphasisStyle,
                data: data2
            },
            {
                name: 'bar3',
                type: 'bar',
                stack: 'two',
                emphasis: emphasisStyle,
                data: data3
            },
            {
                name: 'bar4',
                type: 'bar',
                stack: 'two',
                emphasis: emphasisStyle,
                data: data4
            }
        ]
    };

    myChart.on('brushSelected', renderBrushed);

    function renderBrushed(params) {
        var brushed = [];
        var brushComponent = params.batch[0];

        for (var sIdx = 0; sIdx < brushComponent.selected.length; sIdx++) {
            var rawIndices = brushComponent.selected[sIdx].dataIndex;
            brushed.push('[Series ' + sIdx + '] ' + rawIndices.join(', '));
        }

        myChart.setOption({
            title: {
                backgroundColor: '#333',
                text: 'SELECTED DATA INDICES: \n' + brushed.join('\n'),
                bottom: 0,
                right: 0,
                width: 100,
                textStyle: {
                    fontSize: 12,
                    color: '#fff'
                }
            }
        });
    }

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);

})();
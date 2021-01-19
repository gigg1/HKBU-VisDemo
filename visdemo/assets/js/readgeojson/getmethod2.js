$(function() {

    var mapChart;
    var option;

    $.get('json/mydraw.json', function(beijingJson) {
        echarts.registerMap('北京', beijingJson);
        mapChart = echarts.init(document.getElementById('map-wrap3'));
        option = {
            title: {
                text: '北京市通州区各镇分布图',
                left: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: '{b}<br/>{c} (个)'
            },
            toolbox: {
                show: true,
                orient: 'vertical',
                left: 'right',
                top: 'center',
                feature: {
                    dataView: {
                        readOnly: false
                    },
                    restore: {},
                    saveAsImage: {}
                }
            },
            visualMap: {
                min: 0,
                max: 2000,
                text: ['高', '低'],
                realtime: false,
                calculable: true,
                inRange: {
                    color: ['lightskyblue', 'yellow', 'orangered']
                }
            },
            series: [{
                name: '通州区各镇安装机井统计图',
                type: 'map',
                map: '北京', // 自定义扩展图表类型
                aspectScale: 1.0, //地图长宽比. default: 0.75
                zoom: 1.1, //控制地图的zoom，动手自己更改下 看看什么效果吧
                roam: true,
                itemStyle: {
                    normal: {
                        label: {
                            show: true
                        }
                    },
                    emphasis: {
                        label: {
                            show: true
                        }
                    }
                }
            }]
        }
        mapChart.setOption(option);

    });


})
// var mapChart;
// var option;
// //use json file to make map layer
// $.get('json/Export_Output3.json', function(beijingJson) {
//     echarts.registerMap('云南省腾冲市', beijingJson);
//     mapChart = echarts.init(document.getElementById('map-wrap'));
//     option = {
//         title: {
//             text: '云南腾冲县疫情分布图',
//             // left: 'center'
//             // left: 'left'
//         },
//         tooltip: {
//             trigger: 'item',
//             formatter: '{b}<br/>{c} (个)'
//         },
//         legend: {
//             show: true,
//             orient: 'vertical',
//             x: 'right',
//             y: 'top',
//         },


//         // 工具箱
//         // toolbox: {
//         //     show: true,
//         //     orient: 'vertical',
//         //     left: 'right',
//         //     top: 'left',
//         //     feature: {
//         //         dataView: {
//         //             readOnly: false
//         //         },
//         //         restore: {},
//         //         saveAsImage: {}
//         //     }
//         // },

//         // 坐下角的颜色
//         // visualMap: {
//         //     min: 0,
//         //     max: 2000,
//         //     text: ['高', '低'],
//         //     realtime: false,
//         //     calculable: true,
//         //     inRange: {
//         //         color: ['lightskyblue', 'yellow', 'orangered']
//         //     }
//         // },
//         series: [{
//             name: '腾冲市各县',
//             type: 'map',
//             map: '云南省腾冲市', // 自定义扩展图表类型
//             aspectScale: 1.0, //长宽比. default: 0.75
//             zoom: 1.1,
//             // 可以移动地图
//             // roam: true,
//             roam: false,
//             itemStyle: {
//                 normal: {
//                     label: {
//                         show: true
//                     }
//                 },
//                 emphasis: {
//                     label: {
//                         show: true
//                     }
//                 }
//             },
//             data: [] //需要动态加载data内容
//         }]
//     }
//     mapChart.setOption(option);
// });
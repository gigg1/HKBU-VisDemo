// mapboxgl.accessToken = 'pk.eyJ1Ijoid2xmZWkiLCJhIjoiY2puMTB6MXZlNHZjcTNwbnl3dnowYjhoaSJ9.s6ZkjRHGIY6xVNBRAf52MQ';

// $.get('json/Export_Output3.json', function(beijingJson) {
//     echarts.registerMap('云南省腾冲市', beijingJson);
//     var myChart = echarts.init(document.getElementById('map-wrap5'));

//     let option = {
//         // 保持与地图同步移动
//         // 取消动画、保持与地图同步移动
//         animation: false,
//         tmap: {
//             center: [98.41, 25.18],
//             zoom: 11,
//             roam: true,
//             style: 'mapbox://styles/mapbox/streets-v9'
//         },
//         visualMap: {
//             show: false,
//             top: 'top',
//             min: 0,
//             max: 5,
//             seriesIndex: 0,
//             calculable: true,
//             inRange: {
//                 color: ['blue', 'blue', 'green', 'yellow', 'red']
//             }
//         },
//         title: {
//             text: '云南腾冲县疫情分布图',
//         },
//         tooltip: {
//             trigger: 'item',
//             formatter: '{b}<br/>{c} (个)'
//         },
//         series: [{
//             name: '腾冲市各县',
//             type: 'map',
//             // coordinateSystem: 'tmap',
//             map: '云南省腾冲市', // 自定义扩展图表类型
//             aspectScale: 1.0, //长宽比. default: 0.75
//             zoom: 1.1,
//             // 可以移动地图
//             roam: true,
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

//     myChart.setOption(option);

// });
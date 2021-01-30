// $.getJSON("json/heilongjiang.json", function(data) {
//     echarts.registerMap('heilj', data);
//     //定义div#map，给定width和height
//     chart = echarts.init(document.getElementById('map-wrap2'));
//     chart.setOption({
//         title: {
//             text: 'title',
//         },
//         toolbox: {
//             show: true,
//             orient: 'vertical',
//             left: 'right',
//             top: 'center',
//             feature: {
//                 saveAsImage: {
//                     backgroundColor: '#fff',
//                     excludeComponents: ['toolbox']
//                 }
//             }
//         },
//         visualMap: {
//             type: 'piecewise',
//             show: false, //图例
//             pieces: [{
//                 value: 1,
//                 color: '#ff0000',
//                 label: '红色'
//             }, {
//                 value: 2,
//                 color: '#FF8330',
//                 label: '橙色'
//             }],
//             right: 0,
//             bottom: 0,
//             align: 'left',
//             padding: [30, 10, 10, 10], //上、右、下、左
//             borderWidth: 1,
//             borderColor: '#000',
//             itemGap: 5,
//             itemSymbol: 'rect',
//             itemWidth: 30,
//             itemHeight: 20,
//             inverse: true
//         },
//         series: [{
//             selectedMode: false,
//             silent: true,
//             type: 'map',
//             roam: true,
//             label: {
//                 normal: {
//                     show: true,
//                     formatter: '{c}', //显示数值在地图上
//                     textStyle: {
//                         color: '#f00',
//                         fontWeight: "bold"
//                     }
//                 }
//             },
//             data: [{
//                     name: "漠河县",
//                     value: 3
//                 }] //这个需要程序处理
//         }]
//     });
// })
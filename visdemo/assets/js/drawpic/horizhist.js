// 采用立即执行函数(function(){})();
(function() {


    // jQuery闭包函数
    // (function($) {
    //     $(function() {

    $.get('json/Cases Number Monthly.json', function(Cases_Number_Monthly) {

        // 基于准备好的dom，初始化echarts实例
        window.horizhist_myChart = echarts.init(document.getElementById('youxiajiao'));

        // 指定图表的配置项和数据
        // var townname = ['townname'];
        // var childNum = ['amount'];
        var data_set_from_json = [];
        // data_set_from_json.push(['amount', 'townname']);
        // var agency = [];
        // data_set_from_json.push(agency);


        var date_set_from_json = [];
        var TownName_set_from_json = [];
        var a;
        Cases_Number_Monthly.casenumbermonthly.forEach(element => {
            // if (element['Attributes'] === 'Historical') {
            TownName_set_from_json.push(element['TownName']);
            a = element['Month'].split("/");
            a = a[2] + '/' + a[0] + '/' + a[1];
            date_set_from_json.push(a);
            // }
        });
        // 数组去重
        date_set_from_json = [...new Set(date_set_from_json)];
        // console.log(date_set_from_json)
        TownName_set_from_json = [...new Set(TownName_set_from_json)];

        var data_set_from_json = new Array(TownName_set_from_json.length);
        for (var i = 0; i < data_set_from_json.length; i++) {
            data_set_from_json[i] = new Array(date_set_from_json.length);
        }


        Cases_Number_Monthly.casenumbermonthly.forEach(element => {

            // if (element['Attributes'] === 'Historical') {
            TownName_set_from_json.findIndex(function(TownName_value, TownName_index) {
                    if (TownName_value === element['TownName']) {
                        //则包含该元素
                        a = element['Month'].split("/");
                        a = a[2] + '/' + a[0] + '/' + a[1];
                        date_set_from_json.findIndex(function(date_value, date_index) {
                            if (date_value === a) {
                                //则包含该元素
                                data_set_from_json[TownName_index][date_index] = element['The number of cases']
                                    // agency.push(date_index)
                            }

                        })
                    }
                })
                // }
        });
        // console.log(data_set_from_json)
        for (var i = 0; i < data_set_from_json.length; i++) {
            data_set_from_json[i] = eval(data_set_from_json[i].join("+"))
        }

        var data_set1_from_json = []
            // console.log(tengchongdata.features[0])
            // tengchongdata.features.forEach(element => {
        for (var i = 0; i < data_set_from_json.length; i++) {
            var agency = [];
            agency.push(data_set_from_json[i]);
            agency.push(TownName_set_from_json[i]);
            data_set1_from_json.push(agency)
        }
        // townname.push(element.properties.name);
        // childNum.push(element.properties.childNum);
        // });
        // console.log(data_set_from_json)
        // data_set_from_json.sort();
        // data_set_from_json.reverse();


        // ------------冒泡排序法(升序)-----------
        // var arr = [3, 4, 1, 2];

        // function bubbleSort(arr) {
        //     for (var j = 0; j < arr.length - 1; j++) {
        //         // 这里要根据外层for循环的 j，逐渐减少内层 for循环的次数
        //         for (var i = 0; i < arr.length - 1 - j; i++) {
        //             if (arr[i] > arr[i + 1]) {
        //                 var temp = arr[i];
        //                 arr[i] = arr[i + 1];
        //                 arr[i + 1] = temp;
        //             }
        //         }
        //     }
        //     return arr;
        // }
        // bubbleSort(arr);
        // console.log(arr);
        // ------------冒泡排序法(升序)-----------

        // ------------冒泡排序法(降序)-----------
        function bubbleSort(arr) {
            var max = arr.length - 1;
            for (var j = 0; j < max; j++) {
                // 声明一个变量，作为标志位
                var done = true;
                for (var i = 0; i < max - j; i++) {
                    if (arr[i][0] < arr[i + 1][0]) {
                        var temp = arr[i];
                        arr[i] = arr[i + 1];
                        arr[i + 1] = temp;
                        done = false;
                    }
                }
                if (done) {
                    break;
                }
            }
            return arr;
        }
        bubbleSort(data_set1_from_json);
        // console.log(data_set_from_json)；
        // ------------冒泡排序法(降序)-----------

        // console.log(townname)
        // console.log(childNum)
        // console.log(data_set_from_json)

        // var data_set = [
        //     ['amount', 'townname'],
        //     [1, 'QuShi'],
        //     [3, 'HeShun'],
        //     [5, 'WuHe'],
        //     [10, 'XinHua'],
        //     [100, 'JieTou'],
        //     [144, 'MaZhan'],
        //     [233, 'HeHua'],
        //     [445, 'MangBang'],
        //     [666, 'TuanTian'],
        //     [777, 'QingShui'],
        //     [3, 'BeiHai'],
        //     [4, 'PuChan'],
        //     [56, 'GuDong'],
        //     [78, 'ZhongHe'],
        //     [89, 'TengYue'],
        //     [90, 'DianTan'],
        //     [23, 'MingGuang'],
        //     [24, 'HouQiao']
        // ]
        // console.log(data_set.length)
        window.horizhist_data_set1_from_json = data_set1_from_json
        window.horizhist_colorlist = [];
        window.horizhist_colorlist_clear = [];

        window.horizhist_arealist = [];

        for (var i = 0; i < data_set1_from_json.length; i++) {
            // color_list.push(window.colorList[window.geojson_info[data_set1_from_json[i][1]]])
            // window.horizhist_colorlist.push(window.colorList[window.geojson_info[data_set1_from_json[i][1]] - 1])
            window.horizhist_colorlist.push(window.colorList[window.relation_between_area_colorlist[data_set1_from_json[i][1]]])
            window.horizhist_arealist.push(data_set1_from_json[i][1])
                // console.log(window.colorList[window.geojson_info[data_set1_from_json[i][1]] - 1])
                // console.log(window.geojson_info[data_set1_from_json[i][1]])
        }

        window.horizhist_option = {
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
            // dataset: {
            //     source: data_set_from_json
            // },
            // dataset: {
            //     // source: data_set
            //     source: data_set1_from_json
            // },
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
            // visualMap: {
            //     orient: 'horizontal',
            //     left: 'center',
            //     min: 10,
            //     max: 100,
            //     text: ['High Score', 'Low Score'],
            //     // Map the score column to color
            //     dimension: 0,
            //     inRange: {
            //         color: ['#65B581', '#FFCE34', '#FD665F']
            //     },
            //     show: false
            // },
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
                },
                // 为每个柱子给定颜色，不够的话开始循环
                itemStyle: {
                    normal: {
                        //这里是重点
                        // 循环这样子方便点 
                        color: function(params) {
                            // var colorList = ['#FF4933', '#3498DB', '#F4D03F ', '#6C3483 ', '#FF8C33', '#2ECC71', '#2980B9', '#33B7FF', '#334EFF', '#CB33FF', '#943126', '#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622'];
                            // window.horizhist_colorlist = ["rgba(148,49,38, 1)", "rgba(108,52,131, 1)", "rgba(244,208,63, 1)", "rgba(255,140,51, 1)", "rgba(202,134,34, 1)", "rgba(255,73,51, 1)", "rgba(116,159,131, 1)", "rgba(212,130,101, 1)", "rgba(97,160,168, 1)", "rgba(47,69,84, 1)", "rgba(51,183,255, 1)", "rgba(194,53,49, 1)", "rgba(203,51,255, 1)", "rgba(46,204,113, 1)", "rgba(41,128,185, 1)", "rgba(52,152,219, 1)", "rgba(51,78,255, 1)", "rgba(145,199,174, 1)"]
                            // var colorList = window.colorList
                            // window.horizhist_colorlist_clear = ["rgba(148,49,38, 0.1)", "rgba(108,52,131, 0.1)", "rgba(244,208,63, 0.1)", "rgba(255,140,51, 0.1)", "rgba(202,134,34, 0.1)", "rgba(255,73,51, 0.1)", "rgba(116,159,131, 0.1)", "rgba(212,130,101, 0.1)", "rgba(97,160,168, 0.1)", "rgba(47,69,84, 0.1)", "rgba(51,183,255, 0.1)", "rgba(194,53,49, 0.1)", "rgba(203,51,255, 0.1)", "rgba(46,204,113, 0.1)", "rgba(41,128,185, 0.1)", "rgba(52,152,219, 0.1)", "rgba(51,78,255, 0.1)", "rgba(145,199,174, 0.1)"]
                            var colorList = window.horizhist_colorlist;
                            // return window.horizhist_colorlist[params.dataIndex % window.horizhist_colorlist.length];
                            return colorList[params.dataIndex % colorList.length];
                        }
                    }
                },
                data: data_set1_from_json
            }]
        };

        // 使用刚指定的配置项和数据显示图表。
        // console.log(data_set1_from_json)
        window.horizhist_myChart.setOption(window.horizhist_option);



        // 把配置项给实例对象，跟着浏览器同比例缩放
        window.addEventListener('resize', function() {
            window.horizhist_myChart.resize();
        })

    });

    //     });
    // })(jQuery);


})();


// (function() {
//     // 基于准备好的dom，初始化echarts实例
//     var myChart = echarts.init(document.getElementById('youxiajiao1'));

//     // 指定图表的配置项和数据
//     option = {
//         title: {
//             text: '世界人口总量',
//             subtext: '数据来自网络'
//         },
//         tooltip: {
//             trigger: 'axis',
//             axisPointer: {
//                 type: 'shadow'
//             }
//         },
//         legend: {
//             data: ['2011年', '2012年']
//         },
//         grid: {
//             left: '3%',
//             right: '4%',
//             bottom: '3%',
//             containLabel: true
//         },
//         xAxis: {
//             type: 'value',
//             boundaryGap: [0, 0.01]
//         },
//         yAxis: {
//             type: 'category',
//             data: ['巴西', '印尼', '美国', '印度', '中国', '世界人口(万)']
//         },
//         series: [{
//                 name: '2011年',
//                 type: 'bar',
//                 data: [18203, 23489, 29034, 104970, 131744, 630230]
//             },
//             {
//                 name: '2012年',
//                 type: 'bar',
//                 data: [19325, 23438, 31000, 121594, 134141, 681807]
//             }
//         ]
//     };


//     // 使用刚指定的配置项和数据显示图表。
//     myChart.setOption(option);

// })();
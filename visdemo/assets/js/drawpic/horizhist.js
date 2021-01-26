// 采用立即执行函数(function(){})();
(function() {


    // jQuery闭包函数
    // (function($) {
    //     $(function() {

    $.get('json/Export_Output.json', function(tengchongdata) {

        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('youxiajiao'));

        // 指定图表的配置项和数据
        // var townname = ['townname'];
        // var childNum = ['amount'];
        var data_set_from_json = [];
        // data_set_from_json.push(['amount', 'townname']);
        // var agency = [];
        // data_set_from_json.push(agency);

        // console.log(tengchongdata.features[0])
        tengchongdata.features.forEach(element => {
            agency = [];
            agency.push(element.properties.childNum);
            agency.push(element.properties.name);
            data_set_from_json.push(agency)
                // townname.push(element.properties.name);
                // childNum.push(element.properties.childNum);
        });
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
        bubbleSort(data_set_from_json);
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
            // dataset: {
            //     source: data_set_from_json
            // },
            dataset: {
                // source: data_set
                source: data_set_from_json
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
                            var colorList = ['#FF4933', '#3498DB', '#F4D03F ', '#6C3483 ', '#FF8C33', '#2ECC71', '#2980B9', '#33B7FF', '#334EFF', '#CB33FF', '#943126', '#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622'];
                            return colorList[params.dataIndex % colorList.length];
                        }
                    }
                }
            }]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);


        // 把配置项给实例对象，跟着浏览器同比例缩放
        window.addEventListener('resize', function() {
            myChart.resize();
        })

    });

    //     });
    // })(jQuery);


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
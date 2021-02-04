// 采用立即执行函数(function(){})();

(function() {

    $.get('json/Export_Output.json', function(geojson_info) {
        window.geojson_info = new Array();
        window.area_chosen_state = new Array();
        geojson_info.features.forEach(element => {
            window.geojson_info[element.properties.name] = element.properties.id + 1;
            window.area_chosen_state[element.id] = false;

        });
    });


    $.get('json/Cases Number Monthly.json', function(Cases_Number_Monthly) {

        // -------------------- 一：map graph-------------------------------
        mapboxgl.accessToken = 'pk.eyJ1Ijoic3l4LS0tIiwiYSI6ImNrazZhOXUxdDAyMTQyb3AyYWl1YjZ3cHMifQ.fziHVOJ-trhLKQbWTyax3g';
        var map = new mapboxgl.Map({
            container: 'map', // container id
            style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
            // center: [30.0222, -1.9596], // starting position [lng, lat]
            // zoom: 7 // starting zoom
            center: [98.41, 25.18],
            zoom: 7,
            zoom: 8
        });
        var hoveredStateId = null;
        // ----红点----
        var size = 200;

        // implementation of CustomLayerInterface to draw a pulsing dot icon on the map
        // see https://docs.mapbox.com/mapbox-gl-js/api/#customlayerinterface for more info
        var pulsingDot = {
            width: size,
            height: size,
            data: new Uint8Array(size * size * 4),

            // get rendering context for the map canvas when layer is added to the map
            onAdd: function() {
                var canvas = document.createElement('canvas');
                canvas.width = this.width;
                canvas.height = this.height;
                this.context = canvas.getContext('2d');
            },

            // called once before every frame where the icon will be used
            render: function() {
                var duration = 1000;
                var t = (performance.now() % duration) / duration;

                var radius = (size / 2) * 0.3;
                var outerRadius = (size / 2) * 0.7 * t + radius;
                var context = this.context;

                // draw outer circle
                // context.clearRect(0, 0, this.width, this.height);
                // context.beginPath();
                // context.arc(
                //     this.width / 2,
                //     this.height / 2,
                //     outerRadius,
                //     0,
                //     Math.PI * 2
                // );
                // context.fillStyle = 'rgba(255, 200, 200,' + (1 - t) + ')';
                // context.fill();

                // draw inner circle
                context.beginPath();
                context.arc(
                    this.width / 2,
                    this.height / 2,
                    radius,
                    0,
                    Math.PI * 2
                );
                context.fillStyle = 'rgba(255, 100, 100, 1)';
                context.strokeStyle = 'black';
                // context.lineWidth = 2 + 4 * (1 - t);
                context.lineWidth = 4;
                context.fill();
                context.stroke();

                // update this image's data with data from the canvas
                this.data = context.getImageData(
                    0,
                    0,
                    this.width,
                    this.height
                ).data;

                // continuously repaint the map, resulting in the smooth animation of the dot
                map.triggerRepaint();

                // return `true` to let the map know that the image was updated
                return true;
            }
        };
        // ----红点----

        map.on('load', function() {

            map.addImage('pulsing-dot', pulsingDot, { pixelRatio: 2 });

            map.addSource('rwanda-provinces', {
                'type': 'geojson',
                // 'data': 'https://docs.mapbox.com/mapbox-gl-js/assets/rwanda-provinces.geojson'
                'data': 'json/Export_Output.json'
            });



            map.addLayer({
                'id': 'rwanda-provinces',
                'type': 'fill',
                'source': 'rwanda-provinces',
                'layout': {},

                // 关于paint 设置3
                "paint": {
                    "fill-color": ["get", 'color'],
                    'fill-opacity': [
                        'case', ['boolean', ['feature-state', 'hover'], false],
                        1,
                        0.5
                    ]
                }


                // 关于paint 设置2
                // 'paint': {
                //     'fill-color': '#627BC1',
                //     'fill-opacity': [
                //         'case', ['boolean', ['feature-state', 'hover'], false],
                //         1,
                //         0.5
                //     ]
                // }

                // 关于paint 设置1

                // 'paint': {
                //     'fill-color': [
                //         'let',
                //         // 'density', ['/', ['get', 'population'],
                //         //     ['get', 'sq-km']
                //         // ],
                //         // [
                //         //     'interpolate', ['linear'],
                //         //     ['zoom'],
                //         //     8, [
                //         //         'interpolate', ['linear'],
                //         //         ['var', 'density'],
                //         //         274, ['to-color', '#edf8e9'],
                //         //         1551, ['to-color', '#006d2c']
                //         //     ],
                //         //     10, [
                //         //         'interpolate', ['linear'],
                //         //         ['var', 'density'],
                //         //         274, ['to-color', '#eff3ff'],
                //         //         1551, ['to-color', '#08519c']
                //         //     ]
                //         // ]
                //         'density', ['*', ['get', 'childNum'],
                //             ['get', 'id']
                //         ],
                //         [
                //             'interpolate', ['linear'],
                //             ['zoom'],
                //             8, [
                //                 'interpolate', ['linear'],
                //                 ['var', 'density'],
                //                 274, ['to-color', '#ffc5bb'],
                //                 1551, ['to-color', '#691203']
                //             ],
                //             10, [
                //                 'interpolate', ['linear'],
                //                 ['var', 'density'],
                //                 274, ['to-color', '#eff3ff'],
                //                 1551, ['to-color', '#08519c']
                //             ]
                //         ]
                //     ],
                //     // 'fill-opacity': 0.7
                //     'fill-opacity': [
                //         'case', ['boolean', ['feature-state', 'hover'], false],
                //         1,
                //         0.5
                //     ]
                // }
            });

            map.addLayer({
                'id': 'state-borders',
                'type': 'line',
                'source': 'rwanda-provinces',
                'layout': {},
                'paint': {
                    'line-color': '#627BC1',
                    'line-width': 2
                }
            });

            map.addLayer({
                'id': 'points',
                'type': 'symbol',
                'source': 'rwanda-provinces',
                'layout': {
                    'icon-image': 'pulsing-dot',
                    "text-field": ["get", "name"],
                    "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
                    "text-offset": [0, 1.25], //设置图标与图标注相对之间的距离
                    "text-anchor": "top",
                    "icon-size": ["get", "childNum"], //图标的大小
                },
                'paint': {
                    "text-halo-color": "rgb(255,255,255)",
                    "text-halo-width": 2,
                    // 'fill-opacity': 0.1
                },
            });

            var muti_chosen_mark = false;
            // When the user moves their mouse over the state-fill layer, we'll update the
            // feature state for the feature under the mouse.
            window.colorList_clear = ['rgba(255,73,51, 0.1)', 'rgba(52,152,219, 0.1)', 'rgba(244,208,63, 0.1)', 'rgba(108,52,131, 0.1)', 'rgba(255,140,51, 0.1)', 'rgba(46,204,113, 0.1)', 'rgba(41,128,185, 0.1)', 'rgba(51,183,255, 0.1)', 'rgba(51,78,255, 0.1)', 'rgba(203,51,255, 0.1)', 'rgba(148,49,38, 0.1)', 'rgba(194,53,49, 0.1)', 'rgba(47,69,84, 0.1)', 'rgba(97,160,168, 0.1)', 'rgba(212,130,101, 0.1)', 'rgba(145,199,174, 0.1)', 'rgba(116,159,131, 0.1)', 'rgba(202,134,34, 0.1)'];
            map.on('mousemove', 'rwanda-provinces', function(e) {
                // console.log(window.hl_line_mark)
                // console.log(e.features[0].properties.id)
                if (!muti_chosen_mark) {
                    if (window.hl_line_mark != e.features[0].properties.id) {
                        for (var i = 0; i < window.linetrend_option.series.length - 1; i++) {
                            // console.log(window.linetrend_option.series[i + 1].name);
                            // if (window.linetrend_option.series[i + 1].name != e.features[0].properties.name)
                            window.linetrend_option.series[i + 1].itemStyle.color = window.colorList[i]
                        }
                        window.linetrend_myChart.setOption({ series: window.linetrend_option.series }, {
                            notMerge: false
                                // replaceMerge: ['series']
                                // lazyUpdate:false
                        });
                        // console.log(hl_line_mark);
                        // console.log(e.features[0].properties)
                        // console.log(e.features[0].properties.name);
                        // console.log(window.linetrend_option.series);
                        // console.log(colorList.length);
                        // console.log(window.linetrend_option.series[1].name);
                        for (var i = 0; i < window.linetrend_option.series.length - 1; i++) {
                            // console.log(window.linetrend_option.series[i + 1].name);
                            if (window.linetrend_option.series[i + 1].name != e.features[0].properties.name)
                                window.linetrend_option.series[i + 1].itemStyle.color = window.colorList_clear[i]
                        }
                        // console.log(window.linetrend_myChart.getOption())
                        // window.linetrend_myChart.setOption(window.linetrend_option);
                        window.linetrend_myChart.setOption({ series: window.linetrend_option.series }, {
                            notMerge: false
                                // replaceMerge: ['series']
                                // lazyUpdate:false
                        });
                        window.hl_line_mark = e.features[0].properties.id;

                    }
                }

                // console.log(e.features[0])
                // console.log(hoveredStateId)
                if (!area_chosen_state[e.features[0].id]) {
                    if (e.features.length > 0) {
                        if (hoveredStateId) {
                            map.setFeatureState({
                                source: 'rwanda-provinces',
                                id: hoveredStateId
                            }, {
                                hover: false
                            });
                        }
                        hoveredStateId = e.features[0].id;
                        map.setFeatureState({
                            source: 'rwanda-provinces',
                            id: hoveredStateId
                        }, {
                            hover: true
                        });
                    }
                } else {
                    if (hoveredStateId) {
                        map.setFeatureState({
                            source: 'rwanda-provinces',
                            id: hoveredStateId
                        }, {
                            hover: false
                        });
                    }
                }
            });

            // 鼠标点击后移动到地图的提示框中，鼠标的样式变回正常模式
            map.on('mouseenter', 'rwanda-provinces', function() {
                map.getCanvas().style.cursor = 'pointer';
            });

            // When a click event occurs on a feature in the states layer, open a popup at the
            // location of the click, with description HTML from its properties.
            map.on('click', 'rwanda-provinces', function(e) {
                // new mapboxgl.Popup()
                //     .setLngLat(e.lngLat)
                //     .setHTML(e.features[0].properties.childNum)
                //     .addTo(map);

                for (var i = 0; i < window.linetrend_option.series.length - 1; i++) {
                    // console.log(window.linetrend_option.series[i + 1].name);
                    if (window.linetrend_option.series[i + 1].name == e.features[0].properties.name) {
                        // console.log(area_chosen_state[e.features[0].id])
                        if (area_chosen_state[e.features[0].id]) {
                            window.linetrend_option.series[i + 1].itemStyle.color = window.colorList_clear[i]
                        } else {
                            window.linetrend_option.series[i + 1].itemStyle.color = window.colorList[i]
                        }
                    }
                }
                // console.log(window.linetrend_myChart.getOption())
                // window.linetrend_myChart.setOption(window.linetrend_option);
                window.linetrend_myChart.setOption({ series: window.linetrend_option.series }, {
                    notMerge: false
                        // replaceMerge: ['series']
                        // lazyUpdate:false
                });



                if (!area_chosen_state[e.features[0].id]) {
                    hoveredStateId = e.features[0].id;
                    map.setFeatureState({
                        source: 'rwanda-provinces',
                        id: hoveredStateId
                    }, {
                        hover: true
                    });
                    area_chosen_state[e.features[0].id] = true;
                    muti_chosen_mark = true;
                    hoveredStateId = null;
                } else {
                    hoveredStateId = e.features[0].id;
                    map.setFeatureState({
                        source: 'rwanda-provinces',
                        id: hoveredStateId
                    }, {
                        hover: false
                    });
                    area_chosen_state[e.features[0].id] = false;
                    muti_chosen_mark = true;
                    // console.log(Object.values(area_chosen_state))
                    if (Object.values(area_chosen_state).indexOf(true) == -1) {
                        muti_chosen_mark = false;
                    }
                }

            });


            // When the mouse leaves the state-fill layer, update the feature state of the
            // previously hovered feature.
            map.on('mouseleave', 'rwanda-provinces', function() {
                if (!muti_chosen_mark) {
                    if (window.hl_line_mark != -1) {
                        // console.log(hl_line_mark);
                        for (var i = 0; i < window.linetrend_option.series.length - 1; i++) {
                            // console.log(window.linetrend_option.series[i + 1].name);
                            // if (window.linetrend_option.series[i + 1].name != e.features[0].properties.name)
                            window.linetrend_option.series[i + 1].itemStyle.color = window.colorList[i]
                        }
                        window.linetrend_myChart.setOption({ series: window.linetrend_option.series }, {
                            notMerge: false
                                // replaceMerge: ['series']
                                // lazyUpdate:false
                        });
                        window.hl_line_mark = -1;

                    }
                }

                // 如果有选中则关闭默认的鼠标移动高亮地图功能
                // if (!muti_chosen_mark) {
                if (hoveredStateId) {
                    map.setFeatureState({
                        source: 'rwanda-provinces',
                        id: hoveredStateId
                    }, {
                        hover: false
                    });
                }
                hoveredStateId = null;
                map.getCanvas().style.cursor = '';
                // }
            });



        });

        // -------------------- 一：map graph-------------------------------








        // --------------------二：linetrend graph-------------------------------


        // 基于准备好的dom，初始化echarts实例
        // var myChart = echarts.init(document.getElementById('zuoxiajiao'));
        window.linetrend_myChart = echarts.init(document.getElementById('zuoxiajiao'));


        // 指定图表的配置项和数据
        var base = +new Date(2006, 12, 30);
        // var oneDay = 24 * 3600 * 1000;
        var oneMonth = 30 * 24 * 3600 * 1000;
        // var oneYear = 12 * 30 * 24 * 3600 * 1000;
        var date = [];

        var date_set_from_json = [];
        var TownName_set_from_json = [];



        var data = [Math.random() * 300];
        var data1 = [Math.random() * 300];
        var data2 = [Math.random() * 300];
        var data3 = [Math.random() * 300];
        var data4 = [Math.random() * 300];

        // var data = [50, 100, 200, 60, 10, 200, 80, 100, 30, 200, 50, 100];
        // var data1 = [10, 200, 80, 100, 30, 200, 60, 10, 200, 80, 60, 10];

        // console.log(Math.random() * 300)
        var a;
        var predict_label;
        var predict_label_mark = 0;

        Cases_Number_Monthly.casenumbermonthly.forEach(element => {
            TownName_set_from_json.push(element['TownName']);
            a = element['Month'].split("/");
            a = a[2] + '/' + a[0] + '/' + a[1];
            date_set_from_json.push(a);
            if (predict_label_mark === 0) {
                if (element['Attributes'] === 'Predicted') {
                    predict_label = a;
                    predict_label_mark = 1
                }
            }
        });
        // 数组去重
        date_set_from_json = [...new Set(date_set_from_json)];
        // console.log(date_set_from_json)
        TownName_set_from_json = [...new Set(TownName_set_from_json)];
        // TownName_set_from_json.sort();
        // console.log(TownName_set_from_json)
        // console.log(date_set_from_json)

        // 初始化一维数组
        // var data_set_from_json = new Array(TownName_set_from_json.length);
        // 初始化2维数组
        // var data_set_from_json = new Array[TownName_set_from_json.length][date_set_from_json.length];
        // console.log(date_set_from_json.length)

        var data_set_from_json = new Array(TownName_set_from_json.length);
        for (var i = 0; i < data_set_from_json.length; i++) {
            data_set_from_json[i] = new Array(date_set_from_json.length);
        }

        Cases_Number_Monthly.casenumbermonthly.forEach(element => {
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
        });
        // console.log(data_set_from_json)

        // console.log(agency)
        // console.log(data_set_from_json)
        var series_all_sum = [];
        // var colorList = ['#FF4933', '#3498DB', '#F4D03F ', '#6C3483 ', '#FF8C33', '#2ECC71', '#2980B9', '#33B7FF', '#334EFF', '#CB33FF', '#943126', '#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622'];
        window.colorList = ['rgba(255,73,51, 1)', 'rgba(52,152,219, 1)', 'rgba(244,208,63, 1)', 'rgba(108,52,131, 1)', 'rgba(255,140,51, 1)', 'rgba(46,204,113, 1)', 'rgba(41,128,185, 1)', 'rgba(51,183,255, 1)', 'rgba(51,78,255, 1)', 'rgba(203,51,255, 1)', 'rgba(148,49,38, 1)', 'rgba(194,53,49, 1)', 'rgba(47,69,84, 1)', 'rgba(97,160,168, 1)', 'rgba(212,130,101, 1)', 'rgba(145,199,174, 1)', 'rgba(116,159,131, 1)', 'rgba(202,134,34, 1)'];
        // console.log(colorList.length)
        window.hl_line_mark = -1;

        series_all_sum.push({
            name: 'predict line',
            type: 'line',

            // 采用 Largest-Triangle-Three-Bucket 算法，可以最大程度保证采样后线条的趋势，形状和极值。
            sampling: 'lttb',
            // 线的颜色
            itemStyle: {
                color: 'rgb(255, 70, 131)'
            },
            markLine: {
                lineStyle: {
                    type: 'dashed'
                },
                data: [{
                    name: 'Predict dividing line',
                    // xAxis: '2015/4',
                    // xAxis: '2015/4/1',
                    xAxis: predict_label,
                    tooltip: {
                        formatter: '{b}: {c}'
                    }
                }, ],
                label: {
                    formatter: 'predict'
                },

            }
        })

        for (var i = 0; i < TownName_set_from_json.length; i++) {
            var series_clause = {};
            series_clause.name = TownName_set_from_json[i];
            series_clause.type = 'line';
            series_clause.symbol = 'diamond';
            series_clause.sampling = 'lttb';
            series_clause.itemStyle = {
                // color: 'rgb(255, 70, 131)'
                // color: '#1A5276'
                color: window.colorList[i]
            };
            series_clause.emphasis = {
                focus: 'series',
                blurScope: 'coordinateSystem'
            };
            series_clause.data = data_set_from_json[i];
            series_all_sum.push(series_clause);
            // console.log(series_all_sum[i])
            // console.log(series_all_sum)

        }









        for (var i = 1; i < 156; i++) {
            // var now = new Date(base += oneDay);
            var now = new Date(base += oneMonth);
            // var now = new Date(base += oneYear);
            // date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'));
            date.push([now.getFullYear(), now.getMonth()].join('/'));
            // round() 方法可把一个数字舍入为最接近的整数; 对于0.5，该方法将进行上舍入。
            data.push(Math.round((Math.random() - 0.5) * 10 + data[i - 1]));
            data1.push(Math.round((Math.random() - 0.4) * 50 + data1[i - 1]));
            data2.push(Math.round((Math.random() - 0.3) * 100 + data1[i - 1]));
            data3.push(Math.round((Math.random() - 0.2) * 150 + data1[i - 1]));
            data4.push(Math.round((Math.random() - 0.1) * 200 + data1[i - 1]));
            // data.push(Math.round(data[i - 1]));
            // data1.push(Math.round(data1[i - 1]));
        }
        // console.log(date)


        window.linetrend_option = {
            // tooltip: {
            //     trigger: 'axis',
            //     position: function(pt) {
            //         return [pt[0], '10%'];
            //     }
            // },
            tooltip: {},
            legend: {
                y: 'top',
                x: 'center',
                // 'scroll'：可滚动翻页的图例。当图例数量较多时可以使用。
                type: 'scroll',
                // 在legend里加上top属性，可直接写数字top：5，代表具体的5像素；也可以写top: ‘5%’，具体参考echarts官方文档配置手册里 legend。
                top: '9%',
                left: '30%',
                // data: ['Growth', 'Budget 2011', 'Budget 2012'],
                // itemGap: 5
            },

            title: {
                left: 'center',
                text: 'Number of case Monthly',
            },
            // toolbox: {
            //     feature: {
            //         dataZoom: {
            //             yAxisIndex: 'none'
            //         },
            //         restore: {},
            //         saveAsImage: {}
            //     }
            // },
            xAxis: {
                type: 'category',
                name: 'Month',
                boundaryGap: false,
                // data: date,
                data: date_set_from_json,
                axisLabel: {
                    formatter: function(value) {
                        a = value.split("/");
                        return a[0] + '/' + a[1]
                    }
                }
            },
            yAxis: {
                type: 'value',
                name: 'The number of case',
                // boundaryGap: [0, '100%']
                // 设置最大罪行值
                min: function(value) {
                    return value.min;
                },
                max: function(value) {
                    return value.max + 10;
                }
            },
            // dataZoom: [{
            //     type: 'inside',
            //     // 拉条一开始显示的范围
            //     start: 0,
            //     // end: 10
            //     end: 100
            // }, {
            //     start: 0,
            //     end: 10
            // }],

            dataZoom: [{
                    type: 'slider',
                    yAxisIndex: 0,
                    zoomLock: true,
                    width: 10,
                    right: 10,
                    top: 70,
                    bottom: 20,
                    start: 0,
                    end: 100,
                    handleSize: 0,
                    showDetail: false,
                }, {
                    type: 'inside',
                    id: 'insideY',
                    yAxisIndex: 0,
                    start: 95,
                    end: 100,
                    zoomOnMouseWheel: true,
                    moveOnMouseMove: true,
                    moveOnMouseWheel: true
                }, {
                    type: 'slider',
                    xAxisIndex: 0,
                    filterMode: 'weakFilter',
                    // height: 20,
                    // bottom: 0,
                    start: 0,
                    end: 100,
                    // handleIcon: 'path://M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
                    // handleSize: '80%',
                    showDetail: true
                }, {
                    type: 'inside',
                    id: 'insideX',
                    xAxisIndex: 0,
                    filterMode: 'weakFilter',
                    start: 0,
                    end: 26,
                    zoomOnMouseWheel: true,
                    moveOnMouseMove: true
                }

            ],

            series: series_all_sum

            // series: [{
            //         name: '预测线',
            //         type: 'line',

            //         // 采用 Largest-Triangle-Three-Bucket 算法，可以最大程度保证采样后线条的趋势，形状和极值。
            //         sampling: 'lttb',
            //         // 线的颜色
            //         itemStyle: {
            //             color: 'rgb(255, 70, 131)'
            //         },
            //         markLine: {
            //             lineStyle: {
            //                 type: 'dashed'
            //             },
            //             data: [{
            //                 name: '预测分割线',
            //                 xAxis: '2015/4',
            //                 tooltip: {
            //                     formatter: '{b}: {c}'
            //                 }
            //             }, ],
            //             label: {
            //                 formatter: 'predict'
            //             },

            //         }
            //     },
            //     {
            //         name: 'Qushi',
            //         type: 'line',
            //         // 标记的图形
            //         symbol: 'diamond',
            //         // 采用 Largest-Triangle-Three-Bucket 算法，可以最大程度保证采样后线条的趋势，形状和极值。
            //         sampling: 'lttb',
            //         // 线的颜色
            //         itemStyle: {
            //             color: 'rgb(255, 70, 131)'
            //         },
            //         // 聚焦
            //         emphasis: {
            //             focus: 'series',
            //             // 在开启focus的时候，可以通过blurScope配置淡出的范围,'coordinateSystem' 淡出范围为坐标系，默认使用该配置。
            //             blurScope: 'coordinateSystem'
            //         },
            //         // data: date,
            //         data: data_set_from_json[0],

            //     },
            //     {
            //         name: 'HeShun',
            //         type: 'line',
            //         symbol: 'diamond',
            //         sampling: 'lttb',
            //         itemStyle: {
            //             color: 'rgb(252, 170, 131)'
            //         },
            //         // 聚焦
            //         emphasis: {
            //             focus: 'series',
            //             // 在开启focus的时候，可以通过blurScope配置淡出的范围,'coordinateSystem' 淡出范围为坐标系，默认使用该配置。
            //             blurScope: 'coordinateSystem'
            //         },
            //         // data: data1
            //         data: data_set_from_json[1],
            //     }, {
            //         name: 'WuHe',
            //         type: 'line',
            //         // 标记的图形
            //         symbol: 'diamond',
            //         // 采用 Largest-Triangle-Three-Bucket 算法，可以最大程度保证采样后线条的趋势，形状和极值。
            //         sampling: 'lttb',
            //         // 线的颜色
            //         itemStyle: {
            //             color: 'rgb(255, 74, 101)'
            //         },
            //         // 聚焦
            //         emphasis: {
            //             focus: 'series',
            //             // 在开启focus的时候，可以通过blurScope配置淡出的范围,'coordinateSystem' 淡出范围为坐标系，默认使用该配置。
            //             blurScope: 'coordinateSystem'
            //         },
            //         // data: data2
            //         data: data_set_from_json[2],
            //     }, {
            //         name: 'XinHua',
            //         type: 'line',
            //         // 标记的图形
            //         symbol: 'diamond',
            //         // 采用 Largest-Triangle-Three-Bucket 算法，可以最大程度保证采样后线条的趋势，形状和极值。
            //         sampling: 'lttb',
            //         // 线的颜色
            //         itemStyle: {
            //             color: 'rgb(25, 20, 31)'
            //         },
            //         // 聚焦
            //         emphasis: {
            //             focus: 'series',
            //             // 在开启focus的时候，可以通过blurScope配置淡出的范围,'coordinateSystem' 淡出范围为坐标系，默认使用该配置。
            //             blurScope: 'coordinateSystem'
            //         },
            //         // data: data3
            //         data: data_set_from_json[3],
            //     }, {
            //         name: 'JieTou',
            //         type: 'line',
            //         // 标记的图形
            //         symbol: 'diamond',
            //         // 采用 Largest-Triangle-Three-Bucket 算法，可以最大程度保证采样后线条的趋势，形状和极值。
            //         sampling: 'lttb',
            //         // 线的颜色
            //         itemStyle: {
            //             color: 'rgb(235, 20, 231)'
            //         },
            //         // 聚焦
            //         emphasis: {
            //             focus: 'series',
            //             // 在开启focus的时候，可以通过blurScope配置淡出的范围,'coordinateSystem' 淡出范围为坐标系，默认使用该配置。
            //             blurScope: 'coordinateSystem'
            //         },
            //         // data: data4
            //         data: data_set_from_json[4],
            //     }


            // ]
        };

        window.linetrend_myChart.on('mousemove', function(param) {
            // console.log(window.geojson_info)
            // alert(param.seriesName); //legend的名称
            // alert(param.name); //X轴的值
            // alert(param.data); //legend的名称
            // alert(param.type); //X轴的值
            // alert(param.seriesIndex); //X轴的值
            // alert(param.dataIndex); //X轴的值
            // console.log(window.geojson_info);
            var distID = window.geojson_info[param.seriesName];
            // console.log(param.seriesName);
            // console.log(distID);
            // console.log(area_chosen_state[distID])
            if (!area_chosen_state[distID]) {
                if (distID) {
                    if (hoveredStateId) {
                        map.setFeatureState({
                            source: 'rwanda-provinces',
                            id: hoveredStateId
                        }, {
                            hover: false
                        });
                    }
                    hoveredStateId = distID;
                    map.setFeatureState({
                        source: 'rwanda-provinces',
                        id: hoveredStateId
                    }, {
                        hover: true
                    });
                }
            }
        });

        window.linetrend_myChart.on('mouseout', function(param) {

            if (hoveredStateId) {
                map.setFeatureState({
                    source: 'rwanda-provinces',
                    id: hoveredStateId
                }, {
                    hover: false
                });
            }
            hoveredStateId = null;
            map.getCanvas().style.cursor = '';
        });


        window.linetrend_myChart.on('datazoom', function(param) {
            var xAxis = linetrend_myChart.getModel().option.xAxis[0];
            // var endTime = xAxis.data[xAxis.rangeEnd];

            // 获取时间轴上有多少个节点
            // console.log(xAxis)
            // console.log(xAxis.data.length)
            var end_current_data = ''

            // 如果只拉动时间轴
            if (param.dataZoomId) {
                // console.log(param)
                end_current_data = xAxis.data[Math.round(param.end / (100 / parseInt(xAxis.data.length - 1)))]
                start_current_data = xAxis.data[Math.round(param.start / (100 / parseInt(xAxis.data.length - 1)))]
                console.log(start_current_data)
                console.log(end_current_data)
                    // 如果是对图形进行缩放
            } else {
                if (param.batch[1]) {
                    end_current_data = xAxis.data[Math.round(param.batch[1].end / (100 / parseInt(xAxis.data.length - 1)))]
                    start_current_data = xAxis.data[Math.round(param.batch[1].start / (100 / parseInt(xAxis.data.length - 1)))]
                    console.log(start_current_data)
                    console.log(end_current_data)
                }
            }
        });

        // window.linetrend_myChart.on('click', function(param) {

        //     window.linetrend_myChart.dispatchAction({
        //         type: 'legendInverseSelect'
        //     })
        //     window.linetrend_myChart.dispatchAction({
        //         type: 'legendSelect',
        //         // 图例名称
        //         name: param.seriesName
        //     })
        // });

        // 获取位置触发的函数
        // window.linetrend_myChart.getZr().on('click', params => {
        //     const pointInPixel = [params.offsetX, params.offsetY];
        //     // console.log(pointInPixel)
        //     if (window.linetrend_myChart.containPixel('grid', pointInPixel)) {
        //         let xIndex = window.linetrend_myChart.convertFromPixel({
        //             seriesIndex: 0
        //         }, [params.offsetX, params.offsetY])[0];
        //         /*事件处理代码书写位置*/
        //         // console.log(xIndex)
        //         console.log(params)
        //         let abc = window.linetrend_myChart.containPixel({
        //             seriesName: 'Beiai'
        //         }, [params.offsetX, params.offsetY]);
        //         /*事件处理代码书写位置*/
        //         console.log(abc)

        //     }
        // });


        // 使用刚指定的配置项和数据显示图表。
        // myChart.setOption(option);
        window.linetrend_myChart.setOption(window.linetrend_option);

        // myChart.on('mouseover', function(params) { // 鼠标移入
        //     // myChart.dispatchAction({
        //     //     type: 'highlight',
        //     //     seriesName: params.seriesName,
        //     // })

        //     myChart.setOption({ // 设置 鼠标移入后想要的样式
        //         series: {
        //             name: params.seriesName,
        //             symbolSize: 8,
        //             lineStyle: {
        //                 width: 8
        //             }
        //         }
        //     })
        // })

        // myChart.on('mouseout', function(params) { // 鼠标移出
        //     // myChart.dispatchAction({
        //     //     type: 'downplay',
        //     //     seriesName: params.seriesName,
        //     // })

        //     myChart.setOption({ // 将样式复原
        //         series: {
        //             name: params.seriesName,
        //             symbolSize: 2,
        //             lineStyle: {
        //                 width: 2
        //             }
        //         }
        //     })
        // })


        // 把配置项给实例对象，跟着浏览器同比例缩放
        window.addEventListener('resize', function() {
            window.linetrend_myChart.resize();
        })

        // --------------------二：linetrend graph-------------------------------
    });

})();


// (function() {

//     // 基于准备好的dom，初始化echarts实例
//     var myChart = echarts.init(document.getElementById('zuoxiajiao1'));

//     // 指定图表的配置项和数据
//     var base = +new Date(1968, 9, 3);
//     var oneDay = 24 * 3600 * 1000;
//     var date = [];

//     var data = [Math.random() * 300];

//     for (var i = 1; i < 20000; i++) {
//         var now = new Date(base += oneDay);
//         date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'));
//         data.push(Math.round((Math.random() - 0.5) * 20 + data[i - 1]));
//     }

//     option = {
//         tooltip: {
//             trigger: 'axis',
//             position: function(pt) {
//                 return [pt[0], '10%'];
//             }
//         },
//         title: {
//             left: 'center',
//             text: '大数据量面积图',
//         },
//         toolbox: {
//             feature: {
//                 dataZoom: {
//                     yAxisIndex: 'none'
//                 },
//                 restore: {},
//                 saveAsImage: {}
//             }
//         },
//         xAxis: {
//             type: 'category',
//             boundaryGap: false,
//             data: date
//         },
//         yAxis: {
//             type: 'value',
//             boundaryGap: [0, '100%']
//         },
//         dataZoom: [{
//             type: 'inside',
//             start: 0,
//             end: 10
//         }, {
//             start: 0,
//             end: 10,
//             handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
//             handleSize: '80%',
//             handleStyle: {
//                 color: '#fff',
//                 shadowBlur: 3,
//                 shadowColor: 'rgba(0, 0, 0, 0.6)',
//                 shadowOffsetX: 2,
//                 shadowOffsetY: 2
//             }
//         }],
//         series: [{
//             name: '模拟数据',
//             type: 'line',
//             smooth: true,
//             symbol: 'none',
//             sampling: 'average',
//             itemStyle: {
//                 color: 'rgb(255, 70, 131)'
//             },
//             areaStyle: {
//                 color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
//                     offset: 0,
//                     color: 'rgb(255, 158, 68)'
//                 }, {
//                     offset: 1,
//                     color: 'rgb(255, 70, 131)'
//                 }])
//             },
//             data: data
//         }]
//     };


//     // 使用刚指定的配置项和数据显示图表。
//     myChart.setOption(option);
// })();
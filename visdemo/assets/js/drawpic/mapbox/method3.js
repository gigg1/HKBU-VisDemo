    //数据为模拟数据，仅供参考
    window.onload = function() {
        addBasicMap();
        //专题数据
        window.thematicdata = [{
            "XZQH": "110000",
            "BZ3": 30.0,
            "XZQHMC": "北京市",
            "BZ2": 0.0,
            "GEOJSON": "{\"type\": \"Feature\",\"properties\": {},\"geometry\": {\"type\": \"Point\",\"coordinates\": [98.66,25.21 ]}}"
        }, {
            "XZQH": "140000",
            "BZ3": 50.0,
            "XZQHMC": "山西省",
            "BZ2": 20.0,
            "GEOJSON": "{\"type\": \"Feature\",\"properties\": {},\"geometry\": {\"type\": \"Point\",\"coordinates\": [98.43, 25.03 ]}}"
        }, {
            "XZQH": "220000",
            "BZ3": 500.0,
            "XZQHMC": "吉林省",
            "BZ2": 300.0,
            "GEOJSON": "{\"type\": \"Feature\",\"properties\": {},\"geometry\": {\"type\": \"Point\",\"coordinates\": [98.70, 24.85 ]}}"
        }, {
            "XZQH": "360000",
            "BZ3": 100.0,
            "XZQHMC": "江西省",
            "BZ2": 2000.0,
            "GEOJSON": "{\"type\": \"Feature\",\"properties\": {},\"geometry\": {\"type\": \"Point\",\"coordinates\": [98.48, 24.75]}}"
        }];
        window.thematicHeader = {
            "XZQH": "行政区划",
            "BZ3": "小学",
            "XZQHMC": "行政区划名称",
            "BZ2": "初中",
            "GEOJSON": "坐标"
        };
        //需要清理的对象
        window.echartMapPoints = [];
        window.echartInitLists = [];

        addThematicEchartLayer();

    }

    // 方法一
    //加载底图
    function addBasicMap() {
        mapboxgl.accessToken = 'pk.eyJ1Ijoic3l4LS0tIiwiYSI6ImNrazZhOXUxdDAyMTQyb3AyYWl1YjZ3cHMifQ.fziHVOJ-trhLKQbWTyax3g';
        // var map = new mapboxgl.Map({

        window.map = new mapboxgl.Map({
            container: 'map1',
            style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
            // "name": "MaZhan", "cp": [98.41, 25.18]----定位到马站县
            center: [98.41, 25.18], // starting position [lng, lat]
            zoom: 6 // starting zoom

            // center: [117.9, 33.5],
            // zoom: 4
        });
        var hoveredStateId = null;

        window.map.on('load', function() {
            window.map.addSource('rwanda-provinces', {
                'type': 'geojson',
                // 'data': 'https://docs.mapbox.com/mapbox-gl-js/assets/rwanda-provinces.geojson'
                'data': 'json/Export_Output.json'
            });
            window.map.addLayer({
                'id': 'rwanda-provinces',
                'type': 'fill',
                'source': 'rwanda-provinces',
                'layout': {},
                'paint': {
                    'fill-color': [
                        'let',
                        'density', ['*', ['get', 'childNum'],
                            ['get', 'id']
                        ],
                        [
                            'interpolate', ['linear'],
                            ['zoom'],
                            8, [
                                'interpolate', ['linear'],
                                ['var', 'density'],
                                274, ['to-color', '#ffc5bb'],
                                1551, ['to-color', '#691203']
                            ],
                            10, [
                                'interpolate', ['linear'],
                                ['var', 'density'],
                                274, ['to-color', '#eff3ff'],
                                1551, ['to-color', '#08519c']
                            ]
                        ]
                    ],
                    // 'fill-opacity': 0.7
                    'fill-opacity': [
                        'case', ['boolean', ['feature-state', 'hover'], false],
                        1,
                        0.5
                    ]
                }
            });

            window.map.addLayer({
                'id': 'state-borders',
                'type': 'line',
                'source': 'rwanda-provinces',
                'layout': {},
                'paint': {
                    'line-color': '#627BC1',
                    'line-width': 2
                }
            });

            // When the user moves their mouse over the state-fill layer, we'll update the
            // feature state for the feature under the mouse.
            window.map.on('mousemove', 'rwanda-provinces', function(e) {
                if (e.features.length > 0) {
                    if (hoveredStateId) {
                        window.map.setFeatureState({
                            source: 'rwanda-provinces',
                            id: hoveredStateId
                        }, {
                            hover: false
                        });
                    }
                    hoveredStateId = e.features[0].id;
                    window.map.setFeatureState({
                        source: 'rwanda-provinces',
                        id: hoveredStateId
                    }, {
                        hover: true
                    });
                }
            });

            // When the mouse leaves the state-fill layer, update the feature state of the
            // previously hovered feature.
            window.map.on('mouseleave', 'rwanda-provinces', function() {
                if (hoveredStateId) {
                    window.map.setFeatureState({
                        source: 'rwanda-provinces',
                        id: hoveredStateId
                    }, {
                        hover: false
                    });
                }
                hoveredStateId = null;
            });



        });
    }

    // 方法二

    //加载专题地图
    function addThematicEchartLayer() {
        //销毁echartLists
        clearEchartInstantAndPoint();
        //专题数据处理及加载到地图
        window.thematicdata.forEach(element => {
            var geojson = JSON.parse(element.GEOJSON);
            var el1 = document.createElement("div");
            el1.id = "thematicchart" + element.XZQH;
            el1.style = "height:600px;width:100px;";
            window.echartMapPoints.push(new mapboxgl.Marker(el1, {
                    offset: [-50 / 2, -50 / 2]
                })
                .setLngLat([
                    geojson.geometry.coordinates[0],
                    geojson.geometry.coordinates[1]
                ])
                .addTo(window.map));
            //echart初始化专题图
            addEchartInit(element);

        })
    }




    // 方法四
    function addEchartInit(element) {
        var data = [];
        Object.keys(window.thematicHeader).forEach(key => {
            if (key.indexOf("BZ3") != -1) {
                data.push({
                    name: window.thematicHeader[key],
                    // value: element[key]
                    value: element[key],

                });
            }

        });
        // console.log(data)
        var option1 = {
            tooltip: {
                trigger: 'item',
                formatter: "{a}<br/>{b} : {c} ({d}%)"
            },
            series: {
                name: element.XZQHMC,
                type: "pie",
                data: data,
                radius: "20%",
                center: ["50%", "50%"],
                label: {
                    normal: {
                        position: "inner",
                        fontSize: 10
                    },

                }
            }
        };
        window.echartInitLists.push(initEchart("thematicchart" + element.XZQH, option1));


    }

    // 方法五
    //初始化echart表
    function initEchart(id, options) {
        var mychart = echarts.init(document.getElementById(id));
        mychart.setOption(options);
        return mychart;
    }

    // 方法三
    //清除echart及marker
    function clearEchartInstantAndPoint() {
        window.echartInitLists.forEach(echartItem => {
            echartItem.dispose();
        });
        window.echartMapPoints.forEach(pointItem => {
            pointItem.remove();
        });
    }
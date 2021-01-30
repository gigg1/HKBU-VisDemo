// 采用立即执行函数(function(){})();
(function() {


    $.get('json/Cases Number Monthly.json', function(Cases_Number_Monthly) {

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


            // When the user moves their mouse over the state-fill layer, we'll update the
            // feature state for the feature under the mouse.
            window.colorList_clear = ['rgba(255,73,51, 0.1)', 'rgba(52,152,219, 0.1)', 'rgba(244,208,63, 0.1)', 'rgba(108,52,131, 0.1)', 'rgba(255,140,51, 0.1)', 'rgba(46,204,113, 0.1)', 'rgba(41,128,185, 0.1)', 'rgba(51,183,255, 0.1)', 'rgba(51,78,255, 0.1)', 'rgba(203,51,255, 0.1)', 'rgba(148,49,38, 0.1)', 'rgba(194,53,49, 0.1)', 'rgba(47,69,84, 0.1)', 'rgba(97,160,168, 0.1)', 'rgba(212,130,101, 0.1)', 'rgba(145,199,174, 0.1)', 'rgba(116,159,131, 0.1)', 'rgba(202,134,34, 0.1)'];
            map.on('mousemove', 'rwanda-provinces', function(e) {
                // console.log(window.hl_line_mark)
                // console.log(e.features[0].properties.id)
                if (window.hl_line_mark != e.features[0].properties.id) {
                    for (var i = 0; i < window.linetrend_option.series.length - 1; i++) {
                        // console.log(window.linetrend_option.series[i + 1].name);
                        // if (window.linetrend_option.series[i + 1].name != e.features[0].properties.name)
                        window.linetrend_option.series[i + 1].itemStyle.color = window.colorList[i]
                    }
                    window.linetrend_myChart.setOption(window.linetrend_option);
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
                    window.linetrend_myChart.setOption(window.linetrend_option);
                    window.hl_line_mark = e.features[0].properties.id;

                }

                // console.log(e.features[0])
                // console.log(hoveredStateId)
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
            });

            // 鼠标点击后移动到地图的提示框中，鼠标的样式变回正常模式
            map.on('mouseenter', 'rwanda-provinces', function() {
                map.getCanvas().style.cursor = 'pointer';
            });
            // When a click event occurs on a feature in the states layer, open a popup at the
            // location of the click, with description HTML from its properties.
            map.on('click', 'rwanda-provinces', function(e) {
                new mapboxgl.Popup()
                    .setLngLat(e.lngLat)
                    .setHTML(e.features[0].properties.childNum)
                    .addTo(map);
            });


            // When the mouse leaves the state-fill layer, update the feature state of the
            // previously hovered feature.
            map.on('mouseleave', 'rwanda-provinces', function() {
                if (window.hl_line_mark != -1) {
                    // console.log(hl_line_mark);
                    for (var i = 0; i < window.linetrend_option.series.length - 1; i++) {
                        // console.log(window.linetrend_option.series[i + 1].name);
                        // if (window.linetrend_option.series[i + 1].name != e.features[0].properties.name)
                        window.linetrend_option.series[i + 1].itemStyle.color = window.colorList[i]
                    }
                    window.linetrend_myChart.setOption(window.linetrend_option);
                    window.hl_line_mark = -1;

                }


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



        });


    });


})();
// mapboxgl.accessToken = 'pk.eyJ1Ijoic3l4LS0tIiwiYSI6ImNrazZhOXUxdDAyMTQyb3AyYWl1YjZ3cHMifQ.fziHVOJ-trhLKQbWTyax3g';
// var map = new mapboxgl.Map({
//     container: 'map1', // container id
//     style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
//     // center: [30.0222, -1.9596], // starting position [lng, lat]
//     // zoom: 7 // starting zoom
//     center: [98.41, 25.18],
//     zoom: 7
// });
// var hoveredStateId = null;

// map.on('load', function() {
//     map.addSource('rwanda-provinces', {
//         'type': 'geojson',
//         // 'data': 'https://docs.mapbox.com/mapbox-gl-js/assets/rwanda-provinces.geojson'
//         'data': 'json/Export_Output.json'
//     });



//     map.addLayer({
//         'id': 'rwanda-provinces',
//         'type': 'fill',
//         'source': 'rwanda-provinces',
//         'layout': {},
//         'paint': {
//             'fill-color': [
//                 'let',
//                 // 'density', ['/', ['get', 'population'],
//                 //     ['get', 'sq-km']
//                 // ],
//                 // [
//                 //     'interpolate', ['linear'],
//                 //     ['zoom'],
//                 //     8, [
//                 //         'interpolate', ['linear'],
//                 //         ['var', 'density'],
//                 //         274, ['to-color', '#edf8e9'],
//                 //         1551, ['to-color', '#006d2c']
//                 //     ],
//                 //     10, [
//                 //         'interpolate', ['linear'],
//                 //         ['var', 'density'],
//                 //         274, ['to-color', '#eff3ff'],
//                 //         1551, ['to-color', '#08519c']
//                 //     ]
//                 // ]
//                 'density', ['*', ['get', 'childNum'],
//                     ['get', 'id']
//                 ],
//                 [
//                     'interpolate', ['linear'],
//                     ['zoom'],
//                     8, [
//                         'interpolate', ['linear'],
//                         ['var', 'density'],
//                         274, ['to-color', '#ffc5bb'],
//                         1551, ['to-color', '#691203']
//                     ],
//                     10, [
//                         'interpolate', ['linear'],
//                         ['var', 'density'],
//                         274, ['to-color', '#eff3ff'],
//                         1551, ['to-color', '#08519c']
//                     ]
//                 ]
//             ],
//             // 'fill-opacity': 0.7
//             'fill-opacity': [
//                 'case', ['boolean', ['feature-state', 'hover'], false],
//                 1,
//                 0.5
//             ]
//         }
//     });

//     map.addLayer({
//         'id': 'state-borders',
//         'type': 'line',
//         'source': 'rwanda-provinces',
//         'layout': {},
//         'paint': {
//             'line-color': '#627BC1',
//             'line-width': 2
//         }
//     });

//     // When the user moves their mouse over the state-fill layer, we'll update the
//     // feature state for the feature under the mouse.
//     map.on('mousemove', 'rwanda-provinces', function(e) {
//         if (e.features.length > 0) {
//             if (hoveredStateId) {
//                 map.setFeatureState({
//                     source: 'rwanda-provinces',
//                     id: hoveredStateId
//                 }, {
//                     hover: false
//                 });
//             }
//             hoveredStateId = e.features[0].id;
//             map.setFeatureState({
//                 source: 'rwanda-provinces',
//                 id: hoveredStateId
//             }, {
//                 hover: true
//             });
//         }
//     });

//     // When the mouse leaves the state-fill layer, update the feature state of the
//     // previously hovered feature.
//     map.on('mouseleave', 'rwanda-provinces', function() {
//         if (hoveredStateId) {
//             map.setFeatureState({
//                 source: 'rwanda-provinces',
//                 id: hoveredStateId
//             }, {
//                 hover: false
//             });
//         }
//         hoveredStateId = null;
//     });



// });
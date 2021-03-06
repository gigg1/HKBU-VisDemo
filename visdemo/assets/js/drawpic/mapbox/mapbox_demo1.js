// mapboxgl.accessToken = 'pk.eyJ1Ijoic3l4LS0tIiwiYSI6ImNrazZhOXUxdDAyMTQyb3AyYWl1YjZ3cHMifQ.fziHVOJ-trhLKQbWTyax3g';
// var map = new mapboxgl.Map({
//     container: 'map1',
//     style: 'mapbox://styles/mapbox/streets-v11',
//     // center: [-100.486052, 37.830348],
//     // zoom: 2
//     center: [98.41, 25.18],
//     zoom: 7
// });
// var hoveredStateId = null;

// map.on('load', function() {
//     map.addSource('states', {
//         'type': 'geojson',
//         // 'data': 'https://docs.mapbox.com/mapbox-gl-js/assets/us_states.geojson'
//         'data': 'json/Export_Output.json'
//     });

//     // The feature-state dependent fill-opacity expression will render the hover effect
//     // when a feature's hover state is set to true.
//     map.addLayer({
//         'id': 'state-fills',
//         'type': 'fill',
//         'source': 'states',
//         'layout': {},
//         'paint': {
//             'fill-color': '#627BC1',
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
//         'source': 'states',
//         'layout': {},
//         'paint': {
//             'line-color': '#627BC1',
//             'line-width': 2
//         }
//     });

//     // When the user moves their mouse over the state-fill layer, we'll update the
//     // feature state for the feature under the mouse.
//     map.on('mousemove', 'state-fills', function(e) {
//         if (e.features.length > 0) {
//             if (hoveredStateId) {
//                 map.setFeatureState({
//                     source: 'states',
//                     id: hoveredStateId
//                 }, {
//                     hover: false
//                 });
//             }
//             hoveredStateId = e.features[0].id;
//             map.setFeatureState({
//                 source: 'states',
//                 id: hoveredStateId
//             }, {
//                 hover: true
//             });
//         }
//     });

//     // When the mouse leaves the state-fill layer, update the feature state of the
//     // previously hovered feature.
//     map.on('mouseleave', 'state-fills', function() {
//         if (hoveredStateId) {
//             map.setFeatureState({
//                 source: 'states',
//                 id: hoveredStateId
//             }, {
//                 hover: false
//             });
//         }
//         hoveredStateId = null;
//     });
// });
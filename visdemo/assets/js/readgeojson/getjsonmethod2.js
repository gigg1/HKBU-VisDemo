$.getJSON("json/Export_Output.json", function(data) {
    echarts.registerMap('xiamen', data);
    //定义div#map，给定width和height
    chart = echarts.init(document.getElementById('map-wrap4'));
    chart.setOption({
        series: [{
            name: 'xiamen',
            type: 'map',
            map: 'xiamen',
        }]
    });
})
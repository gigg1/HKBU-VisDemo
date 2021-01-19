$(document).ready(function() {
    $('#tengchong').click(function() {
        $.getJSON('json/TengChong.json', function(data) {
            var cell = "<ul>";
            // $.each(data.geometries[1]["coordinates"][0], function(i, n) {
            //     cell += "<li>" + n[0] + "</li>";
            // });
            $.each(data.geometries, function(i, n) {
                cell += "<li>" + n["type"] + n["coordinates"] + "</li>";
            });
            cell += "</ul>";
            $('#tengchong_result').append(cell);
        });
        return false;
    });

    $("#tengchong_hide").click(function() {
        $("#tengchong_result").hide();
    });
    $("#tengchong_show").click(function() {
        $("#tengchong_result").show();
    });


});
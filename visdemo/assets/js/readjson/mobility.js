$(document).ready(function() {
    $('#mobility').click(function() {
        $.getJSON('json/Mobility.json', function(data) {
            var cell = "<ul>";
            $.each(data.Mobility, function(i, n) {
                cell += "<li>" + n["TownName"] + "  --> " + n["TargetName"] + "  --> " + n["Probability"] + "</li>";
            });
            cell += "</ul>";
            $('#mobility_result').append(cell);
        });
        return false;
    });

    $("#mobility_hide").click(function() {
        $("#mobility_result").hide();
    });
    $("#mobility_show").click(function() {
        $("#mobility_result").show();
    });


});
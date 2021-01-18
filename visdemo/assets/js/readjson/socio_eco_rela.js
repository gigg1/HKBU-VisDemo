$(document).ready(function() {
    $('#soc_eco_rela').click(function() {
        $.getJSON('json/Socio-Economic Relativity.json', function(data) {
            var cell = "<ul>";
            $.each(data.soecorela, function(i, n) {
                cell += "<li>" + n["Socio-Economic indicators name"] + "  --> " + n["Relativity Value"] + "</li>";
            });
            cell += "</ul>";
            $('#soc_eco_rela_result').append(cell);
        });
        return false;
    });

    $("#soc_eco_rela_hide").click(function() {
        $("#soc_eco_rela_result").hide();
    });
    $("#soc_eco_rela_show").click(function() {
        $("#soc_eco_rela_result").show();
    });


});
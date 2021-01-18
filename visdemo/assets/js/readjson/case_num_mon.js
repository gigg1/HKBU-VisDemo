$(document).ready(function() {
    $('#case_num_mon').click(function() {
        $.getJSON('json/Cases Number Monthly.json', function(data) {
            var cell = "<ul>";
            $.each(data.casenumbermonthly, function(i, n) {
                cell += "<li>" + n["TownName"] + "  --> " + n["Month"] + "  --> " + n["The number of cases"] + "  --> " + n["Attributes"] + "  --> " + n["Year"] + "</li>";
            });
            cell += "</ul>";
            $('#case_num_mon_result').append(cell);
        });
        return false;
    });

    $("#case_num_mon_hide").click(function() {
        $("#case_num_mon_result").hide();
    });
    $("#case_num_mon_show").click(function() {
        $("#case_num_mon_result").show();
    });


});
(function($) {
    "use strict"

    //todo list
    $(".tdl-new").on('keypress', function(e) {

        var code = (e.keyCode ? e.keyCode : e.which);

        if (code == 13) {

            var v = $(this).val();

            var s = v.replace(/ +?/g, '');

            if (s == "") {

                return false;

            } else {

                $(".tdl-content ul").append("<li><label><input type='checkbox'><i></i><span>" + v + "</span><a href='#' class='ti-trash'></a></label></li>");

                $(this).val("");

            }

        }

    });





    $(".tdl-content a").on("click", function() {

        var _li = $(this).parent().parent("li");

        _li.addClass("remove").stop().delay(100).slideUp("fast", function() {

            _li.remove();

        });

        return false;

    });



    // for dynamically created a tags

    $(".tdl-content").on('click', "a", function() {

        var _li = $(this).parent().parent("li");

        _li.addClass("remove").stop().delay(100).slideUp("fast", function() {

            _li.remove();

        });

        return false;

    });

})(jQuery);

// LINE CHART
// Morris bar chart
(function($) {
    "use strict"
Morris.Bar({
    element: 'morris-bar-chart',
    data: [{
        y: '1',
        a: 1,
    }, {
        y: '2',
        a: 2,
    }, {
        y: '3',
        a: 4,
    }, {
        y: '4',
        a: 1,
    }, {
        y: '5',
        a: 0,
    }, {
        y: '6',
        a: 1,
    }],
        xkey: 'y',
        ykeys: ['a'],
        labels: ['A'],
        barColors: ['#FC6C8E'],
        hideHover: 'auto',
        gridLineColor: 'transparent',
        resize: true
    });

})(jQuery);

var url = location.pathname;
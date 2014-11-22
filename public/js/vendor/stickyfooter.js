// footer to the bottom
(function( $ ){
    $.fn.stickyFooter = function() {
        var footer = this;
        var positionFooter = function positionFooter() {
            var windowHeight = $(window).height();
            var bodyHeight = $("body").height();
            if (windowHeight > bodyHeight) {
                footer.css("position","absolute").css("bottom",0);
            } else {
                footer.css("position","static").css("width", "100%");
            }
        }

        positionFooter();

        $(window).resize(function() {
            $("footer").css("position","static").css("width", "100%");
            positionFooter();
        })
        $("body").resize(function(e){
            positionFooter();
        });

    };
})( jQuery );
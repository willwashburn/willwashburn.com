var ww = ww || {};



$('document').ready(function() {


    $('.sticky').waypoint(function(direction) {

        if (direction === 'down') {

            var wrapper = '<div id="sticky-wrapper" style="width:' + $(this).width() + 'px; height:' + $(this).outerHeight(true) +'px">&nbsp;</div>';

            $(this).before(wrapper).css('position', 'fixed').css('top','0');

            $(this).find('.nav').addClass('active');

        } else if (direction === 'up') {

            $('#sticky-wrapper').remove();

            $(this).find('.nav').removeClass('active');
            $(this).css('position', 'relative');
        }


        console.log(direction);
    });

    $('.tldr').waypoint(function(direction) {

    }, {
        offset: 50
    });

}); 
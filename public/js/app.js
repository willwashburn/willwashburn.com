var ww = ww || {};

ww.project_offset = 70;

$('document').ready(function() {

    $('#sticky').waypoint(function(direction) {

        if (direction === 'down') {

            var wrapper = '<div id="sticky-wrapper" style="width:' + $(this).width() + 'px; height:' + $(this).outerHeight(true) + 'px">&nbsp;</div>';

            $(this).before(wrapper);

            $(this).css('position', 'fixed').css('top', '0');
            $(this).find('.nav').addClass('active');

        } else if (direction === 'up') {

            $('#sticky-wrapper').remove();

            $(this).find('.nav').removeClass('active');
            $(this).css('position', 'relative');
        }

        console.log(direction);
    });

    $('.tldr').waypoint(function(direction) {

        if (direction === 'down') {
            $('#sticky-wrapper').hide();
            $('#sticky').find('.nav').removeClass('active');
            $('#sticky').css('position', 'relative').appendTo('.projects');

            $('.head-pop').animate({

            });

        } else if (direction === 'up') {
            $('#sticky-wrapper').show();
            $('#sticky').find('.nav').addClass('active');
            $('#sticky').prependTo('.projects').css('position', 'fixed');
        }

    }, {
        offset: 150
    });


    $('.divider-socialblendr').waypoint(function(direction) {

        toggleNav('socialblendr', direction, '');
    }, {
        offset: ww.project_offset
    });

    $('.divider-connectedgreek').waypoint(function(direction) {

        toggleNav('connectedgreek', direction, 'socialblendr');
    }, {
        offset: ww.project_offset
    });

    $('.divider-finewines').waypoint(function(direction) {

        toggleNav('finewines', direction, 'connectedgreek');
    }, {
        offset: ww.project_offset
    });

    $('.divider-willigant').waypoint(function(direction) {

        toggleNav('willigant', direction, 'finewines');
    }, {
        offset: ww.project_offset
    });

    $('.divider-tugolearn').waypoint(function(direction) {

        toggleNav('tugolearn', direction, 'willigant');
    }, {
        offset: ww.project_offset
    });

    $('.divider-gvlater').waypoint(function(direction) {

        toggleNav('gvlater', direction, 'tugolearn');
    }, {
        offset: ww.project_offset
    });

    $('.divider-thecampusbutler').waypoint(function(direction) {

        toggleNav('thecampusbutler', direction, 'gvlater');
    }, {
        offset: ww.project_offset

    });
});


var toggleNav = function(project, direction, above) {

        $('.nav .active').removeClass('active');
        $('.projects .row .active').removeClass('active');

        if (direction === 'down') {
            $('#nav-' + project).addClass('active');
            $('.content-' + project).addClass('active');


        } else if (direction === 'up') {
            $('#nav-' + above).addClass('active');
            $('#nav-' + project).removeClass('active');

            $('.content-' + project).removeClass('active');
            $('.content-' + above).addClass('active');
        }

    };;/*var WillWashburn = new Marionette.Application();

WillWashburn.addRegions({
	header:'#header',
	main:'#main',
	footer:'#footer'
});

WillWashburn.on('initialize:after', function() {
	Backbone.history.start();
}); 
*/
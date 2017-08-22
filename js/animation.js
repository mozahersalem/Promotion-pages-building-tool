$(document).ready(function() {
    setTimeout(function () {
        $('body').show().addClass('animated fadeIn');}, 100
    );
    setTimeout(function () {
        $('.logo').show().addClass('animated bounceInDown');}, 200
    );
    setTimeout(function () {
        $('button').show().addClass('animated zoomIn');}, 500
    );

    setTimeout(function () {
        $('.txtbx').show().addClass('animated bounceInUp');}, 900
    );

    setTimeout(function () {
        $('button').show().removeClass('zoomin');}, 1500
    );
	setTimeout(function () {
        $('.subbtn').show().addClass('pulsethis');}, 1500
    );
});

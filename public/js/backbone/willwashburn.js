var WillWashburn = new Marionette.Application();

WillWashburn.addRegions({
	header:'#header',
	main:'#main',
	footer:'#footer'
});

WillWashburn.on('initialize:after', function() {
	Backbone.history.start();
}); 
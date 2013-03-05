var express = require('express'),
    path = require('path'),
    mongoose = require('mongoose'),
    router = require('./routes'),
    config = require('./config');


var app = express();

app.configure(function() {

    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);

    app.use(function(req, res, next) {
        console.log('%s %s', req.method, req.url);
        next();
    });

    app.use(express.static(__dirname + '../../public'));

    app.use(express.errorHandler({
        dumpExceptions: true,
        showStack: true
    }));

});

router(app);

var port = process.env.PORT || config.port;

app.listen(port, function() {
    console.log('Express server listening on port %d in %s mode', port, app.settings.env);
});
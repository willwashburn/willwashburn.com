var express = require('express'),
    _ = require('underscore'),
    path = require('path'),
    fs = require('fs'),
    mongoose = require('mongoose'),
    hbs = require('express-hbs'),
    router = require('./routes'),
    config = require('./config');

var app = express();

app.configure(function() {

    app.use(express.bodyParser());
    app.use(express.methodOverride());


    //Use handlebars.js
    app.engine('html', hbs.express3({
        partialsDir: __dirname + config.view_path + '/partials',
        layoutsDir: __dirname + config.view_path + '/layouts',
        defaultLayout: __dirname + config.view_path + '/layouts/public.html'
    }));

    app.set('view engine', 'html');
    app.set('views', __dirname + config.view_path);

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


    app.use(function(req, res, next) {
        res.status(404);
        res.render('errors/404', {
            status: 404,
            url: req.url
        });
    });


});

router(app);

var port = process.env.PORT || config.port;
app.listen(port, function() {
    console.log('Express server listening on port %d in %s mode', port, app.settings.env);
});
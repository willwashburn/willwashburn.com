var express = require('express'),
    path = require('path'),
    fs = require('fs'),
    mongoose = require('mongoose'),
    hbs = require('hbs'),
    router = require('./routes'),
    config = require('./config');


var app = express();

app.configure(function() {

    app.use(express.bodyParser());
    app.use(express.methodOverride());

    //Use handlebars.js
    app.set('view engine', 'html');
    app.set('views',__dirname + '/views/layouts/');

    app.engine('html', require('hbs').__express);

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
        res.render('public', {
            status: 404,
            url: req.url
        });
    });
});


//Register Partials
var partialsDir = __dirname + '/views/partials';

var partials = fs.readdirSync(partialsDir);

partials.forEach(function (filename) {
  var matches = /^([^.]+).html$/.exec(filename);
  if (!matches) {
    return;
  }
  var name = matches[1];
  var template = fs.readFileSync(partialsDir + '/' + filename, 'utf8');
  hbs.registerPartial(name, template);
});


router(app);

var port = process.env.PORT || config.port;
app.listen(port, function() {
    console.log('Express server listening on port %d in %s mode', port, app.settings.env);
});
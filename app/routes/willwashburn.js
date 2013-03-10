var database = require('../data'),
    skills = require('../collections/skills'),
    _ = require('underscore');

//Routes
module.exports = function(app) {

    app.get('/', function(req, res) {

        skills.prepare(['blue','red','green'], database.skills);

        res.render('index', skills);
    });

};
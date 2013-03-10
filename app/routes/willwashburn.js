var database = require('../data'),
    skills = require('../collections/skills'),
    _ = require('underscore');

//Routes
module.exports = function(app) {

    app.get('/', function(req, res) {

        skills.prepare_set('blue', database.skills);
        skills.prepare_set('red', database.skills);
        skills.prepare_set('green', database.skills);

        res.render('index', skills.data);
    });

};
module.exports = function(app) {

    app.get('/', function(req, res) {

        res.render('foundation', {
            status: 404,
        });
    });

};
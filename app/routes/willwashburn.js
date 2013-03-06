module.exports = function(app) {

    app.get('/', function(req, res) {

        res.render('public', {
            status: 404,
            partials: {
                main_content: 'foundation'
            }
        });
    });

};
module.exports = function(app) {

    var config = require('../config').tumblr,
        _ = require('underscore'),
        Tumblr = require('tumblr').Tumblr,

    app.get('/blog', function(req, res) {

        var blog = new Tumblr(config.blog, config.consumer_key);

        blog.text({
            limit: 1
        }, function(error, response) {

            post = _.first(response.posts);

            if (req.xhr) {
                res.send(post);
            } else {
                res.render('blog', post);

            }
        });

    });

    app.get('/instagram', function(req, res) {

    });


};
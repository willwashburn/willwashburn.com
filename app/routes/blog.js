module.exports = function(app) {

    var config  = require('../config'),
        _       = require('underscore'),
    	Tumblr  = require('tumblr').Tumblr,
        request = require('request');

    app.get('/blog', function(req, res) {

        var blog = new Tumblr(
        	config.tumblr.blog,
        	config.tumblr.consumer_key
        );

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

};

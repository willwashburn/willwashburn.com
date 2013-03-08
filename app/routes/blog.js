module.exports = function(app) {

    var config = require('../config'),
        _ = require('underscore'),
        Tumblr = require('tumblr').Tumblr,
        request = require('request');

    app.get('/blog', function(req, res) {

        var blog = new Tumblr(config.tumblr.blog, config.tumblr.consumer_key);

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

        request({
            uri: config.instagram.api + 'users/' + config.instagram.user_id + '/media/recent?access_token=' + config.instagram.access_token
        }, function(error, response, body) {

            if (!error && response.statusCode == 200) {

            	

               var latest_photo = JSON.parse(body);


                res.send(_.first(latest_photo.data));

            }

        });

    });


};
var config = require('../config'),
    database = require('../data'),
    skills = require('../collections/skills'),
    Twit = require('twit'),
    request = require('request'),
    _ = require('underscore'),
    moment = require('moment');

//lol wut
//probably should clean this up
module.exports = function(app) {

    app.get('/', function(req, res) {

        var response = {};

        skills.prepare(['blue', 'red', 'green'], database.skills);

        response.skills = skills;

        request({
            uri: config.instagram.api + 'users/' + config.instagram.user_id + '/media/recent?access_token=' + config.instagram.access_token
        }, function(error, response, body) {

            if (!error && response.statusCode == 200) {


                response.photos = JSON.parse(body);

                var T = new Twit({
                    consumer_key: config.twitter.consumer_key,
                    consumer_secret: config.twitter.consumer_secret,
                    access_token: config.twitter.access_token,
                    access_token_secret: config.twitter.access_token_secret
                });


                T.get('statuses/user_timeline', {
                    screen_name: config.screen_name,
                    count: 3
                }, function(err, reply) {

                    var tweets = [];
                    _.each(reply, function(raw_tweet) {
                        var tweet = {};
                        if (raw_tweet.retweeted_status) {
                            tweet.img = raw_tweet.retweeted_status.user.profile_image_url;
                            tweet.username = raw_tweet.retweeted_status.user.screen_name;
                            tweet.tweet = raw_tweet.retweeted_status.text;
                            tweet.retweeted = true;
                        } else {
                            tweet.username = raw_tweet.user.screen_name;
                            tweet.img = raw_tweet.user.profile_image_url;
                            tweet.tweet = raw_tweet.text;
                            tweet.retweeted = false;
                        }

                        tweet.time_distance = moment(raw_tweet.created_at, 'ddd MMM DD HH:mm:ss Z YYYY').calendar();

                        tweets.push(tweet);
                    });

                    response.tweets = tweets;

                    res.render('index', response);

                });


            }

        });

    });

    app.get('/branded', function(req, res) {
        res.render('branded');
    });

};
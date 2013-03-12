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
            uri: config.instagram.api + 'users/' + config.instagram.user_id + '/media/recent?count=10&access_token=' + config.instagram.access_token
        }, function(error, response, body) {

            if (!error && response.statusCode == 200) {


                var photo_feed = JSON.parse(body);


                photos = [];

                _.each(photo_feed.data, function(ig) {
                    var photo = {};

                    photo.img_src = ig.images.thumbnail.url;

                    photos.push(photo);
                });

                var blank_photo = {
                    "img_src": false
                };

                var photo_set_1 = photos.splice(0, 4);
                photos.unshift(blank_photo);
                var photo_set_2 = photos.splice(0, 4);
                photos.unshift(blank_photo, blank_photo);
                var photo_set_3 = photos.splice(0, 4);
                photos.unshift(blank_photo,blank_photo,blank_photo);

                response.instagram = [{
                    "photos": photo_set_1
                }, {
                    "photos": photo_set_2
                }, {
                    "photos": photo_set_3
                }, {
                    "photos": photos
                }];






            }

            var T = new Twit({
                consumer_key: config.twitter.consumer_key,
                consumer_secret: config.twitter.consumer_secret,
                access_token: config.twitter.access_token,
                access_token_secret: config.twitter.access_token_secret
            });


            T.get('statuses/user_timeline', {
                screen_name: config.screen_name,
                count: 4
            }, function(err, reply) {

                var tweets = [];
                _.each(reply, function(raw_tweet) {
                    var tweet = {},
                        hashtag_regexp = /#([a-zA-Z0-9]+)/g,
                        username_regexp = /@([a-zA-Z0-9]+)/g;

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

                    tweet.tweet = tweet.tweet.replace(hashtag_regexp, '<span class="hashtag">#$1</span>');
                    tweet.tweet = tweet.tweet.replace(username_regexp, '<span class="at-name">@$1</span>');

                    tweets.push(tweet);
                });

                response.tweets = tweets;

                res.render('index', response);

            });

        });

    });

    app.get('/branded', function(req, res) {
        res.render('branded');
    });

};
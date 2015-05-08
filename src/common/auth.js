var OAuth = require('oauth').OAuth;
var cli = require('../cli');

var oauth = new OAuth(
    'https://api.twitter.com/oauth/request_token',
    'https://api.twitter.com/oauth/access_token',
    cli.config.get('consumerKey'),
    cli.config.get('consumerSecret'),
    '1.0',
    null,
    'HMAC-SHA1'
);

exports.getRequestToken = function (callback) {
    oauth.getOAuthRequestToken(function (err, requestToken, requestTokenSecret) {
        if (err) {
            return callback(err);
        }
        callback(null, requestToken, requestTokenSecret);
    });
};

exports.getAccessToken = function (requestToken, requestTokenSecret, pin, callback) {
    oauth.getOAuthAccessToken(requestToken, requestTokenSecret, pin, function (err, accessToken, accessTokenSecret, params) {
        if (err) {
            return callback(err);
        }
        callback(null, accessToken, accessTokenSecret, params);
    });
};

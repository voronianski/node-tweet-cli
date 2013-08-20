var OAuth = require('oauth').OAuth;

var oauth = new OAuth(
	'http://api.twitter.com/oauth/request_token',
	'http://api.twitter.com/oauth/access_token',
	'aTiLjvl8MuW9MG12DXng',
	'b2ceLIWbvrO6Xj8VkZ6NxPIwu3e4dHSSvHa0QjGA',
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

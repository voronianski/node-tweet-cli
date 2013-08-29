var request = require('request');

var API = 'https://api.twitter.com/1.1';

exports.post = function (tweet, user, options, callback) {
	if (!tweet || typeof tweet !== 'string') {
		return callback('Tweet message is not specified.');
	}

	if (!user) {
		return callback('Twitter account is not specified.');
	}

	if (typeof options === 'function') {
		callback = options;
		options = {};
	}

	var uri = API + '/statuses/update.json?status=' + encodeURIComponent(tweet);
	var headers = { 'Content-Type': 'application/json', 'User-Agent': 'node-tweet-cli' };

	var oauth = {
		consumer_key: 'aTiLjvl8MuW9MG12DXng',
		consumer_secret: 'b2ceLIWbvrO6Xj8VkZ6NxPIwu3e4dHSSvHa0QjGA',
		token: user.accessToken,
		token_secret: user.accessTokenSecret
	};

	request.post({ uri: uri, headers: headers, oauth: oauth, json: true }, callback);
};

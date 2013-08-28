var request = require('request');

var API = 'https://api.twitter.com/1.1';

request.defaults({
	headers: { 'Content-Type': 'application/json', 'User-Agent': 'node-tweet-cli' },
	json: true
});

exports.post = function (tweet, user, callback) {
	if (!tweet || typeof tweet !== 'string') {
		return callback('Tweet message is not specified.');
	}

	if (!user) {
		return callback('Twitter account is not specified.');
	}

	var uri = API + '/statuses/update.json?status=' + encodeURIComponent(tweet);
	var oauth = {
		consumer_key: 'aTiLjvl8MuW9MG12DXng',
		consumer_secret: 'b2ceLIWbvrO6Xj8VkZ6NxPIwu3e4dHSSvHa0QjGA',
		token: user.accessToken,
		token_secret: user.accessTokenSecret
	};

	request.post({ uri: uri, oauth: oauth }, callback);
};

var request = require('request');
var cli = require('../cli');

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
		consumer_key: cli.config.get('consumerKey'),
		consumer_secret: cli.config.get('consumerSecret'),
		token: user.accessToken,
		token_secret: user.accessTokenSecret
	};

	request.post({ uri: uri, headers: headers, oauth: oauth, json: true }, callback);
};

var request = require('request');
var cli = require('../cli');
var db = require('../common/db');
var errorHandler = require('../common/errors');

var create = function () {
	db.getActiveUser(function (err, user) {
		if (err) {
			return errorHandler(err);
		}

		if (!user) {
			cli.log.warn('Please login with ' + '`tweet login`'.magenta + ' command to be able to create tweets.');
			process.exit();
		}

		cli.log.info('Type your tweet below (max 140 symbols):');
		cli.prompt.get('tweet', function (err, result) {
			if (err) {
				return errorHandler(err);
			}

			cli.log.info(result.tweet.toString());
		});
	});
};

create.usage = [
	'The ' + '`tweet create`'.magenta + ' command allows you to post tweets',
	'into your @twitter account',
	'',
	'Usage:'.cyan.bold.underline,
	'',
	' tweet create'
];

module.exports = create;
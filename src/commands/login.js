var colors = require('colors');
var cli = require('../cli');
var auth = require('../auth');

var login = module.exports = function () {
	cli.log.info('Start sending request to https://twitter.com');

	auth.getRequestToken(function (err, requestToken, requestTokenSecret) {
		if (err) {
			return cli.log.error(err);
		}

		cli.log.info('Success! Please visit in your browser: ');
		cli.log.info(('https://twitter.com/oauth/authorize?oauth_token=' + requestToken).grey);
		cli.prompt.get('PIN', function (err, result) {
			cli.log.info('PIN is' + result.PIN);
			cli.log.info('TODO: getAccessToken with this PIN and save to nedb');
		});
	});
};

login.usage = [
	'The ' + '`tweet login`'.magenta + ' command manages such flow:',
	'',
	'1. It returns link ' + 'http://twitter.com/oauth/authorize?oauth_token=..'.grey,
	'2. Copy it and visit in a favourite browser of your own',
	'3. Authorize to twitter and get a PIN',
	'4. Enter PIN in the terminal prompt',
	'5. Voilà! You are able to tweet from your terminal :)',
	'',
	'Usage:'.cyan.bold.underline,
	'',
	' tweet login'
];

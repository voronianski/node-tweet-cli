var opener = require('opener');
var cli = require('../cli');
var auth = require('../common/auth');
var db = require('../common/db');
var errorHandler = require('../common/errors');

var login = function () {
    cli.log.info('Start sending request to https://twitter.com');

    auth.getRequestToken(function (err, requestToken, requestTokenSecret) {
        if (err) {
            return errorHandler(err);
        }

        var url = 'https://twitter.com/oauth/authorize?oauth_token=' + requestToken;

        cli.log.info('Success! Please visit this link in your favourite browser:');
        cli.log.info(url.grey);

        if (process.env.NODE_ENV !== 'test') {
            opener(url);
        }

        cli.log.info('Enter received PIN below:');
        cli.prompt.get('pin', function (err, result) {
            if (err) {
                return errorHandler(err);
            }

            var pin = result && result.pin.toString().trim();
            auth.getAccessToken(requestToken, requestTokenSecret, pin, function (err, accessToken, accessTokenSecret, params) {
                if (err && err.statusCode === 401) {
                    return errorHandler(err, 'Sorry, but PIN number is incorrect');
                } else if (err) {
                    return errorHandler(err);
                }

                var doc = {
                    accessToken: accessToken,
                    accessTokenSecret: accessTokenSecret,
                    username: params.screen_name,
                    user_id: params.user_id,
                    active: true
                };

                db.saveActiveUser(doc, function (err) {
                    if (err) {
                        return errorHandler(err, 'Error occured while saving user');
                    }
                    var username = ('@' + doc.username).magenta;
                    cli.log.info('Hi, ' + username + '! You successfully logged in to your ' + 'twitter'.grey + ' account.');
                });
            });
        });
    });
};

login.usage = [
    'The ' + '`tweet login`'.magenta + ' command manages such flow:',
    '',
    '1. It returns link ' + 'http://twitter.com/oauth/authorize?oauth_token=..'.grey,
    '2. Copy it and visit in a favourite browser of your own',
    '3. Authorize twitter and get a PIN',
    '4. Enter PIN in the terminal prompt',
    '5. Voilà! You are able to tweet from your terminal :)',
    '',
    'Usage:'.cyan.bold.underline,
    '',
    ' tweet login'
];

module.exports = login;

var cli = require('../cli');
var api = require('../common/api');
var db = require('../common/db');
var errorHandler = require('../common/errors');

var stream = function (query) {
    db.getActiveUser(function (err, user) {
        if (err) {
            return errorHandler(err);
        }

        if (!user) {
            cli.log.warn('Please login with ' + '`tweet login`'.magenta + ' command to be able to create tweets.');
            process.exit();
        }


        api.stream(query, user, function(tweet) {
            if (tweet && tweet.user) {
                if (cli.argv.json) {
                    console.log(JSON.stringify(tweet));
                } else {
                    console.log(
                        ('@' + tweet.user.screen_name + ':').cyan.bold,
                        tweet.text.replace(/[\n\r]+/g, '')
                    );
                }
            }
        });
    });
};

module.exports = stream;

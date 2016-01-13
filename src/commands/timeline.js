var cli = require('../cli');
var api = require('../common/api');
var db = require('../common/db');
var errorHandler = require('../common/errors');

var stream = function () {
    db.getActiveUser(function (err, user) {
        if (err) {
            return errorHandler(err);
        }

        if (!user) {
            cli.log.warn('Please login with ' + '`tweet login`'.magenta + ' command to be able to create tweets.');
            process.exit();
        }


        api.timeline(user, function(tweet) {
            if (!tweet || !tweet.user) {
                return;
            }

            if (cli.argv.json) {
                console.log(JSON.stringify(tweet));
                return;
            }

            var tweetUserName = ('@' + tweet.user.screen_name + ':').cyan.bold;
            var tweetText = cli.argv['keep-new-lines'] ? tweet.text : tweet.text.replace(/[\n\r]+/g, '¬');

            console.log(tweetUserName, tweetText);
        });
    });
};

module.exports = stream;

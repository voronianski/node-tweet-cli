var readline = require('readline');
var cli = require('../cli');
var api = require('../common/api');
var db = require('../common/db');
var errorHandler = require('../common/errors');

var read = function () {
    db.getActiveUser(function (err, user) {
        if (err) {
            return errorHandler(err);
        }

        if (!user) {
            cli.log.warn('Please login with ' + '`tweet login`'.magenta + ' command to be able to create tweets.');
            process.exit();
        }

        var rl = readline.createInterface(process.stdin, process.stdout);

        rl.on('line', function (tweet) {
            postTweet(tweet.slice(0, 140));
        });

        function postTweet (tweet) {
            api.post(tweet, user, function (err) {
                if (err) {
                    return errorHandler(err);
                }
                cli.log.info('Success! Your tweet was published from ' + 'stdin'.magenta + '.');
                rl.close();
            });
        }
    });
};

read.usage = [
    'The ' + '`tweet read`'.magenta + ' command posts to twitter',
    'but reads from stdin, enabling use with scripting.',
    '',
    'Usage:'.cyan.bold.underline,
    '',
    ' your_script | tweet read',
    ' tweet read < someInput'
];

module.exports = read;

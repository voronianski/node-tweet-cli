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


        api.stream(query, user, function(err, tweet) {
            if (err) {
                return errorHandler(err);
            }
            if (tweet.user) {
                var obj = {
                    id: tweet.id,
                    user: tweet.user.screen_name,
                    text: tweet.text,
                };
                if (cli.argv.json) {
                    console.log(JSON.stringify(obj));
                } else {
                    console.log('@'+obj.user+':',obj.text.replace(/[\n\r]+/g,''));
                }
            }
        });
    });
};

module.exports = stream;
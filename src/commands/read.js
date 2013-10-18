var cli = require('../cli');
var api = require('../common/api');
var db = require('../common/db');
var errorHandler = require('../common/errors');
var readline = require('readline');

var readTweet = function () {
  db.getActiveUser(function (err, user) {
    if (err) {
      return errorHandler(err);
    }

    if (!user) {
      cli.log.warn('Please login with ' +
        '`tweet login`'.magenta +
          ' command first, before trying to tweet.');
      process.exit();
    }
    /**
     * Asynchronously posts to Twitter.
     *
     * @param {string} tweet
     *     Message to be posted. Note: should be no greater than 140
     *     characters.
     */
    var postTweet = function (tweet) {
      api.post(tweet, user, function (err, response, body) {
        if (err) {
          return errorHandler(err);
        }
        if (body.errors) {
          err = body.errors[0];
          var msg = err.code === 186 ?
                    'Oops! Your tweet is over 140 characters.' :
                    null;
          return errorHandler(err, msg);
        }
      });
    }

    var rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    rl.on('line', function(tweet) {
      postTweet(tweet.slice(0, 140));
      rl.close();
    });
  });
};

readTweet.usage = [
  'The ' + '`tweet read`'.magenta + ' command is identical to ',
  '`create`'.magenta + ', but reads from stdin, enabling use with scripting.',
  'eg: ' + '`your_script | tweet read`'.magenta

  'Usage:'.cyan.bold.underline,
  '',
  ' echo "usage test" | tweet read'
  ' tweet read < someInput'
];

module.exports = readTweet;

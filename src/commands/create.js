var cli = require('../cli');
var api = require('../common/api');
var db = require('../common/db');
var errorHandler = require('../common/errors');

var create = function (query) {
    db.getActiveUser(function (err, user) {
        if (err) {
            return errorHandler(err);
        }

        if (!user) {
            cli.log.warn('Please login with ' + '`tweet login`'.magenta + ' command to be able to create tweets.');
            process.exit();
        }

        if (!query || typeof query !== 'string') {
          cli.log.info('Type your tweet below (max 280 symbols):');
          cli.prompt.get('tweet', function (err, result) {
              if (err) {
                  return errorHandler(err);
              }

              api.post(result.tweet.toString(), user, function (err, response, body) {
                  if (err) {
                      return errorHandler(err);
                  }
                  if (body.errors) {
                      err = body.errors[0];
                      return errorHandler(err, (err.code === 186 ? 'Oops! Your tweet is over 280 characters.' : null));
                  }
                  cli.log.info('Success! Your tweet was published.');
              });
          });
        } else {
          api.post(query, user, function (err, response, body) {
              if (err) {
                  return errorHandler(err);
              }

              if (body.errors) {
                  err = body.errors[0];
                  return errorHandler(err, (err.code === 186 ? 'Oops! Your tweet is over 280 characters.' : null));
              }
              cli.log.info('Success! Your tweet was published.');
          });
        }
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

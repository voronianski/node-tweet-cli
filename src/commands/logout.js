var cli = require('../cli');
var db = require('../common/db');
var errorHandler = require('../common/errors');

var logout = function () {
    db.removeActiveUser(function (err, num) {
        if (err) {
            return errorHandler(err, 'Error occured while unauthorizing user');
        }

        if (!num) {
            cli.log.warn('There is no twitter account to unauthorize!');
            cli.log.info('Use ' + '`tweet login`'.magenta + ' command to be able to create tweets.');
            return;
        }

        cli.log.info('Twitter account was unauthorized!');
    });
};

logout.usage = [
    'The ' + '`tweet logout`'.magenta + ' command unauthorizes',
    'your @twitter account from node-tweet-cli',
    '',
    'Usage:'.cyan.bold.underline,
    '',
    ' tweet logout'
];

module.exports = logout;

var cli = require('../cli');
var db = require('../common/db');
var errorHandler = require('../common/errors');

var whoami = function () {
    db.getActiveUser(function (err, user) {
        if (err) {
            return errorHandler(err);
        }

        if (!user) {
            cli.log.warn('Please login with ' + '`tweet login`'.magenta + ' command to be able to create tweets.');
            process.exit();
        }

        cli.log.info('@' + user.username);
    });
};

module.exports = whoami;

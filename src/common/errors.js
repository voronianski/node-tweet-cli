var cli = require('../cli');

module.exports = function (error, message) {
    error = JSON.stringify(error, '', '\t');
    message = message || 'Error while executing command!';

    cli.log.error(message);

    if (cli.argv.debug) {
        throw new Error(error);
    }
};

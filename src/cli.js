/**
 * node-tweet-cli app
 * http://pixelhunter.me
 * (c) 2013-2015 MIT Licensed
 */

var path = require('path');
var colors = require('colors');
var flatiron = require('flatiron');

var app = module.exports = flatiron.app;

require('pkginfo')(module, 'name', 'version');

app.config.file({ file: path.join(__dirname, '..', '.config.json') });

app.use(flatiron.plugins.cli, {
    version: true,
    usage: require('./common/usage.js'),
    source: path.join(__dirname, 'commands'),
    argv: {
        version: {
            alias: 'v',
            description: 'print version of tweet-cli app and exit',
            string: true
        },
        colors: {
            description: 'use --no-colors to disable coloring output',
            default: true,
            boolean: true
        },
        debug: {
            alias: 'd',
            description: 'print full traceback when error occurs',
            default: false,
            boolean: true
        }
    }
});

app.start = function (callback) {
    app.argv.colors || (colors.mode = 'none');

    app.init(function (err) {
        if (err) {
            return callback(err);
        }

        app.router.dispatch('on', app.argv._.join(' '), app.log, function (err) {
            callback(err);
        });
    });
};

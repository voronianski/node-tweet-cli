/**
 * node-tweet-cli app
 * http://pixelhunter.me
 * (c) 2013 MIT Licensed
 */

var flatiron = require('flatiron');
var colors = require('colors');
var path = require('path');

var app = module.exports = flatiron.app;

require('pkginfo')(module, 'name', 'version');

app.use(flatiron.plugins.cli, {
	version: true,
	source: path.join(__dirname, 'commands'),
	usage: require('./usage.js'),
	argv: {
		version: {
			alias: 'v',
			description: 'print version of tweet-cli app and exit'
		},
		debug: {
			alias: 'd',
			description: 'print full traceback when error occurs'
		}
	}
});

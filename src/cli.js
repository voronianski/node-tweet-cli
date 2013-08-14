/**
 * node-tweet-cli app
 * http://pixelhunter.me
 * (c) 2013 MIT Licensed
 */

var flatiron = require('flatiron');
var colors = require('colors');
var path = require('path');

var app = flatiron.app;

app.use(flatiron.plugins.cli, {
	source: path.join(__dirname, 'commands'),
	usage: require('./usage.js'),
	argv: {
		version: {
			alias: 'v',
			description: 'print version of tweet app and exit'
		}
	}
});

module.exports = app;

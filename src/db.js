var Datastore = require('nedb');
var homedir = require('userhome');

var db = module.exports = new Datastore({
	filename: homedir('.tweetuser.db'),
	autoload: true
});

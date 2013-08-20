var Datastore = require('nedb');
var homedir = require('userhome');

var db = exports.db = new Datastore({
	filename: homedir('.tweetuser.db'),
	autoload: true
});

exports.saveActiveUser = function (data, callback) {
	db.update({ active: true }, data, { upsert: true }, function (err, doc) {
		if (err) {
			return callback(err);
		}

		return callback(null, doc);
	});
};

exports.removeActiveUser = function (callback) {

};

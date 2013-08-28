var Datastore = require('nedb');
var homedir = require('userhome');

var db = exports.db = new Datastore({
	filename: homedir('.tweetuser.db'),
	autoload: true
});

exports.saveActiveUser = function (data, callback) {
	exports.getActiveUser(function (err, doc) {
		if (err) {
			return callback(err);
		}
		if (!doc) {
			return db.insert(data, callback);
		}
		db.update({ active: true }, data, callback);
	});
};

exports.getActiveUser = function (callback) {
	db.findOne({ active: true }, callback);
};

exports.removeActiveUser = function (callback) {
	db.remove({ active: true }, callback);
};

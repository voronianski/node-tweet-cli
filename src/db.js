var Datastore = require('nedb');
var homedir = require('userhome');

var db = exports.db = new Datastore({
	filename: homedir('.tweetuser.db'),
	autoload: true
});

exports.saveActiveUser = function (data, callback) {
	// consider the flow due to bug (newvermind to slowliness in this case):
	// db.findOne({ active: true }) ->
	// if no results make db.insert(newDoc)
	// else make db.update({ active: true }, doc) without upsert;
	// 2 db requests (Insert: 5,950 ops/s + Find: 25,440 ops/s = ~31 ops/s) - faster then
	//
	// another possible solution:
	// delete active user before saving
	// db.removeActiveUser(function () { db.saveActiveUser(); });
	// 2 db requests (Update: 4,490 ops/s + Remove: 6,620 ops/s = ~11 ops/s)
	db.update({ username: { $exists: true } }, data, { upsert: true }, function (err, doc) {
		if (err) {
			return callback(err);
		}

		return callback(null, doc);
	});
};

exports.removeActiveUser = function (callback) {

};

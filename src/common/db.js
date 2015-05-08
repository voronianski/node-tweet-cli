var Datastore = require('nedb');
var homedir = require('userhome');

exports.db = new Datastore({
    filename: homedir('.tweetuser.db'),
    autoload: true
});

exports.initDB = function (filePath, autoload) {
    this.db = new Datastore({
        filename: filePath,
        autoload: autoload
    });
};

exports.saveActiveUser = function (data, callback) {
    this.db.update({ active: true }, data, { upsert: true }, callback);
};

exports.getActiveUser = function (callback) {
    this.db.findOne({ active: true }, callback);
};

exports.removeActiveUser = function (callback) {
    this.db.remove({ active: true }, callback);
};

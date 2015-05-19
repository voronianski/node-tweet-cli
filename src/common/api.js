var request = require('request');
var cli = require('../cli');
var es = require('event-stream');

var API = 'https://api.twitter.com/1.1';
var STREAMAPI = 'https://stream.twitter.com/1.1';
var USERSTREAMAPI = 'https://userstream.twitter.com/1.1';

exports.post = function (tweet, user, options, callback) {
    if (!tweet || typeof tweet !== 'string') {
        return callback('Tweet message is not specified.');
    }

    if (!user) {
        return callback('Twitter account is not specified.');
    }

    if (typeof options === 'function') {
        callback = options;
        options = {};
    }

    var uri = API + '/statuses/update.json?status=' + fullURIEncode(tweet);
    var headers = { 'Content-Type': 'application/json', 'User-Agent': 'node-tweet-cli' };

    var oauth = {
        consumer_key: cli.config.get('consumerKey'),
        consumer_secret: cli.config.get('consumerSecret'),
        token: user.accessToken,
        token_secret: user.accessTokenSecret
    };

    request.post({ uri: uri, headers: headers, oauth: oauth, json: true }, callback);
};

exports.stream = function (query, user, options, callback) {
    if (!query || typeof query !== 'string') {
        return callback('Query is not specified.');
    }

    if (!user) {
        return callback('Twitter account is not specified.');
    }

    if (typeof options === 'function') {
        callback = options;
        options = {};
    }

    var uri = STREAMAPI + '/statuses/filter.json?track=' + fullURIEncode(query);
    var headers = { 'Content-Type': 'application/json', 'User-Agent': 'node-tweet-cli' };

    var oauth = {
        consumer_key: cli.config.get('consumerKey'),
        consumer_secret: cli.config.get('consumerSecret'),
        token: user.accessToken,
        token_secret: user.accessTokenSecret
    };

    request.post({ uri: uri, headers: headers, oauth: oauth, json: true })
    .pipe(es.map(function (buffer, cb) {
        cb(null, buffer.toString('utf8'));
    }))
    .pipe(es.split(function (str) {
        //silently skip parsing errors to keep the stream running
        try {
            return JSON.parse(str);
        } catch(e) {
            if (str !== '') {
                cli.log.error('Parsing error:' + str + '\n');
            }
        }
    }))
    .on('data', function (data) {
        callback(data);
    });
};

exports.timeline = function (user, options, callback) {
    if (!user) {
        return callback('Twitter account is not specified.');
    }

    if (typeof options === 'function') {
        callback = options;
        options = {};
    }

    var uri = USERSTREAMAPI + '/user.json?with=followings';
    var headers = { 'Content-Type': 'application/json', 'User-Agent': 'node-tweet-cli' };

    var oauth = {
        consumer_key: cli.config.get('consumerKey'),
        consumer_secret: cli.config.get('consumerSecret'),
        token: user.accessToken,
        token_secret: user.accessTokenSecret
    };

    request.post({ uri: uri, headers: headers, oauth: oauth, json: true })
    .pipe(es.map(function (buffer, cb) {
        cb(null, buffer.toString('utf8'));
    }))
    .pipe(es.split(function (str) {
        //silently skip parsing errors to keep the stream running
        try {
            return JSON.parse(str);
        } catch(e) {
            if (str !== '') {
                cli.log.error('Parsing error:' + str + '\n');
            }
        }
    }))
    .on('data', function (data) {
        callback(data);
    });
};

function fullURIEncode (str) {
    return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/\*/g, '%2A');
}

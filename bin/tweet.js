#!/usr/bin/env node

var tweet = require('../src/cli.js');

tweet.start(function (err) {
    if (!err) {
        tweet.log.info('tweet-cli app is ok.'.grey);
    }

    process.exit(err ? 1 : 0);
});

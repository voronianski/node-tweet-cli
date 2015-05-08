# node-tweet-cli

[![build status](http://img.shields.io/travis/voronianski/node-tweet-cli.svg)](https://travis-ci.org/voronianski/node-tweet-cli)
[![npm version](http://badge.fury.io/js/node-tweet-cli.svg)](http://badge.fury.io/js/node-tweet-cli)
[![Download Count](https://img.shields.io/npm/dm/node-tweet-cli.svg)](http://www.npmjs.com/package/node-tweet-cli)

> Small node.js cli tool that allows to tweet from bash, zsh, whatever..

http://ascii.io/a/5633

<img src="http://38.media.tumblr.com/6b3cef8108e46dc8faa7527afcdbb626/tumblr_inline_mvspg1d3qY1qfhayr.gif" width="500" />

## How to use it

Install module globally:

```bash
npm install -g node-tweet-cli
```

You will be able to use ``tweet`` command in your shell.

Start with authorizing your twitter account and start tweeting :)

## Commands to use

There are description of available commands here:

### tweet login

The ``tweet login`` command manages authorization flow. It redirects you to ``http://twitter.com/oauth/authorize?oauth_token=..`` where you need to login and get a PIN. Enter PIN in the terminal prompt and "voilà!" - you are able to tweet from your terminal.

```bash
tweet login
```

### tweet logout

The ``tweet logout`` command unauthorizes your twitter account from node-tweet-cli.

```bash
tweet logout
```

### tweet create (or tweet new)

The ``tweet create`` command allows you to post tweets into your twitter account. You will be prompted to type a message.

```bash
tweet create
```

or alias:

```bash
tweet new
```

### tweet read

The ``tweet read`` command posts message to twitter but reads it from ``stdin``, enabling use with scripting.

```bash
echo "your tweet message" | tweet read
```

or

```bash
tweet read < yourInputFile
```

### tweet whoami

The ``tweet whoami`` command shows current twitter account name.

```bash
tweet whoami
```

### tweet stream <query> [options]

Streams tweets to the console, optionally as json.

```bash
tweet stream twitter
```

or

```bash
tweet stream twitter --json
```

**Warning** The latter option dumps *a lot* of json in your console. Make sure your console is able to keep up, or (preferably) pipe to another utility. The latter is actually the use case this option is designed for.

### tweet timeline [options]

Streams your timeline to the console, optionally as json.

```bash
tweet timeline
```

or

```bash
tweet timeline --json
```

## To do

- tweeting with images

## Contribution

If you have suggestions or found a bug please create an issue [here](https://github.com/voronianski/node-tweet-cli/issues). Thanks!

---
(c) 2013-2015 MIT License

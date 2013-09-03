# node-tweet-cli

Small tool that will help you make tweets from your console.

## How to use it

Install module globally:

```bash
$: npm install -g node-tweet-cli
```

You will be able to use ``tweet`` commands in your shell.

Authorize with your twitter account and start tweeting from bash, zhs, whatever :)

## Commands to use

There are few commands here:

### tweet login

The ``tweet login`` command manages such flow:

1. It redirects you to ``http://twitter.com/oauth/authorize?oauth_token=..``
2. Authorize twitter and get a PIN
3. Enter PIN in the terminal prompt
4. Voilà! You are able to tweet from your terminal

```bash
$: tweet login
```

### tweet logout

The ``tweet logout`` command unauthorizes your @twitter account from node-tweet-cli.'

```bash
$: tweet logout
```

### tweet create

This command allows you to post tweets into your @twitter account. You will be prompted to type a message.

```bash
$: tweet create
```

### tweet whoami

This command simply shows current twitter account.

```bash
$: tweet whoami
```

## To do

## Contribution

---
(c) 2013 MIT License
# node-tweet-cli

Small tool that allows to tweet from bash, zhs, whatever..

## How to use it

Install module globally:

```bash
$: npm install -g node-tweet-cli
```

You will be able to use ``tweet`` command in your shell.

Start with authorizing your twitter account and start tweeting :)

## Commands to use

There are description of available commands here:

### tweet login

The ``tweet login`` command manages authorization flow. It redirects you to ``http://twitter.com/oauth/authorize?oauth_token=..`` where you need to login and get a PIN. Enter PIN in the terminal prompt and "voilà!" - you are able to tweet from your terminal.

```bash
$: tweet login
```

### tweet logout

The ``tweet logout`` command unauthorizes your twitter account from node-tweet-cli.'

```bash
$: tweet logout
```

### tweet create

This command allows you to post tweets into your twitter account. You will be prompted to type a message.

```bash
$: tweet create
```

### tweet whoami

This command simply shows current twitter account.

```bash
$: tweet whoami
```

## To do

- Tests!
- tweeting with images

## Contribution

---
(c) 2013 MIT License
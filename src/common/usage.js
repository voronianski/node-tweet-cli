require('colors');

module.exports = [
    '                                        '.cyan,
    '                             IIII       '.cyan,
    '                  ZZ~      ?IIIIII?     '.cyan,
    '            : I7=?+Z$$$7ZI7IIIII  ,I:   '.cyan,
    '            ,7+?IIII$$$$IIIIIIII, III7, '.cyan,
    '               +?IIIIIIIIIIIIIIIIIII,   '.cyan,
    '                 I7IIIIIIIIIIIIIIII     '.cyan,
    '                  IIIIIIIIIII?+:,=I     '.cyan,
    '               =?IIIIIIIIIII:::::::     '.cyan,
    '  ,=       ,=IIIIIIIIIIIII:::::,:,      '.cyan,
    '    ~?I??IIIIIIIIIIIIIIII:::,:::        '.cyan,
    '       +?IIIIIIIIIIIIIII:::::::         '.cyan,
    '          ~IIIIIIIIIIIII:::::           '.cyan,
    '                ~?IIIIII=               '.cyan,
    '                                        '.cyan,
    'Simple tool for making tweets from the shell',
    'https://github com/voronianski/node-tweet-cli',
    'author: <dmitri.voronianski@gmail.com>',
    '',

    'Usage:'.cyan.bold.underline,
    '',

    'To log into your twitter account'.cyan,
    ' tweet login',
    '',

    'To log out from your twitter account'.cyan,
    ' tweet logout',
    '',

    'To start tweeting'.cyan,
    ' tweet create',
    '',

    'To start tweeting from STDIN'.cyan,
    ' tweet read',
    '',

    'To start streaming from twitter'.cyan,
    ' tweet stream "keyword"',
    'or'.cyan,
    ' tweet stream "keyword" --json',
    'Warning: The latter option dumps a lot of json in your console.',
    '',

    'To start streaming your timeline'.cyan,
    ' tweet timeline',
    'or'.cyan,
    ' tweet timeline --keep-new-lines',
    'or'.cyan,
    ' tweet timeline --json',
    'Warning: The latter option dumps a lot of json in your console.',
    '',

    'To check what account do you use'.cyan,
    ' tweet whoami'
];

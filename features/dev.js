// test commands

register('command', (args) => {
    Client.showTitle(args, '', 1, 30,   1);
}).setName('titlesim').setAliases('tsim');


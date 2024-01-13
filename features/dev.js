// test commands

register('command', (args) => {
    Client.showTitle(args, '', 1, 30, 1);
    data.audioInst.playDefaultSound();
}).setName('titlesim').setAliases('tsim');

////////////////////////////////
// ali's tab thing [WIP]
// sends message for accurate level detection
////////////////////////////////

// ah filter
let attributeAliases = {
    "blazing_fortune": "bf", 
    "breeze": "brz", 
    "life_regeneration": "lr", 
    "lifeline": "ll", 
    "magic_find": "mf", 
    "mana_pool": "mp", 
    "mana_regeneration": "mr", 
    "vitality": "vit", 
    "speed": "spd", 
    "veteran": "vet", 
    "fishing_experience": "fe", 
    "infection": "inf", 
    "double_hook": "dh", 
    "fisherman": "fm", 
    "fishing_speed": "tfs", 
    "hunter": "ht", 
    "trophy_hunter": "th"
}

register('chat', (event) => {
    setTimeout(() => {
        ChatLib.command(`msg mlgplush elo blub`)
    }, 1)
}).setCriteria('Friend > MLGPlush joined.');
import Settings from "../settings.js"
import { data } from '../utils/data.js'
import { getTabArea } from '../utils/functions.js'

// let chosenMessage = '';
let currArea = '';
register('step', () => { if (!data.inSkyblock) return; currArea = getTabArea(); }).setFps(1);


////////////////////////////////
// ali's tab thing [WIP]
// sends message for accurate level detection
////////////////////////////////
function getFilteredPlayerTabNames() {
    return TabList.getNames()
        .filter(name => /\[.*\]/.test(name))
        .map(name => name.split(' ')[1].removeFormatting());
}


register('command', () => {
    const playerTabNames = getFilteredPlayerTabNames();
    const filteredNames = Array.from(new Set(playerTabNames));
    console.log(filteredNames)
}).setName('gettabnames');

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
    "fishing_speed": "fs", 
    "hunter": "ht", 
    "trophy_hunter": "th"
}

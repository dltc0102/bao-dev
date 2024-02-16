/// <reference types="../../../CTAutocomplete" />
/// <reference lib="es2015" />

import Settings from "../../settings.js";
import Audio from "../../utils/audio.js";

import { getInSkyblock, getInDungeon, playSound } from "../../utils/functions.js";
import { registerWhen, showAlert, timeThis } from "../../utils/utils";
import { sendMessage, stripRank } from "../../utils/party.js";


///////////////////////////////////////////////////////////////////////////////
// FUNCTIONS
///////////////////////////////////////////////////////////////////////////////
const Instant = Java.type('java.time.Instant');

const paAudio = new Audio();

const essenceFormat = {
    'Diamond': '&b', 
    'Gold': '&e', 
    'Dragon': '&a', 
    'Ice': '&3', 
    'Spider': '&5', 
    'Undead': '&4', 
    'Wither': '&8',
};

function determineEss(essence) {
    return essenceFormat[essence] || ''; // handle unknown essence
}

function shouldHandlePlayerActions() {
    return Settings.dungeonPlayerActions && getInDungeon() && getInSkyblock() && World.isLoaded();
}


///////////////////////////////////////////////////////////////////////////////
// TOGGLE: PLAYER ACTIONS
///////////////////////////////////////////////////////////////////////////////
const playerActionsMsgs = [
    // abilities
    /.+ is ready to use! Press DROP to activate it!/, 
    /Used .+!/,
    /.+ is ready!/, 
    /Your .+ hit .+ enemy for .+ damage\./, 
    /Your .+ hit .+ enemies for .+ damage\./, 
    /Your .+ ULTIMATE .+ is now available/,
    /.+ is now available!/,
    /Your fairy healed you for .+ health!/,

    // revives
    / ❣ .+ was revived/, 
    / ❣ You are reviving .+!/,
    / ❣ .+ is reviving .+!/, 
    / ❣ .+ was revived by .+!/, 
    / ❣ .+ was revived by .+ the Fairy!/, 
    /.+ the Fairy: .+/, 

    // obtained item messages
    /.+ has obtained .+!/, 
    /You found a journal named .+!/, 
    /You found a Secret Redstone Key!/, 
    /RARE DROP! .+ \(\+.+% ✯ Magic Find\)/, 
    /.+ has obtained .+ Ice Spray Wand!/, 

    // essence
    /.+ found a Wither Essence! Everyone gains an extra essence!/, 
    /ESSENCE! .+ found x.+ .+ Essence!/, 

    // creeper veil
    /Creeper Veil .+!/, 

    // decoys
    /Decoy deployed!/, 
    /It was a dud\./, 

    // dungeon opened essence message
    /.+ unlocked .+ Essence x.+/,
]

playerActionsMsgs.forEach(msg => {{
    registerWhen('chat', timeThis("registerChat cancel playerActionsMsgs", (event) => {
        cancel(event);
    }), () => shouldHandlePlayerActions()).setCriteria(msg);
}});


///////////////////////////////////////////////////////////////////////////////
// ICE SPRAY PING
///////////////////////////////////////////////////////////////////////////////

registerWhen('chat', timeThis("registerChat player has obtained tiny ice spray wand", (playerName, reforge, event) => {
    sendMessage(`${playerName} has obtained ${reforge} Ice Spray Wand!`);
    showAlert('&3[!] &fIce Spray Wand &3[!]');
    playerName === Player.getName() ? playSound() : paAudio.playDefaultSound();
}), () => shouldHandlePlayerActions()).setCriteria('${playerName} has obtained ${reforge} Ice Spray Wand!');


///////////////////////////////////////////////////////////////////////////////
// ESSENCE MESSAGES
///////////////////////////////////////////////////////////////////////////////
registerWhen('chat', timeThis("registerChat player found a wither essence message", (playerName, event) => {
    ChatLib.chat('&8&l+1 Essence');
}), () => shouldHandlePlayerActions()).setCriteria('${playerName} found a Wither Essence! Everyone gains an extra essence!');

registerWhen('chat', timeThis("registerChat essence! player found x1 wither essence", (playerName, numEss, typeEss, event) => {
    ChatLib.chat(`${determineEss(typeEss)}&l+${numEss} Essence`);
}), () => shouldHandlePlayerActions()).setCriteria('ESSENCE! ${playerName} found x${numEss} ${typeEss} Essence!');


///////////////////////////////////////////////////////////////////////////////
// CREEPER VEIL ACTIONS
///////////////////////////////////////////////////////////////////////////////
registerWhen('chat', timeThis("registerChat creeper veil status", (status, event) => {
    if (status === 'Activated') ChatLib.chat('&aCreeper Veil: &r&lON');
    if (status === 'De-activated') ChatLib.chat('&aCreeper Veil: &7&lOFF');
}), () => shouldHandlePlayerActions()).setCriteria('Creeper Veil ${status}!');


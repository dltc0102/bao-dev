import Settings from "../../settings.js";

import { getInSkyblock, getInDungeon, playSound } from "../../utils/functions.js";
import { registerChatWhen, showAlert } from "../../utils/utils";
import { sendMessage, stripRank } from "../../utils/party.js";


///////////////////////////////////////////////////////////////////////////////
// FUNCTIONS
///////////////////////////////////////////////////////////////////////////////
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
    registerChatWhen(register('chat', (event) => {
        cancel(event);
    }).setCriteria(msg), () => shouldHandlePlayerActions());
}});

///////////////////////////////////////////////////////////////////////////////
// ICE SPRAY PING
///////////////////////////////////////////////////////////////////////////////
registerChatWhen(register('chat', (playerName, reforge, event) => {
    sendMessage(`${playerName} has obtained ${reforge} Ice Spray Wand!`);
    showAlert('&3[!] &fIce Spray Wand &3[!]');
    stripRank(playerName) === Player.getName() ? playSound() : dungeonCleanAudio.playDefaultSound();
}).setCriteria('${playerName} has obtained ${reforge} Ice Spray Wand!'), () => shouldHandlePlayerActions());


///////////////////////////////////////////////////////////////////////////////
// ESSENCE MESSAGES
///////////////////////////////////////////////////////////////////////////////
registerChatWhen(register('chat', (playerName, event) => {
    ChatLib.chat('&8&l+1 Essence');
}).setCriteria('${playerName} found a Wither Essence! Everyone gains an extra essence!'), () => shouldHandlePlayerActions());

registerChatWhen(register('chat', (playerName, numEss, typeEss, event) => {
    ChatLib.chat(`${determineEss(typeEss)}&l+${numEss} Essence`);
}).setCriteria('ESSENCE! ${playerName} found x${numEss} ${typeEss} Essence!'), () => shouldHandlePlayerActions());


///////////////////////////////////////////////////////////////////////////////
// CREEPER VEIL ACTIONS
///////////////////////////////////////////////////////////////////////////////
registerChatWhen(register('chat', (status, event) => {
    if (status === 'Activated') ChatLib.chat('&aCreeper Veil: &r&lON');
    if (status === 'De-activated') ChatLib.chat('&aCreeper Veil: &7&lOFF');
}).setCriteria('Creeper Veil ${status}!'), () => shouldHandlePlayerActions());
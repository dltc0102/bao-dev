/// <reference types="../../../CTAutocomplete" />
/// <reference lib="es2015" />

import Settings from "../../config1/settings.js";

import { registerWhen, timeThis } from "../../utils/utils";
import { getInSkyblock, getInDungeon } from "../../utils/functions";


///////////////////////////////////////////////////////////////////////////////
// FUNCTIONS
///////////////////////////////////////////////////////////////////////////////
const Instant = Java.type('java.time.Instant');

const milestoneNums = {
    '❶': 1, 
    '❷': 2, 
    '❸': 3, 
    '❹': 4, 
    '❺': 5, 
    '❻': 6, 
    '❼': 7, 
    '❽': 8, 
    '❾': 9
};

function determineMS(icon) {
    return milestoneNums[icon] || 0; // handle unknown milestone
}

function sendMSMessage(msClass, milestone) {
    let ms = determineMS(milestone);
    ms !== 9 ? ChatLib.chat(`&6&l${msClass} Milestone ${ms} Reached`) : ChatLib.chat(`&6&lMaxed ${msClass} Milestone Reached`);
}

function shouldHandleInteractiveElements() {
    return Settings.dungeonInteractiveElements && getInDungeon() && getInSkyblock() && World.isLoaded();
}
///////////////////////////////////////////////////////////////////////////////
// TOGGLE: INTERACTIVE ELEMENTS
///////////////////////////////////////////////////////////////////////////////
const interactiveElementMsgs = [
    // npc dialogue
    /\[NPC\] .+/, 

    // milestone messages
    /.+ Milestone .+: .+/,

    // door messages
    /A Wither key has picked up!/, 
    /.+ has obtained Wither Key!/, 
    /.+ has obtained Blood Key!/, 
    /.+ opened a WITHER door!/, 
    /RIGHT CLICK on a WITHER door to open it. This key can only be used to open 1 door!/,
    /RIGHT CLICK on the BLOOD DOOR to open it. This key can only be used to open 1 door!/, 
    /A shiver runs down your spine\.\.\./, 
    /You hear something open\.\.\./,
    /You hear the sound of something opening\.\.\./, 
    /The BLOOD DOOR has been opened!/, 
    
    // boss messages
    /\[BOSS\] .+/, 
    /\[SKULL\] .+/, 
    /\[STATUE\] .+/, 

    // floor specific messages
    // all floors
    /.+'s .+ hit you for .+ damage\./, 
    /.+'s .+ hit you for .+ true damage\./, 

    // f1
    // f2
    // f3
    /⚠ .+ ⚠/, 
    /⚡ .+ ⚡/, 

    // f4
    /The Spirit Chicken's lightning struck you for .+ damage\./, 
    /A Chicken Mine exploded, hitting you for .+ damage./, 
    /A Spirit Bear has appeared!/, 
    /\[CROWD\] .+/, 

    // f5
    // f6
    /.+ Giant hit you with .+ for .+ damage!/, 

    // f7
    /.+\/2 Energy Crystals are now active!/, 
    /The Energy Laser is charging up!/, 
    /The gate will open in 5 seconds!/, 
    /The gate has been destroyed!/, 
    /The Crystal withers your soul as you hold it in your hands!/, 
    /The .+ Atomizing Ray hit you for .+ damage\./, 
    /.+ struck you for .+!/,

    // blessing messages
    /.+ has obtained a Blessing of .+! (.+m .+s)/, 
    /DUNGEON BUFF! .+/, 
    /Also granted you .+\./, 
    /Granted you .+\./, 

    // puzzle messages
    /PUZZLE SOLVED! .+ tied Tic Tac Toe! Good job!/,
    /PUZZLE SOLVED! .+ wasn't fooled by .+! Good job!/, 
    /PUZZLE FAIL! The Creeper Bomb exploded! You took too long! Yikes!/, 
    /PUZZLE FAIL! .+ was fooled by .+! Yikes!/, 
    /PUZZLE FAIL! .+ killed a Blaze in the wrong order! Yikes!/, 
    /\[BOMB\] Creeper: .+/,

    // mob damage messages
    /A .+ exploded, hitting you for .+ damage\./, 
    /The .+ struck you for .+ damage!/, 
    /Your bone plating reduced the damage you took by .+/, 
    /The .+ used .+ on you!/, 

    // auto recombs
    /Your Auto Recombobulator recombobulated .+!/, 
]

interactiveElementMsgs.forEach(msg => {
    registerWhen('chat', (event) => {
        cancel(event);
    }, () => shouldHandleInteractiveElements()).setCriteria(msg);
})


///////////////////////////////////////////////////////////////////////////////
// MILESTONE MESSAGES (CLASS SPECIFIC)
///////////////////////////////////////////////////////////////////////////////
// damage (bers, mage)
registerWhen('chat', timeThis("registerChat class specific milestone message", (msClass, milestone, stuff, event) => {
    sendMSMessage(msClass, milestone);
}), () => shouldHandleInteractiveElements()).setCriteria('${msClass} Milestone ${milestone}: ${stuff}').setContains();


///////////////////////////////////////////////////////////////////////////////
// WITHER KEY/DOOR MESSAGES
///////////////////////////////////////////////////////////////////////////////
registerWhen('chat', timeThis("registerChat wither key obtained message", (event) => {
    ChatLib.chat('&aWither Key Obtained.');
}), () => shouldHandleInteractiveElements()).setCriteria('A Wither key has picked up!');


///////////////////////////////////////////////////////////////////////////////
// BLOOD KEY/DOOR MESSAGES
///////////////////////////////////////////////////////////////////////////////
let bloodPlayer = '';
registerWhen('chat', timeThis("registerChat player has obained blood key message", (playerName, event) => {
    bloodPlayer = playerName;
    ChatLib.chat('&cBlood Key Obtained.');
}), () => shouldHandleInteractiveElements()).setCriteria('${playerName} has obtained Blood Key!');

registerWhen('chat', timeThis("registerChat player has opened blood door message", (event) => {
    ChatLib.chat(`&c&l${bloodPlayer} opened the Blood Door!`);
}), () => shouldHandleInteractiveElements()).setCriteria('The BLOOD DOOR has been opened!');


///////////////////////////////////////////////////////////////////////////////
// BOSS MESSAGES
///////////////////////////////////////////////////////////////////////////////
registerWhen('chat', timeThis("registerChat [BOSS] The Watcher Dialogue", (host, dialogue, event) => {
    if (dialogue === 'That will be enough for now.' || dialogue === 'You have proven yourself. You may pass.') {
        ChatLib.chat(`&c[BOSS]&r The Watcher: ${dialogue}`)
    }
}), () => shouldHandleInteractiveElements()).setCriteria("[BOSS] ${host}: ${dialogue}");


///////////////////////////////////////////////////////////////////////////////
// ALL CRYSTALS PLACED NOTI
///////////////////////////////////////////////////////////////////////////////
registerWhen('chat', timeThis("registerChat all energy crystals placed", (numCrystals, event) => {
    if (numCrystals === '2') ChatLib.chat('&a&lAll Energy Crystals Placed!');
}), () => shouldHandleInteractiveElements()).setCriteria('${numCrystals}/2 Energy Crystals are now active!');


///////////////////////////////////////////////////////////////////////////////
// DUNGEON BUFF MESSAGE
///////////////////////////////////////////////////////////////////////////////
registerWhen('chat', timeThis("registerChat dungeon buff! blessing of Blah message", (playerName, blessing, time, event) => {
    ChatLib.chat(`&6&lDUNGEON BUFF! &dBlessing of ${blessing}!`);
}), () => shouldHandleInteractiveElements()).setCriteria('DUNGEON BUFF! ${playerName} found a Blessing of ${blessing}! (${time})');


///////////////////////////////////////////////////////////////////////////////
// PUZZLE COMP MESSAGES
///////////////////////////////////////////////////////////////////////////////
registerWhen('chat', timeThis("registerChat tic tac toe completed message", (event) => {
    ChatLib.chat('&a&lTic Tac Toe Completed!');
}), () => shouldHandleInteractiveElements()).setCriteria('PUZZLE SOLVED! ${playerName} tied Tic Tac Toe! Good job!');

registerWhen('chat', timeThis("registerChat three weirdos completed message", (event) => {
    ChatLib.chat('&a&lThree Weirdos Completed!');
}), () => shouldHandleInteractiveElements()).setCriteria("PUZZLE SOLVED! ${playerName} wasn't fooled by ${npcName}! Good job!");


///////////////////////////////////////////////////////////////////////////////
// PUZZLE FAIL MESSAGES
///////////////////////////////////////////////////////////////////////////////
registerWhen('chat', timeThis("registerChat bomb defusal fail message", (event) => {
    ChatLib.chat(`&c&lPUZZLE FAIL! &f&lBOMB DEFUSE`);
}), () => shouldHandleInteractiveElements()).setCriteria('PUZZLE FAIL! The Creeper Bomb exploded! You took too long! Yikes!');

registerWhen('chat', timeThis("registerChat three weirdos fail message", (playerName, npc, event) => {
    ChatLib.chat(`&c&lPUZZLE FAIL! &f&lTHREE WEIRDOS &7(${playerName})`);
}), () => shouldHandleInteractiveElements()).setCriteria('PUZZLE FAIL! ${playerName} was fooled by ${npc}! Yikes!');

registerWhen('chat', timeThis("registerChat blaze puzzle fail message", (playerName, event) => {
    ChatLib.chat(`&c&lPUZZLE FAIL! &f&lBLAZE &7(${playerName})`);
}), () => shouldHandleInteractiveElements()).setCriteria('PUZZLE FAIL! ${playerName} killed a Blaze in the wrong order! Yikes!');


///////////////////////////////////////////////////////////////////////////////
// BOMB PUZZLE MESSAGES
///////////////////////////////////////////////////////////////////////////////
registerWhen('chat', timeThis("registerChat bomb defusal countdown messages", (message, event) => {
    if (message === "That's a fine pair of loot chests! You better hurry or I'll explode and destroy them!") {
        ChatLib.chat(`&a&l[BOMB] &r&aCreeper: &f&lPUZZLE STARTED!`);
        
    }
    if (message === "I'm starting to get excited! In 30s, I'm going to ruin your day!") {
        ChatLib.chat(`&a&l[BOMB] &r&aCreeper: &c&l30s Left!`);
    } 
}), () => shouldHandleInteractiveElements()).setCriteria('[BOMB] Creeper: ${message}').setContains();
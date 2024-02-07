import Settings from '../settings.js';
import Audio from '../utils/audio.js';

import { importantItems } from '../utils/utils.js';
import { playSound } from '../utils/functions.js';
import { getInDungeon } from '../utils/functions.js';

////////////////////////////////////////////////////////////////////////////////
// SETUP CONSTS
////////////////////////////////////////////////////////////////////////////////
const dungeonCleanAudio = new Audio();

const essenceFormat = {
    'Diamond': '&b', 
    'Gold': '&e', 
    'Dragon': '&a', 
    'Ice': '&3', 
    'Spider': '&5', 
    'Undead': '&4', 
    'Wither': '&8',
};

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


////////////////////////////////////////////////////////////////////////////////
// FUNCTIONS
////////////////////////////////////////////////////////////////////////////////
function determineEss(essence) {
    return essenceFormat[essence] || ''; // handle unknown essence
}

function determineMS(icon) {
    return milestoneNums[icon] || 0; // handle unknown milestone
}

function shouldHandleDungeonMsgs() {
    return getInDungeon() && Settings.betterDungeonMsgs;
}

function handleDungeonMessage(event, givenSetting, message, alert) {
    if (!shouldHandleDungeonMsgs()) return;
    cancel(event);
    if (givenSetting && message) ChatLib.chat(message);
    if (alert) showAlert(alert);
}

function sentMSMessage(msClass, milestone) {
    let ms = determineMS(milestone);
    ms !== 9 ? ChatLib.chat(`&6&l${msClass} Milestone ${ms} Reached`) : ChatLib.chat(`&6&lMaxed ${msClass} Milestone Reached`);
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
    register('chat', (event) => {
        handleDungeonMessage(event, Settings.dungeonPlayerActions);
    }).setCriteria(msg);
}});

// ice spray ping
register('chat', (playerName, reforge, event) => {
    handleDungeonMessage(event, Settings.dungeonPlayerActions, `${playerName} has obtained ${reforge} Ice Spray Wand!`, '&3[!] &fIce Spray Wand &3[!]');
    playerName === Player.getName() ? playSound() : dungeonCleanAudio.playDefaultSound();
}).setCriteria('${playerName} has obtained ${reforge} Ice Spray Wand!');

// Essence Messages
register('chat', (playerName, event) => {
    ChatLib.chat('&8&l+1 Essence');
}).setCriteria('${playerName} found a Wither Essence! Everyone gains an extra essence!');

register('chat', (playerName, numEss, typeEss, event) => {
    ChatLib.chat(`${determineEss(typeEss)}&l+${numEss} Essence`)
}).setCriteria('ESSENCE! ${playerName} found x${numEss} ${typeEss} Essence!');

// Creeper Veil Actions
register('chat', (status, event) => {
    if (status === 'Activated') ChatLib.chat('&aCreeper Veil: &r&lON');
    if (status === 'De-activated') ChatLib.chat('&aCreeper Veil: &7&lOFF');
}).setCriteria('Creeper Veil ${status}!');


///////////////////////////////////////////////////////////////////////////////
// TOGGLE: MESSAGE QOL
///////////////////////////////////////////////////////////////////////////////
const messageQOLMessages = [
    // friend join/leave messages
    /Friend > .+ joined./, 
    /Friend > .+ left./, 

    // exp
    /You earned .+\+ GEXP from playing Skyblock!/, 

    // errors
    /You cannot use abilities in this room!/, 
    /Oops! You stepped on the wrong block!/, 
    /Don't move diagonally! bad!/, 
    /This lever has already been used./, 
    /You cannot hit the silverfish while it's moving!/,
    /You cannot move the silverfish in that direction!/, 
    /You cannot do that in this room!/, 
    /It isn't your turn!/, 
    /Wrong number!/, 

    // full inv
    /You don't have enough space in your inventory to pick up this item!/, 
]

messageQOLMessages.forEach(msg => {{
    register('chat', (event) => {
        handleDungeonMessage(event, Settings.dungeonMessageQOL);
    }).setCriteria(msg);
}});


// Mute NPC Sold Items 
register('chat', (thing, amt, coin, coinRs, event) => {
    if (!shouldHandleDungeonMsgs() || !Settings.dungeonMessageQOL) return;
    if (coinRs === 'Coin' || coinRs === 'Coins') {
        if (!importantItems.includes(thing)) cancel(event);
    }
}).setCriteria('You sold ${thing} x${amt} for ${coins} ${coinRs}!');

// lever used noti
register('chat', (event) => {
    ChatLib.chat('&c&lLEVER USED');
}).setCriteria('This lever has already been used.');



///////////////////////////////////////////////////////////////////////////////
// TOGGLE: SYSTEM NOTIFICATIONS
///////////////////////////////////////////////////////////////////////////////
const sysNotiMessages = [
    // class stats
    /Your .+ stats are doubled because you are the only player using this class!/,
    /\[Berserk]/, 
    /\[Archer]/, 
    /\[Healer]/, 
    /\[Tank]/, 
    /\[Mage]/, 

    // wish/heals
    /.+'s Wish healed you for .+ health and granted you an absorption shield with .+ health!/, 
    /◕ .+/, 

    // sacks
    /\[Sacks] .+/,

    // potion effects reminder
    /You are not allowed to use Potion Effects while in Dungeon, therefore all active effects have been paused and stored\. They will be restored when you leave Dungeon!/, 

    // fire sale mute
    /.+ FIRE SALE .+/, 
    /.+ ♨ .+/,
]

sysNotiMessages.forEach(msg => {{
    register('chat', (event) => {
        handleDungeonMessage(event, Settings.dungeonSysNotifications);
    }).setCriteria(msg);
}});



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
    register('chat', (event) => {
        handleDungeonMessage(event, Settings.dungeonInteractiveElements);
    }).setCriteria(msg);
})


// Milestone Messages
// damage (bers, mage)
register('chat', (msClass, milestone, stuff, event) => {
    sentMSMessage(msClass, milestone);
}).setCriteria('${msClass} Milestone ${milestone}: ${stuff}').setContains();

// wither key picked up
register('chat', (event) => {
    ChatLib.chat('&aWither Key Obtained.');
}).setCriteria('A Wither key has picked up!');

// Blood Door Messages
let bloodPlayer = '';
register('chat', (player, event) => {
    bloodPlayer = player;
    ChatLib.chat('&cBlood Key Obtained.');
}).setCriteria('${player} has obtained Blood Key!');

register('chat', (event) => {
    ChatLib.chat(`&c&l${bloodPlayer} opened the Blood Door!`);
}).setCriteria('The BLOOD DOOR has been opened!');


// Boss Messages
register('chat', (host, dialogue, event) => {
    if (dialogue === 'That will be enough for now.' || dialogue === 'You have proven yourself. You may pass.') {
        ChatLib.chat(`&c[BOSS]&r The Watcher: ${dialogue}`)
    }
}).setCriteria("[BOSS] ${host}: ${dialogue}");


// all crystals placed noti
register('chat', (numCrystals, event) => {
    if (numCrystals === '2') ChatLib.chat('&a&lAll Energy Crystals Placed!');
}).setCriteria('${numCrystals}/2 Energy Crystals are now active!');


// blessings
register('chat', (player, blessing, time, event) => {
    ChatLib.chat(`&6&lDUNGEON BUFF! &dBlessing of ${blessing}!`)
}).setCriteria('DUNGEON BUFF! ${player} found a Blessing of ${blessing}! (${time})');


// Puzzle Messages -- Comps
register('chat', (playerName, event) => {
    ChatLib.chat('&a&lTic Tac Toe Completed!')
}).setCriteria('PUZZLE SOLVED! ${playerName} tied Tic Tac Toe! Good job!');

register('chat', (playerName, npcName, event) => {
    ChatLib.chat('&a&lThree Weirdos Completed!')
}).setCriteria("PUZZLE SOLVED! ${playerName} wasn't fooled by ${npcName}! Good job!");


// Puzzle Messages -- Fails
register('chat', (event) => {
    ChatLib.chat(`&c&lPUZZLE FAIL! &f&lBOMB DEFUSE`);
}).setCriteria('PUZZLE FAIL! The Creeper Bomb exploded! You took too long! Yikes!');

register('chat', (playerName, npc, event) => {
    ChatLib.chat(`&c&lPUZZLE FAIL! &f&lTHREE WEIRDOS &7(${playerName})`)
}).setCriteria('PUZZLE FAIL! ${playerName} was fooled by ${npc}! Yikes!');

register('chat', (playerName, event) => {
    ChatLib.chat(`&c&lPUZZLE FAIL! &f&lBLAZE &7(${playerName})`)
}).setCriteria('PUZZLE FAIL! ${playerName} killed a Blaze in the wrong order! Yikes!');


// Bomb Defusal Messages
register('chat', (message, event) => {
    if (message === "That's a fine pair of loot chests! You better hurry or I'll explode and destroy them!") {
        ChatLib.chat(`&a&l[BOMB] &r&aCreeper: &f&lPUZZLE STARTED!`);

    }
    if (message === "I'm starting to get excited! In 30s, I'm going to ruin your day!") {
        ChatLib.chat(`&a&l[BOMB] &r&aCreeper: &c&l30s Left!`);
    } 
}).setCriteria('[BOMB] Creeper: ${message}').setContains();

/////////////////////////////////////////////////////////////////////////////////////////////
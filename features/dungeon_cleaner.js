import Settings from '../settings.js';
import Audio from '../utils/audio.js';

import { importantItems, dungeonClasses } from '../utils/utils.js';
import { playSound } from '../utils/functions.js';
import { getInDungeon } from '../utils/functions.js';

////////////////////////////////////////////////////////////////////////////////
// SETUP CONSTS
////////////////////////////////////////////////////////////////////////////////
const dungeonCleanAudio = new Audio();

////////////////////////////////////////////////////////////////////////////////
// FUNCTIONS
////////////////////////////////////////////////////////////////////////////////
function determineEss(essence) {
    const essenceFormat = {
        'Diamond': '&b', 
        'Gold': '&e', 
        'Dragon': '&a', 
        'Ice': '&3', 
        'Spider': '&5', 
        'Undead': '&4', 
        'Wither': '&8',
    };
    return essenceFormat[essence] || ''; // handle unknown essence
}

function determineMS(icon) {
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


///////////////////////////////////////////////////////////////////////////////
// TOGGLE: PLAYER ACTIONS
///////////////////////////////////////////////////////////////////////////////
// Abilities
register('chat', (ability, event) => {
    handleDungeonMessage(event, Settings.dungeonPlayerActions, `&a${ability} is ready!`);
}).setCriteria('${ability} is ready to use! Press DROP to activate it!');

register('chat', (ability, event) => {
    handleDungeonMessage(event, Settings.dungeonPlayerActions);
}).setCriteria('Used ${ability}!');

register('chat', (ability, event) => {
    handleDungeonMessage(event, Settings.dungeonPlayerActions);
}).setCriteria('${ability} is ready!');

register('chat', (abiWeapon, numEnemies, damage, event) => {
    handleDungeonMessage(event, Settings.dungeonPlayerActions);
}).setCriteria('Your ${abiWeapon} hit ${numEnemies} enemy for ${damage} damage.');

register('chat', (abiWeapon, numEnemies, damage, event) => {
    handleDungeonMessage(event, Settings.dungeonPlayerActions);
}).setCriteria('Your ${abiWeapon} hit ${numEnemies} enemies for ${damage} damage.');

register('chat', (dunClass, ultAbi, event) => {
    handleDungeonMessage(event, Settings.dungeonPlayerActions, `&aULTIMATE ${ultAbi} is ready!`);
}).setCriteria('Your ${dunClass} ULTIMATE ${ultAbi} is now available');

register('chat', (ability, event) => {
    handleDungeonMessage(event, Settings.dungeonPlayerActions);
}).setCriteria('${ability} is now available!');


// Revives
register('chat', (player, event) => {
    handleDungeonMessage(event, Settings.dungeonPlayerActions);
}).setCriteria(' ❣ ${player} was revived!');

register('chat', (player, event) => {
    handleDungeonMessage(event, Settings.dungeonPlayerActions);
}).setCriteria(' ❣ You are reviving ${player}!');

register('chat', (p1, p2, event) => {
    handleDungeonMessage(event, Settings.dungeonPlayerActions);
}).setCriteria(' ❣ ${p1} is reviving ${p2}!');

register('chat', (p1, p2, event) => {
    handleDungeonMessage(event, Settings.dungeonPlayerActions);
}).setCriteria(' ❣ ${p1} was revived by ${p2}!');

register('chat', (player, fairy, event) => {
    handleDungeonMessage(event, Settings.dungeonPlayerActions);
}).setCriteria('❣ ${player} was revived by ${fairy} the Fairy!').setContains();

register('chat', (name, message, event) => {
    handleDungeonMessage(event, Settings.dungeonPlayerActions);
}).setCriteria('${name} the Fairy: ${message}');


// Obtained Item Messages
register('chat', (player, ting, event) => {
    handleDungeonMessage(event, Settings.dungeonPlayerActions);
}).setCriteria('${player} has obtained ${ting}!');

register('chat', (book, event) => {
    handleDungeonMessage(event, Settings.dungeonPlayerActions);
}).setCriteria('You found a journal named ${book}!');

register('chat', (item, mf, event) => {
    handleDungeonMessage(event, Settings.dungeonPlayerActions);
}).setCriteria('RARE DROP! ${item} (+${mf}% ✯ Magic Find)');

register('chat', (player, reforge, event) => {
    playSound();
    handleDungeonMessage(event, Settings.dungeonPlayerActions, `${player} has obtained ${reforge} Ice Spray Wand!`, '&3[!] &fIce Spray Wand &3[!]');
}).setCriteria('${player} has obtained ${reforge} Ice Spray Wand!');

register('chat', (event) => {
    handleDungeonMessage(event, Settings.dungeonPlayerActions);
}).setCriteria('You found a Secret Redstone Key!');


// Decoys
register('chat', (event) => {
    handleDungeonMessage(event, Settings.dungeonPlayerActions);
}).setCriteria('Decoy deployed!');

register('chat', (event) => {
    handleDungeonMessage(event, Settings.dungeonPlayerActions);
}).setCriteria('It was a dud.');


// Essence Messages
register('chat', (player, event) => {
    handleDungeonMessage(event, Settings.dungeonPlayerActions, '&8&l+1 Essence');
}).setCriteria('${player} found a Wither Essence! Everyone gains an extra essence!');

register('chat', (player, numEss, typeEss, event) => {
    handleDungeonMessage(event, Settings.dungeonPlayerActions, `${determineEss(typeEss)}&l+${numEss} Essence`);
}).setCriteria('ESSENCE! ${player} found x${numEss} ${typeEss} Essence!');


// Creeper Veil Actions
register('chat', (status, event) => {
    handleDungeonMessage(event, Settings.dungeonPlayerActions);
    if (status === 'Activated') ChatLib.chat('&aCreeper Veil: &r&lON');
    if (status === 'De-activated') ChatLib.chat('&aCreeper Veil: &7&lOFF');
}).setCriteria('Creeper Veil ${status}!');


// Dungeon Chest 'obtained xxx' actions 
register('chat', (name, essType, amt, event) => {
    handleDungeonMessage(event, Settings.dungeonPlayerActions);
}).setCriteria('${name} unlocked ${essType} Essence x${amt}!');


///////////////////////////////////////////////////////////////////////////////
// TOGGLE: MESSAGE QOL
///////////////////////////////////////////////////////////////////////////////
// Mute NPC Sold Items 
register('chat', (thing, amt, coin, coinRs, event) => {
    if (!shouldHandleDungeonMsgs()) return;
    if (Settings.dungeonMessageQOL && (coinRs === 'Coin' || coinRs === 'Coins')) {
        if (!importantItems.includes(thing)) cancel(event);
    }
}).setCriteria('You sold ${thing} x${amt} for ${coins} ${coinRs}!');

// Mute Friend Join/Leave Message
register('chat', (pplayer, status, event) => {
    handleDungeonMessage(event, Settings.dungeonMessageQOL);
}).setCriteria('Friend > ${player} ${status}.');


// Mute GEXP or Hypixel EXP Messages
register('chat', (exp, event) => {
    handleDungeonMessage(event, Settings.dungeonMessageQOL);
}).setCriteria('You earned ${exp} GEXP from playing SkyBlock!');


// Error Messages
register('chat', (event) => {
    handleDungeonMessage(event, Settings.dungeonMessageQOL);
}).setCriteria('You cannot use abilities in this room!');

register('chat', (event) => {
    handleDungeonMessage(event, Settings.dungeonMessageQOL);
}).setCriteria('Oops! You stepped on the wrong block!');

register('chat', (event) => {
    handleDungeonMessage(event, Settings.dungeonMessageQOL);
}).setCriteria("Don't move diagonally! bad!");

register('chat', (event) => {
    handleDungeonMessage(event, Settings.dungeonMessageQOL, '&c&lLEVER USED');
}).setCriteria('This lever has already been used.');

register('chat', (event) => {
    handleDungeonMessage(event, Settings.dungeonMessageQOL);
}).setCriteria("You cannot hit the silverfish while it's moving!");

register('chat', (event) => {
    handleDungeonMessage(event, Settings.dungeonMessageQOL);
}).setCriteria("You cannot move the silverfish in that direction!");

register('chat', (event) => {
    handleDungeonMessage(event, Settings.dungeonMessageQOL);
}).setCriteria('You cannot do that in this room!');

register('chat', (event) => {
    handleDungeonMessage(event, Settings.dungeonMessageQOL);
}).setCriteria("It isn't your turn!");


// Full Inventory 
register('chat', (event) => {
    dungeonCleanAudio.playDefaultSound();
    handleDungeonMessage(event, Settings.dungeonMessageQO, '&c&lFULL INVENTORY');
}).setCriteria("You don't have enough space in your inventory to pick up this item!");



///////////////////////////////////////////////////////////////////////////////
// TOGGLE: SYSTEM NOTIFICATIONS
///////////////////////////////////////////////////////////////////////////////
// Class Stat Change Messages
register('chat', (className, event) => {
    if (!shouldHandleDungeonMsgs()) return;
    if (Settings.dungeonSysNotifications && dungeonClasses.includes(className)) cancel(event);
}).setCriteria('[${className}] ').setContains();

register('chat', (className, event) => {
    handleDungeonMessage(event, Settings.dungeonSysNotifications);
}).setCriteria('Your ${className} stats are doubled because you are the only player using this class!');


// Wish/Heal Messages
register('chat', (player, heal, shield, event) => {
    handleDungeonMessage(event, Settings.dungeonSysNotifications, `&r&l${player} Wished Everyone!`);
}).setCriteria("${player}'s Wish healed you for ${heal} health and granted you an absorption shield with ${shield} health!");


// Orb Pickups
register('chat', (orbType, player, heal, shield, damageType, time, event) => {
    handleDungeonMessage(event, Settings.dungeonSysNotifications);
}).setCriteria('◕ You picked up a ${orbType} Orb from ${player} healing you for ${heal}❤ and granting you +${shield}% ${damageType} for ${time} seconds.');


// Sacks Messages
register('chat', (items, pluralItem, secs, event) => {
    handleDungeonMessage(event, Settings.dungeonSysNotifications);
}).setCriteria('[Sacks] +${items} ${pluralItem}. (Last ${secs}s.)');

register('chat', (items, pluralItem, secs, event) => {
    handleDungeonMessage(event, Settings.dungeonSysNotifications);
}).setCriteria('[Sacks] -${items} ${pluralItem}. (Last ${secs}s.)');


// Potion Effects Reminder Message
register('chat', (event) => { 
    handleDungeonMessage(event, Settings.dungeonSysNotifications);
}).setCriteria('You are not allowed to use Potion Effects while in Dungeon, therefore all active effects have been paused and stored. They will be restored when you leave Dungeon!');


// Mute Fire Sales in Dungeon
register('chat', (event) => {
    handleDungeonMessage(event, Settings.dungeonSysNotifications);
}).setCriteria('FIRE SALE').setContains();

register('chat', (event) => {
    handleDungeonMessage(event, Settings.dungeonSysNotifications);
}).setCriteria('♨').setContains();


///////////////////////////////////////////////////////////////////////////////
// TOGGLE: INTERACTIVE ELEMENTS
///////////////////////////////////////////////////////////////////////////////
// NPC Dialogue Messages
register('chat', (event) => {
    handleDungeonMessage(event, Settings.dungeonInteractiveElements);
}).setCriteria('[NPC] ').setContains();


// Milestone Messages
register('chat', (msClass, milestone, msDamage, event) => {
    handleDungeonMessage(event, Settings.dungeonInteractiveElements);
    let ms = determineMS(milestone);
    ms !== 9 ? ChatLib.chat(`&6&l${msClass} Milestone ${ms} Reached`) : ChatLib.chat(`&6&lMaxed ${msClass} Milestone Reached`);
}).setCriteria('${msClass} Milestone ${milestone}: You have dealt ${msDamage} Total Damage so far!').setContains();

// Wither Door Messages
register('chat', (player, event) => {
    handleDungeonMessage(event, Settings.dungeonInteractiveElements);
}).setCriteria('${player} has obtained Wither Key!');

register('chat', (player, event) => {
    handleDungeonMessage(event, Settings.dungeonInteractiveElements);
}).setCriteria('${player} opened a WITHER door!');

register('chat', (event) => {
    handleDungeonMessage(event, Settings.dungeonInteractiveElements);
}).setCriteria('RIGHT CLICK on a WITHER door to open it. This key can only be used to open 1 door!');

register('chat', (event) => {
    handleDungeonMessage(event, Settings.dungeonInteractiveElements, '&8Wither Key &aObtained.');
}).setCriteria('A Wither Key was picked up!');


// Blood Door Messages
let bloodPlayer = '';
register('chat', (player, event) => {
    bloodPlayer = player;
    handleDungeonMessage(event, Settings.dungeonInteractiveElements);
}).setCriteria('${player} has obtained Blood Key!');

register('chat', (event) => {
    handleDungeonMessage(event, Settings.dungeonInteractiveElements);
}).setCriteria('RIGHT CLICK on the BLOOD DOOR to open it. This key can only be used to open 1 door!');

register('chat', (event) => {
    handleDungeonMessage(event, Settings.dungeonInteractiveElements);
}).setCriteria('A shiver runs down your spine...');

register('chat', (event) => {
    handleDungeonMessage(event, Settings.dungeonInteractiveElements);
}).setCriteria('You hear something open...');

register('chat', (event) => {
    handleDungeonMessage(event, Settings.dungeonInteractiveElements);
}).setCriteria('You hear the sound of something opening...');

register('chat', (event) => {
    handleDungeonMessage(event, Settings.dungeonInteractiveElements, `&c&l${bloodPlayer} opened the Blood Door!`);
}).setCriteria('The BLOOD DOOR has been opened!');


// Boss Messages
register('chat', (host, dialogue, event) => {
    if (!shouldHandleDungeonMsgs()) return;
    if (Settings.dungeonInteractiveElements) {  
        if (dialogue !== 'That will be enough for now.' || dialogue !== 'You have proven yourself. You may pass.') cancel(event);
    }
}).setCriteria("[BOSS] ${host}: ${dialogue}");

register('chat', (event) => {
    handleDungeonMessage(event, Settings.dungeonInteractiveElements);
}).setCriteria('[SKULL] ').setContains();

// Statue Messages
register('chat', (event) => {
    handleDungeonMessage(event, Settings.dungeonInteractiveElements);
}).setCriteria('[STATUE] ').setContains();


// Floor Specific Messages
// ALL FLOORS
register('chat', (mob, damage, weapon, event) => {
    handleDungeonMessage(event, Settings.dungeonInteractiveElements);
}).setCriteria("${mob}'s ${weapon} hit you for ${damage} damage.");

register('chat', (mob, weapon, damage, event) => {
    handleDungeonMessage(event, Settings.dungeonInteractiveElements);
}).setCriteria("${mob}'s ${weapon} hit you for ${damage} true damage.");

// FLOOR 1

// FLOOR 2

// FLOOR 3
register('chat', (event) => {
    handleDungeonMessage(event, Settings.dungeonInteractiveElements);
}).setCriteria('⚠ The Laser Guardian is charging up their Focus Beam! ⚠');

register('chat', (event) => {
    handleDungeonMessage(event, Settings.dungeonInteractiveElements);
}).setCriteria('⚡ WARNING! The Chaos Guardian is preparing to use Discharge! Move away! ⚡');


// FLOOR 4
register('chat', (dmg, event) => {
    handleDungeonMessage(event, Settings.dungeonInteractiveElements);
}).setCriteria("The Spirit Chicken's lightning struck you for ${dmg} damage.");

register('chat', (dmg, event) => {
    handleDungeonMessage(event, Settings.dungeonInteractiveElements);
}).setCriteria("A Chicken Mine exploded, hitting you for ${dmg} damage.");

register('chat', (event) => {
    handleDungeonMessage(event, Settings.dungeonInteractiveElements);
}).setCriteria('A Spirit Bear has appeared!');

register('chat', (event) => {
    handleDungeonMessage(event, Settings.dungeonInteractiveElements);
}).setCriteria('[CROWD]').setContains();


// FLOOR 5

// FLOOR 6
register('chat', (giantType, abi, dmg, event) => {
    handleDungeonMessage(event, Settings.dungeonInteractiveElements);
}).setCriteria('${giantType} Giant hit you with ${abi} for ${dmg} damage!');

// FLOOR 7 -- p1 - maxor/other boss
register('chat', (boss, event) => {
    handleDungeonMessage(event, Settings.dungeonInteractiveElements);
}).setCriteria('⚠ ${boss} is enraged! ⚠');

register('chat', (numCrystals, event) => {
    handleDungeonMessage(event, Settings.dungeonInteractiveElements);
    if (numCrystals === '2') ChatLib.chat('&a&lAll Energy Crystals Placed!');
}).setCriteria('${numCrystals}/2 Energy Crystals are now active!');

register('chat', (event) => {
    handleDungeonMessage(event, Settings.dungeonInteractiveElements, '&c&lLaser Charged!');
}).setCriteria('The Energy Laser is charging up!');


// FLOOR 7 -- p3 terms
register('chat', (event) => {
    handleDungeonMessage(event, Settings.dungeonInteractiveElements);
}).setCriteria('The gate will open in 5 seconds!');

register('chat', (event) => {
    handleDungeonMessage(event, Settings.dungeonInteractiveElements);
}).setCriteria('The gate has been destroyed!');

register('chat', (event) => {
    handleDungeonMessage(event, Settings.dungeonInteractiveElements);
}).setCriteria('Wrong number!');


// MM Floor 7 
register('chat', (event) => {
    handleDungeonMessage(event, Settings.dungeonInteractiveElements);
}).setCriteria('The Crystal withers your soul as you hold it in your hands!');


// Blessing Messages
register('chat', (player, blessing, mins, secs, event) => {
    handleDungeonMessage(event, Settings.dungeonInteractiveElements);
}).setCriteria('${player} has obtained a Blessing of ${blessing}! (${mins}m ${secs}s)');

register('chat', (player, blessing, mins, secs, event) => {
    handleDungeonMessage(event, Settings.dungeonInteractiveElements, `&6&lDUNGEON BUFF! &dBlessing of ${blessing}!`);
}).setCriteria('DUNGEON BUFF! ${player} found a Blessing of ${blessing}! (${mins}m ${secs}s)');

register('chat', (pu1, pu2, icon, effect, event) => {
    handleDungeonMessage(event, Settings.dungeonInteractiveElements);
}).setCriteria('Also granted you +${pu1} & +${pu2}x ${icon} ${effect}.');

register('chat', (pu1, pu2, icon, effect, event) => {
    handleDungeonMessage(event, Settings.dungeonInteractiveElements);
}).setCriteria('Granted you +${pu1} & +${pu2}x ${icon} ${effect}.');


// Puzzle Messages -- Comps
register('chat', (player, event) => {
    handleDungeonMessage(event, Settings.dungeonInteractiveElements, '&a&lTic Tac Toe Completed!');
}).setCriteria('PUZZLE SOLVED! ${player} tied Tic Tac Toe! Good job!');

register('chat', (player, npcName, event) => {
    handleDungeonMessage(event, Settings.dungeonInteractiveElements, '&a&lThree Weirdos Completed!');
}).setCriteria("PUZZLE SOLVED! ${player} wasn't fooled by ${npcName}! Good job!");


// Puzzle Messages -- Fails
register('chat', (event) => {
    handleDungeonMessage(event, Settings.dungeonInteractiveElements, `&c&lPUZZLE FAIL! &f&lBOMB DEFUSE`);
}).setCriteria('PUZZLE FAIL! The Creeper Bomb exploded! You took too long! Yikes!');

register('chat', (player, npc, event) => {
    handleDungeonMessage(event, Settings.dungeonInteractiveElements, `&c&lPUZZLE FAIL! &f&lTHREE WEIRDOS &7(${player})`);
}).setCriteria('PUZZLE FAIL! ${player} was fooled by ${npc}! Yikes!');

register('chat', (player, event) => {
    handleDungeonMessage(event, Settings.dungeonInteractiveElements, `&c&lPUZZLE FAIL! &f&lBLAZE &7(${player})`);
}).setCriteria('PUZZLE FAIL! ${player} killed a Blaze in the wrong order! Yikes!');

// Mob Damage Messages
register('chat', (skull, damage, event) => {
    handleDungeonMessage(event, Settings.dungeonInteractiveElements);
}).setCriteria('A ${skull} exploded, hitting you for ${damage} damage.');

register('chat', (mobName, damage, event) => {
    handleDungeonMessage(event, Settings.dungeonInteractiveElements);
}).setCriteria('The ${mobName} struck you for ${damage} damage!');

register('chat', (damage, event) => {
    handleDungeonMessage(event, Settings.dungeonInteractiveElements);
}).setCriteria('Your bone plating reduced the damage you took by ${damage}');

register('chat', (miniBoss, ability, event) => {
    handleDungeonMessage(event, Settings.dungeonInteractiveElements);
}).setCriteria("The ${miniBoss} used ${ability} on you!");


// Witherborn Damage Messages
register('chat', (enemies, damage, event) => {
    handleDungeonMessage(event, Settings.dungeonInteractiveElements);
}).setCriteria('Your Witherborn hit ${enemies} enemy for ${damage} damage.');


// Bomb Defusal Messages
register('chat', (message, event) => {
    handleDungeonMessage(event, Settings.dungeonInteractiveElements);
    if (message === "That's a fine pair of loot chests! You better hurry or I'll explode and destroy them!") {
        ChatLib.chat(`&a&l[BOMB] &r&aCreeper: &f&lPUZZLE STARTED!`);

    }
    if (message === "I'm starting to get excited! In 30s, I'm going to ruin your day!") {
        ChatLib.chat(`&a&l[BOMB] &r&aCreeper: &c&l30s Left!`);
    } 
}).setCriteria('[BOMB] Creeper: ${message}').setContains();


// auto recombs
register('chat', (item, event) => {
    handleDungeonMessage(event, Settings.dungeonInteractiveElements);
}).setCriteria('Your Auto Recombobulator recombobulated ${item}!').setContains();

/////////////////////////////////////////////////////////////////////////////////////////////

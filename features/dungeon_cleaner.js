import Settings from '../settings.js';
import Audio from '../utils/audio.js';
import { baoUtils } from '../utils/utils.js';
import { getCurrArea } from '../utils/functions.js'; // sb, area

////////////////////////////////////////////////////////////////////////////////
// SETUP CONSTS
////////////////////////////////////////////////////////////////////////////////
const dungeonCleanAudio = new Audio();
const importantItems = ['Hyperion', 'Dark Claymore', 'Terminator', "Giant's Sword", 'Infinileap', 'Diamond Pickaxe', 'Stonk', 'Ragnarock Axe', 'Spring Boots', 'Abiphone'];
const dungeonClasses = ['Berserk', 'Archer', 'Tank', 'Healer', 'Mage'];


////////////////////////////////////////////////////////////////////////////////
// FUNCTIONS
////////////////////////////////////////////////////////////////////////////////
function determineEss(essence) {
    let format = '&r';
    if (essence === 'Diamond') format = '&b';
    if (essence === 'Gold') format = '&e';
    if (essence === 'Dragon') format = '&a';
    if (essence === 'Ice') format = '&3';
    if (essence === 'Spider') format = '&5';
    if (essence === 'Undead') format = '&4';
    if (essence === 'Wither') format = '&8';
    return format;
}

function determineMS(milestone) {
    let ms = 0;
    if (milestone === '❶') ms = 1;
    if (milestone === '❷') ms = 2;
    if (milestone === '❸') ms = 3;
    if (milestone === '❹') ms = 4;
    if (milestone === '❺') ms = 5;
    if (milestone === '❻') ms = 6;
    if (milestone === '❼') ms = 7;
    if (milestone === '❽') ms = 8;
    if (milestone === '❾') ms = 9;
    return ms;
}
///////////////////////////////////////////////////////////////////////////////
// TOGGLE: PLAYER ACTIONS
///////////////////////////////////////////////////////////////////////////////
// Abilities
register('chat', (ability, event) => {
    if (!Settings.betterDungeonMsgs) return;
    if (Settings.dungeonPlayerActions) {
        cancel(event);
        ChatLib.chat(`&a${ability} is ready!`);
    }
}).setCriteria('${ability} is ready to use! Press DROP to activate it!');

register('chat', (ability, event) => {
    if (!Settings.betterDungeonMsgs) return;
    if (Settings.dungeonPlayerActions) cancel(event);
}).setCriteria('Used ${ability}!');

register('chat', (abiWeapon, numEnemies, damage, event) => {
    if (!Settings.betterDungeonMsgs) return;
    if (Settings.dungeonPlayerActions) cancel(event);
}).setCriteria('Your ${abiWeapon} hit ${numEnemies} enemy for ${damage} damage.');

register('chat', (abiWeapon, numEnemies, damage, event) => {
    if (!Settings.betterDungeonMsgs) return;
    if (Settings.dungeonPlayerActions) cancel(event);
}).setCriteria('Your ${abiWeapon} hit ${numEnemies} enemies for ${damage} damage.');

register('chat', (dunClass, ultAbi, event) => {
    if (!Settings.betterDungeonMsgs) return;
    if (Settings.dungeonPlayerActions) {
        cancel(event);
        ChatLib.chat(`&aULTIMATE ${ultAbi} is ready!`);
    }
}).setCriteria('Your ${dunClass} ULTIMATE ${ultAbi} is now available');

register('chat', (ability, event) => {
    if (!Settings.betterDungeonMsgs) return;
    if (Settings.dungeonPlayerActions) cancel(event);
}).setCriteria('${ability} is now available!');


// Revives
register('chat', (player, event) => {
    if (!Settings.betterDungeonMsgs) return;
    if (Settings.dungeonPlayerActions) cancel(event);
}).setCriteria(' ❣ ${player} was revived!');

register('chat', (player, event) => {
    if (!Settings.betterDungeonMsgs) return;
    if (Settings.dungeonPlayerActions) cancel(event);
}).setCriteria(' ❣ You are reviving ${player}!');

register('chat', (p1, p2, event) => {
    if (!Settings.betterDungeonMsgs) return;
    if (Settings.dungeonPlayerActions) cancel(event);
}).setCriteria(' ❣ ${p1} is reviving ${p2}!');

register('chat', (p1, p2, event) => {
    if (!Settings.betterDungeonMsgs) return;
    if (Settings.dungeonPlayerActions) cancel(event);
}).setCriteria(' ❣ ${p1} was revived by ${p2}!');

register('chat', (player, fairy, event) => {
    if (!Settings.betterDungeonMsgs) return;
    if (Settings.dungeonPlayerActions) cancel(event);
}).setCriteria('❣ ${player} was revived by ${fairy} the Fairy!').setContains();

register('chat', (name, message, event) => {
    if (!Settings.betterDungeonMsgs) return;
    if (Settings.dungeonPlayerActions) cancel(event);
}).setCriteria('${name} the Fairy: ${message}');


// Obtained Item Messages
register('chat', (player, ting, event) => {
    if (!Settings.betterDungeonMsgs) return;
    if (Settings.dungeonPlayerActions) cancel(event);
}).setCriteria('${player} has obtained ${ting}!');

register('chat', (book, event) => {
    if (!Settings.betterDungeonMsgs) return;
    if (Settings.dungeonPlayerActions) cancel(event);
}).setCriteria('You found a journal named ${book}!');

register('chat', (item, mf, event) => {
    if (!Settings.betterDungeonMsgs) return;
    if (getCurrArea() === 'Catacombs' && Settings.dungeonPlayerActions) cancel(event);
}).setCriteria('RARE DROP! ${item} (+${mf}% ✯ Magic Find)');


// Decoy Deployed
register('chat', (event) => {
    if (!Settings.betterDungeonMsgs) return;
    if (Settings.dungeonPlayerActions) cancel(event);
}).setCriteria('Decoy deployed!');

register('chat', (event) => {
    if (!Settings.betterDungeonMsgs) return;
    if (Settings.dungeonPlayerActions) cancel(event);
}).setCriteria('It was a dud.');


// Essence Messages
register('chat', (player, event) => {
    if (!Settings.betterDungeonMsgs) return;
    if (Settings.dungeonPlayerActions) {
        cancel(event);
        ChatLib.chat('&8&l+1 Essence');
    }
}).setCriteria('${player} found a Wither Essence! Everyone gains an extra essence!');

register('chat', (player, numEss, typeEss, event) => {
    if (!Settings.betterDungeonMsgs) return;
    if (Settings.dungeonPlayerActions) {
        cancel(event);
        let colorF = determineEss(typeEss);
        ChatLib.chat(`${colorF}&l+${numEss} Essence`);
    }
}).setCriteria('ESSENCE! ${player} found x${numEss} ${typeEss} Essence!');


// Creeper Veil Messages
register('chat', (status, event) => {
    if (!Settings.betterDungeonMsgs) return;
    if (Settings.dungeonPlayerActions) {
        cancel(event);
        if (status === 'Activated') ChatLib.chat('&aCreeper Veil: &r&lON');
        if (status === 'De-activated') ChatLib.chat('&aCreeper Veil: &7&lOFF');
    }
}).setCriteria('Creeper Veil ${status}!');



///////////////////////////////////////////////////////////////////////////////
// TOGGLE: MESSAGE QOL
///////////////////////////////////////////////////////////////////////////////
// Mute NPC Sold Items 
register('chat', (thing, amt, coin, event) => {
    if (!Settings.betterDungeonMsgs) return;
    if (getCurrArea() !== 'Catacombs') return;
    if (Settings.dungeonMessageQOL) {
        if (!importantItems.includes(thing)) cancel(event);
    }
}).setCriteria('You sold ${thing} x${amt} for ${coin} Coins!');

register('chat', (thing, amt, coins, event) => {
    if (!Settings.betterDungeonMsgs) return;
    if (getCurrArea() !== 'Catacombs') return;
    if (Settings.dungeonMessageQOL) {
        if (!thing.includes('Hyperion')) cancel(event);
    }
}).setCriteria('You sold ${ting} x${amt} for ${coins} Coin!');

// Mute Friend Join/Leave Message
register('chat', (pplayer, status, event) => {
    if (!Settings.betterDungeonMsgs) return;
    if (getCurrArea() === 'Catacombs') {
        if (Settings.dungeonMessageQOL) cancel(event);
    }
}).setCriteria('Friend > ${player} ${status}.');


// Mute GEXP or Hypixel EXP Messages
register('chat', (exp, event) => {
    if (!Settings.betterDungeonMsgs) return;
    if (Settings.dungeonMessageQOL) cancel(event);
}).setCriteria('You earned ${exp} GEXP from playing SkyBlock!');


// Error Messages
register('chat', (event) => {
    if (!Settings.betterDungeonMsgs) return;
    if (Settings.dungeonMessageQOL) cancel(event);
}).setCriteria('You cannot use abilities in this room!');

register('chat', (event) => {
    if (!Settings.betterDungeonMsgs) return;
    if (Settings.dungeonMessageQOL) cancel(event);
}).setCriteria('Oops! You stepped on the wrong block!');

register('chat', (event) => {
    if (!Settings.betterDungeonMsgs) return;
    if (Settings.dungeonMessageQOL) cancel(event);
}).setCriteria("Don't move diagonally! bad!");

register('chat', (event) => {
    if (!Settings.betterDungeonMsgs) return;
    if (Settings.dungeonMessageQOL) {
        cancel(event);
        ChatLib.chat('&c&lLEVER USED');
    }
}).setCriteria('This lever has already been used.');

register('chat', (event) => {
    if (!Settings.betterDungeonMsgs) return;
    if (Settings.dungeonMessageQOL) cancel(event);
}).setCriteria("You cannot hit the silverfish while it's moving!");

register('chat', (event) => {
    if (!Settings.betterDungeonMsgs) return;
    if (Settings.dungeonMessageQOL) cancel(event);
}).setCriteria("You cannot move the silverfish in that direction!");

register('chat', (event) => {
    if (!Settings.betterDungeonMsgs) return;
    if (Settings.dungeonMessageQOL) cancel(event);
}).setCriteria('You cannot do that in this room!');

register('chat', (event) => {
    if (!Settings.betterDungeonMsgs) return;
    if (Settings.dungeonMessageQOL) cancel(event);
}).setCriteria("It isn't your turn!");

register('chat', (event) => {
    if (!Settings.betterDungeonMsgs) return;
    if (Settings.dungeonMessageQOL) cancel(event);
}).setCriteria('You found a Secret Redstone Key!');


// Full Inventory 
register('chat', (event) => {
    if (!Settings.betterDungeonMsgs) return;
    if (Settings.dungeonMessageQOL) {
        cancel(event);
        ChatLib.chat('&c&lFULL INVENTORY');
        dungeonCleanAudio.playDefaultSound();
    }
}).setCriteria("You don't have enough space in your inventory to pick up this item!");



///////////////////////////////////////////////////////////////////////////////
// TOGGLE: SYSTEM NOTIFICATIONS
///////////////////////////////////////////////////////////////////////////////
// Class Stat Change Messages
register('chat', (className, event) => {
    if (!Settings.betterDungeonMsgs) return;
    if (getCurrArea() !== 'Catacombs') return;
    if (Settings.dungeonSysNotifications && dungeonClasses.includes(className)) cancel(event);
}).setCriteria('[${className}] ').setContains();

register('chat', (className, event) => {
    if (!Settings.betterDungeonMsgs) return;
    if (getCurrArea() !== 'Catacombs') return;
    if (Settings.dungeonSysNotifications) {
        cancel(event);
        ChatLib.chat(`${baoUtils.modPrefix} Mode: SOLO`);
    }
}).setCriteria('Your ${className} stats are doubled because you are the only player using this class!');


// Wish/Heal Messages
register('chat', (player, heal, shield, event) => {
    if (!Settings.betterDungeonMsgs) return;
    if (getCurrArea() !== 'Catacombs') return;
    if (Settings.dungeonSysNotifications) {
        cancel(event);
        ChatLib.chat(`&r&l${player} Wished Everyone!`)
    }
}).setCriteria("${player}'s Wish healed you for ${heal} health and granted you an absorption shield with ${shield} health!");


// Orb Pickups
register('chat', (orbType, player, heal, shield, time, event) => {
    if (!Settings.betterDungeonMsgs) return;
    if (getCurrArea() !== 'Catacombs') return;
    if (Settings.dungeonSysNotifications) cancel(event);
}).setCriteria('◕ You picked up a ${orbType} Orb from ${player} healing you for ${heal}❤ and granting you +${shield}% Defense for ${time} seconds.');

// Sacks Messages
register('chat', (items, pluralItem, secs, event) => {
    if (!Settings.betterDungeonMsgs) return;
    if (getCurrArea() !== 'Catacombs') return;
    if (Settings.dungeonSysNotifications) cancel(event);
}).setCriteria('[Sacks] +${items} ${pluralItem}. (Last ${secs}s.)');

register('chat', (items, pluralItem, secs, event) => {
    if (!Settings.betterDungeonMsgs) return;
    if (getCurrArea() !== 'Catacombs') return;
    if (Settings.dungeonSysNotifications) cancel(event);
}).setCriteria('[Sacks] -${items} ${pluralItem}. (Last ${secs}s.)');


// Potion Effects Reminder Message
register('chat', (event) => { 
    if (!Settings.betterDungeonMsgs) return;
    if (getCurrArea() !== 'Catacombs') return;
    if (Settings.dungeonSysNotifications) cancel(event);
}).setCriteria('You are not allowed to use Potion Effects while in Dungeon, therefore all active effects have been paused and stored. They will be restored when you leave Dungeon!');


// Mute Fire Sales in Dungeon
register('chat', (event) => {
    if (!Settings.betterDungeonMsgs) return;
    if (getCurrArea() !== 'Catacombs') return;
    if (Settings.dungeonSysNotifications) cancel(event);
}).setCriteria('FIRE SALE').setContains();

register('chat', (event) => {
    if (!Settings.betterDungeonMsgs) return;
    if (getCurrArea() !== 'Catacombs') return;
    if (Settings.dungeonSysNotifications) cancel(event);
}).setCriteria('♨').setContains();


///////////////////////////////////////////////////////////////////////////////
// TOGGLE: INTERACTIVE ELEMENTS
///////////////////////////////////////////////////////////////////////////////
// NPC Dialogue Messages
register('chat', (event) => {
    if (!Settings.betterDungeonMsgs) return;
    if (getCurrArea() !== 'Catacombs') return;
    if (Settings.dungeonInteractiveElements) cancel(event);
}).setCriteria('[NPC] ').setContains();


// Milestone Messages
register('chat', (msClass, milestone, msDamage, event) => {
    if (!Settings.betterDungeonMsgs) return;
    if (getCurrArea() !== 'Catacombs') return;
    if (Settings.betterDungeonMsgs) {
        cancel(event);
        let ms = determineMS(milestone);
        ms !== 9 ? ChatLib.chat(`&6&l${msClass} Milestone ${ms} Reached`) : ChatLib.chat(`&6&lMaxed ${msClass} Milestone Reached`);
    }
}).setCriteria('${msClass} Milestone ${milestone}: You have dealt ${msDamage} Total Damage so far!').setContains();

// Wither Door Messages
register('chat', (player, event) => {
    if (!Settings.betterDungeonMsgs) return;
    if (getCurrArea() !== 'Catacombs') return;
    if (Settings.dungeonInteractiveElements) cancel(event);
}).setCriteria('${player} has obtained Wither Key!');

register('chat', (player, event) => {
    if (!Settings.betterDungeonMsgs) return;
    if (getCurrArea() !== 'Catacombs') return;
    if (Settings.dungeonInteractiveElements) cancel(event);
}).setCriteria('${player} opened a WITHER door!');

register('chat', (event) => {
    if (!Settings.betterDungeonMsgs) return;
    if (getCurrArea() !== 'Catacombs') return;
    if (Settings.dungeonInteractiveElements) cancel(event);
}).setCriteria('RIGHT CLICK on a WITHER door to open it. This key can only be used to open 1 door!');

register('chat', (event) => {
    if (!Settings.betterDungeonMsgs) return;
    if (getCurrArea() !== 'Catacombs') return;
    if (Settings.dungeonInteractiveElements) {
        cancel(event);
        ChatLib.chat('&8Wither Key &aObtained.')
    }
}).setCriteria('A Wither Key was picked up!');


// Blood Door Messages
let bloodPlayer = '';
register('chat', (player, event) => {
    if (!Settings.betterDungeonMsgs) return;
    if (getCurrArea() !== 'Catacombs') return;
    bloodPlayer = player;
    if (Settings.dungeonInteractiveElements) cancel(event);
}).setCriteria('${player} has obtained Blood Key!');

register('chat', (event) => {
    if (!Settings.betterDungeonMsgs) return;
    if (getCurrArea() !== 'Catacombs') return;
    if (Settings.dungeonInteractiveElements) cancel(event);
}).setCriteria('RIGHT CLICK on the BLOOD DOOR to open it. This key can only be used to open 1 door!');

register('chat', (event) => {
    if (!Settings.betterDungeonMsgs) return;
    if (getCurrArea() !== 'Catacombs') return;
    if (Settings.dungeonInteractiveElements) cancel(event);
}).setCriteria('A shiver runs down your spine...');

register('chat', (event) => {
    if (!Settings.betterDungeonMsgs) return;
    if (getCurrArea() !== 'Catacombs') return;
    if (Settings.dungeonInteractiveElements) cancel(event);
}).setCriteria('You hear something open...');

register('chat', (event) => {
    if (!Settings.betterDungeonMsgs) return;
    if (getCurrArea() !== 'Catacombs') return;
    if (Settings.dungeonInteractiveElements) cancel(event);
}).setCriteria('You hear the sound of something opening...');

register('chat', (event) => {
    if (!Settings.betterDungeonMsgs) return;
    if (getCurrArea() !== 'Catacombs') return;
    if (Settings.dungeonInteractiveElements) {
        cancel(event);
        ChatLib.chat(`&c&l${bloodPlayer} opened the Blood Door!`);
    }
}).setCriteria('The BLOOD DOOR has been opened!');


// Boss Messages
register('chat', (host, dialogue, event) => {
    if (!Settings.betterDungeonMsgs) return;
    if (getCurrArea() !== 'Catacombs') return;
    if (Settings.dungeonInteractiveElements) {  
        if (dialogue === 'That will be enough for now.' || dialogue === 'You have proven yourself. You may pass.') return;
        cancel(event);
    }
}).setCriteria("[BOSS] ${host}: ${dialogue}");

register('chat', (event) => {
    if (!Settings.betterDungeonMsgs) return;
    if (getCurrArea() !== 'Catacombs') return;
    if (Settings.dungeonInteractiveElements) cancel(event);
}).setCriteria('[SKULL] ').setContains();

// Statue Messages
register('chat', (event) => {
    if (!Settings.betterDungeonMsgs) return;
    if (getCurrArea() !== 'Catacombs') return;
    if (Settings.dungeonInteractiveElements) cancel(event);
}).setCriteria('[STATUE] ').setContains();


// Floor Specific Messages
// ALL FLOORS
register('chat', (mob, damage, weapon, event) => {
    if (!Settings.betterDungeonMsgs) return;
    if (getCurrArea() !== 'Catacombs') return;
    if (Settings.dungeonInteractiveElements) cancel(event);
}).setCriteria("${mob}'s ${weapon} hit you for ${damage} damage.");

register('chat', (mob, weapon, damage, event) => {
    if (!Settings.betterDungeonMsgs) return;
    if (getCurrArea() !== 'Catacombs') return;
    if (Settings.dungeonInteractiveElements) cancel(event);
}).setCriteria("${mob}'s ${weapon} hit you for ${damage} true damage.");

// FLOOR 1

// FLOOR 2

// FLOOR 3
register('chat', (event) => {
    if (!Settings.betterDungeonMsgs) return;
    if (getCurrArea() !== 'Catacombs') return;
    if (Settings.dungeonInteractiveElements) cancel(event);
}).setCriteria('⚠ The Laser Guardian is charging up their Focus Beam! ⚠');


// FLOOR 4
register('chat', (dmg, event) => {
    if (!Settings.betterDungeonMsgs) return;
    if (getCurrArea() !== 'Catacombs') return;
    if (Settings.dungeonInteractiveElements) cancel(event);
}).setCriteria("The Spirit Chicken's lightning struck you for ${dmg} damage.");

register('chat', (dmg, event) => {
    if (!Settings.betterDungeonMsgs) return;
    if (getCurrArea() !== 'Catacombs') return;
    if (Settings.dungeonInteractiveElements) cancel(event);
}).setCriteria("A Chicken Mine exploded, hitting you for ${dmg} damage.");

register('chat', (event) => {
    if (!Settings.betterDungeonMsgs) return;
    if (getCurrArea() !== 'Catacombs') return;
    if (Settings.dungeonInteractiveElements) cancel(event);
}).setCriteria('A Spirit Bear has appeared!');

register('chat', (event) => {
    if (!Settings.betterDungeonMsgs) return;
    if (getCurrArea() !== 'Catacombs') return;
    if (Settings.dungeonInteractiveElements) cancel(event);
}).setCriteria('[CROWD]').setContains();


// FLOOR 5

// FLOOR 6

// FLOOR 7 -- p1 - maxor/other boss
register('chat', (boss, event) => {
    if (!Settings.betterDungeonMsgs) return;
    if (getCurrArea() !== 'Catacombs') return;
    if (Settings.dungeonInteractiveElements) cancel(event);
}).setCriteria('⚠ ${boss} is enraged! ⚠');

register('chat', (numCrystals, event) => {
    if (!Settings.betterDungeonMsgs) return;
    if (getCurrArea() !== 'Catacombs') return;
    if (Settings.dungeonInteractiveElements) {
        cancel(event);
        if (numCrystals === '2') ChatLib.chat('&a&lAll Energy Crystals Placed!');
    }
}).setCriteria('${numCrystals}/2 Energy Crystals are now active!');

register('chat', (event) => {
    if (!Settings.betterDungeonMsgs) return;
    if (getCurrArea() !== 'Catacombs') return;
    if (Settings.dungeonInteractiveElements) {
        cancel(event);
        ChatLib.chat('&c&lLaser Charged!');
    }
}).setCriteria('The Energy Laser is charging up!');


// FLOOR 7 -- p3 terms
register('chat', (event) => {
    if (!Settings.betterDungeonMsgs) return;
    if (getCurrArea() !== 'Catacombs') return;
    if (Settings.dungeonInteractiveElements) cancel(event);
}).setCriteria('The gate will open in 5 seconds!');

register('chat', (event) => {
    if (!Settings.betterDungeonMsgs) return;
    if (getCurrArea() !== 'Catacombs') return;
    if (Settings.dungeonInteractiveElements) cancel(event);
}).setCriteria('The gate has been destroyed!');

register('chat', (event) => {
    if (!Settings.betterDungeonMsgs) return;
    if (getCurrArea() !== 'Catacombs') return;
    if (Settings.dungeonInteractiveElements) cancel(event);
}).setCriteria('Wrong number!');


// MM Floor 7 
register('chat', (event) => {
    if (!Settings.betterDungeonMsgs) return;
    if (getCurrArea() !== 'Catacombs') return;
    if (Settings.dungeonInteractiveElements) cancel(event);
}).setCriteria('The Crystal withers your soul as you hold it in your hands!');


// Blessing Messages
register('chat', (player, blessing, mins, secs, event) => {
    if (!Settings.betterDungeonMsgs) return;
    if (getCurrArea() !== 'Catacombs') return;
    if (Settings.dungeonInteractiveElements) cancel(event);
}).setCriteria('${player} has obtained a Blessing of ${blessing}! (${mins}m ${secs}s)');

register('chat', (player, blessing, mins, secs, event) => {
    if (!Settings.betterDungeonMsgs) return;
    if (getCurrArea() !== 'Catacombs') return;
    if (Settings.dungeonInteractiveElements) {
        cancel(event);
        ChatLib.chat(`&6&lDUNGEON BUFF! &dBlessing of ${blessing}!`);
    }
}).setCriteria('DUNGEON BUFF! ${player} found a Blessing of ${blessing}! (${mins}m ${secs}s)');

register('chat', (pu1, pu2, icon, effect, event) => {
    if (!Settings.betterDungeonMsgs) return;
    if (getCurrArea() !== 'Catacombs') return;
    if (Settings.dungeonInteractiveElements) cancel(event);
}).setCriteria('Also granted you +${pu1} & +${pu2}x ${icon} ${effect}.');

register('chat', (pu1, pu2, icon, effect, event) => {
    if (!Settings.betterDungeonMsgs) return;
    if (getCurrArea() !== 'Catacombs') return;
    if (Settings.dungeonInteractiveElements) cancel(event);
}).setCriteria('Granted you +${pu1} & +${pu2}x ${icon} ${effect}.');


// Puzzle Messages -- Comps
register('chat', (player, event) => {
    if (!Settings.betterDungeonMsgs) return;
    if (getCurrArea() !== 'Catacombs') return;
    if (Settings.dungeonInteractiveElements) {
        cancel(event);
        ChatLib.chat('&a&lTic Tac Toe Completed!');
    }
}).setCriteria('PUZZLE SOLVED! ${player} tied Tic Tac Toe! Good job!');

register('chat', (player, npcName, event) => {
    if (!Settings.betterDungeonMsgs) return;
    if (getCurrArea() !== 'Catacombs') return;
    if (Settings.dungeonInteractiveElements) {
        cancel(event);
        ChatLib.chat('&a&lThree Weirdos Completed!');
    }
}).setCriteria("PUZZLE SOLVED! ${player} wasn't fooled by ${npcName}! Good job!");


// Puzzle Messages -- Fails
register('chat', (event) => {
    if (!Settings.betterDungeonMsgs) return;
    if (getCurrArea() !== 'Catacombs') return;
    if (Settings.dungeonInteractiveElements) {
        cancel(event);
        ChatLib.chat(`&c&lPUZZLE FAIL! &f&lBOMB DEFUSE`);
    }
}).setCriteria('PUZZLE FAIL! The Creeper Bomb exploded! You took too long! Yikes!');

register('chat', (player, npc, event) => {
    if (!Settings.betterDungeonMsgs) return;
    if (getCurrArea() !== 'Catacombs') return;
    if (Settings.dungeonInteractiveElements) {
        cancel(event);
        ChatLib.chat(`&c&lPUZZLE FAIL! &f&lTHREE WEIRDOS &7(${player})`);
    }
}).setCriteria('PUZZLE FAIL! ${player} was fooled by ${npc}! Yikes!');

register('chat', (player, event) => {
    if (!Settings.betterDungeonMsgs) return;
    if (getCurrArea() !== 'Catacombs') return;
    if (Settings.dungeonInteractiveElements) {
        cancel(event);
        ChatLib.chat(`&c&lPUZZLE FAIL! &f&lBLAZE &7(${player})`)
    }
}).setCriteria('PUZZLE FAIL! ${player} killed a Blaze in the wrong order! Yikes!');

// Mob Damage Messages
register('chat', (skull, damage, event) => {
    if (!Settings.betterDungeonMsgs) return;
    if (getCurrArea() !== 'Catacombs') return;
    if (Settings.dungeonInteractiveElements) cancel(event);
}).setCriteria('A ${skull} exploded, hitting you for ${damage} damage.');

register('chat', (mobName, damage, event) => {
    if (!Settings.betterDungeonMsgs) return;
    if (getCurrArea() !== 'Catacombs') return;
    if (Settings.dungeonInteractiveElements) cancel(event);
}).setCriteria('The ${mobName} struck you for ${damage} damage!');

register('chat', (damage, event) => {
    if (!Settings.betterDungeonMsgs) return;
    if (getCurrArea() !== 'Catacombs') return;
    if (Settings.dungeonInteractiveElements) cancel(event);
}).setCriteria('Your bone plating reduced the damage you took by ${damage}');

register('chat', (miniBoss, ability, event) => {
    if (!Settings.betterDungeonMsgs) return;
    if (getCurrArea() !== 'Catacombs') return;
    if (Settings.dungeonInteractiveElements) cancel(event);
}).setCriteria("The ${miniBoss} used ${ability} on you!");


// Witherborn Damage Messages
register('chat', (enemies, damage, event) => {
    if (!Settings.betterDungeonMsgs) return;
    if (getCurrArea() !== 'Catacombs') return;
    if (Settings.dungeonInteractiveElements) cancel(event);
}).setCriteria('Your Witherborn hit ${enemies} enemy for ${damage} damage.');


// Bomb Defusal Messages
register('chat', (message, event) => {
    if (!Settings.betterDungeonMsgs) return;
    // if (getCurrArea() !== 'Catacombs') return;
    if (Settings.dungeonInteractiveElements) {
        cancel(event);
        if (message === "That's a fine pair of loot chests! You better hurry or I'll explode and destroy them!") {
            ChatLib.chat(`&a&l[BOMB] &r&aCreeper: &f&lPUZZLE STARTED!`);

        }
        if (message === "I'm starting to get excited! In 30s, I'm going to ruin your day!") {
            ChatLib.chat(`&a&l[BOMB] &r&aCreeper: &c&l30s Left!`);
        } 
    }
}).setCriteria('[BOMB] Creeper: ${message}').setContains();


// auto recombs
register('chat', (item, event) => {
    if (!Settings.betterDungeonMsgs) return;
    if (getCurrArea() !== 'Catacombs') return;
    if (Settings.dungeonInteractiveElements) cancel(event);
}).setCriteria('Your Auto Recombobulator recombobulated ${item}!').setContains();

/////////////////////////////////////////////////////////////////////////////////////////////

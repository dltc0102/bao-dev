import Settings from '../settings.js';
import { data } from '../utils/data.js';
import { sendMessage } from '../utils/party.js';
import { debug } from '../utils/utils.js';

///////////////////////////////////////////////////////////////////////////////
// BETTER DUNGEON MESSAGES
///////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////
// MORT / START
///////////////////////////////////////////////////////////////////////////////
register('chat', (event) => {
    if (Settings.betterDungeonMsgs) cancel(event);
}).setCriteria('[NPC] Mort:').setContains();

register('chat', (event) => { 
    if (Settings.betterDungeonMsgs) cancel(event);
}).setCriteria('You are not allowed to use Potion Effects while in Dungeon, therefore all active effects have been paused and stored. They will be restored when you leave Dungeon!');

///////////////////////////////////////////////////////////////////////////////
// CLASS STUFF
///////////////////////////////////////////////////////////////////////////////
let dungeonClasses = ['Berserk', 'Archer', 'Tank', 'Healer', 'Mage']
register('chat', (className, event) => {
    if (data.currArea !== 'Catacombs') return;
    if (Settings.betterDungeonMsgs) {
        if (dungeonClasses.includes(className)) {
            cancel(event);
        }
    }
}).setCriteria('[${className}] ').setContains();

register('chat', (className, event) => {
    if (Settings.betterDungeonMsgs) {
        cancel(event);
        ChatLib.chat(`${data.modPrefix} Mode: SOLO`);
    }
}).setCriteria('Your ${className} stats are doubled because you are the only player using this class!');


register('chat', (orbType, player, heal, shield, time, event) => {
    if (Settings.betterDungeonMsgs) cancel(event);
}).setCriteria('◕ You picked up a ${orbType} Orb from ${player} healing you for ${heal}❤ and granting you +${shield}% Defense for ${time} seconds.');

register('chat', (player, heal, shield, event) => {
    if (Settings.betterDungeonMsgs) {
        cancel(event);
        ChatLib.chat(`&r&l${player} Wished Everyone!`)
    }
}).setCriteria("${player}'s Wish healed you for ${heal} health and granted you an absorption shield with ${shield} health!");

///////////////////////////////////////////////////////////////////////////////
// ABILITIES
///////////////////////////////////////////////////////////////////////////////
register('chat', (ability, event) => {
    if (Settings.betterDungeonMsgs) {
        cancel(event);
        ChatLib.chat(`&a${ability} is ready!`);
    }
}).setCriteria('${ability} is ready to use! Press DROP to activate it!');

register('chat', (ability, event) => {
    if (Settings.betterDungeonMsgs) cancel(event);
}).setCriteria('Used ${ability}!');

register('chat', (abiWeapon, numEnemies, damage, event) => {
    if (Settings.betterDungeonMsgs) cancel(event);
}).setCriteria('Your ${abiWeapon} hit ${numEnemies} enemy for ${damage} damage.');

register('chat', (abiWeapon, numEnemies, damage, event) => {
    if (Settings.betterDungeonMsgs) cancel(event);
}).setCriteria('Your ${abiWeapon} hit ${numEnemies} enemies for ${damage} damage.');

register('chat', (dunClass, ultAbi, event) => {
    if (Settings.betterDungeonMsgs) {
        cancel(event);
        ChatLib.chat(`&aULTIMATE ${ultAbi} is ready!`);
    }
}).setCriteria('Your ${dunClass} ULTIMATE ${ultAbi} is now available');

register('chat', (ability, event) => {
    if (Settings.betterDungeonMsgs) cancel(event);
}).setCriteria('${ability} is now available!');

// Revive messages
register('chat', (player, event) => {
    // ' ❣ oBiscuit was revived!
    if (Settings.betterDungeonMsgs) cancel(event);
}).setCriteria(' ❣ ${player} was revived!');

register('chat', (player, event) => {
    // ' ❣ You are reviving oBiscuit!
    if (Settings.betterDungeonMsgs) cancel(event);
}).setCriteria(' ❣ You are reviving ${player}!');

register('chat', (p1, p2, event) => {
    if (Settings.betterDungeonMsgs) cancel(event);
}).setCriteria(' ❣ ${p1} is reviving ${p2}!');

register('chat', (p1, p2, event) => {
    if (Settings.betterDungeonMsgs) cancel(event);
}).setCriteria(' ❣ ${p1} was revived by ${p2}!');


register('chat', (player, fairy, event) => {
    // ' ❣ oBiscuit was revived by (name) the Fairy!
    if (Settings.betterDungeonMsgs) cancel(event);
}).setCriteria('❣ ${player} was revived by ${fairy} the Fairy!').setContains();

// Death messages // keep
register('chat', (player, event) => {
    // ☠ oBiscuit was killed by (something...)
    if (Settings.betterDungeonMsgs) cancel(event);
}).setCriteria(' ☠ ${player} was killed by').setContains();

// Essence messages
register('chat', (player, event) => {
    if (Settings.betterDungeonMsgs) {
        cancel(event);
        ChatLib.chat('&8&l+1 Essence');
    }
}).setCriteria('${player} found a Wither Essence! Everyone gains an extra essence!');

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
register('chat', (numEss, typeEss, event) => {
    if (Settings.betterDungeonMsgs) {
        cancel(event);
        let colorF = determineEss(typeEss);
        ChatLib.chat(`${colorF}&l+${numEss} Essence`);
    }
}).setCriteria('ESSENCE! You found x${numEss} ${typeEss} Essence!');

register('chat', (player, numEss, typeEss, event) => {
    if (Settings.betterDungeonMsgs) {
        cancel(event);
        let colorF = determineEss(typeEss);
        ChatLib.chat(`${colorF}&l+${numEss} Essence`);
    }
}).setCriteria('ESSENCE! ${player} found x${numEss} ${typeEss} Essence!');

// Milestone messages
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
register('chat', (msClass, milestone, msDamage, event) => {
    if (Settings.betterDungeonMsgs) {
        cancel(event);
        let ms = determineMS(milestone);
        ms !== 9 ? ChatLib.chat(`&6&l${msClass} Milestone ${ms} Reached`) : ChatLib.chat(`&6&lMaxed ${msClass} Milestone Reached`);
    }
}).setCriteria('${msClass} Milestone ${milestone}: You have dealt ${msDamage} Total Damage so far!').setContains();




// Wither Door messages
register('chat', (player, event) => { // keep
    if (Settings.betterDungeonMsgs) cancel(event);
}).setCriteria('${player} has obtained Wither Key!');

register('chat', (player, event) => { // keep
    if (Settings.betterDungeonMsgs) cancel(event);
}).setCriteria('${player} opened a WITHER door!');

register('chat', (event) => {
    if (Settings.betterDungeonMsgs) cancel(event);
}).setCriteria('RIGHT CLICK on a WITHER door to open it. This key can only be used to open 1 door!');

// Blood Door messages
let bloodPlayer = '';
register('chat', (player, event) => {
    bloodPlayer = player;
    if (Settings.betterDungeonMsgs) cancel(event);
}).setCriteria('${player} has obtained Blood Key!');

register('chat', (event) => {
    if (Settings.betterDungeonMsgs) cancel(event);
}).setCriteria('RIGHT CLICK on the BLOOD DOOR to open it. This key can only be used to open 1 door!');

register('chat', (event) => {
    if (Settings.betterDungeonMsgs) cancel(event);
}).setCriteria('A shiver runs down your spine...');

register('chat', (event) => {
    if (Settings.betterDungeonMsgs) cancel(event);
}).setCriteria('You hear the sound of something opening...');

register('chat', (event) => {
    if (Settings.betterDungeonMsgs) {
        cancel(event);
        ChatLib.chat(`&c&l${bloodPlayer} opened the Blood Door!`);
    }
}).setCriteria('The BLOOD DOOR has been opened!');

// Boss Messages
register('chat', (message, event) => {
    if (Settings.betterDungeonMsgs) {
        if (message !== 'You have proven yourself. You may pass.' || message !== 'That will be enough for now.') cancel (event);
    }
}).setCriteria('[BOSS] The Watcher: ${message}');

// Statue Messages
register('chat', (event) => {
    if (Settings.betterDungeonMsgs) cancel(event);
}).setCriteria('[STATUE] Oruo the Omniscient:').setContains();

// Error Messages
register('chat', (event) => {
    if (Settings.betterDungeonMsgs) cancel(event);
}).setCriteria('You cannot use abilities in this room!');

register('chat', (event) => {
    if (Settings.betterDungeonMsgs) cancel(event);
}).setCriteria('Oops! You stepped on the wrong block!');

register('chat', (event) => {
    if (Settings.betterDungeonMsgs) cancel(event);
}).setCriteria("Don't move diagonally! bad!");


register('chat', (event) => {
    if (Settings.betterDungeonMsgs) {
        cancel(event);
        ChatLib.chat('&c&lLEVER USED');
    }
}).setCriteria('This lever has already been used.');

// Creeper Veil Messagess
register('chat', (event) => {
    if (Settings.betterDungeonMsgs) {
        cancel(event);
        ChatLib.chat('&aCreeper Veil: &r&lON');
    }
}).setCriteria('Creeper Veil Activated!');

register('chat', (event) => {
    if (Settings.betterDungeonMsgs) {
        cancel(event);
        ChatLib.chat('&aCreeper Veil: &7&lOFF');
    }
}).setCriteria('Creeper Veil De-activated!');

// mob messages
// general
register('chat', (skull, damage, event) => {
    if (Settings.betterDungeonMsgs) cancel(event);
}).setCriteria('A ${skull} exploded, hitting you for ${damage} damage.');

register('chat', (damage, event) => {
    if (Settings.betterDungeonMsgs) cancel(event);
}).setCriteria('The Flamethrower hit you for ${damage} damage!');

// f1

// f2

// f3
register('chat', (event) => {
    if (Settings.betterDungeonMsgs) cancel(event);
}).setCriteria('⚠ The Laser Guardian is charging up their Focus Beam! ⚠');


// f4
register('chat', (dmg, event) => {
    if (Settings.betterDungeonMsgs) cancel(event);
}).setCriteria("The Spirit Chicken's lightning struck you for ${dmg} damage.");

register('chat', (dmg, event) => {
    if (Settings.betterDungeonMsgs) cancel(event);
}).setCriteria("A Chicken Mine exploded, hitting you for ${dmg} damage.");

register('chat', (event) => {
    if (Settings.betterDungeonMsgs) cancel(event);
}).setCriteria('A Spirit Bear has appeared!');

register('chat', (event) => {
    if (Settings.betterDungeonMsgs) cancel(event);
}).setCriteria('[CROWD]').setContains();

// f7 p1 - maxor
register('chat', (event) => {
    if (Settings.betterDungeonMsgs) cancel(event);
}).setCriteria('⚠ Maxor is enraged! ⚠');

register('chat', (numCrystals, event) => {
    if (Settings.betterDungeonMsgs) {
        cancel(event);
        if (numCrystals === '2') ChatLib.chat('&a&lAll Energy Crystals Placed!');
    }
}).setCriteria('${numCrystals}/2 Energy Crystals are now active!');

register('chat', (event) => {
    if (Settings.betterDungeonMsgs) {
        cancel(event);
        ChatLib.chat('&c&lLaser Charged!');
    }
}).setCriteria('The Energy Laser is charging up!');

// f7 p2 - storm
register('chat', (event) => {
    if (Settings.betterDungeonMsgs) cancel(event);
}).setCriteria("⚠ Storm is enraged! ⚠");

register('chat', (damage, event) => {
    if (Settings.betterDungeonMsgs) cancel(event);
}).setCriteria("Storm's Shadow Wave hit you for ${damage} damage.");

register('chat', (damage, event) => {
    if (Settings.betterDungeonMsgs) cancel(event);
}).setCriteria("Storm's Static Field hit you for ${damage} damage.");

register('chat', (damage, event) => {
    if (Settings.betterDungeonMsgs) cancel(event);
}).setCriteria("Storm's Giga Lightning hit you for ${damage} true damage.");

register('chat', (damage, event) => {
    if (Settings.betterDungeonMsgs) cancel(event);
}).setCriteria("Storm's Lightning Fireball hit you for ${damage} true damage.");

register('chat', (damage, event) => {
    if (Settings.betterDungeonMsgs) cancel(event);
}).setCriteria("Storm's Shadow Explosion hit you for ${damage} damage.");

// f7 p3 terms
register('chat', (event) => {
    if (Settings.betterDungeonMsgs) cancel(event);
}).setCriteria('The gate will open in 5 seconds!');

register('chat', (event) => {
    if (Settings.betterDungeonMsgs) cancel(event);
}).setCriteria('The gate has been destroyed!');

register('chat', (event) => {
    if (Settings.betterDungeonMsgs) cancel(event);
}).setCriteria('Wrong number!');

register('chat', (damage, event) => {
    if (Settings.betterDungeonMsgs) cancel(event);
}).setCriteria("Goldor's Frenzy hit you for ${damage} damage.");

register('chat', (damage, event) => {
    if (Settings.betterDungeonMsgs) cancel(event);
}).setCriteria("Goldor's TNT Trap hit you for ${damage} true damage.");

register('chat', (damage, event) => {
    if (Settings.betterDungeonMsgs) cancel(event);
}).setCriteria("Goldor's Greatsword hit you for ${damage} damage.");

// npc sold hider
// get list of dungeon items
register('chat', (thing, amt, coin, event) => {
    if (data.currArea !== 'Catacombs') return;
    if (Settings.betterDungeonMsgs) {
        if (!thing.includes('Hyperion')) cancel(event);
    }
}).setCriteria('You sold ${thing} x${amt} for ${coin} Coins!');

register('chat', (thing, amt, coins, event) => {
    if (data.currArea !== 'Catacombs') return;
    if (Settings.betterDungeonMsgs) {
        if (!thing.includes('Hyperion')) cancel(event);
    }
}).setCriteria('You sold ${ting} x${amt} for ${coins} Coin!');

// mute friend join leavess during dungeon
register('chat', (pplayer, status, event) => {
    if (data.currArea === 'Catacombs') {
        if (Settings.betterDungeonMsgs) cancel(event);
    }
}).setCriteria('Friend > ${player} ${status}.');

// silverfish messages
register('chat', (event) => {
    if (Settings.betterDungeonMsgs) cancel(event);
}).setCriteria("You cannot hit the silverfish while it's moving!");

register('chat', (event) => {
    if (Settings.betterDungeonMsgs) cancel(event);
}).setCriteria("You cannot move the silverfish in that direction!");

// obtained stuff
register('chat', (player, ting, event) => {
    if (Settings.betterDungeonMsgs) cancel(event);
}).setCriteria('${player} has obtained ${ting}!');

register('chat', (book, event) => {
    if (Settings.betterDungeonMsgs) cancel(event);
}).setCriteria('You found a journal named ${book}!');

// witherborn
register('chat', (enemies, damage, event) => {
    if (Settings.betterDungeonMsgs) cancel(event);
}).setCriteria('Your Witherborn hit ${enemies} enemy for ${damage} damage.');

// default sacks hider
register('chat', (items, pluralItem, secs, event) => {
    if (Settings.betterDungeonMsgs) cancel(event);
}).setCriteria('[Sacks] +${items} ${pluralItem}. (Last ${secs}s.)');

register('chat', (items, pluralItem, secs, event) => {
    if (Settings.betterDungeonMsgs) cancel(event);
}).setCriteria('[Sacks] -${items} ${pluralItem}. (Last ${secs}s.)');

// puzzle comps
register('chat', (player, event) => {
    if (Settings.betterDungeonMsgs) {
        cancel(event);
        ChatLib.chat('&a&lTic Tac Toe Completed!')
    }
}).setCriteria('PUZZLE SOLVED! ${player} tied Tic Tac Toe! Good job!');

// decoy deployed
register('chat', (event) => {
    if (Settings.betterDungeonMsgs) cancel(event);
}).setCriteria('Decoy deployed!');

// guild xp
register('chat', (exp, event) => {
    if (Settings.betterDungeonMsgs) cancel(event);
}).setCriteria('You earned ${exp} GEXP from playing SkyBlock!');

// blessings
register('chat', (player, blessing, mins, secs, event) => {
    if (Settings.betterDungeonMsgs) cancel(event);
}).setCriteria('${player} has obtained a Blessing of ${blessing}! (${mins}m ${secs}s)');

register('chat', (player, blessing, mins, secs, event) => {
    if (Settings.betterDungeonMsgs) {
        cancel(event);
        ChatLib.chat(`&6&lDUNGEON BUFF! &dBlessing of ${blessing}!`);
    }
}).setCriteria('DUNGEON BUFF! ${player} found a Blessing of ${blessing}! (${mins}m ${secs}s)');

register('chat', (pu1, pu2, icon, effect, event) => {
    if (Settings.betterDungeonMsgs) cancel(event);
}).setCriteria('Also granted you +${pu1} & +${pu2}x ${icon} ${effect}.');

register('chat', (pu1, pu2, icon, effect, event) => {
    if (Settings.betterDungeonMsgs) cancel(event);
}).setCriteria('Granted you +${pu1} & +${pu2}x ${icon} ${effect}.');
import Settings from '../settings.js';
import { data } from '../utils/data.js';
import { debug, showAlert } from '../utils/utils.js';
import { getIsPL, sendMessage, getPList } from '../utils/party.js';
import { determinePlayerRankColor, calcSkillXP } from '../utils/functions.js';


/* General QOL
* #warp, #w
* type #w or #warp when r for warp
* #pai
* #ko
* #pt, #transfer
* #pta
* kicked from sb alert
* boop notifier
* /warpexc
* aotv 'there are blocks in the way' message hider
* soopy 'ajfaweaefeafesafadfasefaeafea unknown command' message hider
* better stash messages
* hide lightning
* snow cannon message hider
* grandma wolf hider
* watchdog message hider
*/

///////////////////////////////////////////////////////////////////////////////
// #warp ----------------------------------------------------------------------
///////////////////////////////////////////////////////////////////////////////
register('chat', (rank, name, event) => {
    if (!data.inSkyblock) return;
    if (!Settings.auto_warp_cmd) return;
    if (getIsPL()) {
        ChatLib.command('p warp');
        data.audioInst.playDefaultSound();
   
    }
    debug(`isPL: ${getIsPL()}`)
}).setCriteria('Party > ${rank} ${name}: #warp')

register('chat', (rank, name, event) => {
    if (!data.inSkyblock) return;
    if (!Settings.auto_warp_cmd) return;
    if (getIsPL()) {
        ChatLib.command('p warp');
        data.audioInst.playDefaultSound();
    } 
    debug(`isPL: ${getIsPL()}`)
}).setCriteria('Party > ${rank} ${name}: #w')



///////////////////////////////////////////////////////////////////////////////
// Auto notifier for #warp when player joins ----------------------------------
///////////////////////////////////////////////////////////////////////////////
register('chat', (player, event) => {
    if (!data.inSkyblock) return;
    if (!Settings.auto_notify_warp_cmd) return
    if (!getIsPL()) return;
    sendMessage('[!] type #warp for warp when r[!]')
    data.audioInst.playDefaultSound();
}).setCriteria('${player} joined the party.')


///////////////////////////////////////////////////////////////////////////////
// #pai -----------------------------------------------------------------------
///////////////////////////////////////////////////////////////////////////////
register('chat', (rank, name, event) => {
    if (!data.inSkyblock) return;
    if (!Settings.pai_cmd) return
    const paiPattern = /\#pai/;
    const message = ChatLib.getChatMessage(event, true);
    const paiMatch = message.match(paiPattern);
    if (paiMatch) { 
        ChatLib.command('p settings allinvite'); 
        data.audioInst.playDefaultSound();
    }
}).setCriteria('Party > ${rank} ${name}: #pai')


///////////////////////////////////////////////////////////////////////////////
// #ko ------------------------------------------------------------------------
///////////////////////////////////////////////////////////////////////////////
register('chat', (rank, ignevent) => {
    if (!getIsPL()) return;
    ChatLib.command('p kickoffline')
}).setCriteria('Party > ${rank} ${ign}: #ko')

///////////////////////////////////////////////////////////////////////////////
// #pt / #transfer ------------------------------------------------------------
///////////////////////////////////////////////////////////////////////////////
register('command', () => {
    ChatLib.chat(getIsPL())
}).setName('checkpl');

register('chat', (rank, ign, event) => {
    if (!getIsPL()) return;
    ChatLib.command(`p transfer ${ign}`)
}).setCriteria('Party > ${rank} ${ign}: #pt')

register('chat', (rank, ign, event) => {
    if (!getIsPL()) return;
    ChatLib.command(`p transfer ${ign}`)
}).setCriteria('Party > ${rank} ${ign}: #transfer')

// #pta
register('chat', (rank, ign, event) => {
    if (!getIsPL()) return;
    // get list of players in party
    // get list of players in lockedlist
    // get list of player in party, not in locked list
    // if pl, choose a random number between 0 and len(possible_players) and index one to transfer to
}).setCriteria('Party > ${rank} ${ign}: #pta')


///////////////////////////////////////////////////////////////////////////////
// Kicked from SB Alert -------------------------------------------------------
///////////////////////////////////////////////////////////////////////////////
// kicked from sb alert
register('chat', (event) => {
    if (!data.inSkyblock) return;
    if (!Settings.kicked_notifier) return;
    sendMessage('You were kicked while joining that server! 1 minute cooldown.')
}).setCriteria('You were kicked while joining that server!')


///////////////////////////////////////////////////////////////////////////////
// Boop Notifier --------------------------------------------------------------
///////////////////////////////////////////////////////////////////////////////
register('chat', (rank, player, event) => {
    if (!data.inSkyblock) return;
    if (!Settings.boop_notifier) return
    const rankColor = determinePlayerRankColor(rank);
    showAlert(`${rankColor}${player} &dBooped &ryou!`);
    data.audioInst.playDefaultSound();
}).setCriteria("From [${rank}] ${player}: Boop!")


///////////////////////////////////////////////////////////////////////////////
// /warpexc -------------------------------------------------------------------
///////////////////////////////////////////////////////////////////////////////
register("command", (...args) => {
    if (!data.inSkyblock) return;
    if (!Settings.warp_exc_cmd) return
    const namesExc = args;

    const executeCommands = (commands, delay) => {
        commands.forEach((command, index) => {
            setTimeout(() => {
                ChatLib.command(`${command}`);
            }, index * delay);
        });
    };

    setTimeout(() => {
        const allCommands = [];
        const removeCommands = namesExc.map(name => `p remove ${name}`);
        const inviteCommands = namesExc.map(name => `p invite ${name}`);
        for (let i = 0; i < namesExc.length; i++) { allCommands.push(removeCommands[i]); }
        const warpCommand = 'p warp';
        allCommands.push(warpCommand);
        for (let i = 0; i < namesExc.length; i++) { allCommands.push(inviteCommands[i]); }

        executeCommands(allCommands, 1000);
    }, 1000);
}).setName('warpexc');

////////////////////////////////////////////////////////////////////////////////
// MESSAGE HIDERS --------------------------------------------------------------
////////////////////////////////////////////////////////////////////////////////
// aotv hider
register('chat', (event) => {
    if (!Settings.aotvHider) return;
    cancel(event);
}).setCriteria('There are blocks in the way!');

// soopy message
register('chat', (event) => {
    if (!Settings.randomSoopyMessageHider) return;
    cancel(event);
}).setCriteria(`Unknown command. Type "/help" for help. ('uhfdsolguhkjdjfhgkjhdfdlgkjhldkjhlkjhsldkjfhldshkjf')`);


// stash shortener
let pickupMat = '';
let numMats = 0;
let remMats = 0;
let sackTypes = 0;
register('chat', (itemName, event) => {
    if (Settings.betterStashMessages) cancel(event);
    pickupMat = itemName;
}).setCriteria('From stash: ${itemName}');

register('chat', (numItems, event) => {
    if (Settings.betterStashMessages) cancel(event);
    numMats = Number(numItems);
}).setCriteria('You picked up ${numItems} items from your material stash!');

register('chat', (matsRem, numTypes, event) => {
    if (Settings.betterStashMessages) cancel(event);
    remMats = parseInt(matsRem.replace(',', ''), 10);
    sackTypes = Number(numTypes);

    if (Settings.betterStashMessages) ChatLib.chat(`&eFrom Sacks: &b${pickupMat} x${numMats} &7|| &cR: &b${remMats} &7|| &aTypes: ${sackTypes}`)
}).setCriteria('You still have ${matsRem} materials totalling ${numTypes} types of materials in there!');

// click stash shortener
let reminderMatsRem = 0;
let numTypesRem = 0;
register('chat', (numMatsRem, event) => {
    if (Settings.hideClickStashMessages) cancel(event);
    reminderMatsRem = parseInt(numMatsRem.replace(',', ''), 10);
}).setCriteria('You have ${numMatsRem} materials stashed away!').setContains();

register('chat', (numTypes, event) => {
    if (Settings.hideClickStashMessages) cancel(event);
    numTypesRem = Number(numTypes);
}).setCriteria('(This totals ${numTypes} type of material stashed!)').setContains();

register('chat', (numTypes, event) => {
    if (Settings.hideClickStashMessages) cancel(event);
    numTypesRem = Number(numTypes);
}).setCriteria('(This totals ${numTypes} types of materials stashed!)').setContains();

let limitOptions = {
    '0': 1, 
    '1': 6, 
    '2': 11, 
    '3': 0,
}
let stashLimit = limitOptions[Settings.clickStashLimitOption];
let numTillReminder = stashLimit;

register('chat', (event) => {
    if (Settings.hideClickStashMessages) {
        cancel(event);
        
        if (numTillReminder !== 0) {
            ChatLib.chat(`&4&lREMINDER: &rYou have &b${reminderMatsRem}&r materials of &b${numTypesRem}&r type(s) in your sacks!`);
            if (stashLimit === 1) numTillReminder === 1; 
            if (stashLimit === 6) numTillReminder === 6; 
            if (stashLimit === 11) numTillReminder === 11; 
        }
        numTillReminder -= 1;
    }
}).setCriteria('>>> CLICK HERE to pick them up! <<<').setContains();



// hide lightning
register("renderEntity", function (entity, position, ticks, event) {
    if (!World.isLoaded()) return;
    if (!data.inSkyblock) return;
    if (!Settings.hide_lightning) return;
    if(entity.getClassName() === "EntityLightningBolt") cancel(event);
})

// snow cannon message hider
register('chat', (playerName, event) => {
    if (!data.inSkyblock) return;
    if (data.currArea !== "Jerry's Workshop") return;
    if (!Settings.hide_snow_cannon_messages) return;
    cancel(event);
}).setCriteria(' ☃ ${playerName} mounted a Snow Cannon!');

// baker qol
register('chat', (event) => {
    if (!data.inSkyblock) return;
    if (!Settings.get_baker_cake) return;
    setTimeout(() => {
        ChatLib.command('openbaker')
    }, 250)
}).setCriteria('CLICK HERE to get your SPECIAL new year cake!').setContains();

// grandma wolf hider
register('chat', (event) => {
    if (!data.inSkyblock) return;
    if (Settings.grandma_hider) cancel(event);
}).setCriteria('+5 Kill Combo +3✯ Magic Find');

register('chat', (event) => {
    if (!data.inSkyblock) return;
    if (Settings.grandma_hider) cancel(event);
}).setCriteria('+5 Kill Combo +3✯ Magic Find');

register('chat', (event) => {
    if (!data.inSkyblock) return;
    if (Settings.grandma_hider) cancel(event);
}).setCriteria('+10 Kill Combo +10 coins per kill');

register('chat', (event) => {
    if (!data.inSkyblock) return;
    if (Settings.grandma_hider) cancel(event);
}).setCriteria('+15 Kill Combo +3✯ Magic Find');

register('chat', (event) => {
    if (!data.inSkyblock) return;
    if (Settings.grandma_hider) cancel(event);
}).setCriteria('+20 Kill Combo +15☯ Combat Wisdom');

register('chat', (event) => {
    if (!data.inSkyblock) return;
    if (Settings.grandma_hider) cancel(event);
}).setCriteria('+25 Kill Combo +3✯ Magic Find');

register('chat', (event) => {
    if (!data.inSkyblock) return;
    if (Settings.grandma_hider) cancel(event);
}).setCriteria('+30 Kill Combo +10 coins per kill');

register('chat', (event) => {
    if (!data.inSkyblock) return;
    if (Settings.grandma_hider) cancel(event);
}).setCriteria('+${combo} Kill Combo');

register('chat', (combo, event) => {
    if (!data.inSkyblock) return;
    if (Settings.grandma_hider) cancel(event);
}).setCriteria('Your Kill Combo has expired! You reached a ${combo} Kill Combo!');


/* Better Watchdog Messages
 * [WATCHDOG ANNOUNCEMENT]
 * Watchdog has banned 8,560 players in the last 7 days.
 * Staff have banned an additional 8,718 in the last 7 days.
 * Blacklisted modifications are a bannable offense!
 */

register('chat', (event) => {
    if (Settings.betterWDA) cancel(event);
}).setCriteria('[WATCHDOG ANNOUNCEMENT]');

register('chat', (banned, days, event) => {
    if (Settings.betterWDA) cancel(event);
}).setCriteria('Watchdog has banned ${banned} players in the last ${days} days.');

register('chat', (banned, days, event) => {
    if (Settings.betterWDA) cancel(event);
}).setCriteria('Staff have banned an additional ${banned} in the last ${days} days.');

register('chat', (event) => {
    if (Settings.betterWDA) cancel(event);
}).setCriteria('Blacklisted modifications are a bannable offense!');

 
// curr area command
register('command', () => {
    sendMessage(`currarea: ${data.currArea}`)
}).setName('currarea');
import Settings from '../settings.js';
import Audio from '../utils/audio.js';
import PogObject from 'PogData';

import { determinePlayerRankColor } from '../utils/functions.js';
import { getIsPL, getPList, sendMessage } from '../utils/party.js';
import { debug, showAlert } from '../utils/utils.js';
import { getInSkyblock, getCurrArea } from '../utils/functions.js'; // sb, area

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

////////////////////////////////////////////////////////////////////////////////
// SETUP CONSTS
////////////////////////////////////////////////////////////////////////////////
const generalAudio = new Audio();
const paiPattern = /\#pai/;
export const baoGeneral = new PogObject("bao-dev", {
    "stashes": {
        "numMats": 0, 
        "remMats": 0, 
        "sackTypes": 0, 
        "pickupMat": '',
    },
    "clickStash": {
        "numTillReminder": 0, 
        "reminderMatsRem": 0,
        "numTypesRem": 0, 
    }, 
})

///////////////////////////////////////////////////////////////////////////////
// #warp ----------------------------------------------------------------------
///////////////////////////////////////////////////////////////////////////////
register('chat', (rank, name, event) => {
    if (!getInSkyblock() || !World.isLoaded()) return;
    if (!Settings.auto_warp_cmd) return;
    if (getIsPL()) {
        ChatLib.command('p warp');
        generalAudio.playDefaultSound();
    }
    debug(`isPL: ${getIsPL()}`)
}).setCriteria('Party > ${rank} ${name}: #warp')

register('chat', (rank, name, event) => {
    if (!getInSkyblock() || !World.isLoaded()) return;
    if (!Settings.auto_warp_cmd) return;
    if (getIsPL()) {
        ChatLib.command('p warp');
        generalAudio.playDefaultSound();
    } 
    debug(`isPL: ${getIsPL()}`)
}).setCriteria('Party > ${rank} ${name}: #w')

register('command', () => {
    members = getPList();
    ChatLib.chat(`pl: ${members}`)
}).setName('pta');

///////////////////////////////////////////////////////////////////////////////
// Auto notifier for #warp when player joins ----------------------------------
///////////////////////////////////////////////////////////////////////////////
register('chat', (player, event) => {
    if (!getInSkyblock() || !World.isLoaded()) return;
    if (!Settings.auto_notify_warp_cmd) return
    if (getIsPL()) {
        setTimeout(() => {
            sendMessage('[!] type #warp or #w for warp when r [!]')
        }, 1)
        generalAudio.playDefaultSound();
    }
}).setCriteria('${player} joined the party.')


///////////////////////////////////////////////////////////////////////////////
// #pai -----------------------------------------------------------------------
///////////////////////////////////////////////////////////////////////////////
register('chat', (rank, name, event) => {
    if (!getInSkyblock() || !World.isLoaded()) return;
    if (!Settings.pai_cmd) return
    const message = ChatLib.getChatMessage(event, true);
    const paiMatch = message.match(paiPattern);
    if (getIsPL() && paiMatch) { 
        ChatLib.command('p settings allinvite'); 
        generalAudio.playDefaultSound();
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
    if (!getInSkyblock() || !World.isLoaded()) return;
    if (!Settings.kicked_notifier) return;
    sendMessage('You were kicked while joining that server! 1 minute cooldown.');
}).setCriteria('You were kicked while joining that server!')


///////////////////////////////////////////////////////////////////////////////
// Boop Notifier --------------------------------------------------------------
///////////////////////////////////////////////////////////////////////////////
register('chat', (rank, player, event) => {
    if (!getInSkyblock() || !World.isLoaded()) return;
    if (!Settings.boop_notifier) return
    const rankColor = determinePlayerRankColor(rank);
    showAlert(`${rankColor}${player} &dBooped &ryou!`);
    generalAudio.playDefaultSound();
}).setCriteria("From [${rank}] ${player}: Boop!")


///////////////////////////////////////////////////////////////////////////////
// /warpexc -------------------------------------------------------------------
///////////////////////////////////////////////////////////////////////////////
register("command", (...args) => {
    if (!getInSkyblock() || !World.isLoaded()) return;
    if (!Settings.warp_exc_cmd) return
    let namesExc = args;

    const executeCommands = (commands, delay) => {
        commands.forEach((command, index) => {
            setTimeout(() => {
                ChatLib.command(`${command}`);
            }, index * delay);
        });
    };

    setTimeout(() => {
        let allCommands = [];
        let removeCommands = namesExc.map(name => `p remove ${name}`);
        let inviteCommands = namesExc.map(name => `p invite ${name}`);
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
    if (Settings.aotvHider) cancel(event);
}).setCriteria('There are blocks in the way!');

// soopy message
register('chat', (event) => {
    if (Settings.randomSoopyMessageHider) cancel(event);
}).setCriteria(`Unknown command. Type "/help" for help. ('uhfdsolguhkjdjfhgkjhdfdlgkjhldkjhlkjhsldkjfhldshkjf')`);


// stash shortener
register('chat', (numItems, itemOrItems, timeS, event) => {
    if (Settings.betterStashMessages) cancel(event);
    // ChatLib.chat(ChatLib.getChatMessage(event, true));
}).setCriteria('[Sacks] +${numItems} ${itemOrItems}. (Last ${timeS}s.)');

register('chat', (itemName, event) => {
    if (Settings.betterStashMessages) cancel(event);
    baoGeneral.stashes.pickupMat = itemName;
}).setCriteria('From stash: ${itemName}');

register('chat', (numItems, event) => {
    if (Settings.betterStashMessages) cancel(event);
    baoGeneral.stashes.numMats = Number(numItems);
}).setCriteria('You picked up ${numItems} items from your material stash!');

register('chat', (matsRem, numTypes, event) => {
    if (Settings.betterStashMessages) cancel(event);
    baoGeneral.stashes.remMats = parseInt(matsRem.replace(',', ''), 10);
    baoGeneral.stashes.sackTypes = Number(numTypes);

    if (Settings.betterStashMessages) ChatLib.chat(`&eFrom Sacks: &b${baoGeneral.stashes.pickupMat} x${baoGeneral.stashes.numMats} &7|| &cR: &b${baoGeneral.stashes.remMats} &7|| &aTypes: ${baoGeneral.stashes.sackTypes}`)
}).setCriteria('You still have ${matsRem} materials totalling ${numTypes} types of materials in there!');

// click stash shortener
register('chat', (numMatsRem, event) => {
    if (!Settings.betterStashMessages) return;
    if (Settings.hideClickStashMessages) cancel(event);
    baoGeneral.clickStash.reminderMatsRem = parseInt(numMatsRem.replace(',', ''), 10);
}).setCriteria('You have ${numMatsRem} materials stashed away!').setContains();

register('chat', (numTypes, event) => {
    if (!Settings.betterStashMessages) return;
    if (Settings.hideClickStashMessages) cancel(event);
    baoGeneral.clickStash.numTypesRem = Number(numTypes);
}).setCriteria('(This totals ${numTypes} type of material stashed!)').setContains();

register('chat', (numTypes, event) => {
    if (!Settings.betterStashMessages) return;
    if (Settings.hideClickStashMessages) cancel(event);
    baoGeneral.clickStash.numTypesRem = Number(numTypes);
}).setCriteria('(This totals ${numTypes} types of materials stashed!)').setContains();

let numTillReminder = 10;
// hides click stash messages and only show them once every 10 times it has appeared.
register('chat', (event) => {
    if (!Settings.betterStashMessages) return;
    if (Settings.hideClickStashMessages) {
        if (numTillReminder === 0 && getCurrArea() !== 'Catacombs') {
            ChatLib.chat(`&4&lREMINDER: &rYou have &b${baoGeneral.clickStash.reminderMatsRem}&r materials of &b${baoGeneral.clickStash.numTypesRem}&r type(s) in your sacks!`);
            numTillReminder = 10;
        }
        cancel(event);
        numTillReminder -= 1;
    }
}).setCriteria('>>> CLICK HERE to pick them up! <<<').setContains();


// hide lightning
register("renderEntity", function (entity, position, ticks, event) {
    if (!World.isLoaded()) return;
    if (!getInSkyblock() || !World.isLoaded()) return;
    if (!Settings.hide_lightning) return;
    if (entity.getClassName() === "EntityLightningBolt") cancel(event);
})

// snow cannon message hider
register('chat', (playerName, event) => {
    if (!getInSkyblock() || !World.isLoaded()) return;
    if (getCurrArea() !== "Jerry's Workshop") return;
    if (!Settings.hide_snow_cannon_messages) return;
    cancel(event);
}).setCriteria(' ☃ ${playerName} mounted a Snow Cannon!');

// baker qol
register('chat', (event) => {
    if (!getInSkyblock() || !World.isLoaded()) return;
    if (!Settings.get_baker_cake) return;
    setTimeout(() => {
        ChatLib.command('openbaker')
    }, 250)
}).setCriteria('CLICK HERE to get your SPECIAL new year cake!').setContains();

// grandma wolf hider
register('chat', (event) => {
    if (!getInSkyblock() || !World.isLoaded()) return;
    if (Settings.grandma_hider) cancel(event);
}).setCriteria('+5 Kill Combo +3✯ Magic Find');

register('chat', (event) => {
    if (!getInSkyblock() || !World.isLoaded()) return;
    if (Settings.grandma_hider) cancel(event);
}).setCriteria('+10 Kill Combo +10 coins per kill');

register('chat', (event) => {
    if (!getInSkyblock() || !World.isLoaded()) return;
    if (Settings.grandma_hider) cancel(event);
}).setCriteria('+15 Kill Combo +3✯ Magic Find');

register('chat', (event) => {
    if (!getInSkyblock() || !World.isLoaded()) return;
    if (Settings.grandma_hider) cancel(event);
}).setCriteria('+20 Kill Combo +15☯ Combat Wisdom');

register('chat', (event) => {
    if (!getInSkyblock() || !World.isLoaded()) return;
    if (Settings.grandma_hider) cancel(event);
}).setCriteria('+25 Kill Combo +3✯ Magic Find');

register('chat', (event) => {
    if (!getInSkyblock() || !World.isLoaded()) return;
    if (Settings.grandma_hider) cancel(event);
}).setCriteria('+30 Kill Combo +10 coins per kill');

register('chat', (combo, event) => {
    if (!getInSkyblock() || !World.isLoaded()) return;
    if (Settings.grandma_hider) cancel(event);
}).setCriteria('+${combo} Kill Combo');

register('chat', (combo, event) => {
    if (!getInSkyblock() || !World.isLoaded()) return;
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
    sendMessage(`currarea: ${getCurrArea()}`);
}).setName('currarea');






register('chat', (event) => {
    setTimeout(() => {
        ChatLib.command('party accept MLGPlush')
    }, 1000)
}).setCriteria("[MVP+] MLGPlush has invited you to join their party!").setContains();

import Settings from '../settings.js';
import Audio from '../utils/audio.js';
import PogObject from 'PogData';

import { debug, showAlert, determinePlayerRankColor } from '../utils/utils.js';
import { getIsPL, getPList, sendMessage } from '../utils/party.js';
import { stripRank } from '../utils/party.js';
import { getInSkyblock, getCurrArea } from '../utils/functions.js'; // sb, area


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
// #warp 
///////////////////////////////////////////////////////////////////////////////
register('chat', (rank, name, event) => {
    if (!getInSkyblock() || !World.isLoaded() || !Settings.autoWarp) return;
    if (getIsPL()) {
        ChatLib.command('p warp');
        generalAudio.playDefaultSound();
    }
    debug(`isPL: ${getIsPL()}`)
}).setCriteria('Party > ${rank} ${name}: #warp')

register('chat', (rank, name, event) => {
    if (!getInSkyblock() || !World.isLoaded() || !Settings.autoWarp) return;
    if (getIsPL()) {
        ChatLib.command('p warp');
        generalAudio.playDefaultSound();
    } 
    debug(`isPL: ${getIsPL()}`)
}).setCriteria('Party > ${rank} ${name}: #w')


///////////////////////////////////////////////////////////////////////////////
// #pta
///////////////////////////////////////////////////////////////////////////////
register('chat', (playerName, event) => {
    if (getIsPL()) {
        let partyList = getPList();
        let excludedName = Player.getName();
        let randomIdx;

        do {
            randomIdx = Math.floor(Math.random() * partyList.length);
        } while (partyList[randomIdx] === excludedName);
        ChatLib.command(`p transfer ${partyList[randomIdx]}`);
    }  
}).setCriteria('Party > ${playerName}: #pta')


///////////////////////////////////////////////////////////////////////////////
// Auto notifier for #warp when player joins 
///////////////////////////////////////////////////////////////////////////////
register('chat', (playerName, event) => {
    if (!getInSkyblock() || !Settings.autoNotifyWarp) return;
    if (getIsPL()) {
        sendMessage('[!] type #warp or #w for warp when r [!]')
        generalAudio.playDefaultSound();
    }
}).setCriteria('${playerName} joined the party.')


///////////////////////////////////////////////////////////////////////////////
// #pai 
///////////////////////////////////////////////////////////////////////////////
register('chat', (rank, name, event) => {
    if (!getInSkyblock() || !Settings.paiCommand) return;
    if (getIsPL()) { 
        ChatLib.command('p settings allinvite'); 
        generalAudio.playDefaultSound();
    }
}).setCriteria('Party > ${rank} ${name}: #pai')


///////////////////////////////////////////////////////////////////////////////
// #ko 
///////////////////////////////////////////////////////////////////////////////
register('chat', (rank, ignevent) => {
    if (!Settings.koCommand) return;
    if (!getIsPL()) return;
    ChatLib.command('p kickoffline')
}).setCriteria('Party > ${rank} ${ign}: #ko')


///////////////////////////////////////////////////////////////////////////////
// #pt / #transfer 
///////////////////////////////////////////////////////////////////////////////
register('command', () => {
    ChatLib.chat(getIsPL())
}).setName('checkpl');

register('chat', (playerName, event) => {
    if (getIsPL()) {
        ChatLib.command(`p transfer ${stripRank(playerName)}`)
    }
}).setCriteria('Party > ${playerName}: #pt');


///////////////////////////////////////////////////////////////////////////////
// Kicked from SB Alert 
///////////////////////////////////////////////////////////////////////////////
register('chat', (event) => {
    if (!getInSkyblock() || !World.isLoaded()) return;
    if (!Settings.notifyKicked) return;
    sendMessage('You were kicked while joining that server! 1 minute cooldown.');
}).setCriteria('You were kicked while joining that server!')


///////////////////////////////////////////////////////////////////////////////
// /warpexc 
///////////////////////////////////////////////////////////////////////////////
register("command", (...args) => {
    if (!getInSkyblock() || !World.isLoaded()) return;
    if (!Settings.warpExcept) return
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
// AOTV HIDER
////////////////////////////////////////////////////////////////////////////////
register('chat', (event) => {
    if (Settings.aotvHider) cancel(event);
}).setCriteria('There are blocks in the way!');

////////////////////////////////////////////////////////////////////////////////
// SOOPY MESSAGE BLAH BLAH HIDER
////////////////////////////////////////////////////////////////////////////////
register('chat', (event) => {
    if (Settings.randomSoopyMessageHider) cancel(event);
}).setCriteria(`Unknown command. Type "/help" for help. ('uhfdsolguhkjdjfhgkjhdfdlgkjhldkjhlkjhsldkjfhldshkjf')`);


////////////////////////////////////////////////////////////////////////////////
// STASH SHORTENER
////////////////////////////////////////////////////////////////////////////////
register('chat', (numItems, itemOrItems, timeS, event) => {
    if (Settings.betterStashMessages) cancel(event);
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

////////////////////////////////////////////////////////////////////////////////
// CLICK STASH SHORTENER
////////////////////////////////////////////////////////////////////////////////
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

////////////////////////////////////////////////////////////////////////////////
// SNOW CANNON MESSAGE HIDER
////////////////////////////////////////////////////////////////////////////////
register('chat', (playerName, event) => {
    if (!getInSkyblock() || !World.isLoaded()) return;
    if (getCurrArea() !== "Jerry's Workshop") return;
    if (!Settings.hide_snow_cannon_messages) return;
    cancel(event);
}).setCriteria(' ☃ ${playerName} mounted a Snow Cannon!');

////////////////////////////////////////////////////////////////////////////////
// EASY BAKER QOL
////////////////////////////////////////////////////////////////////////////////
register('chat', (event) => {
    if (!getInSkyblock() || !World.isLoaded()) return;
    if (!Settings.getBakerCake) return;
    setTimeout(() => {
        ChatLib.command('openbaker')
    }, 250)
}).setCriteria('CLICK HERE to get your SPECIAL new year cake!').setContains();


////////////////////////////////////////////////////////////////////////////////
// GRANDMA WOLF HIDER
////////////////////////////////////////////////////////////////////////////////
function handleGrandmaMsgs(event) {
    if (!getInSkyblock() || !World.isLoaded()) return;
    if (Settings.grandma_hider) cancel(event);
}

register('chat', (event) => {
    handleGrandmaMsgs(event);
}).setCriteria('+5 Kill Combo +3✯ Magic Find');

register('chat', (event) => {
    handleGrandmaMsgs(event);
}).setCriteria('+10 Kill Combo +10 coins per kill');

register('chat', (event) => {
    handleGrandmaMsgs(event);
}).setCriteria('+15 Kill Combo +3✯ Magic Find');

register('chat', (event) => {
    handleGrandmaMsgs(event);
}).setCriteria('+20 Kill Combo +15☯ Combat Wisdom');

register('chat', (event) => {
    handleGrandmaMsgs(event);
}).setCriteria('+25 Kill Combo +3✯ Magic Find');

register('chat', (event) => {
    handleGrandmaMsgs(event);
}).setCriteria('+30 Kill Combo +10 coins per kill');

register('chat', (combo, event) => {
    handleGrandmaMsgs(event);
}).setCriteria('+${combo} Kill Combo');

register('chat', (combo, event) => {
    handleGrandmaMsgs(event);
}).setCriteria('Your Kill Combo has expired! You reached a ${combo} Kill Combo!');


////////////////////////////////////////////////////////////////////////////////
// BETTER WDA MESSAGES
////////////////////////////////////////////////////////////////////////////////
function handleWDAMsgs(event) {
    if (!getInSkyblock() || !World.isLoaded()) return;
    if (Settings.betterWDA) cancel(event);
}

register('chat', (event) => {
    handleWDAMsgs(event);
}).setCriteria('[WATCHDOG ANNOUNCEMENT]');

register('chat', (banned, days, event) => {
    handleWDAMsgs(event);
}).setCriteria('Watchdog has banned ${banned} players in the last ${days} days.');

register('chat', (banned, days, event) => {
    handleWDAMsgs(event);
}).setCriteria('Staff have banned an additional ${banned} in the last ${days} days.');

register('chat', (event) => {
    handleWDAMsgs(event);
}).setCriteria('Blacklisted modifications are a bannable offense!');

 
////////////////////////////////////////////////////////////////////////////////
// CURR AREA COMMAND
////////////////////////////////////////////////////////////////////////////////
register('command', () => {
    sendMessage(`currarea: ${getCurrArea()}`);
}).setName('currarea');

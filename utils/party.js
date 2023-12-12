////////////////////////////////////////////////////////////////////////////////
// IMPORTS ---------------------------------------------------------------------
////////////////////////////////////////////////////////////////////////////////
import { data } from '../utils/data.js'
import { debug, showAlert, removeFromArray } from '../utils/utils.js'
import Audio from '../utils/audio.js'

const partyAudio = new Audio();

////////////////////////////////////////////////////////////////////////////////
// PARTY CHECKER ---------------------------------------------------------------
////////////////////////////////////////////////////////////////////////////////
let inParty = false;
let isPL = false;
let whoPL = '';
let isMod = false;
let partySize = 0;
let partyMembers = [];
let memberNamesArray = [];
let modNamesArray = []

// party chat: blub blub blub
register('chat', (rank, name, msg) => {
    inParty = true;
    debug(`inParty: ${inParty}`)
}).setCriteria('Party > ${rank} ${name}: ${msg}')

// leader disbanded party
register("chat", (name) => { 
    inParty = false;
    isPL = name === Player.getName();
    whoPL = isPL ? Player.getName() : name;
    data.lockedList = [];
    debug(`inParty: ${inParty}, isPL: ${isPL}, whoPL: ${whoPL}`)
}).setCriteria("${name} has disbanded the party!");

// party disbanded by default reasons
register("chat", () => {
    inParty = false
    debug(`inParty: ${inParty}`)
}).setCriteria("The party was disbanded because all invites expired and the party was empty.")

// you left the party
register("chat", () => {
    inParty = false
    debug(`inParty: ${inParty}`)
}).setCriteria("You left the party.")

// you were kicked from the party by name
register("chat", (name) => {
    inParty = false
    isPL = false;
    whoPL = name;
    debug(`whoPL: ${whoPL}, inParty: ${inParty}, isPL: ${isPL}`)
}).setCriteria("You have been kicked from the party by ${name}")

// you joined name's party
register("chat", (name) => {
    inParty = true
    isPL = false
    whoPL = name;
    debug(`inParty: ${inParty}, isPL: ${isPL}, whoPL: ${name}`)
}).setCriteria("You have joined ${name}'s party!")

// pl promoted player to mod
register("chat", (currPL, p2) => {
    inParty = true;
    whoPL = currPL;
    isPL = currPL === Player.getName();
    isMod = p2 === Player.getName();
    debug(`inParty: ${inParty}, isPL: ${isPL}, isMod: ${isMod}, whoPL: ${currPL}, promoted: ${player}`)
}).setCriteria("${currPL} has promoted ${p2} to Party Moderator");

// pl demoted player to member
register("chat", (currPL, p2) => {
    inParty = true;
    isPL = currPL === Player.getName();
    isMod = p2 === Player.getName();
    whoPL = currPL;
    debug(`inParty: ${inParty}, isPL: ${isPL}, isMod: ${isMod}, whoPL: ${currPL}, demoted: ${player}`)
}).setCriteria("${currPL} has demoted ${p2} to Party Member")

// transfer
register('chat', (newPLRank, newPLName, oldPLRank, oldPLName, event) => {
    inParty = true;
    isPL = newPLName === Player.getName();
    whoPL = newPLName;
    isMod = oldPLName;
    debug(`inParty: ${inParty}, isPL: ${isPL}, whoPL: ${whoPL}`)
}).setCriteria('The party was transferred to ${newPLRank} ${newPLName} by ${oldPLRank} ${oldPLName}');


// party leader name when /pl
register('chat', (name) => {
    whoPL = name.split(' ')[1];
    isPL = whoPL === Player.getName()
    debug(`isPL: ${isPL}, whoPL: ${whoPL}`)
}).setCriteria('Party Leader: ${name}');

// party moderator(s) when /pl
register('chat', (...mods) => {
    const moderators = mods.slice(0, mods.length - 1).join(', ');
    modNamesArray = moderators.split(', ').map(part => {
        const match = part.match(/\[.*\] (.*) ●/);
        return match ? match[1] : part.trim();
    });
}).setCriteria('Party Moderators: ${mods}');

// party member(s) when /pl
register('chat', (names) => {
    const eachP = names.split(" ● ")
    const playerNames = [];
    eachP.forEach(member => {
        const pName = member.split(' ')[1];
        playerNames.push(pName);
    })
    memberNamesArray = playerNames;
}).setCriteria('Party Members: ${names}');

// p1 invites p2 to party
register("chat", (p1, p2) => {
    inParty = true;
    isPL = p1 === Player.getName();
    whoPL = isPL ? Player.getName() : p2;
    debug(`inParty: ${inParty}, inviter: ${p1}, invitee: ${p2}`)
}).setCriteria("${p1} invited ${p2} to the party! They have 60 seconds to accept.");

// get number of party members through doing /pl
register("chat", (numMembers) => {
    inParty = true;
    partySize = numMembers;
    debug(`inParty: ${inParty}, partySize: ${partySize}`)
}).setCriteria("Party Members (${numMembers})")



///////////////////////////////////////////////////////////////////////////////////////////
// lock player
///////////////////////////////////////////////////////////////////////////////////////////
register('chat', (rank, name, event) => {
    if (data.lockedList.includes(name.toString())) {
        setTimeout(() => {
            partyAudio.playDefaultSound();
            ChatLib.chat(`&b[&c${name}&b] &eis already in the lock list. Cannot be added.`);
        }, 100)
        return;
    }
    inParty = true;
    data.lockedList.push(name.toString());
    setTimeout(() => {
        ChatLib.chat(`&a${name} has added themselves to the party lock list.`);
    }, 100);
    debug(`inParty: ${inParty}, selfLockPlayer: ${name}`);
}).setCriteria('Party > ${rank} ${name}: #lock');


// lock player manually
register('chat', (rank, name1, name2, event) => {
    if (data.lockedList.includes(name2)) {
        setTimeout(() => {
            ChatLib.chat(`&b[&c${name2}&b] &eis already in the lock list. Cannot be added.`);
            partyAudio.playDefaultSound();
        }, 100)
        return;
    }
    if (getIsPL()) {
        inParty = true;
        partyAudio.playDefaultSound();
        data.lockedList.push(name2)
        setTimeout(() => {
            ChatLib.chat(`&a${name2} has been added to party lock list.`);
        }, 100)
    }
    if (!getIsPL()) {
        inParty = true;
        partyAudio.playDefaultSound();
        setTimeout(() => {
            ChatLib.chat(`&b[&c#lock ${name2}&b] &ecouldn't be processed because you are not the party leader.`);
        }, 100)
    }
    debug(`inParty: ${inParty}, locker: ${name1}, locked: ${name2}`)
}).setCriteria('Party > ${rank} ${name1}: #lock ${name2}')

// unlock self
register('chat', (rank, name, event) => {
    if (!data.lockedList.includes(name)) {
        setTimeout(() => {
            ChatLib.chat(`&b[&c${name}&b] &edoes not exist in the lock list. Nothing can be removed.`);
            partyAudio.playDefaultSound();
        }, 100)
        return;
    }
    if (getIsPL) {
        inParty = true;
        data.lockedList = removeFromArray(data.lockedList, name);
        setTimeout(() => {
            partyAudio.playDefaultSound();
            ChatLib.chat(`&c${name} has been removed themselves from the party lock list.`);
        }, 100)
    }
    debug(`inParty: ${inParty}, unlocked: ${name}`)
}).setCriteria('Party > ${rank} ${name}: #unlock')

// unlock manually
register('chat', (rank, currPL, name, event) => {
    if (getIsPL) {
        inParty = true;
        data.lockedList = removeFromArray(data.lockedList, name);
        setTimeout(() => {
            partyAudio.playDefaultSound();
            ChatLib.chat(`&c${name} has been removed from the party lock list by ${currPL}`);
        }, 100)
    }
    debug(`inParty: ${inParty}, unlocker: ${currPL}, unlocked: ${name}`)
}).setCriteria('Party > ${rank} ${currPL}: #unlock ${name}')

// check isPL
if (whoPL == Player.getName()) isPL = true;

// add modNames and memberNames to partyMembers
partyMembers = whoPL;
if (modNamesArray.length > 0) { partyMembers.concat(modNamesArray); }
if (memberNamesArray.length > 0) { partyMembers.concat(memberNamesArray);}

// disconnected
function determineRank(rank, ign) {
    let newName = '';
    if (rank == '[VIP]' || rank == '[VIP+]') newName = `&a${rank} ${ign}`
    if (rank == '[MVP]' || rank == '[MVP+]') newName = `&b${rank} ${ign}`
    if (rank == '[MVP++]') newName = `&6${rank} ${ign}`
    return newName;
}

register('chat', (rank, ign, event) => {
    cancel(event);
    const newName = determineRank(rank, ign);
    ChatLib.chat(`${newName} &edisconnected.`)
}).setCriteria('${rank} ${ign} has disconnected, they have 5 minutes to rejoin before they are removed from the party.')

// warped
register('chat', (rank, leader, event) => {
    cancel(event);
    ChatLib.chat(`${rank} ${leader} &ewarped the party.`)
}).setCriteria('Party Leader, ${rank} ${leader}, summoned you to their server.')


export function getInParty() {
    return inParty;
}

export function getPLName() {
    return whoPL;
}

export function getIsPL() {
    return isPL;
}

export function getPList() {
    return partyMembers;
}

export function getPLockList() {
    return data.lockedList;
}

/**
 * @function sendMessage - Sends message based on prefix
 * @function getInParty() - A function used to get the prefix for message
 * @param {*} message - A string param for message to send
 * @returns {*} Command that sends message using prefix
 */
export function sendMessage(message) {
    if (data.inSkyblock) {
        const isInP = getInParty() ? "pc" : "cc";
        const messageToSend = `${isInP} ${message}`
        ChatLib.command(messageToSend);
    } else {
        ChatLib.chat(message);
    }
}

// announce
export function announce(message) {
    ChatLib.command(`ac ${message}`)
}


////////////////////////////////////////////////////////////////////////////////
// COMMAND CHECKS --------------------------------------------------------------
////////////////////////////////////////////////////////////////////////////////
// show locked
register('command', () => {
    ChatLib.chat('&6<&3Bao&6> &rLocked Players ---------')
    data.lockedList.forEach(lockedName => {
        ChatLib.chat(` -  ${lockedName}`);
    });
}).setName('showlocked').setAliases('locked')

// getlocked
register('command', () => {
    ChatLib.command(`pc Locked Players: ${data.lockedList.join(', ')}`)
    debug(`locked players: ${data.lockedList}, (reminder: this is an object of strings)`)
}).setName('getlocked')

register('chat', (event) => {
    setTimeout(() => {
        sendMessage(`Locked Players: ${data.lockedList.join(', ')}`)
    }, 150)
}).setCriteria('Party > ${rank} ${ign}: #getlocked');

// clear locked
register('chat', (rank, ign, event) => {
    if (!getIsPL()) {
        setTimeout(() => {
            partyAudio.playDefaultSound();
            ChatLib.chat('&c#clearlocked &enot available. Reason: You are not party leader.')
        }, 150  )
    } else {
        data.lockedList = [];
        setTimeout(() => {
            partyAudio.playDefaultSound();
            ChatLib.chat('&aParty Locked List cleared!')
        }, 150)
    }
}).setCriteria('Party > ${rank} ${ign}: #clearlocked')

register('command', () => {
    ChatLib.chat(`pl: ${partyList}`)
}).setName('getpl')

let partyList = [];
// party info
register('command', () => {
    ChatLib.command('pl')
    setTimeout(() => {
        ChatLib.chat(`isPL: ${isPL}`)
        ChatLib.chat(`whoPL: ${whoPL}`)
        ChatLib.chat(`party mods: ${modNamesArray}`)
        ChatLib.chat(`party members: ${memberNamesArray}`)
        const newPL = [partyList.concat(whoPL, modNamesArray, memberNamesArray)]
        ChatLib.chat(`party list: ${newPL}`)
    }, 1000)
}).setName('baopinfo').setAliases('baopi')

import { debug } from '../utils/utils.js';

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
// P-Lock Implementation (deprecated)
///////////////////////////////////////////////////////////////////////////////////////////
// Party > user: #lock -- lock user
// Party > user: #lock user2 -- if user is pl, lock user2
// Party > user: #unlock -- unlock user
// Party > user: #unlock user2 -- if user is pl, unlock user2

// effects on cmds:
// Party > user: #w or #warp -- if plocked list has people, party leader automatically does #warpexc (people)
// Party > user: #pta -- if plocked list has people, and user is pl, pt will be automatically transferred to anyone that is not in plocked list.


// check isPL
if (whoPL == Player.getName()) isPL = true;

// add modNames and memberNames to partyMembers
partyMembers = whoPL;
if (modNamesArray.length > 0) { partyMembers = partyMembers.concat(modNamesArray); }
if (memberNamesArray.length > 0) { partyMembers = partyMembers.concat(memberNamesArray); }

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

/**
 * @function sendMessage - Sends message based on prefix
 * @function getInParty() - A function used to get the prefix for message
 * @param {*} message - A string param for message to send
 * @returns {*} Command that sends message using prefix
 */
export function sendMessage(message) {
    const isInP = getInParty() ? "pc" : "cc";
    const messageToSend = `${isInP} ${message}`
    ChatLib.command(messageToSend);
}

// announce
export function announce(message) {
    ChatLib.command(`ac ${message}`)
}


////////////////////////////////////////////////////////////////////////////////
// COMMAND CHECKS --------------------------------------------------------------
////////////////////////////////////////////////////////////////////////////////
register('command', () => {
    ChatLib.chat(`pl: ${partyList}`)
}).setName('getpl')

// party info
let partyList = [];
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

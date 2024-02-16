/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />

import { debug, determinePlayerRankColor, baoUtils, registerWhen, timeThis } from '../utils/utils.js';

////////////////////////////////////////////////////////////////////////////////
// FUNCTIONS
////////////////////////////////////////////////////////////////////////////////
export function getRankColor(rank, ign) {
    let newName = '';
    if (rank == '[VIP]' || rank == '[VIP+]') newName = `&a${rank} ${ign}`
    if (rank == '[MVP]' || rank == '[MVP+]') newName = `&b${rank} ${ign}`
    if (rank == '[MVP++]') newName = `&6${rank} ${ign}`
    return newName;
}

export function stripRank(name) {
    const rankNameRegex = /\[(?:MVP\+\+|MVP\+|MVP|VIP\+|VIP)\] (\S+)/;
    let nameMatch = name.match(rankNameRegex);
    return nameMatch ? nameMatch[1] : name.trim();
}

function getInSkyblock() {
    return ChatLib.removeFormatting(Scoreboard.getTitle()).includes("SKYBLOCK");
}

function stripPartyIcon(name) {
    return name.split('●')[0].trim();
}

function getPartyName(name) {
    return stripRank(stripPartyIcon(name));
}

function getPartyPeople(playerNames) {
    let modNames = playerNames.split(' ● ');
    let strippedMods = modNames.map(mod => getPartyName(mod));

    strippedMods = strippedMods
    .map(function (moderator) {
        return getPartyName(moderator);
    })
    .filter(function (moderator) {
        return moderator.trim() !== '';
    });
    return strippedMods;
}

export function colorPartyPlayer(givenName) {
    let containsRank = givenName.includes(' ');
    let newName = '';
    if (containsRank) {
        let [playerRank, playerIGN] = givenName.split(' ');
        let rankColor = determinePlayerRankColor(playerRank);
        newName = `${rankColor}${givenName}`;
    } else if (!containsRank) {
        newName = `&7${givenName}`;
    }
    return newName;
}

function simplifyMessage(givenName, event, message) {
    cancel(event);
    let newName = colorPartyPlayer(givenName);
    ChatLib.chat(`${newName} ${message}`);
}

function removeNameFromPartyList(name, myList) {
    let leftIdx = myList.indexOf(name);
    if (leftIdx !== -1) {
        myList.splice(leftIdx, 1);
    }
}


////////////////////////////////////////////////////////////////////////////////
// PARTY CHECKER 
////////////////////////////////////////////////////////////////////////////////
let inParty = false;
let isPL = false;
let whoPL = '';
let isMod = false;
let whoMod = '';
let partySize = 0;

// party members list
let partyList = [];

// normal chat messages
registerWhen('chat', timeThis('registerChat - party - chat messages', (playerName, msg) => {
    inParty = true;
}), () => getInSkyblock() && World.isLoaded()).setCriteria('Party > ${playerName}: ${msg}');

// leader disbanded party
registerWhen('chat', timeThis('registerChat - party - disbanded party', (playerName, event) => {
    inParty = false;
    isPL = playerName === Player.getName();
    whoPL = isPL ? Player.getName() : playerName;
    partyList = [];
}), () => getInSkyblock() && World.isLoaded()).setCriteria("${playerName} has disbanded the party!");

// party disbanded by default reasons
registerWhen('chat', timeThis('registerChat - party - party disbanded (empty)', (event) => {
    inParty = false;
    partyList = [];
}), () => getInSkyblock() && World.isLoaded()).setCriteria("The party was disbanded because all invites expired and the party was empty.");

// you left the party
registerWhen('chat', timeThis('registerChat - party - player left party', (playerName, event) => {
    if (playerName === 'You') {
        inParty = false;
        partyList = [];
    } else {
        inParty = true;
        let rawName = colorPartyPlayer(playerName);
        let leftName = rawName.slice(2, rawName.length);
        removeNameFromPartyList(leftName, partyList);
    }
}), () => getInSkyblock() && World.isLoaded()).setCriteria("${playerName} left the party.");

// you were kicked from the party by name
registerWhen('chat', timeThis('registerChat - party - kicked out of party', (playerName, event) => {
    inParty = false
    isPL = false;
    whoPL = playerName;
    partyList = [];
}), () => getInSkyblock() && World.isLoaded()).setCriteria("You have been kicked from the party by ${playerName}");

// you joined name's party
registerWhen('chat', timeThis('registerChat - party - you joined party', (playerName, event) => {
    inParty = true
    isPL = false
    whoPL = playerName;
}), () => getInSkyblock() && World.isLoaded()).setCriteria("You have joined ${playerName}'s party!");

// someone joined the party
registerWhen('chat', timeThis('registerChat - party - someone joins party', (playerName, event) => {
    inParty = true;
    if (partyList.length > 0) {
        let newName = colorPartyPlayer(playerName);
        partyList.push(newName.slice(2, newName.length));
    }
}), () => getInSkyblock() && World.isLoaded()).setCriteria("${playerName} joined the party.");

// someone was removed/kicked from the party
registerWhen('chat', timeThis('registerChat - party - someone removed from party', (playerName, event) => {
    inParty = playerName !== Player.getName();
    let rawName = colorPartyPlayer(playerName);
    let leftName = rawName.slice(2, rawName.length);
    removeNameFromPartyList(leftName, partyList);
}), () => getInSkyblock() && World.isLoaded()).setCriteria('${playerName} has been removed from the party.');

// promoted
registerWhen('chat', timeThis('registerChat - party - promoted message', (currPL, partyMember, event) => {
    inParty = true;
    whoPL = currPL;
    isPL = stripRank(currPL) === Player.getName();
    isMod = stripRank(partyMember) === Player.getName();
}), () => getInSkyblock() && World.isLoaded()).setCriteria("${currPL} has promoted ${partyMember} to Party Moderator");

// pl demoted player to member
registerWhen('chat', timeThis('registerChat - party - demoted message', (currPL, p2, event) => {
    inParty = true;
    isPL = stripRank(currPL) === Player.getName();
    isMod = stripRank(p2) === Player.getName();
    whoPL = currPL;
}), () => getInSkyblock() && World.isLoaded()).setCriteria("${currPL} has demoted ${p2} to Party Member");

// transfer
registerWhen('chat', timeThis('registerChat - party - transfer message', (newPL, oldPL, event) => {
    inParty = true;
    let newPLName = stripRank(newPL);
    let oldPLName = stripRank(oldPL);
    isPL = newPLName === Player.getName();
    whoPL = newPLName;
    isMod = oldPLName === Player.getName();
    whoMod = oldPLName;
}), () => getInSkyblock() && World.isLoaded()).setCriteria('The party was transferred to ${newPL} by ${oldPL}');

// party leader name when /pl
registerWhen('chat', timeThis('registerChat - party - party leader', (name, event) => {
    whoPL = getPartyName(name);
    isPL = whoPL === Player.getName();
    partyList = [whoPL];
}), () => getInSkyblock() && World.isLoaded()).setCriteria('Party Leader: ${name}');

// party moderator(s) when /pl
registerWhen('chat', timeThis('registerChat - party - party moderators', (mods, event) => {
    let partyMods = getPartyPeople(mods);
    partyList.push(...partyMods);
}), () => getInSkyblock() && World.isLoaded()).setCriteria('Party Moderators: ${mods}');

// party member(s) when /pl
registerWhen('chat', timeThis('registerChat - party - party members', (members, event) => {
    let partyMembers = getPartyPeople(members);
    partyList.push(...partyMembers);
}), () => getInSkyblock() && World.isLoaded()).setCriteria('Party Members: ${members}');

// p1 invites p2 to party
registerWhen('chat', timeThis('registerChat - party - p1 invites p2 to party message', (event) => {
    if (!inParty) { isPL = true; whoPL = Player.getName(); }
    inParty = true;
}), () => getInSkyblock() && World.isLoaded()).setCriteria("${p1} invited ${p2} to the party! They have 60 seconds to accept.");

// get number of party members through doing /pl
registerWhen('chat', timeThis('registerChat - party - no. of people in party', (numMembers, event) => {
    inParty = true;
    partySize = numMembers;
}), () => getInSkyblock() && World.isLoaded()).setCriteria("Party Members (${numMembers})");



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
///////////////////////////////////////////////////////////////////////////////////////////

// remove duplicates in partylist
register('step', () => {
    if (!getInSkyblock() || !World.isLoaded()) return;
    if (partyList.length !== 0) partyList = [...new Set(partyList)];
}).setFps(1);

// check isPL
if (whoPL == Player.getName()) isPL = true;

// disconnected
registerWhen('chat', timeThis('registerChat - party - simplify disconnected message', (playerName, event) => {
    simplifyMessage(playerName, event, '&edisconnected.');
}), () => getInSkyblock() && World.isLoaded()).setCriteria('${playerName} has disconnected, they have 5 minutes to rejoin before they are removed from the party.');


// warped
registerWhen('chat', timeThis('registerChat - party - simplify party warp message', (playerName, event) => {
    simplifyMessage(playerName, event, '&ewarped the party.');
}), () => getInSkyblock() && World.isLoaded()).setCriteria('Party Leader, ${playerName}, summoned you to their server.');


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
    return partyList;
}

export function getInCoop() {
    return ChatLib.removeFormatting(Scoreboard.getTitle()).includes('CO-OP');
}

/**
 * @function sendMessage - Sends message based on prefix
 * @function getInParty() - A function used to get the prefix for message
 * @param {*} message - A string param for message to send
 * @returns {*} Command that sends message using prefix
 */
export function sendMessage(message) {
    let isInCoop = getInCoop();
    let isInP = '';
    if (isInCoop) {
        isInP = getInParty() ? 'pc' : 'cc';
        ChatLib.command(`${isInP} ${message}`);
    } else if (!isInCoop) {
        if (getInParty()) {
            ChatLib.command(`pc ${message}`);
        } else {
            ChatLib.chat(`${baoUtils.modPrefix} &b&l>&r ${message}`);
        }
    }
}

// announce
export function announce(message) {
    ChatLib.command(`ac ${message}`)
}

register('command', () => {
    ChatLib.chat(`${baoUtils.modPrefix} &cwhoPL: &b${whoPL}&c, isPL: &b${isPL}`);
}).setName('pstat');
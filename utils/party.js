import { debug, determinePlayerRankColor, baoUtils } from '../utils/utils.js';

// FUNCTIONS
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

////////////////////////////////////////////////////////////////////////////////
// PARTY CHECKER ---------------------------------------------------------------
////////////////////////////////////////////////////////////////////////////////
let inParty = false;
let isPL = false;
let whoPL = '';
let isMod = false;
let whoMod = '';
let partySize = 0;

// party members list
let partyList = [];

// party chat: blub blub blub
register('chat', (player, msg) => {
    inParty = true;
    // ChatLib.chat(`Party > ${player}: ${msg}`)
    debug(`inParty: ${inParty}`)
}).setCriteria('Party > ${player}: ${msg}')

// leader disbanded party
register("chat", (name) => { 
    inParty = false;
    isPL = name === Player.getName();
    whoPL = isPL ? Player.getName() : name;
    partyList = [];
    debug(`inParty: ${inParty}, isPL: ${isPL}, whoPL: ${whoPL}`)
}).setCriteria("${name} has disbanded the party!");

// party disbanded by default reasons
register("chat", () => {
    inParty = false;
    partyList = [];
    debug(`inParty: ${inParty}`)
}).setCriteria("The party was disbanded because all invites expired and the party was empty.")

// you left the party
register("chat", () => {
    inParty = false
    partyList = [];
    debug(`inParty: ${inParty}`)
}).setCriteria("You left the party.")

// you were kicked from the party by name
register("chat", (name) => {
    inParty = false
    isPL = false;
    whoPL = name;
    partyList = [];
    debug(`whoPL: ${whoPL}, inParty: ${inParty}, isPL: ${isPL}`)
}).setCriteria("You have been kicked from the party by ${name}")

// you joined name's party
register("chat", (name) => {
    inParty = true
    isPL = false
    whoPL = name;
    debug(`inParty: ${inParty}, isPL: ${isPL}, whoPL: ${name}`)
}).setCriteria("You have joined ${name}'s party!")

// someone joined the party
register('chat', (playerName, event) => {
    inParty = true;
    if (partyList.length > 0) {
        let newName = colorPartyPlayer(playerName);
        partyList.push(newName.slice(2, newName.length));
    }
}).setCriteria('${playerName} joined the party.');

function removeNameFromPartyList(name, myList) {
    let leftIdx = myList.indexOf(name);
    if (leftIdx !== -1) {
        myList.splice(leftIdx, 1);
    }
}

// someone left the party
register('chat', (playerName, event) => {
    inParty = playerName !== Player.getName();
    let rawName = colorPartyPlayer(playerName);
    let leftName = rawName.slice(2, rawName.length);
    removeNameFromPartyList(leftName, partyList);
}).setCriteria('${playerName} left the party.');

// someone was removed/kicked from the party
register('chat', (playerName, event) => {
    inParty = playerName !== Player.getName();
    let rawName = colorPartyPlayer(playerName);
    let leftName = rawName.slice(2, rawName.length);
    removeNameFromPartyList(leftName, partyList);
}).setCriteria('${playerName} has been removed from the party.');


// pl promoted player to mod
register("chat", (currPL, partyMember) => {
    inParty = true;
    whoPL = currPL;
    isPL = stripRank(currPL) === Player.getName();
    isMod = stripRank(partyMember) === Player.getName();
}).setCriteria("${currPL} has promoted ${partyMember} to Party Moderator");

// pl demoted player to member
register("chat", (currPL, p2) => {
    inParty = true;
    isPL = stripRank(currPL) === Player.getName();
    isMod = stripRank(p2) === Player.getName();
    whoPL = currPL;
    debug(`inParty: ${inParty}, isPL: ${isPL}, isMod: ${isMod}, whoPL: ${currPL}, demoted: ${p2}`)
}).setCriteria("${currPL} has demoted ${p2} to Party Member")

// transfer
register('chat', (newPL, oldPL, event) => {
    inParty = true;
    let newPLName = stripRank(newPL);
    let oldPLName = stripRank(oldPL);
    isPL = newPLName === Player.getName();
    whoPL = newPLName;
    isMod = oldPLName === Player.getName();
    whoMod = oldPLName;
    debug(`inParty: ${inParty}, isPL: ${isPL}, whoPL: ${whoPL}, isMod: ${isMod}, whoMod: ${whoMod}`);
}).setCriteria('The party was transferred to ${newPL} by ${oldPL}');

// remove duplicates in partylist
register('step', () => {
    if (!getInSkyblock() || !World.isLoaded()) return;
    if (partyList.length !== 0) partyList = [...new Set(partyList)];
}).setFps(1);

// party leader name when /pl
register('chat', (name, event) => {
    whoPL = getPartyName(name);
    isPL = whoPL === Player.getName();
    partyList = [whoPL];

    debug(`isPL: ${isPL}, whoPL: ${whoPL}`);
}).setCriteria('Party Leader: ${name}');

// party moderator(s) when /pl
register('chat', (mods, event) => {
    let partyMods = getPartyPeople(mods);
    partyList.push(...partyMods);
}).setCriteria('Party Moderators: ${mods}');


// party member(s) when /pl
register('chat', (members, event) => {
    let partyMembers = getPartyPeople(members);
    partyList.push(...partyMembers);
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
///////////////////////////////////////////////////////////////////////////////////////////


// check isPL
if (whoPL == Player.getName()) isPL = true;

// disconnected
register('chat', (playerName, event) => {
    simplifyMessage(playerName, event, '&edisconnected.');
}).setCriteria('${playerName} has disconnected, they have 5 minutes to rejoin before they are removed from the party.')

// warped
register('chat', (playerName, event) => {
    simplifyMessage(playerName, event, '&ewarped the party.');
}).setCriteria('Party Leader, ${playerName}, summoned you to their server.')


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

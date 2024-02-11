import Settings from '../../settings.js';
import Audio from '../../utils/audio.js';

import { getInSkyblock } from '../../utils/functions.js'; // sb, area
import { sendMessage, stripRank, getPList, getIsPL } from '../../utils/party.js';
import { registerWhen } from '../../utils/utils.js';


///////////////////////////////////////////////////////////////////////////////
// CONSTS
///////////////////////////////////////////////////////////////////////////////
const partyAudio = new Audio();


///////////////////////////////////////////////////////////////////////////////
// FUNCTIONS
///////////////////////////////////////////////////////////////////////////////
function shouldHandlePartyCommands() {
    return getIsPL() && getInSkyblock() && World.isLoaded();
}


///////////////////////////////////////////////////////////////////////////////
// DEBUG STUFF
///////////////////////////////////////////////////////////////////////////////
register('command', () => {
    ChatLib.chat(getIsPL())
}).setName('checkpl');


///////////////////////////////////////////////////////////////////////////////
// #warp 
///////////////////////////////////////////////////////////////////////////////
const warpMessages = [
    /Party > .+: #warp/, 
    /Party > .+: #w/, 
];

warpMessages.forEach(msg => {
    registerWhen('chat', (event) => {
        ChatLib.command('p warp');
        partyAudio.playDefaultSound();
    }, () => Settings.autoWarp && shouldHandlePartyCommands()).setCriteria(msg);
});


///////////////////////////////////////////////////////////////////////////////
// Auto notifier for #warp when player joins 
///////////////////////////////////////////////////////////////////////////////
registerWhen('chat', (playerName, event) => {
    sendMessage('[!] type #warp or #w for warp when r [!]')
    partyAudio.playDefaultSound();
}, () => Settings.autoNotifyWarp && shouldHandlePartyCommands()).setCriteria('${playerName} joined the party.');


///////////////////////////////////////////////////////////////////////////////
// #pta
///////////////////////////////////////////////////////////////////////////////
registerWhen('chat', (playerName, event) => {
    let partyList = getPList();
    if (partyList.length === 1) { 
        setTimeout(() => {
            partyAudio.playDefaultSound();
            ChatLib.chat('&cYou are the only one in this party! &b#pta &cnot available!');
        }, 100);
        return; 
    };
    
    let excludedName = Player.getName();
    let randomIdx;

    do {
        randomIdx = Math.floor(Math.random() * partyList.length);
    } while (partyList[randomIdx] === excludedName);
    ChatLib.command(`p transfer ${partyList[randomIdx]}`);
}, () => Settings.ptaCommand && shouldHandlePartyCommands()).setCriteria('Party > ${playerName}: #pta');


///////////////////////////////////////////////////////////////////////////////
// #pai 
///////////////////////////////////////////////////////////////////////////////
registerWhen('chat', (playerName, event) => {
    ChatLib.command('p settings allinvite'); 
    partyAudio.playDefaultSound();
}, () => Settings.paiCommand && shouldHandlePartyCommands()).setCriteria('Party > ${playerName}: #pai');


///////////////////////////////////////////////////////////////////////////////
// #ko 
///////////////////////////////////////////////////////////////////////////////
registerWhen('chat', (playerName, event) => {
    ChatLib.command('p kickoffline');
    partyAudio.playDefaultSound();
}, () => Settings.koCommand && shouldHandlePartyCommands()).setCriteria('Party > ${playerName}: #ko');


///////////////////////////////////////////////////////////////////////////////
// #pt / #transfer 
///////////////////////////////////////////////////////////////////////////////
registerWhen('chat', (playerName, event) => {
    ChatLib.command(`p transfer ${stripRank(playerName)}`);
    partyAudio.playDefaultSound();
}, () => shouldHandlePartyCommands()).setCriteria('Party > ${playerName}: #pt');


///////////////////////////////////////////////////////////////////////////////
// /warpexc 
///////////////////////////////////////////////////////////////////////////////
register("command", (...args) => {
    if (!getInSkyblock() || !World.isLoaded()) return;
    if (!Settings.warpExcept) return
    let namesExc = args;

    /**
     * @function executeCommands - runs a series of commands
     * @param {*} commands - list of commands
     * @param {*} delay - constant delay per command
     */
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
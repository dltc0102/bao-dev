/// <reference types="../../../CTAutocomplete" />
/// <reference lib="es2015" />

import Settings from "../../config1/settings.js";
import Audio from '../../utils/audio.js';

import { getInSkyblock } from '../../utils/functions.js'; // sb, area
import { sendMessage, stripRank, getPList, getIsPL } from '../../utils/party.js';
import { baoUtils, registerWhen, timeThis } from '../../utils/utils.js';


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
let canWarp = false;
const warpMessages = [
    /Party > .+: #warp/, 
    /Party > .+: #w/, 
];

warpMessages.forEach(msg => {
    registerWhen('chat', timeThis("registerChat cancel warpMessages", (event) => {
        canWarp = true;
        ChatLib.command('p warp');
        partyAudio.playDefaultSound();
        setTimeout(() => { canWarp = false; }, 5000);
    }), () => Settings.autoWarp && !canWarp && shouldHandlePartyCommands()).setCriteria(msg);
});


///////////////////////////////////////////////////////////////////////////////
// Auto notifier for #warp when player joins 
///////////////////////////////////////////////////////////////////////////////
registerWhen('chat', timeThis("registerChat type #w or #warp when ready", (playerName, event) => {
    sendMessage('[!] type #warp or #w for warp when r [!]')
    partyAudio.playDefaultSound();
}), () => Settings.autoNotifyWarp && shouldHandlePartyCommands()).setCriteria('${playerName} joined the party.');


///////////////////////////////////////////////////////////////////////////////
// #pta
///////////////////////////////////////////////////////////////////////////////
registerWhen('chat', timeThis("registerChat #pta command", (playerName, event) => {
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
}), () => Settings.ptaCommand && shouldHandlePartyCommands()).setCriteria('Party > ${playerName}: #pta');


///////////////////////////////////////////////////////////////////////////////
// #pai 
///////////////////////////////////////////////////////////////////////////////
registerWhen('chat', timeThis("registerChat #pai command", (playerName, event) => {
    ChatLib.command('p settings allinvite'); 
    partyAudio.playDefaultSound();
}), () => Settings.paiCommand && shouldHandlePartyCommands()).setCriteria('Party > ${playerName}: #pai');


///////////////////////////////////////////////////////////////////////////////
// #ko 
///////////////////////////////////////////////////////////////////////////////
registerWhen('chat', timeThis("registerChat #ko command", (playerName, event) => {
    ChatLib.command('p kickoffline');
    partyAudio.playDefaultSound();
}), () => Settings.koCommand && shouldHandlePartyCommands()).setCriteria('Party > ${playerName}: #ko');


///////////////////////////////////////////////////////////////////////////////
// #pt / #transfer 
///////////////////////////////////////////////////////////////////////////////
registerWhen('chat', timeThis("registerChat #pt command", (playerName, event) => {
    ChatLib.command(`p transfer ${stripRank(playerName)}`);
    partyAudio.playDefaultSound();
}), () => shouldHandlePartyCommands()).setCriteria('Party > ${playerName}: #pt');


///////////////////////////////////////////////////////////////////////////////
// /warpexc 
///////////////////////////////////////////////////////////////////////////////
register("command", timeThis("registerCommand warpexc command", (...args) => {
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
})).setName('warpexc');


///////////////////////////////////////////////////////////////////////////////
// #tps
///////////////////////////////////////////////////////////////////////////////
import { getTps } from '../../utils/tps.js';

let accumulatedTpsSum = 0;
let currentStepCount = 0;
const batchSize = 100;
const tpsDelay = 50;

function calculateAverageTps(outputFunction, prefix, resultF) {
    currentStepCount++;
    accumulatedTpsSum += getTps();

    if (currentStepCount >= batchSize) {
        const message = `${prefix} TPS: ${resultF}${(accumulatedTpsSum / batchSize).toFixed(1)}`;
        outputFunction(message);
        currentStepCount = 0;
        accumulatedTpsSum = 0;
        return;
    }

    setTimeout(() => calculateAverageTps(outputFunction, prefix, resultF), tpsDelay);
}

registerWhen('chat', timeThis('registerChat #tps command', (playerName, event) => {
    if (currentStepCount === 0) {
        setTimeout(() => {
            ChatLib.chat(`${baoUtils.modPrefix} &7Calculating TPS... (3 seconds)`);
            calculateAverageTps(sendMessage, '[Bao]', '');
        }, 10);
    } else {
        setTimeout(() => {
            ChatLib.chat(`${baoUtils.modPrefix} TPS is taking a while... (be patient!)`);
        }, 10);
    }
}), () => Settings.tpsCommands && getInSkyblock() && World.isLoaded()).setCriteria("Party > ${playerName}: #tps");

register('command', timeThis("registerCommand /tps command", () => {
    if (!Settings.tpsCommands) { ChatLib.chat(`${baoUtils.modPrefix} &cYou don't have the ping commands feature turned on! This command will not work!`); return; };
    
    if (currentStepCount === 0) {
        setTimeout(() => {
            ChatLib.chat(`${baoUtils.modPrefix} &7Calculating TPS... (3 seconds)`);
            calculateAverageTps(ChatLib.chat, `${baoUtils.modPrefix}`, '&b');
        }, 10);
    } else {
        setTimeout(() => {
            ChatLib.chat(`${baoUtils.modPrefix} TPS is taking a while... (be patient!)`);
        }, 10);
    }
})).setName('tps');



///////////////////////////////////////////////////////////////////////////////
// #ping and /ping commands
///////////////////////////////////////////////////////////////////////////////
import { getHypixelPing } from '../../utils/ping.js';

registerWhen('chat', timeThis('registerChat #ping command', (event) => {
    setTimeout(() => {
        let playerPing = getHypixelPing();
        if (playerPing === -1) {
            getHypixelPing();
            return;
        } else {
            ChatLib.command(`pc [Bao] Ping: ${playerPing}`)
        }
    }, 100);
}), () => Settings.pingCommands && getInSkyblock() && World.isLoaded()).setCriteria("Party > ${playerName}: #ping");

register('command', () => {
    if (!Settings.pingCommands) { ChatLib.chat(`${baoUtils.modPrefix} &cYou don't have the ping commands feature turned on! This command will not work!`); return; };

    setTimeout(() => {
        let playerPing = getHypixelPing();
        if (playerPing === -1) {
            getHypixelPing();
            return;
        } else {
            ChatLib.chat(`${baoUtils.modPrefix} Ping: &b${playerPing}`)
        }
    }, 100);
}).setName('ping');
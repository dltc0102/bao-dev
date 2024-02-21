/// <reference types="../../../CTAutocomplete" />
/// <reference lib="es2015" />

import Settings from "../../config1/settings.js";
import Audio from "../../utils/audio";

import { getInSkyblock, getInCI } from "../../utils/functions";
import { registerWhen, showAlert, timeThis } from "../../utils/utils";
import { sendMessage, getPList } from "../../utils/party";
import { baoLavaSCStats } from '../../features/lavaSCStats.js'
import { playSound } from "../../utils/functions";

////////////////////////////////////////////////////////////////////////////////
// CONSTS
////////////////////////////////////////////////////////////////////////////////
const crimsonAudio = new Audio();

const jawbusTitle = '&4JAWBUS';
const rvialTitle = '&dRadioactive Vial';
const thunderTitle = "&bTHUNDER";
const vanqTitle = '&5Vanquisher';
const phlegTitle = '&4Phlegblast';


////////////////////////////////////////////////////////////////////////////////
// FUNCTIONS
////////////////////////////////////////////////////////////////////////////////
function shouldHandleCrimsonFishingPings() {
    return getInCI() && getInSkyblock() && World.isLoaded();
}

////////////////////////////////////////////////////////////////////////////////
// JAWBUS
////////////////////////////////////////////////////////////////////////////////
const jawbusMessages = [
    /Lord Jawbus Spawned!/, 
    /Jawbus alert/, 
];

jawbusMessages.forEach(msg => {
    registerWhen('chat', timeThis("registerChat other jawbus pings", (event) => {
        crimsonAudio.playDefaultSound();
        showAlert(jawbusTitle);
    }), () => Settings.jawbusPing && shouldHandleCrimsonFishingPings()).setCriteria(msg).setContains();
})

registerWhen('chat', ("registerChat jawbus ping", (event) => {
    showAlert(jawbusTitle);
    sendMessage(`[!] Jawbus [!] (${baoLavaSCStats.catchesSinceJawbus})`)
    crimsonAudio.playDefaultSound();
}), () => Settings.jawbusPing && shouldHandleCrimsonFishingPings()).setCriteria('You have angered a legendary creature... Lord Jawbus has arrived.');


////////////////////////////////////////////////////////////////////////////////
// FAKE LOCATION MESSAGE SEND WHEN PLAYER IN PARTY DIES TO JAWBUS
////////////////////////////////////////////////////////////////////////////////
function getRandomCILoc() {
    const locations = ['left of stronghold', 'above spawn', 'desert', 'plhleg pool', 'right of stronghold', 'dead', 'ded', 'dojo'];
    const randomIdx = Math.floor(Math.random() * locations.length);
    return locations[randomIdx];
};

// import { announce } from "../../utils/party";
// registerWhen('chat', timeThis('', (playerName, event) => {
//     let partyList = getPList();
//     if (partyList.includes(playerName)) setTimeout(() => { ChatLib.chat(`ac ${getRandomCILoc()}`); }, 1500);
// }), () => getInCI() && getInSkyblock() && World.isLoaded()).setCriteria(' ☠ ${playerName} was killed by Lord Jawbus.');

// registerWhen('chat', timeThis('', (playerName, event) => {
//     setTimeout(() => { ChatLib.chat(`ac ${getRandomCILoc()}`); }, 1500);
// }), () => getInCI() && getInSkyblock() && World.isLoaded()).setCriteria(' ☠ You were killed by Lord Jawbus.');



////////////////////////////////////////////////////////////////////////////////
// JAWBUS: VIAL
////////////////////////////////////////////////////////////////////////////////
registerWhen('chat', timeThis("registerChat vial ping", (mf, event) => {
    sendMessage(`ay RARE DROP! Radioactive Vial (+${mf}% ✯ Magic Find)`);
    showAlert(rvialTitle)
    playSound();
}), () => Settings.jawbusPing && Settings.rvialPing && shouldHandleCrimsonFishingPings()).setCriteria("RARE DROP! Radioactive Vial (+${mf}% ✯ Magic Find)");


////////////////////////////////////////////////////////////////////////////////
// THUNDER
////////////////////////////////////////////////////////////////////////////////
const thunderMessages = [
    /Thunder Spawned!/, 
    /Thunder alert/, 
]

thunderMessages.forEach(msg => {
    registerWhen('chat', timeThis("registerChat other thunder pings", (event) => {
        showAlert(thunderTitle);
        crimsonAudio.playDefaultSound();
    }), () => Settings.thunderPing && shouldHandleCrimsonFishingPings()).setCriteria(msg);
})

registerWhen('chat', timeThis("registerChat thunder ping", (event) => {
    cancel(event);
    sendMessage(`[!] Thunder [!] (${baoLavaSCStats.catchesSinceThunder})`)
    showAlert(thunderTitle);
    crimsonAudio.playDefaultSound();
}), () => Settings.thunderPing && shouldHandleCrimsonFishingPings()).setCriteria('You hear a massive rumble as Thunder emerges.');


////////////////////////////////////////////////////////////////////////////////
// VANQUISHER
////////////////////////////////////////////////////////////////////////////////
const vanqMessages = [
    /Vanquisher Spawned/, 
    /VANQUISHER SPAWNED/, 
]
vanqMessages.forEach(msg => {
    registerWhen('chat', timeThis("registerChat other vanquisher pings", (event) => {
        showAlert(vanqTitle);
        crimsonAudio.playDefaultSound();
    }), () => Settings.vanqPing && shouldHandleCrimsonFishingPings()).setCriteria(msg).setContains();
})

registerWhen('chat', timeThis("registerChat vanquisher ping", (event) => {
    cancel(event);
    showAlert(vanqTitle);
    sendMessage(`[!] Vanquisher [!] (${baoLavaSCStats.catchesSinceVanq})`);
    crimsonAudio.playDefaultSound();
}), () => Settings.vanqPing && shouldHandleCrimsonFishingPings()).setCriteria('A Vanquisher is spawning nearby!');


////////////////////////////////////////////////////////////////////////////////
// PLHLEGBLAST
////////////////////////////////////////////////////////////////////////////////
registerWhen('chat', timeThis("registerChat plhlegblast ping", (event) => {
    cancel(event);
    showAlert(phlegTitle);
    sendMessage('[!] Plhlegblast [!]');
    crimsonAudio.playDefaultSound();
}), () => Settings.phlegPing && shouldHandleCrimsonFishingPings()).setCriteria('WOAH! A Plhlegblast appeared.');
/// <reference types="../../../CTAutocomplete" />
/// <reference lib="es2015" />

// import Settings from "../../config1/settings.js";
import Audio from "../../utils/audio.js";

import { timeThis, showAlert } from "../../utils/utils";
import { getInSkyblock, getInCI } from '../../utils/functions.js';
import { createNearbyInfoObject, getNearbyEntities, determineSentFlag } from "../../utils/functions";
import { sendMessage } from '../../utils/party.js';
import { registerWhen, timeThis } from "../../utils/utils";

const colorF = '&f';
const moogmaAudio = new Audio();
const moogmaRegex = /\[Lv210] Moogma (.+[?Mk])\/(2\.5M)❤/;
const moogmaName = 'Moogma';

let isDoubleHook = false;
let hasDoubleMob = false;
let hasMob = false;

let moogmaInfo = createNearbyInfoObject();

registerWhen('chat', timeThis('registerChat flag true if dh moogma', (chatType, playerName, mobName, event) => {
    if (mobName === moogmaName) hasDoubleMob = true;
}), () => getInSkyblock() && World.isLoaded()).setCriteria("${chatType} > ${playerName}: Doublehook ${mobName} Detected!");

registerWhen('chat', timeThis('registerChat flag true if moogma nearby', (chatType, playerName, mobName, event) => {
    if (mobName === moogmaName) hasMob = true;
}), () => getInSkyblock() && World.isLoaded()).setCriteria("${chatType} > ${playerName}: Detected ${mobName} Nearby!");

let soundPlayed = false;
let alertShown = false;
register('step', timeThis("registerStep (step3) - getsNearbyEntities for Moogmas and sends respective alerts", () => {
    if (!getInSkyblock() || !World.isLoaded() || !getInCI()) return;

    getNearbyEntities(moogmaRegex, moogmaInfo);

    if (moogmaInfo.numFound === 0) {
        hasMob = false;
        hasDoubleMob = false;
        alertShown = false;
        soundPlayed = false;
    }

    isDoubleHook = moogmaInfo.numFound === 2;

    // if (isDoubleHook) {
    //     if (!alertShown) showAlert(`${colorF}Doublehook ${moogmaName}`);
    //     if (!soundPlayed) moogmaAudio.playDefaultSound();
    //     alertShown = true;
    //     soundPlayed = true;
    //     if (!hasDoubleMob) sendMessage(`Doublehook ${moogmaName} Detected!`);

    // } else if (moogmaInfo.names.length === 1) {
    //     if (!alertShown) showAlert(`${colorF}${moogmaName} Nearby`);
    //     if (!soundPlayed) moogmaAudio.playDefaultSound();
    //     alertShown = true;
    //     soundPlayed = true;
    //     if (!hasMob) sendMessage(`Detected ${moogmaName} Nearby!`);
    // }
})).setFps(3);

export function getMoogmaInfoObject() {
    return moogmaInfo;
}

register('command', () => {
    ChatLib.chat(`hasMob: ${hasMob}, hasDoubleMob: ${hasDoubleMob}`);
    ChatLib.chat(`numFound: ${moogmaInfo.numFound}, found: ${moogmaInfo.found}`)
}).setName('getmoogma');
/// <reference types="../../../CTAutocomplete" />
/// <reference lib="es2015" />

// import Settings from "../../settings.js";
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

let moogmaInfo = createNearbyInfoObject();

registerWhen('chat', timeThis('', (playerName, mobName, event) => {
    hasDoubleMob = true;
}), () => getInSkyblock() && World.isLoaded()).setCriteria("Party > ${playerName}: Doublehook ${mobName} Detected!");

registerWhen('chat', timeThis('', (event) => {
    hasMob = true;
}), () => getInSkyblock() && World.isLoaded()).setCriteria(/Detected .+ Nearby!/);


register('step', timeThis("registerStep (step3) - getsNearbyEntities for Moogmas and sends respective alerts", () => {
    if (!getInSkyblock() || !World.isLoaded() || !getInCI()) return;
    getNearbyEntities(moogmaRegex, moogmaInfo);
    isDoubleHook = moogmaInfo.numFound === 2;

    // console.log(moogmaInfo.numFound);
    // console.log(`hasMob: ${hasMob}, hasDoubleMob: ${hasDoubleMob}`) // this is 7 ticks slower than moogmaInfo.numFound
    if (isDoubleHook) {
        showAlert(`${colorF}Doublehook ${moogmaName}`);
        moogmaAudio.playDefaultSound();
        if (!hasDoubleMob) {
            sendMessage(`Doublehook ${moogmaName} Detected!`);
        }
    } else if (moogmaInfo.names.length === 1) {
        showAlert(`${colorF}${moogmaName} Nearby`);
        moogmaAudio.playDefaultSound();
        if (!hasMob) {
            sendMessage(`Detected ${moogmaName} Nearby!`);
        }
    }
})).setFps(3);

export function getMoogmaInfoObject() {
    return moogmaInfo;
}
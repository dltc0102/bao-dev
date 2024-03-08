import Settings from "../../config1/settings.js";
import Audio from "../../utils/audio.js";

import { registerWhen, timeThis, showAlert } from "../../utils/utils";
import { getInSkyblock, getInCI } from '../../utils/functions.js';
import { createNearbyInfoObject, getNearbyEntities, determineSentFlag } from "../../utils/functions";
import { sendMessage } from '../../utils/party.js';


const colorF = '&5';
const vanqAudio = new Audio();
const vanquisherRegex = /\[Lv100] Vanquisher (.+[?Mk])\/(10M)❤/;
const vangName = 'Vanquisher';

let isDoubleHook = false;
let hasMob = true;

let vanqInfo = createNearbyInfoObject();

registerWhen('chat', timeThis('registerChat flag true if vanq nearby', (chatType, playerName, mobName, event) => {
    if (mobName === vanqName) hasMob = true;
}), () => getInSkyblock() && World.isLoaded()).setCriteria("${chatType} > ${playerName}: Detected ${mobName} Nearby!");

let soundPlayed = false;
let alertShown = false;
register('step', timeThis("registerStep (step3) - getsNearbyEntities for Vanquishers and sends respective alerts", () => {
    if (!getInSkyblock() || !World.isLoaded() || !getInCI() || !Settings.detectVanqEntities) return;
    
    getNearbyEntities(vanquisherRegex, vanqInfo);

    if (vanqInfo.numFound === 0) {
        hasMob = false;
        alertShown = false;
        soundPlayed = false;
    }

    isDoubleHook = vanqInfo.numFound === 2;

    if (vanqInfo.names.length === 1) {
        if (!alertShown) showAlert(`${colorF}${vanqInfo.mobName} Nearby`);
        if (!soundPlayed) vanqAudio.playDefaultSound();
        alertShown = true;
        soundPlayed = true;
        if (!hasMob) sendMessage(`Detected ${vanqInfo.mobName} Nearby!`);
    }
})).setFps(3);

registerWhen('chat', timeThis('registerChat vanq dead message', (event) => {
    titleShown = false;
    nbMsgSent = false;
}), () => Settings.detectVanqEntities && getInCI() && getInSkyblock() && World.isLoaded()).setCriteria('RARE DROP! Nether Star');

registerWhen('chat', timeThis('registerChat lootshare message', (playerName, event) => {
    titleShown = false;
    nbMsgSent = false;
}), () => Settings.detectVanqEntities && getInCI() && getInSkyblock() && World.isLoaded()).setCriteria('LOOT SHARE! You received loot for assisting ${playerName}!');


export function getVanqInfoObject() {
    return vanqInfo;
}
import Settings from "../../settings.js";
import Audio from "../../utils/audio.js";

import { timeThis, showAlert } from "../../utils/utils";
import { getInSkyblock, getInCI } from '../../utils/functions.js';
import { createNearbyInfoObject, getNearbyEntities, determineSentFlag } from "../../utils/functions";
import { sendMessage } from '../../utils/party.js';

const colorF = '&5';
const vanqAudio = new Audio();
const vanquisherRegex = /\[Lv100] Vanquisher (.+[?Mk])\/(10M)❤/;

let isDoubleHook = false;
let titleShown = false;
let nbMsgSent = false;
let alreadySent = false;

let vanqInfo = createNearbyInfoObject();

register('step', timeThis("registerStep (step3) - getsNearbyEntities for Vanquishers and sends respective alerts", () => {
    if (!getInSkyblock() || !World.isLoaded() || !getInCI() || !Settings.detectVanqEntities) return;
    getNearbyEntities(vanquisherRegex, vanqInfo);
    isDoubleHook = vanqInfo.numFound === 2;

    if (titleShown || nbMsgSent) return;

    determineSentFlag(alreadySent);
    if (alreadySent) return;

    if (isDoubleHook) {
        showAlert(`${colorF}Doublehook ${vanqInfo.mobName}`);
        sendMessage(`Doublehook ${vanqInfo.mobName} Detected!`);
        vanqAudio.playDefaultSound();
        titleShown = true;
        nbMsgSent = true;
    } else if (vanqInfo.names.length === 1) {
        showAlert(`${colorF}${vanqInfo.mobName} Nearby`);
        sendMessage(`Detected ${vanqInfo.mobName} Nearby!`);
        vanqAudio.playDefaultSound();
        titleShown = true;
        nbMsgSent = true;
    }
})).setFps(3);

register("playerInteract", timeThis("registerPlayerInteract interaction with fishing rod - Vanqs", () => {
    if (vanqInfo.names && vanqInfo.numFound > 0) return;
    if (Player.getHeldItem().getRegistryName() === 'minecraft:fishing_rod') {
        titleShown = false;
        nbMsgSent = false;
    };
}));

export function getVanqInfoObject() {
    return vanqInfo;
}
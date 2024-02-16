/// <reference types="../CTAutocomplete" />
/// <reference lib="es2015" />

import Settings from "../../settings.js";
import Audio from "../../utils/audio.js";

import { timeThis, showAlert } from "../../utils/utils";
import { getInSkyblock, getInCI } from '../../utils/functions.js';
import { createNearbyInfoObject, getNearbyEntities, determineSentFlag } from "../../utils/functions";
import { sendMessage } from '../../utils/party.js';

const colorF = '&4';
const jawbusAudio = new Audio();
const jawbusRegex = /﴾ \[Lv600] Lord Jawbus (.+[?Mk])\/(100M)❤ ﴿/;

let isDoubleHook = false;
let titleShown = false;
let nbMsgSent = false;
let alreadySent = false;

let jawbusInfo = createNearbyInfoObject();

register('step', timeThis("registerStep (step3) - getsNearbyEntities for Jawbs and sends respective alerts", () => {
    if (!getInSkyblock() || !World.isLoaded() || !getInCI() || !Settings.detectJawbusEntities) return;
    getNearbyEntities(jawbusRegex, jawbusInfo);
    isDoubleHook = jawbusInfo.numFound === 2;

    if (titleShown || nbMsgSent) return;

    determineSentFlag(alreadySent, 10);
    if (alreadySent) return;

    if (isDoubleHook) {
        showAlert(`${colorF}Doublehook ${jawbusInfo.mobName}`);
        sendMessage(`Doublehook ${jawbusInfo.mobName} Detected!`);
        jawbusAudio.playDefaultSound();
        titleShown = true;
        nbMsgSent = true;
    } else if (jawbusInfo.names.length === 1) {
        showAlert(`${colorF}${jawbusInfo.mobName} Nearby`);
        sendMessage(`Detected ${jawbusInfo.mobName} Nearby!`);
        jawbusAudio.playDefaultSound();
        titleShown = true;
        nbMsgSent = true;
    }
})).setFps(3);

register("playerInteract", timeThis("registerPlayerInteract interaction with fishing rod - Jawbus", () => {
    if (jawbusInfo.names && jawbusInfo.numFound > 0 && Player.getHeldItem().getRegistryName() !== 'minecraft:fishing_rod') return;
    titleShown = false;
    nbMsgSent = false;
}));

export function getJawbusInfoObject() {
    return jawbusInfo;
}
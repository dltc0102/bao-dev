/// <reference types="../../../CTAutocomplete" />
/// <reference lib="es2015" />

import Settings from "../../settings.js";
import Audio from "../../utils/audio.js";

import { timeThis, showAlert } from "../../utils/utils";
import { getInSkyblock, getInCI } from '../../utils/functions.js';
import { createNearbyInfoObject, getNearbyEntities, determineSentFlag } from "../../utils/functions";
import { sendMessage } from '../../utils/party.js';

const colorF = '&5';
const thunderAudio = new Audio();
const thunderRegex = /﴾ \[Lv400] Thunder (.+[?Mk])\/(35M)❤ ﴿/;


let isDoubleHook = false;
let titleShown = false;
let nbMsgSent = false;
let alreadySent = false;

let thunderInfo = createNearbyInfoObject();

register('step', timeThis("registerStep (step3) - getsNearbyEntities for Thunders and sends respective alerts", () => {
    if (!getInSkyblock() || !World.isLoaded() || !getInCI() || !Settings.detectThunderEntities) return;
    getNearbyEntities(thunderRegex, thunderInfo);
    isDoubleHook = thunderInfo.numFound === 2;

    if (titleShown || nbMsgSent) return;

    determineSentFlag(alreadySent, 10);
    if (alreadySent) return;

    if (isDoubleHook) {
        showAlert(`${colorF}Doublehook ${thunderInfo.mobName}`);
        sendMessage(`Doublehook ${thunderInfo.mobName} Detected!`);
        thunderAudio.playDefaultSound();
        titleShown = true;
        nbMsgSent = true;
    } else if (thunderInfo.names.length === 1) {
        showAlert(`${colorF}${thunderInfo.mobName} Nearby`);
        sendMessage(`Detected ${thunderInfo.mobName} Nearby!`);
        thunderAudio.playDefaultSound();
        titleShown = true;
        nbMsgSent = true;
    }
})).setFps(3);

register("playerInteract", timeThis("registerPlayerInteract interaction with fishing rod - Thunder", () => {
    if (thunderInfo.names && thunderInfo.numFound > 0) return;
    if (Player.getHeldItem().getRegistryName() === 'minecraft:fishing_rod') {
        titleShown = false;
        nbMsgSent = false;
    };
}));

export function getThunderInfoObject() {
    return thunderInfo;
}
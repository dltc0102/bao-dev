/// <reference types="../../../CTAutocomplete" />
/// <reference lib="es2015" />

import Settings from "../../config1/settings.js";
import Audio from "../../utils/audio";

import { getInSkyblock, getInJerry, playSound, petDropPing } from "../../utils/functions";
import { sendMessage } from "../../utils/party";
import { registerWhen, showAlert, timeThis } from "../../utils/utils";
import { baoWaterSCStats } from '../../features/waterSCStats.js'


////////////////////////////////////////////////////////////////////////////////
// CONSTS
////////////////////////////////////////////////////////////////////////////////
const winterAudio = new Audio();

const yetiTitle = '&fYETI';
const nutcrackerTitle = '&7Nutcracker';
const reinTitle = '&cReindrake';


////////////////////////////////////////////////////////////////////////////////
// FUNCTIONS
////////////////////////////////////////////////////////////////////////////////
function shouldHandleWinterFishingPings() {
    return getInJerry() && getInSkyblock() && World.isLoaded();
}


////////////////////////////////////////////////////////////////////////////////
// YETI
////////////////////////////////////////////////////////////////////////////////
registerWhen('chat', timeThis("registerChat yeti ping", (event) => {
    cancel(event);
    sendMessage(`[!] Baba Yeti [!] (${baoWaterSCStats.catchesSinceYeti} kills)`);
    showAlert(yetiTitle);
    winterAudio.playDefaultSound();
}), () => Settings.yetiPing && shouldHandleWinterFishingPings()).setCriteria('What is this creature!?');


////////////////////////////////////////////////////////////////////////////////
// YETI: BABY YETI PET
////////////////////////////////////////////////////////////////////////////////
registerWhen('chat', timeThis("registerChat baby yeti pet ping", (mf, event) => {
    const message = ChatLib.getChatMessage(event, true);
    petDropPing(message, 'PET DROP!', 'Baby Yeti', mf);
}), () => Settings.yetiPing && Settings.babyYetiPing && shouldHandleWinterFishingPings()).setCriteria('PET DROP! Baby Yeti (+${mf}% ✯ Magic Find)');


////////////////////////////////////////////////////////////////////////////////
// NUTCRACKER
////////////////////////////////////////////////////////////////////////////////
registerWhen('chat', timeThis("registerChat nutcracker ping", (event) => {
    cancel(event);
    sendMessage('[!] Nootkracker [!]');
    showAlert(nutcrackerTitle);
    winterAudio.playDefaultSound();
}), () => Settings.nutcrackerPing && shouldHandleWinterFishingPings()).setCriteria('You found a forgotten Nutcracker laying beneath the ice.');


////////////////////////////////////////////////////////////////////////////////
// REINDRAKE
////////////////////////////////////////////////////////////////////////////////
registerWhen('chat', timeThis("registerChat other reindrake pings", (event) => { // personal
    cancel(event);
    sendMessage(`[!] Reindrake [!] (${baoWaterSCStats.catchesSinceReindrake} kills)`);
    showAlert(reinTitle);
    playSound();
}), () => Settings.reinPing && shouldHandleWinterFishingPings()).setCriteria('A Reindrake forms from the depths.');

registerWhen('chat', timeThis("registerChat reindrake ping", (event) => { // public
    cancel(event);
    showAlert(reinTitle);
    winterAudio.playDefaultSound();
}), () => Settings.reinPing && shouldHandleWinterFishingPings()).setCriteria('WOAH! A Reindrake was summoned from the depths!');
import Settings from "../../settings";
import Audio from "../../utils/audio";

import { getInSkyblock, getInJerry, playSound, petDropPing } from "../../utils/functions";
import { sendMessage } from "../../utils/party";
import { registerWhen, showAlert } from "../../utils/utils";
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
registerWhen('chat', (event) => {
    cancel(event);
    sendMessage(`[!] Baba Yeti [!] (${baoWaterSCStats.catchesSinceYeti} kills)`);
    showAlert(yetiTitle);
    winterAudio.playDefaultSound();
}, () => Settings.yetiPing && shouldHandleWinterFishingPings()).setCriteria('What is this creature!?');


////////////////////////////////////////////////////////////////////////////////
// YETI: BABY YETI PET
////////////////////////////////////////////////////////////////////////////////
registerWhen('chat', (mf, event) => {
    const message = ChatLib.getChatMessage(event, true);
    petDropPing(message, 'PET DROP!', 'Baby Yeti', mf);
}, () => Settings.yetiPing && Settings.babyYetiPing && shouldHandleWinterFishingPings()).setCriteria('PET DROP! Baby Yeti (+${mf}% ✯ Magic Find)');


////////////////////////////////////////////////////////////////////////////////
// NUTCRACKER
////////////////////////////////////////////////////////////////////////////////
registerWhen('chat', (event) => {
    cancel(event);
    sendMessage('[!] Nootkracker [!]');
    showAlert(nutcrackerTitle);
    winterAudio.playDefaultSound();
}, () => Settings.nutcrackerPing && shouldHandleWinterFishingPings()).setCriteria('You found a forgotten Nutcracker laying beneath the ice.');


////////////////////////////////////////////////////////////////////////////////
// REINDRAKE
////////////////////////////////////////////////////////////////////////////////
registerWhen('chat', (event) => { // personal
    cancel(event);
    sendMessage(`[!] Reindrake [!] (${baoWaterSCStats.catchesSinceReindrake} kills)`);
    showAlert(reinTitle);
    playSound();
}, () => Settings.reinPing && shouldHandleWinterFishingPings()).setCriteria('A Reindrake forms from the depths.');

registerWhen('chat', (event) => { // public
    cancel(event);
    showAlert(reinTitle);
    winterAudio.playDefaultSound();
}, () => Settings.reinPing && shouldHandleWinterFishingPings()).setCriteria('WOAH! A Reindrake was summoned from the depths!');
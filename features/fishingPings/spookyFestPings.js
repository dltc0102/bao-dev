import Settings from "../../config1/settings.js";
import Audio from "../../utils/audio";

import { getInSkyblock, getInCI, getInJerry, playSound, petDropPing, pingDolphinMS } from "../../utils/functions";
import { sendMessage } from "../../utils/party";
import { registerWhen, showAlert, timeThis } from "../../utils/utils";


////////////////////////////////////////////////////////////////////////////
// CONSTS
////////////////////////////////////////////////////////////////////////////
const spookyAudio = new Audio();

const phantomTitle = '&dPhantom Fisher';
const grimTitle = '&5GRIM REAPER';
const dsoTitle = '&5Deep Sea Orb';
const phantomRodTitle = '&6Phantom Rod';
const luckyHoofTitle = '&aLucky Hoof';


////////////////////////////////////////////////////////////////////////////
// PHANTOM FISHER
////////////////////////////////////////////////////////////////////////////
registerWhen('chat', timeThis("registerChat phantom fisher ping", (event) => {
    cancel(event);
    showAlert(phantomTitle);
    sendMessage('[!] Phantom Fisher [!]');
    spookyAudio.playDefaultSound();
}), () => Settings.phantomFisherPing && getInSkyblock() && World.isLoaded()).setCriteria('The spirit of a long lost Phantom Fisher has come to haunt you.');


////////////////////////////////////////////////////////////////////////////
// GRIM REAPER
////////////////////////////////////////////////////////////////////////////
registerWhen('chat', timeThis("registerChat grim reaper ping", (event) => {
    cancel(event);
    showAlert(grimTitle);
    sendMessage('[!] Gwim Weeper [!]');
    spookyAudio.playDefaultSound();
}), () => Settings.grimReaperPing && getInSkyblock() && World.isLoaded()).setCriteria("This can't be! The manifestation of death himself!");


////////////////////////////////////////////////////////////////////////////
// DEEP SEA ORB
////////////////////////////////////////////////////////////////////////////
registerWhen('chat', timeThis("registerChat deep sea orb ping", (mf, event) => {
    showAlert(dsoTitle);
    sendMessage(`RARE DROP! Deep Sea Orb (+${mf}% ✯ Magic Find)`);
    playSound();
}), () => Settings.deepSeaOrbPing && getInSkyblock() && World.isLoaded()).setCriteria('RARE DROP! Deep Sea Orb (+${mf}% ✯ Magic Find)');


////////////////////////////////////////////////////////////////////////////
// PHANTOM ROD
/////////////////////////////////////////////////////////// /////////////////
registerWhen('chat', timeThis("registerChat phantom rod ping", (mf, event) => {
    showAlert(phantomRodTitle);
    sendMessage(`RARE DROP! Phantom Rod (+${mf}% ✯ Magic Find)`);
    spookyAudio.playDefaultSound();
}), () => Settings.phantomRodPing && getInSkyblock() && World.isLoaded()).setCriteria('RARE DROP! Phantom Rod (+${mf}% ✯ Magic Find)');


////////////////////////////////////////////////////////////////////////////
// LUCKY HOOF
////////////////////////////////////////////////////////////////////////////
registerWhen('chat', timeThis("registerChat lucky hoof ping", (mf, event) => {
    showAlert(luckyHoofTitle);
    sendMessage(`RARE DROP! Lucky Hoof (+${mf}% ✯ Magic Find)`);
    spookyAudio.playDefaultSound();
}), () => Settings.luckyHoofPing && getInSkyblock() && World.isLoaded()).setCriteria('RARE DROP! Lucky Hoof (+${mf}% ✯ Magic Find)');



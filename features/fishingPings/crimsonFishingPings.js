import Settings from "../../settings";
import Audio from "../../utils/audio";

import { getInSkyblock, getInCI } from "../../utils/functions";
import { registerWhen, showAlert } from "../../utils/utils";
import { sendMessage } from "../../utils/party";
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
    registerWhen('chat', (event) => {
        crimsonAudio.playDefaultSound();
        showAlert(jawbusTitle);
    }, () => Settings.jawbusPing && shouldHandleCrimsonFishingPings()).setCriteria(msg).setContains();
})

registerWhen('chat', (event) => {
    showAlert(jawbusTitle);
    sendMessage(`[!] Jawbus [!] (${baoLavaSCStats.catchesSinceJawbus})`)
    crimsonAudio.playDefaultSound();
}, () => Settings.jawbusPing && shouldHandleCrimsonFishingPings()).setCriteria('You have angered a legendary creature... Lord Jawbus has arrived.');


////////////////////////////////////////////////////////////////////////////////
// JAWBUS: VIAL
////////////////////////////////////////////////////////////////////////////////
registerWhen('chat', (mf, event) => {
    sendMessage(`ay RARE DROP! Radioactive Vial (+${mf}% ✯ Magic Find)`);
    showAlert(rvialTitle)
    playSound();
}, () => Settings.jawbusPing && Settings.rvialPing && shouldHandleCrimsonFishingPings()).setCriteria("RARE DROP! Radioactive Vial (+${mf}% ✯ Magic Find)");


////////////////////////////////////////////////////////////////////////////////
// THUNDER
////////////////////////////////////////////////////////////////////////////////
const thunderMessages = [
    /Thunder Spawned!/, 
    /Thunder alert/, 
]

thunderMessages.forEach(msg => {
    registerWhen('chat', (event) => {
        showAlert(thunderTitle);
        crimsonAudio.playDefaultSound();
    }, () => Settings.thunderPing && shouldHandleCrimsonFishingPings()).setCriteria(msg);
})

registerWhen('chat', (event) => {
    cancel(event);
    sendMessage(`[!] Thunder [!] (${baoLavaSCStats.catchesSinceThunder})`)
    showAlert(thunderTitle);
    crimsonAudio.playDefaultSound();
}, () => Settings.thunderPing && shouldHandleCrimsonFishingPings()).setCriteria('You hear a massive rumble as Thunder emerges.');


////////////////////////////////////////////////////////////////////////////////
// VANQUISHER
////////////////////////////////////////////////////////////////////////////////
registerWhen('chat', (event) => {
    showAlert(vanqTitle);
    crimsonAudio.playDefaultSound();
}, () => Settings.vanqPing && shouldHandleCrimsonFishingPings()).setCriteria('Vanquisher Spawned!').setContains();

registerWhen('chat', (event) => {
    cancel(event);
    showAlert(vanqTitle);
    sendMessage('[!] Vanquisher [!]');
    crimsonAudio.playDefaultSound();
}, () => Settings.vanqPing && shouldHandleCrimsonFishingPings()).setCriteria('A Vanquisher is spawning nearby!');


////////////////////////////////////////////////////////////////////////////////
// PLHLEGBLAST
////////////////////////////////////////////////////////////////////////////////
registerWhen('chat', (event) => {
    cancel(event);
    showAlert(phlegTitle);
    sendMessage('[!] Plhlegblast [!]');
    crimsonAudio.playDefaultSound();
}, () => Settings.phlegPing && shouldHandleCrimsonFishingPings()).setCriteria('WOAH! A Plhlegblast appeared.');
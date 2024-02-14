import PogObject from 'PogData';
import Audio from "../utils/audio.js";

import { baoUtils } from '../utils/utils';
import { registerWhen, timeThis, showAlert } from "../utils/utils";
import { getInSkyblock, createGuiCommand, getInCI } from '../utils/functions.js';
import { sendMessage } from '../utils/party.js';
import { createNearbyInfoObject, getNearbyEntities } from '../utils/functions.js';

const devAudio = new Audio();


const ciMobNames = ['Magma Slug', 'Pyroclastic Worm', 'Moogma', 'Lava Leech', 'Fire Eel', 'Lava Flame', 'Taurus', 'Thunder', 'Jawbus', 'Plhlegblast'];


let thunderInfo = createNearbyInfoObject();
let vanqInfo = createNearbyInfoObject();

let isDoubleHook = false;
let titleShown = false;
let nbMsgSent = false;
let alreadySent = false;


register('step', () => {
    if (!getInSkyblock() || !World.isLoaded() || !getInCI()) return;
    getNearbyEntities(ciMobRegex, testInfo);
    isDoubleHook = testInfo.names.length === 2;
    
    if (titleShown || nbMsgSent) return;
    
    const last7 = ChatLib.getChatLines().slice(0, 7).map(str => str.removeFormatting());
    for (let idx = 0; idx < last7.length; idx++) {
        if (!last7[idx] && (!last7[idx].match(/.+ > .+: Doublehook .+ Detected!/) || !last7[idx].match(/.+ > .+: Detected .+ Nearby!/))) break;
        alreadySent = last7[idx].match(/.+ > .+: Doublehook .+ Detected!/) || last7[idx].match(/.+ > .+: Detected .+ Nearby!/);
    }
    if (alreadySent) return;
    if (isDoubleHook) {
        showAlert(`Doublehook ${testInfo.mobName}`);
        sendMessage(`Doublehook ${testInfo.mobName} Detected!`);
        devAudio.playDefaultSound();
        titleShown = true;
        nbMsgSent = true;
    } else if (testInfo.names.length === 1) {
        showAlert(`${testInfo.mobName} Nearby`);
        sendMessage(`Detected ${testInfo.mobName} Nearby!`);
        devAudio.playDefaultSound();
        titleShown = true;
        nbMsgSent = true;
    }
}).setFps(3);

register("playerInteract", () => {
    if (testInfo.names && testInfo.names.length > 0) return;
    if (Player.getHeldItem().getRegistryName() === 'minecraft:fishing_rod') {
        titleShown = false;
        nbMsgSent = false;
    };
});



// register('step', timeThis("registerStep getNearbyEntities of j, t, v", () => {
//     if (!getInSkyblock() || !World.isLoaded() || !getInCI()) return;
//     let nbJawbs = getNearbyEntities(jawbusRegex);
//     let nbThunders = getNearbyEntities(thunderRegex);
//     let nbVanqs = getNearbyEntities(vanquisherRegex);

//     console.log(nbJawbs, nbJawbs.length);
//     console.log(nbThunders, nbThunders.length);
//     console.log(nbVanqs, nbVanqs.length);
// })).setFps(1);

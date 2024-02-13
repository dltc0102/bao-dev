import Settings from "../../settings";
import Audio from "../../utils/audio.js";

import { getInSkyblock, getInDungeon } from "../../utils/functions";
import { registerWhen } from "../../utils/utils";
import { showAlert } from "../../utils/utils";

// if Settings.showFFTimers

const ffAudio = new Audio();
const Instant = Java.type('java.time.Instant');


////////////////////////////////////////////////////////////////////////////////
// PROFESSOR M3 FIRE FREEZE TIMER
////////////////////////////////////////////////////////////////////////////////
registerWhen('chat', (event) => {
    setTimeout(() => {
        ffAudio.playDefaultSound();
        ChatLib.chat(`&c&lFIRE FREEZE NOW`);
        showAlert('&c&lFIRE FREEZE');
    }, 5000);
}, () => getInDungeon() && getInSkyblock() && World.isLoaded()).setCriteria("[BOSS] The Professor: Oh? You found my Guardians' one weakness?");

registerWhen('chat', (event) => {
    showAlert('&c&lFIRE FREEZE');
}, () => getInDungeon() && getInSkyblock() && World.isLoaded()).setCriteria('FIRE FREEZE NOW');

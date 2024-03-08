import Settings from "../../config1/settings.js";
import Audio from "../../utils/audio.js";

import { getInSkyblock, getInDungeon } from "../../utils/functions";
import { registerWhen, timeThis } from "../../utils/utils";
import { showAlert } from "../../utils/utils";

const ffAudio = new Audio();

////////////////////////////////////////////////////////////////////////////////
// PROFESSOR M3 FIRE FREEZE TIMER
////////////////////////////////////////////////////////////////////////////////
registerWhen('chat', timeThis("registerChat listen to professor's que to start timer", (event) => {
    setTimeout(() => {
        ffAudio.playDefaultSound();
        ChatLib.chat(`&c&lFIRE FREEZE NOW`);
        showAlert('&c&lFIRE FREEZE');
    }, 5000);
}), () => Settings.showFFTimers && getInDungeon() && getInSkyblock() && World.isLoaded()).setCriteria("[BOSS] The Professor: Oh? You found my Guardians' one weakness?");

registerWhen('chat', timeThis("registerChat showAlert for firefreeze text", (event) => {
    showAlert('&c&lFIRE FREEZE');
}), () => Settings.showFFTimers && getInDungeon() && getInSkyblock() && World.isLoaded()).setCriteria('FIRE FREEZE NOW');

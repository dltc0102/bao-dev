import Settings from "../../settings";
import Audio from "../../utils/audio";

import { registerWhen, showAlert } from "../../utils/utils";
import { getInSkyblock } from "../../utils/functions";
import { baoUtils } from "../../utils/utils";


////////////////////////////////////////////////////////////////////////////////
// CONSTS
////////////////////////////////////////////////////////////////////////////////
const jerryAudio = new Audio();


////////////////////////////////////////////////////////////////////////////////
// FUNCTIONS
////////////////////////////////////////////////////////////////////////////////
const jerryColors = {
    "Green": '&a', 
    "Blue": '&9', 
    "Purple": '&5', 
    "Golden": '&6'
}
function determineJerryColor(color) {
    return jerryColors[color] || '&5';
}


////////////////////////////////////////////////////////////////////////////////
// JERRY PINGS
////////////////////////////////////////////////////////////////////////////////
const jerryMessages = [
    ' ☺ You discovered a ${color} Jerry!', 
    ' ☺ Some ${color} Jerry was hiding, but you found it!',
    ' ☺ You located a hidden ${color} Jerry', 
    ' ☺ A wild ${color} Jerry spawned!', 
    ' ☺ Some ${color} Jerry was hiding, but you found it!', 
    ' ☺ There is a ${color} Jerry!', 
    ' ☺ You found a ${color} Jerry!', 
    ' ☺ A ${color} Jerry appeared!',
]

jerryMessages.forEach(msg => {
    registerWhen('chat', (color, event) => {
        cancel(event);
        let jerryColor = determineJerryColor(color);
        ChatLib.chat(`${baoUtils.modPrefix} [!] ${jerryColor}${color} Jerry`);
        showAlert(`${jerryColor}${color} Jerry`);
        jerryAudio.playDefaultSound();
    }, () => Settings.jerry_ping && getInSkyblock() && World.isLoaded()).setCriteria(msg);
})
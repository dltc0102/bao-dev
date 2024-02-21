/// <reference types="../../../CTAutocomplete" />
/// <reference lib="es2015" />

import Settings from "../../config1/settings.js";

import { getInSkyblock, getInDungeon } from '../../utils/functions.js';
import { sendMessage } from '../../utils/party.js';
import { registerWhen, timeThis } from '../../utils/utils.js';

const Instant = Java.type('java.time.Instant');


// functions
function shouldHandleMelody() {
    return Settings.alert_melody && sentMelody && getInDungeon() && getInSkyblock() && World.isLoaded();
}

let sentMelody = false;
////////////////////////////////////////////////////////////////////////////////
// MELODY DETECTOR 
////////////////////////////////////////////////////////////////////////////////
registerWhen('guiOpened', timeThis("registerGuiOpened check if gui name is melody terminal", () => {
    setTimeout(() => {
        if (Player.getContainer() && Player.getContainer().getName() === 'Click the button on time!') {
            sendMessage('melody');  
            sentMelody = true;
        }
    }, 100);
}), () => !shouldHandleMelody());


registerWhen('chat', timeThis("registerChat player has activated a terminal!", (playerName, curr, total, event) => {
    if (playerName !== Player.getName()) return;
    sentMelody = false;
}), () => getInDungeon() && getInSkyblock() && World.isLoaded()).setCriteria('${playerName} activated a terminal! (${curr}/${total})');

// gameload
register('gameLoad', timeThis("registerGameLoad reset sentMelody flag", () => {
    sentMelody = false;
}));

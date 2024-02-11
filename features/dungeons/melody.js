import Settings from '../../settings.js';

import { getInSkyblock, getInDungeon } from '../../utils/functions.js';
import { sendMessage } from '../../utils/party.js';
import { registerWhen } from '../../utils/utils.js';


// functions
function shouldHandleMelody() {
    return Settings.alert_melody && sentMelody && getInDungeon() && getInSkyblock() && World.isLoaded();
}

let sentMelody = false;
////////////////////////////////////////////////////////////////////////////////
// MELODY DETECTOR 
////////////////////////////////////////////////////////////////////////////////
registerWhen('guiOpened', () => {
    setTimeout(() => {
        if (Player.getContainer() && Player.getContainer().getName() === 'Click the button on time!') {
            sendMessage('melody');  
            sentMelody = true;
        }
    }, 100);
}, () => !shouldHandleMelody());


registerWhen('chat', (playerName, curr, total, event) => {
    if (playerName !== Player.getName()) return;
    sentMelody = false;
}, () => getInDungeon() && getInSkyblock() && World.isLoaded()).setCriteria('${playerName} activated a terminal! (${curr}/${total})');

// gameload
register('gameLoad', () => {
    sentMelody = false;
});

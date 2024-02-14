import Settings from '../../settings.js';

import { getInSkyblock } from '../../utils/functions.js'; // sb, area
import { sendMessage } from '../../utils/party';
import { registerWhen, timeThis } from '../../utils/utils.js';


///////////////////////////////////////////////////////////////////////////////
// Kicked from SB Alert 
///////////////////////////////////////////////////////////////////////////////
registerWhen('chat', timeThis("registerChat kicked from sb notifier message", (event) => {
    sendMessage('You were kicked while joining that server! 1 minute cooldown.');
}), () => Settings.notifyKicked && getInSkyblock() && World.isLoaded()).setCriteria('You were kicked while joining that server!');


////////////////////////////////////////////////////////////////////////////////
// EASY BAKER QOL
////////////////////////////////////////////////////////////////////////////////
registerWhen('chat', timeThis("registerChat openbaker qol feature", (event) => {
    setTimeout(() => {
        ChatLib.command('openbaker');
    }, 250);
}), () => Settings.getBakerCake && getInSkyblock() && World.isLoaded()).setCriteria('CLICK HERE to get your SPECIAL new year cake!').setContains();



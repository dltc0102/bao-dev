import Settings from '../../settings.js';

import { getInSkyblock } from '../../utils/functions.js'; // sb, area
import { sendMessage } from '../../utils/party';
import { registerWhen } from '../../utils/utils.js';

const Instant = Java.type('java.time.Instant');

///////////////////////////////////////////////////////////////////////////////
// Kicked from SB Alert 
///////////////////////////////////////////////////////////////////////////////
registerWhen('chat', (event) => {
    sendMessage('You were kicked while joining that server! 1 minute cooldown.');
}, () => Settings.notifyKicked && getInSkyblock() && World.isLoaded()).setCriteria('You were kicked while joining that server!');


////////////////////////////////////////////////////////////////////////////////
// EASY BAKER QOL
////////////////////////////////////////////////////////////////////////////////
registerWhen('chat', (event) => {
    setTimeout(() => {
        ChatLib.command('openbaker');
    }, 250);
}, () => Settings.getBakerCake && getInSkyblock() && World.isLoaded()).setCriteria('CLICK HERE to get your SPECIAL new year cake!').setContains();



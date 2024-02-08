import Settings from '../../settings.js';

import { getInSkyblock } from '../../utils/functions.js'; // sb, area
import { sendMessage } from '../../utils/party';
import { registerChatWhen } from '../../utils/utils.js';

///////////////////////////////////////////////////////////////////////////////
// Kicked from SB Alert 
///////////////////////////////////////////////////////////////////////////////
registerChatWhen(register('chat', (event) => {
    sendMessage('You were kicked while joining that server! 1 minute cooldown.');
}).setCriteria('You were kicked while joining that server!'), () => Settings.notifyKicked && getInSkyblock() && World.isLoaded());

////////////////////////////////////////////////////////////////////////////////
// EASY BAKER QOL
////////////////////////////////////////////////////////////////////////////////
registerChatWhen(register('chat', (event) => {
    setTimeout(() => {
        ChatLib.command('openbaker')
    }, 250)
}).setCriteria('CLICK HERE to get your SPECIAL new year cake!').setContains(), () => Settings.getBakerCake && getInSkyblock() && World.isLoaded());


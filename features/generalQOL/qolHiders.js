import Settings from '../../settings.js';

import { getInSkyblock, getInJerry } from '../../utils/functions.js'; // sb, area
import { registerChatWhen } from '../../utils/utils.js';

////////////////////////////////////////////////////////////////////////////////
// SNOW CANNON MESSAGE HIDER
////////////////////////////////////////////////////////////////////////////////
registerChatWhen(register('chat', (playerName, event) => {
    cancel(event);
}).setCriteria(' ☃ ${playerName} mounted a Snow Cannon!'), () => Settings.hide_snow_cannon_messages && getInJerry() && getInSkyblock() && World.isLoaded());

////////////////////////////////////////////////////////////////////////////////
// SOOPY MESSAGE BLAH BLAH HIDER
////////////////////////////////////////////////////////////////////////////////
registerChatWhen(register('chat', (event) => {
    cancel(event);
}).setCriteria(`Unknown command. Type "/help" for help. ('uhfdsolguhkjdjfhgkjhdfdlgkjhldkjhlkjhsldkjfhldshkjf')`), () => getInSkyblock() && World.isLoaded());


////////////////////////////////////////////////////////////////////////////////
// AOTV HIDER
////////////////////////////////////////////////////////////////////////////////
registerChatWhen(register('chat', (event) => {
    cancel(event);
}).setCriteria('There are blocks in the way!'), () => Settings.aotvHider && getInSkyblock() && World.isLoaded());

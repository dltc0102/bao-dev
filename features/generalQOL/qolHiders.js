import Settings from '../../settings.js';

import { getInSkyblock, getInJerry } from '../../utils/functions.js'; // sb, area
import { registerWhen } from '../../utils/utils.js';

////////////////////////////////////////////////////////////////////////////////
// SNOW CANNON MESSAGE HIDER
////////////////////////////////////////////////////////////////////////////////
registerWhen('chat', (playerName, event) => {
    cancel(event);
}, () => Settings.hide_snow_cannon_messages && getInJerry() && getInSkyblock() && World.isLoaded()).setCriteria(' ☃ ${playerName} mounted a Snow Cannon!');


////////////////////////////////////////////////////////////////////////////////
// SOOPY MESSAGE BLAH BLAH HIDER
////////////////////////////////////////////////////////////////////////////////
registerWhen('chat', (event) => {
    cancel(event);
}, () => getInSkyblock() && World.isLoaded()).setCriteria(`Unknown command. Type "/help" for help. ('uhfdsolguhkjdjfhgkjhdfdlgkjhldkjhlkjhsldkjfhldshkjf')`);


////////////////////////////////////////////////////////////////////////////////
// AOTV HIDER
////////////////////////////////////////////////////////////////////////////////
registerWhen('chat', (event) => {
    cancel(event);
}, () => Settings.aotvHider && getInSkyblock() && World.isLoaded()).setCriteria('There are blocks in the way!');


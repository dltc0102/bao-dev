import Settings from '../../settings.js';

import { getInSkyblock, getInJerry } from '../../utils/functions.js'; // sb, area
import { registerWhen, timeThis } from '../../utils/utils.js';

const Instant = Java.type('java.time.Instant');

////////////////////////////////////////////////////////////////////////////////
// SNOW CANNON MESSAGE HIDER
////////////////////////////////////////////////////////////////////////////////
registerWhen('chat', timeThis("registerChat cancel mounting snow cannon messages", (playerName, event) => {
    cancel(event);
}), () => Settings.hide_snow_cannon_messages && getInJerry() && getInSkyblock() && World.isLoaded()).setCriteria(' ☃ ${playerName} mounted a Snow Cannon!');


////////////////////////////////////////////////////////////////////////////////
// SOOPY MESSAGE BLAH BLAH HIDER
////////////////////////////////////////////////////////////////////////////////
registerWhen('chat', timeThis("registerChat cancel soopy fasdsfasd message", (event) => {
    cancel(event);
}), () => getInSkyblock() && World.isLoaded()).setCriteria(`Unknown command. Type "/help" for help. ('uhfdsolguhkjdjfhgkjhdfdlgkjhldkjhlkjhsldkjfhldshkjf')`);


////////////////////////////////////////////////////////////////////////////////
// AOTV HIDER
////////////////////////////////////////////////////////////////////////////////
registerWhen('chat', timeThis("registerChat cancel 'there are blocks in the way' message", (event) => {
    cancel(event);
}), () => Settings.aotvHider && getInSkyblock() && World.isLoaded()).setCriteria('There are blocks in the way!');

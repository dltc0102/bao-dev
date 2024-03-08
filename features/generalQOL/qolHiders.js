import Settings from "../../config1/settings.js";

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


// HIDE DEFAULT SACK MESSAGES
const defaultSackMessages = [
    /\[Sacks] \+.+ items\. (Last .+s\.)/,
    /\[Sacks] \+.+ item\. (Last .+s\.)/,
    /\[Sacks] -.+ items\. (Last .+s\.)/,
    /\[Sacks] -.+ item\. (Last .+s\.)/,
];

defaultSackMessages.forEach(msg => {
    registerWhen('chat', timeThis('', (event) => {
        cancel(event);
    }), () => Settings.hideDefaultSackMessages && getInSkyblock() && World.isLoaded()).setCriteria(msg);
})


registerWhen('chat', timeThis('', (playerName, numCoins, event) => {
    cancel(event);
}), () => getInSkyblock() && World.isLoaded()).setCriteria('${playerName} collected an auction for ${numCoins} coins!');

registerWhen('chat', timeThis('', (event) => {
    cancel(event);
}), () => getInSkyblock() && World.isLoaded()).setCriteria('Putting item in escrow...');

registerWhen('chat', timeThis('', (event) => {
    cancel(event);
}), () => getInSkyblock() && World.isLoaded()).setCriteria('Setting up the auction...');

registerWhen('chat', timeThis('', (item, event) => {
    cancel(event);
}), () => getInSkyblock() && World.isLoaded()).setCriteria('BIN Auction started for ${item}!');


////////////////////////////////////////////////////////////////////////////////
// island entity limit
////////////////////////////////////////////////////////////////////////////////
registerWhen('chat', timeThis('registerChat hide max entity on island message', (entities, event) => {
    cancel(event);
}), () => getInSkyblock() && World.isLoaded()).setCriteria('You have reached the maximum number of ${entities} allowed on your island.');

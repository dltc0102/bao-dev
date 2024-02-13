import Settings from "../../settings";

import { getInSkyblock } from "../../utils/functions";
import { registerWhen } from "../../utils/utils";

////////////////////////////////////////////////////////////////////////////
// BETTER FISHING MESSAGES
////////////////////////////////////////////////////////////////////////////
const fishingMessages = [
    /GOOD CATCH! You found a .+ Bait\./,
    /GOOD CATCH! You found an .+ Bait\./,
    /GOOD CATCH! You found .+ Coins\./, 
    /.+ CATCH! You found a .+\./,
    /.+ CATCH! You found an .+\./, 
    /Your Blessing enchant got you double drops!/, 
    /It's a Double Hook!/, 
    /It's a Double Hook! Woot woot!/, 
]

fishingMessages.forEach(msg => {
    registerWhen('chat', (event) => {
        cancel(event);
    }, () => Settings.betterFishingMessages && getInSkyblock() && World.isLoaded()).setCriteria(msg);
});

registerWhen('chat', (coin, event) => {
    ChatLib.chat(`&7+ &6${coin} &7coins`);
}, () => Settings.betterFishingMessages && getInSkyblock() && World.isLoaded()).setCriteria('GOOD CATCH! You found ${coin} Coins.');

registerWhen('chat', (typeOfCatch, aOrAn, item, event) => {
    if (item === 'Lava Shell') ChatLib.chat('&a+ &5Lava Shell');
}, () => Settings.betterFishingMessages && getInSkyblock() && World.isLoaded()).setCriteria('${typeOfCatch} CATCH! You found ${aOrAn} ${item}.');

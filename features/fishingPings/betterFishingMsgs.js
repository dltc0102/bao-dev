/// <reference types="../../../CTAutocomplete" />
/// <reference lib="es2015" />

import Settings from "../../settings";

import { getInSkyblock } from "../../utils/functions";
import { registerWhen, timeThis } from "../../utils/utils";

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
    registerWhen('chat', timeThis("registerChat cancel fishingMessages", (event) => {
        cancel(event);
    }), () => Settings.betterFishingMessages && getInSkyblock() && World.isLoaded()).setCriteria(msg);
});

registerWhen('chat', timeThis("registerChat good catch you found x coins", (coin, event) => {
    ChatLib.chat(`&7+ &6${coin} &7coins`);
}), () => Settings.betterFishingMessages && getInSkyblock() && World.isLoaded()).setCriteria('GOOD CATCH! You found ${coin} Coins.');

registerWhen('chat', timeThis("registerChat great catch you found an item", (typeOfCatch, aOrAn, item, event) => {
    if (item === 'Lava Shell') ChatLib.chat('&a+ &5Lava Shell');
}), () => Settings.betterFishingMessages && getInSkyblock() && World.isLoaded()).setCriteria('${typeOfCatch} CATCH! You found ${aOrAn} ${item}.');

import Settings from "../../config1/settings.js";

import { getInSkyblock, getInDungeon } from '../../utils/functions.js'
import { registerWhen, timeThis } from '../../utils/utils.js';


////////////////////////////////////////////////////////////////////////////////
// CONSTS
////////////////////////////////////////////////////////////////////////////////
export const baoStashes = {
    "stashes": {
        "numMats": 0, 
        "remMats": 0, 
        "sackTypes": 0, 
        "pickupMat": '',
    },
    "clickStash": {
        "numTypesRem": 0, 
    }, 
}


////////////////////////////////////////////////////////////////////////////////
// STASH SHORTENER
////////////////////////////////////////////////////////////////////////////////
const stashMessages = [
    /\[Sacks] .+/, 
    /From stash: .+/, 
    /You picked up .+ items from your material stash!/, 
    /You still have .+ materials totalling .+ types of materials in there!/, 
]

stashMessages.forEach(msg => {
    registerWhen('chat', timeThis("registerChat cancel stashMessages", (event) => {
        cancel(event);
    }), () => Settings.betterStashMessages && getInSkyblock() && World.isLoaded()).setCriteria(msg);
})

registerWhen('chat', timeThis('', (event) => {
    cancel(event);
}), () => getInSkyblock() && World.isLoaded()).setCriteria(' ');

registerWhen('chat', timeThis('', (event) => {
    cancel(event);
}), () => getInSkyblock() && World.isLoaded()).setCriteria('  ');

registerWhen('chat', timeThis("registerChat from stash: messages", (itemName, event) => {
    baoStashes.stashes.pickupMat = itemName;
}), () => Settings.betterStashMessages && getInSkyblock() && World.isLoaded()).setCriteria('From stash: ${itemName}');

registerWhen('chat', timeThis("registerChat you picked up x items from your material stash", (numItems, event) => {
    baoStashes.stashes.numMats = Number(numItems);
}), () => Settings.betterStashMessages && getInSkyblock() && World.isLoaded()).setCriteria('You picked up ${numItems} items from your material stash!');

registerWhen('chat', timeThis("registerChat simplify stash message", (matsRem, numTypes, event) => {
    baoStashes.stashes.remMats = parseInt(matsRem.replace(',', ''), 10);
    baoStashes.stashes.sackTypes = Number(numTypes);
    ChatLib.chat(`&eFrom Sacks: &b${baoStashes.stashes.pickupMat} x${baoStashes.stashes.numMats} &7|| &cR: &b${baoStashes.stashes.remMats} &7|| &aTypes: ${baoStashes.stashes.sackTypes}`);
}), () => Settings.betterStashMessages && getInSkyblock() && World.isLoaded()).setCriteria('You still have ${matsRem} materials totalling ${numTypes} types of materials in there!');



////////////////////////////////////////////////////////////////////////////////
// CLICK STASH SHORTENER
////////////////////////////////////////////////////////////////////////////////
const clickStashMessages = [
    /You have .+ items stashed away!/,
    /You have .+ materials stashed away!/, 
    /This totals .+ type of material stashed!/, 
    /This totals .+ types of materials stashed!/, 
    />>> CLICK HERE to pick them up! <<</, 
]

clickStashMessages.forEach(msg => {
    registerWhen('chat', timeThis("registerChat cancel clickStashMessages", (event) => {
        cancel(event);
    }), () => Settings.betterStashMessages && Settings.hideClickStashMessages && getInSkyblock() && World.isLoaded()).setCriteria(msg).setContains();
})

let numRemMats = 0;
registerWhen('chat', timeThis("registerChat you have x materials stashed away", (numMatsRem, event) => {
    numRemMats = parseInt(numMatsRem.replace(',', ''), 10);
}), () => Settings.betterStashMessages && Settings.hideClickStashMessages && getInSkyblock() && World.isLoaded()).setCriteria('You have ${numMatsRem} materials stashed away!').setContains();

registerWhen('chat', timeThis("registerChat this totals x tyep of material stashed", (numTypes, event) => {
    baoStashes.clickStash.numTypesRem = Number(numTypes);
}), () => Settings.betterStashMessages && Settings.hideClickStashMessages && getInSkyblock() && World.isLoaded()).setCriteria('(This totals ${numTypes} type of material stashed!)').setContains();

registerWhen('chat', timeThis("registerChat this totals x types of materials stashed", (numTypes, event) => {
    baoStashes.clickStash.numTypesRem = Number(numTypes);
}), () => Settings.betterStashMessages && Settings.hideClickStashMessages && getInSkyblock() && World.isLoaded()).setCriteria('(This totals ${numTypes} types of materials stashed!)').setContains();


// hide click stash messages and only show them once every 10 times it has appeared.
let numTillReminder = 10;
registerWhen('chat', timeThis("registerChat processing numTillReminder", (event) => {
    numTillReminder -= 1;
}), () => Settings.betterStashMessages && Settings.hideClickStashMessages && getInSkyblock() && World.isLoaded()).setCriteria('>>> CLICK HERE to pick them up! <<<').setContains();


registerWhen('chat', timeThis("registerChat showing shortened clickStash message", (event) => {
    if (numTillReminder !== 0) return;
    ChatLib.chat(`&4&lREMINDER: &rYou have &b${numRemMats}&r materials of &b${baoStashes.clickStash.numTypesRem}&r type(s) in your sacks!`);
    numTillReminder = 10;
}), () => getInDungeon() && Settings.betterStashMessages && Settings.hideClickStashMessages && getInSkyblock() && World.isLoaded()).setCriteria('>>> CLICK HERE to pick them up! <<<').setContains();

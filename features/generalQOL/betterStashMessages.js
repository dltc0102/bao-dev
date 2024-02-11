import Settings from '../../settings.js';

import { getInSkyblock, getInDungeon } from '../../utils/functions.js'
import { registerWhen } from '../../utils/utils.js';


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
        "reminderMatsRem": 0,
        "numTypesRem": 0, 
    }, 
}


////////////////////////////////////////////////////////////////////////////////
// FUNCTIONS: NORMAL STASH
////////////////////////////////////////////////////////////////////////////////
function shouldHandleBetterStashMessages() {
    return Settings.betterStashMessages && getInSkyblock() && World.isLoaded();
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
    registerWhen('chat', (event) => {
        cancel(event);
    }, () => shouldHandleBetterStashMessages()).setCriteria(msg);
})
registerWhen('chat', (itemName, event) => {
    baoStashes.stashes.pickupMat = itemName;
}, () => shouldHandleBetterStashMessages()).setCriteria('From stash: ${itemName}');

registerWhen('chat', (numItems, event) => {
    baoStashes.stashes.numMats = Number(numItems);
}, () => shouldHandleBetterStashMessages()).setCriteria('You picked up ${numItems} items from your material stash!');

registerWhen('chat', (matsRem, numTypes, event) => {
    baoStashes.stashes.remMats = parseInt(matsRem.replace(',', ''), 10);
    baoStashes.stashes.sackTypes = Number(numTypes);
    ChatLib.chat(`&eFrom Sacks: &b${baoStashes.stashes.pickupMat} x${baoStashes.stashes.numMats} &7|| &cR: &b${baoStashes.stashes.remMats} &7|| &aTypes: ${baoStashes.stashes.sackTypes}`)
}, () => shouldHandleBetterStashMessages()).setCriteria('You still have ${matsRem} materials totalling ${numTypes} types of materials in there!');



////////////////////////////////////////////////////////////////////////////////
// FUNCTIONS: CLICK STASH
////////////////////////////////////////////////////////////////////////////////
function shouldHandleClickStashMessages() {
    return Settings.betterStashMessages && Settings.hideClickStashMessages && getInSkyblock() && World.isLoaded();
}

////////////////////////////////////////////////////////////////////////////////
// CLICK STASH SHORTENER
////////////////////////////////////////////////////////////////////////////////

const clickStashMessages = [
    /You have .+ materials stashed away!/, 
    /This totals .+ type of material stashed!/, 
    /This totals .+ types of materials stashed!/, 
    />>> CLICK HERE to pick them up! <<</, 
]

clickStashMessages.forEach(msg => {
    registerWhen('chat', (event) => {
        cancel(event);
    }, () => shouldHandleClickStashMessages()).setCriteria(msg).setContains();

})

registerWhen('chat', (numMatsRem, event) => {
    baoStashes.clickStash.reminderMatsRem = parseInt(numMatsRem.replace(',', ''), 10);
}, () => shouldHandleClickStashMessages()).setCriteria('You have ${numMatsRem} materials stashed away!').setContains();

registerWhen('chat', (numTypes, event) => {
    baoStashes.clickStash.numTypesRem = Number(numTypes);
}, () => shouldHandleClickStashMessages()).setCriteria('(This totals ${numTypes} type of material stashed!)').setContains();

registerWhen('chat', (numTypes, event) => {
    baoStashes.clickStash.numTypesRem = Number(numTypes);
}, () => shouldHandleClickStashMessages()).setCriteria('(This totals ${numTypes} types of materials stashed!)').setContains();


// hide click stash messages and only show them once every 10 times it has appeared.
let numTillReminder = 10;
registerWhen('chat', (event) => {
    numTillReminder -= 1;
}, () => shouldHandleClickStashMessages()).setCriteria('>>> CLICK HERE to pick them up! <<<').setContains();


registerWhen('chat', (event) => {
    ChatLib.chat(`&4&lREMINDER: &rYou have &b${baoStashes.clickStash.reminderMatsRem}&r materials of &b${baoStashes.clickStash.numTypesRem}&r type(s) in your sacks!`);
    numTillReminder = 10;
}, () => Settings.betterStashMessages && Settings.hideClickStashMessages && numTillReminder === 0 && getInDungeon() && getInSkyblock() && World.isLoaded()).setCriteria('>>> CLICK HERE to pick them up! <<<').setContains();

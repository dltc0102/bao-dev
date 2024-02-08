import Settings from '../../settings.js';

import { getInSkyblock, getInDungeon } from '../../utils/functions.js'
import { registerChatWhen } from '../../utils/utils.js';


////////////////////////////////////////////////////////////////////////////////
// FUNCTIONS
////////////////////////////////////////////////////////////////////////////////
function shouldHandleBetterStashMessages() {
    return Settings.betterStashMessages && getInSkyblock() && World.isLoaded();
}

function shouldHandleClickStashMessages() {
    return Settings.betterStashMessages && Settings.hideClickStashMessages && getInSkyblock() && World.isLoaded();
}
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
// STASH SHORTENER
////////////////////////////////////////////////////////////////////////////////
registerChatWhen(register('chat', (stuff, event) => {
    cancel(event);
}).setCriteria('[Sacks] +${stuff})'), () => shouldHandleBetterStashMessages());

registerChatWhen(register('chat', (stuff, event) => {
    cancel(event);
}).setCriteria('[Sacks] -${stuff})'), () => shouldHandleBetterStashMessages());

registerChatWhen(register('chat', (itemName, event) => {
    cancel(event);
    baoStashes.stashes.pickupMat = itemName;
    // baoStashes.save();
}).setCriteria('From stash: ${itemName}'), () => shouldHandleBetterStashMessages());

registerChatWhen(register('chat', (numItems, event) => {
    cancel(event);
    baoStashes.stashes.numMats = Number(numItems);
    // baoStashes.save();
}).setCriteria('You picked up ${numItems} items from your material stash!'), () => shouldHandleBetterStashMessages());

registerChatWhen(register('chat', (matsRem, numTypes, event) => {
    cancel(event);
    baoStashes.stashes.remMats = parseInt(matsRem.replace(',', ''), 10);
    baoStashes.stashes.sackTypes = Number(numTypes);
    ChatLib.chat(`&eFrom Sacks: &b${baoStashes.stashes.pickupMat} x${baoStashes.stashes.numMats} &7|| &cR: &b${baoStashes.stashes.remMats} &7|| &aTypes: ${baoStashes.stashes.sackTypes}`)
    // baoStashes.save();
}).setCriteria('You still have ${matsRem} materials totalling ${numTypes} types of materials in there!'), () => shouldHandleBetterStashMessages());


////////////////////////////////////////////////////////////////////////////////
// CLICK STASH SHORTENER
////////////////////////////////////////////////////////////////////////////////
registerChatWhen(register('chat', (numMatsRem, event) => {
    cancel(event);
    baoStashes.clickStash.reminderMatsRem = parseInt(numMatsRem.replace(',', ''), 10);
    // baoStashes.save();
}).setCriteria('You have ${numMatsRem} materials stashed away!').setContains(), () => shouldHandleClickStashMessages());

registerChatWhen(register('chat', (numTypes, event) => {
    cancel(event);
    baoStashes.clickStash.numTypesRem = Number(numTypes);
    // baoStashes.save();
}).setCriteria('(This totals ${numTypes} type of material stashed!)').setContains(), () => shouldHandleClickStashMessages());

registerChatWhen(register('chat', (numTypes, event) => {
    cancel(event);
    baoStashes.clickStash.numTypesRem = Number(numTypes);
    // baoStashes.save();
}).setCriteria('(This totals ${numTypes} types of materials stashed!)').setContains(), () => shouldHandleClickStashMessages());


// hide click stash messages and only show them once every 10 times it has appeared.
let numTillReminder = 10;
registerChatWhen(register('chat', (event) => {
    if (numTillReminder === 0 && getInDungeon()) {
        ChatLib.chat(`&4&lREMINDER: &rYou have &b${baoStashes.clickStash.reminderMatsRem}&r materials of &b${baoStashes.clickStash.numTypesRem}&r type(s) in your sacks!`);
        numTillReminder = 10;
    }
    cancel(event);
    numTillReminder -= 1;
}).setCriteria('>>> CLICK HERE to pick them up! <<<').setContains(), () => shouldHandleClickStashMessages());

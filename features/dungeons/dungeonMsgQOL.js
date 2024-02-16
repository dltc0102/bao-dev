/// <reference types="../../../CTAutocomplete" />
/// <reference lib="es2015" />

import Settings from "../../settings.js";

import { getInSkyblock, getInDungeon } from "../../utils/functions.js";
import { registerWhen, timeThis } from "../../utils/utils";


///////////////////////////////////////////////////////////////////////////////
// TOGGLE: MESSAGE QOL
///////////////////////////////////////////////////////////////////////////////
const Instant = Java.type('java.time.Instant');

const messageQOLMessages = [
    // friend join/leave messages
    /Friend > .+ joined./, 
    /Friend > .+ left./, 

    // exp
    /You earned .+\+ GEXP from playing Skyblock!/, 

    // errors
    /You cannot use abilities in this room!/, 
    /Oops! You stepped on the wrong block!/, 
    /Don't move diagonally! bad!/, 
    /This lever has already been used./, 
    /You cannot hit the silverfish while it's moving!/,
    /You cannot move the silverfish in that direction!/, 
    /You cannot do that in this room!/, 
    /It isn't your turn!/, 
    /Wrong number!/, 

    // full inv
    /You don't have enough space in your inventory to pick up this item!/, 
]

messageQOLMessages.forEach(msg => {{
    registerWhen('chat', (event) => {
        cancel(event);
    }, () => Settings.dungeonMessageQOL && getInDungeon() && getInSkyblock() && World.isLoaded()).setCriteria(msg);
}});


///////////////////////////////////////////////////////////////////////////////
// MUTE NPC SOLD ITEMS
///////////////////////////////////////////////////////////////////////////////
const importantItems = ["Giant's Sword", "Infinileap", "Diamond Pickaxe", "Stonk", "Ragnarock Axe", "Spring Boots", "Abiphone", "Rabbit Hat", "Treecapitator"];

registerWhen('chat', timeThis("registerChat you sold thing x1 for 1 coin", (item, amt, coins, event) => {
    if (!importantItems.includes(item)) cancel(event);
}), () => getInDungeon() && getInSkyblock() && World.isLoaded()).setCriteria('You sold ${item} x${amt} for ${coins} Coin!');


registerWhen('chat', timeThis("registerChat you sold thing x1 for 2 coins", (thing, amt, coins, event) => {
    if (!importantItems.includes(thing)) cancel(event);
}), () => getInDungeon() && getInSkyblock() && World.isLoaded()).setCriteria('You sold ${thing} x${amt} for ${coins} Coins!');


///////////////////////////////////////////////////////////////////////////////
// LEVER USED NOTI
///////////////////////////////////////////////////////////////////////////////
registerWhen('chat', timeThis("registerChat lever used message", (event) => {
    ChatLib.chat('&c&lLEVER USED');
}), () => getInDungeon() && getInSkyblock() && World.isLoaded()).setCriteria('This lever has already been used.');


///////////////////////////////////////////////////////////////////////////////
// RARE REWARD FROM CHEST IN DUNGEON HUB MESSAGES
///////////////////////////////////////////////////////////////////////////////
const importantDrops = ["Necron's Handle", "Implosion", "Shadow Warp", "Wither Shield", "Dark Claymore", "Necron Dye", "Recombobulator 3000"];

registerWhen('chat', timeThis("registerChat rare reward! player found a drop in their bedrock chest", (playerName, drop, chestType, event) => {
    if (!importantDrops.includes(drop) || playerName !== Player.getName()) cancel(event);
}), () => getInSkyblock() && World.isLoaded()).setCriteria('RARE REWARD! ${playerName} found a ${drop} in their ${chestType} Chest!');

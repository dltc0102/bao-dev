import Settings from "../../settings.js";

import { getInSkyblock, getInDungeon } from "../../utils/functions.js";
import { registerChatWhen, importantItems } from "../../utils/utils";


///////////////////////////////////////////////////////////////////////////////
// TOGGLE: MESSAGE QOL
///////////////////////////////////////////////////////////////////////////////
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
    registerChatWhen(register('chat', (event) => {
        cancel(event);
    }).setCriteria(msg), () => Settings.dungeonMessageQOL && getInDungeon() && getInSkyblock() && World.isLoaded());
}});


///////////////////////////////////////////////////////////////////////////////
// MUTE NPC SOLD ITEMS
///////////////////////////////////////////////////////////////////////////////
registerChatWhen(register('chat', (thing, amt, coins, event) => {
    if (!importantItems.includes(thing)) cancel(event);
}).setCriteria('You sold ${thing} x${amt} for ${coins} coin!'), () => getInDungeon() && getInSkyblock() && World.isLoaded());

registerChatWhen(register('chat', (thing, amt, coins, event) => {
    if (!importantItems.includes(thing)) cancel(event);
}).setCriteria('You sold ${thing} x${amt} for ${coins} coins!'), () => getInDungeon() && getInSkyblock() && World.isLoaded());


///////////////////////////////////////////////////////////////////////////////
// LEVER USED NOTI
///////////////////////////////////////////////////////////////////////////////
registerChatWhen(register('chat', (event) => {
    ChatLib.chat('&c&lLEVER USED');
}).setCriteria('This lever has already been used.'), () => getInDungeon() && getInSkyblock() && World.isLoaded());


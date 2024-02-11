import Settings from "../../settings.js";

import { getInSkyblock, getInDungeon } from "../../utils/functions.js";
import { registerWhen } from "../../utils/utils";


///////////////////////////////////////////////////////////////////////////////
// FUNCTIONS
///////////////////////////////////////////////////////////////////////////////
function shouldHandleSysNotis() {
    return Settings.dungeonSysNotifications && getInDungeon() && getInSkyblock() && World.isLoaded();
}
///////////////////////////////////////////////////////////////////////////////
// TOGGLE: SYSTEM NOTIFICATIONS
///////////////////////////////////////////////////////////////////////////////
const sysNotiMessages = [
    // class stats
    /Your .+ stats are doubled because you are the only player using this class!/,
    /\[Berserk] .+/, 
    /\[Archer] .+/, 
    /\[Healer] .+/, 
    /\[Tank] .+/, 
    /\[Mage] .+/, 

    // wish/heals
    /.+'s Wish healed you for .+ health and granted you an absorption shield with .+ health!/, 
    /◕ .+/, 

    // sacks
    /\[Sacks] .+/,

    // potion effects reminder
    /You are not allowed to use Potion Effects while in Dungeon, therefore all active effects have been paused and stored\. They will be restored when you leave Dungeon!/, 

    // fire sale mute
    /.+ FIRE SALE .+/, 
    /.+ ♨ .+/,
]

sysNotiMessages.forEach(msg => {{
    registerWhen('chat', (event) => {
        cancel(event);
    }, () => shouldHandleSysNotis()).setCriteria(msg);
}});
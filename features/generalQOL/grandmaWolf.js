import Settings from '../../settings.js';

import { getInSkyblock } from '../../utils/functions.js'; // sb, area
import { registerWhen } from '../../utils/utils.js';


////////////////////////////////////////////////////////////////////////////////
// FUNCTIONS
////////////////////////////////////////////////////////////////////////////////
function shouldHandleGrandmaMsgs() {
    return Settings.grandma_hider && getInSkyblock() && World.isLoaded();
}


////////////////////////////////////////////////////////////////////////////////
// GRANDMA WOLF HIDER
////////////////////////////////////////////////////////////////////////////////
const grandmaMessages = [
    /\+.+ Kill Combo .+/, 
    /\+.+ Kill Combo/, 
    /Your Kill Combo has expired! You reached a .+ Kill Combo!/, 
]

grandmaMessages.forEach(msg => {{
    registerWhen('chat', (event) => {
        cancel(event);
    }, () => shouldHandleGrandmaMsgs()).setCriteria(msg);
}});
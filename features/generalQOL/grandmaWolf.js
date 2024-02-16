/// <reference types="../../../CTAutocomplete" />
/// <reference lib="es2015" />

import Settings from '../../settings.js';

import { getInSkyblock } from '../../utils/functions.js'; // sb, area
import { registerWhen, timeThis } from '../../utils/utils.js';


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
    registerWhen('chat', timeThis("registerChat cancel grandmaMessages", (event) => {
        cancel(event);
    }), () => shouldHandleGrandmaMsgs()).setCriteria(msg);
}});
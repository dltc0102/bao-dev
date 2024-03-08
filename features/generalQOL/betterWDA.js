import Settings from "../../config1/settings.js";

import { getInSkyblock } from '../../utils/functions.js'
import { registerWhen, timeThis } from '../../utils/utils.js';


////////////////////////////////////////////////////////////////////////////////
// FUNCTIONS
////////////////////////////////////////////////////////////////////////////////
function shouldHandleWDAMsgs() {
    return Settings.betterWDA && getInSkyblock() && World.isLoaded();
}

////////////////////////////////////////////////////////////////////////////////
// BETTER WDA MESSAGES
////////////////////////////////////////////////////////////////////////////////
const wdaMessages = [
    /\[WATCHDOG ANNOUNCEMENT]/, 
    /Watchdog has banned .+ players in the last .+ days\./, 
    /Staff have banned an additional .+ in the last .+ days\./, 
    /Blacklisted modifications are a bannable offense!/, 
]

wdaMessages.forEach(msg => {{
    registerWhen('chat', timeThis("registerChat cancel wdaMessages", (event) => {
        cancel(event);
    }), () => shouldHandleWDAMsgs()).setCriteria(msg);
}});
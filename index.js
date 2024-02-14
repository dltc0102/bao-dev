import Settings from './settings.js';
import ExtraSettings from './extraSettings.js';

import { baoUtils, baoFirstTime } from './utils/utils.js';

// bao main
import './features/dungeons.js'
import './features/generalQOL.js'
import './features/fishing_overlays.js'
import './features/displayHP.js'
import './features/fishing_pings.js'
import './features/garden.js'
import './features/timers.js'
import './features/mainSCStats.js'
import './features/waterSCStats.js'
import './features/lavaSCStats.js'


// bao extras
import './features/end.js'
import './features/mythos.js'
import './features/misc.js'

// import './features/dev.js'

// import './utils/cake.js';
// import './utils/inventoryLog.js'

register("gameLoad", () => {
    ChatLib.chat(`${baoUtils.modPrefix} &rUpdated!`)
    ChatLib.command('pl');
    console.log(`------------------------------------------------------------------------------------`);
    console.log(`[Bao] Updated!`);
});

// firstTime
if (baoFirstTime.firstTime) {
    baoFirstTime.firstTime = false;
    baoFirstTime.save();

    const messages = [
        `${baoUtils.modPrefix} has been installed!`, 
        `&fThank you for downloading. This is Bao by oBiscuit.`, 
        `&eThis version is v1.0.4 -- &bStart by doing /bao`
    ]

    ChatLib.chat(`&b&m${ChatLib.getChatBreak(" ")}`);
    messages.forEach(idx => ChatLib.chat(ChatLib.getCenteredText(idx)));
    ChatLib.chat(`&b&m${ChatLib.getChatBreak(" ")}`);
}

// open main gui
register("command", () => 
    Settings.openGUI()
).setName("biscuitaddons").setAliases('bao');

register('command', () => {
    ExtraSettings.openGUI()
}).setName('biscuitextras').setAliases('baox');

register('command', (args) => {
    Client.showTitle(args, '', 1, 30,   1);
}).setName('titlesim').setAliases('tsim');

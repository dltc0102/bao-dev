// import "./features/dev.js"
import "./features/general_qol.js" 
import "./features/timers.js" 
import "./features/fishing_overlays.js" 
import "./features/fishing_pings.js" 
import './features/fishing_stats.js'
import "./features/misc.js" 
import "./features/dungeons.js" 
import "./features/mythos.js"
import "./features/garden.js"
import "./features/winter.js"
import "./features/displayHP.js"

/* Dev.js 
* o Reset Button
* o Dev Button
* o Quick setup fishing button (default preset)
*/

// edit gui
// try to optimise general_qol functions

/* Fishing.js 
* o Fawe Pings
*/

import Settings from "./settings.js"
import { data } from "./utils/data.js"
import { getTabArea } from "./utils/functions.js"

if (data.firstTime) {
    ChatLib.chat('&3--------------- &6<&3Bao&6> &rhas been installed! &3----------------');
    ChatLib.chat('&3||         &fThank you for downloading. This is Bao by oBiscuit           &3||');
    ChatLib.chat('&3||               &eThis version is v1.0.2 -- &bStart by doing /bao               &3||');
    ChatLib.chat(ChatLib.getChatBreak('&n&3 '))
    ChatLib.getChatBreak('&3&n-')
    data.firstTime = false
}
data.autosave(5)

register('command', () => {
    data.firstTime = true;
    ChatLib.chat('Bao has been reset!')
}).setName('resetfirstbao');

// open gui
register("command", () => 
    Settings.openGUI()
).setName("biscuitaddons").setAliases('bao');

// load current area
register('step', () => {
    if (!data.inSkyblock) return;
    data.currArea = getTabArea();
}).setFps(1);



// // move overlays event
// register('command', () => {
//     movebao.open()
// }).setName('movebao').setAliases('mb', 'mbao');

// var movebao = new Gui();

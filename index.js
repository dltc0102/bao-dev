import Settings from './settings.js';
import Audio from './utils/audio.js';
import { baoUtils } from './utils/utils.js';

export const baoAudio = new Audio();

import './features/dev.js'
import './features/displayHP.js' // done
import './features/dungeon_cleaner.js' // done
import './features/dungeons.js' // done
import './features/end_cleaner.js' // done
import './features/fishing_overlays.js' // done
import './features/general_qol.js' // done
import './features/garden.js' // done
import './features/mythos.js' // done
import './features/misc.js' // done
import './features/timers.js' // done
import './features/fishing_pings.js' // done

import './features/mainSCStats.js' // done
import './features/waterSCStats.js'
import './features/lavaSCStats.js'

import './utils/cake.js';
import './utils/inventoryLog.js'

register("gameLoad", () => {
    ChatLib.chat(`${baoUtils.modPrefix} &rUpdated!`)
    ChatLib.command('pl');
    console.log(`------------------------------------------------------------------------------------`);
    console.log(`[Bao] Updated!`);
});

// firstTime
if (baoUtils.firstTime) {
    baoUtils.firstTime = false;
    baoUtils.save();

    const messages = [
        `${baoUtils.modPrefix} has been installed!`, 
        `&fThank you for downloading. This is Bao by oBiscuit.`, 
        `&eThis version is v1.0.4 -- &bStart by doing /bao`
    ]

    baoAudio.playDefaultSound();
    ChatLib.chat(`&b&m${ChatLib.getChatBreak(" ")}`);
    messages.forEach(idx => ChatLib.chat(ChatLib.getCenteredText(idx)));
    ChatLib.chat(`&b&m${ChatLib.getChatBreak(" ")}`);
}

// open main gui
register("command", () => 
    Settings.openGUI()
).setName("biscuitaddons").setAliases('bao');

baoUtils.autosave(1);
import Settings from "../../settings";
import Audio from '../../utils/audio.js';

import { getInSkyblock } from "../../utils/functions";
import { playSound } from "../../utils/functions";
import { registerWhen } from "../../utils/utils";

const qolAudio = new Audio();

////////////////////////////////////////////////////////////////////////////////
// PF MESSAGE SHORTENER
////////////////////////////////////////////////////////////////////////////////
registerWhen('chat', (message, event) => {
    cancel(event);
    ChatLib.chat(`&d&lPF &r> &a${message}`);
}, () => Settings.betterPFMessages && getInSkyblock() && World.isLoaded()).setCriteria('Party Finder > ${message}');


////////////////////////////////////////////////////////////////////////////////
// CLASS LVL UP PING
////////////////////////////////////////////////////////////////////////////////
function determineClassColor(className) {
    const classColors = {
        "BERSERK": "&c&l",
        "ARCHER": "&e&l", 
        "MAGE": "&9&l", 
        "TANK": "&2&l", 
        "HEALER": "&e&l"
    }
    return classColors[className] || ''; 
}

registerWhen('chat', (className, lvl1, lvl2, event) => {
    let classF = determineClassColor(className);
    let conditionalLvl2 = lvl2 === '50' ? `&6&l${lvl2}` : `&f&l${lvl2}`;
    ChatLib.chat(`&b&lCLASS LEVEL UP ${classF}${className} &f&l${lvl1}&3&l➜&f&l${conditionalLvl2}`);
    lvl2 === '50' ? playSound() : qolAudio.playDefaultSound();
}, () => Settings.cataLevelUpPing && getInSkyblock() && World.isLoaded()).setCriteria('CLASS LEVEL UP ${className} ${lvl1}➜${lvl2}').setContains();


////////////////////////////////////////////////////////////////////////////////
// DUNGEON LVL UP PING
////////////////////////////////////////////////////////////////////////////////
registerWhen('chat', (lvl1, lvl2, event) => {
    let conditionalLvl2 = lvl2 === '50' ? `&6&l${lvl2}` : `&f&l${lvl2}`;
    ChatLib.chat(`&b&lDUNGEON LEVEL UP The Catacombs &f&l${lvl1}&b&l➜${conditionalLvl2}`);
    lvl2 === '50' ? playSound() : qolAudio.playDefaultSound();
}, () => Settings.cataLevelUpPing && getInSkyblock() && World.isLoaded()).setCriteria('DUNGEON LEVEL UP The Catacombs ${lvl1}➜${lvl2}').setContains();

import ExtraSettings from "../../extraSettings.js";
import PogObject from 'PogData';

import { baoEnd } from "./endStats";
import { baoUtils, registerWhen, timeThis } from "../../utils/utils";
import { getInSkyblock, getInEnd } from "../../utils/functions.js";
import { constrainX, constrainY } from '../../utils/functions.js' // padding
import { createGuiCommand, renderGuiPosition } from '../../utils/functions.js'; // gui

////////////////////////////////////////////////////////////////////////////////
// CONSTS
////////////////////////////////////////////////////////////////////////////////
const moveDamageCounter = new Gui();
createGuiCommand(moveDamageCounter, 'movedamagecounter', 'mdmg');
const damagersDraggable = `&7Top Damagers: \n&7${baoUtils.thickSep}\n&7Name1: 00❤\n&7Name2: 00❤\n&7Name3: 00❤`

let damagersText = '';
let damagers = [];

export const damageCounter = new PogObject("bao-dev", {
    "x": 3, 
    "y": 50,
}, '/data/damageCounter.json');
damageCounter.autosave(5);


////////////////////////////////////////////////////////////////////////////////
// FUNCTIONS
////////////////////////////////////////////////////////////////////////////////
function getTopDragDamagers() {
    let names = [];
    TabList.getNames().forEach(line => {
        let damagerMatch = line.removeFormatting().match(/^ (\w+): ([\d.]+[k|M]❤)$/)
        if (damagerMatch) {
            let damagerName = damagerMatch[1];
            let damagerDmg = damagerMatch[2];
            names.push(`&f${damagerName}: &b${damagerDmg}`);
        }
    })
    return names;
}


////////////////////////////////////////////////////////////////////////////////
// REG: CHAT
////////////////////////////////////////////////////////////////////////////////
const resetMessages = [
    /☬ The Dragon Egg has spawned!/, 
    /☬ The .+ Dragon has spawned!/, 
]
resetMessages.forEach(msg => {
    registerWhen('chat', timeThis("registerChat cancel resetMessages", (event) => {
        damagers = [];
    }), () => getInEnd() && getInSkyblock() && World.isLoaded()).setCriteria(msg);
})


////////////////////////////////////////////////////////////////////////////////
// REG: STEP
////////////////////////////////////////////////////////////////////////////////
register('step', timeThis("registerStep update DamagersText", () => {
    if (!ExtraSettings.showDragonDamageDisplay) return;
    if (!getInEnd()) return;
    if (!getInSkyblock() || !World.isLoaded()) return;
    damagers = getTopDragDamagers().join('\n');
    damagersText =  baoEnd.spawned ? `&bTop Damagers: \n&9${baoUtils.thickSep}\n${damagers}` : '';
})).setFps(3);


////////////////////////////////////////////////////////////////////////////////
// REG: DRAG
////////////////////////////////////////////////////////////////////////////////
register('dragged', timeThis("registerDragged moveDamageCounter", (dx, dy, x, y) => {
    if (!getInSkyblock() || !World.isLoaded()) return;
    if (moveDamageCounter.isOpen()) {
        damageCounter.x = constrainX(x, 3, damagersDraggable);
        damageCounter.y = constrainY(y, 3, damagersDraggable);
    };
    damageCounter.save();
})); 


////////////////////////////////////////////////////////////////////////////////
// REG: OVERLAY
////////////////////////////////////////////////////////////////////////////////
registerWhen('renderOverlay', timeThis("renderOverlay dragon damagersText", () => {
    Renderer.drawStringWithShadow(damagersText, damageCounter.x, damageCounter.y);
}), () => ExtraSettings.showDragonDamageDisplay && getInEnd() && getInSkyblock() && World.isLoaded());

registerWhen('renderOverlay', timeThis("renderOverlay dragon damagersText draggable", () => {
    renderGuiPosition(moveDamageCounter, damageCounter, damagersDraggable);
}), () => getInSkyblock() && World.isLoaded());


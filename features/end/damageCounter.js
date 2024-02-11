import Settings from "../../settings.js";

import { baoUtils } from "../../utils/utils";
import { baoEnd } from "./endStats";
import { registerWhen } from "../../utils/utils";
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


const damageCounter = {
    "x": 3, 
    "y": 50,
}


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
    registerWhen('chat', (event) => {
        damagers = [];
    }, () => getInEnd() && getInSkyblock() && World.isLoaded()).setCriteria(msg);
})


////////////////////////////////////////////////////////////////////////////////
// REG: STEP
////////////////////////////////////////////////////////////////////////////////
register('step', () => {
    if (!Settings.showDragonDamageDisplay) return;
    if (!getInEnd()) return;
    if (!getInSkyblock() || !World.isLoaded()) return;
    damagers = getTopDragDamagers().join('\n');
    damagersText =  baoEnd.spawned ? `&bTop Damagers: \n&9${baoUtils.thickSep}\n${damagers}` : '';
}).setFps(3);


////////////////////////////////////////////////////////////////////////////////
// REG: DRAG
////////////////////////////////////////////////////////////////////////////////
register('dragged', (dx, dy, x, y) => {
    if (!getInSkyblock() || !World.isLoaded()) return;
    if (moveDamageCounter.isOpen()) {
        damageCounter.x = constrainX(x, 3, damagersDraggable);
        damageCounter.y = constrainY(y, 3, damagersDraggable);
    };
}); 


////////////////////////////////////////////////////////////////////////////////
// REG: OVERLAY
////////////////////////////////////////////////////////////////////////////////
registerWhen('renderOverlay', () => {
    Renderer.drawStringWithShadow(damagersText, damageCounter.x, damageCounter.y);
}, () => Settings.showDragonDamageDisplay && getInEnd() && getInSkyblock() && World.isLoaded());

registerWhen('renderOverlay', () => {
    renderGuiPosition(moveDamageCounter, damageCounter, damagersDraggable);
}, () => getInSkyblock() && World.isLoaded());


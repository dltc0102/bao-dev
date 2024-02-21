/// <reference types="../../../CTAutocomplete" />
/// <reference lib="es2015" />

import Settings from "../../config1/settings.js";
import PogObject from 'PogData';

import { getInSkyblock, getInDungeon } from '../../utils/functions.js'; // sb, area
import { romanToNumeral } from '../../utils/functions.js';
import { createGuiCommand, renderGuiPosition } from '../../utils/functions.js'; // gui
import { constrainX, constrainY } from '../../utils/functions.js' // padding
import { registerWhen, timeThis } from '../../utils/utils.js';

////////////////////////////////////////////////////////////////////////////////
// CONSTS
////////////////////////////////////////////////////////////////////////////////
const moveblessingscounter = new Gui();
createGuiCommand(moveblessingscounter, 'moveblessingscounter', 'mbless');

// export const baoDungeons = new PogObject("bao-dev", {?
const blessingAddOn = '&6&l[&f&lBlessings&6&l]&r';
const dragAddOn = `&7&l[Blessing]&r`

export const blessingsDisplay = new PogObject("bao-dev", {
    "x": 400, 
    "y": 400,
}, '/data/blessingsDisplay.json');
blessingsDisplay.autosave(5);

export const baoBlessings = {
    power: {
        display: `${blessingAddOn} &6&lPower`,
        regex: /Blessing of Power (.+)/,
        drag: `${dragAddOn} &7Power: 0 (0)`,
        lvl: 0,
    },
    time: {
        display: `${blessingAddOn} &6&lTime`,
        regex: /Blessing of Time (.+)/,
        drag: `${dragAddOn} &7Time: 0`,
        lvl: 0,
    },
    life: {
        display: `${blessingAddOn} &6&lLife`,
        regex: /Blessing of Life (.+)/,
        drag: `${dragAddOn} &7Life: 0`,
        lvl: 0,
    },
    wisdom: {
        display: `${blessingAddOn} &6&lWisdom`,
        regex: /Blessing of Wisdom (.+)/,
        drag: `${dragAddOn} &7Wisdom: 0`,
        lvl: 0,
    },
    stone: {
        display: `${blessingAddOn} &6&lStone`,
        regex: /Blessing of Stone (.+)/,
        drag: `${dragAddOn} &7Stone: 0`,
        lvl: 0,
    },
    "draggable": `${dragAddOn} &7Power: 0 (0)\n${dragAddOn} &7Time: 0\n${dragAddOn} &7Life: 0\n${dragAddOn} &7Wisdom: 0\n${dragAddOn} &7Stone: 0`,
}


////////////////////////////////////////////////////////////////////////////////
// FUNCTIONS
////////////////////////////////////////////////////////////////////////////////
function getPower() {
    return baoBlessings.power.lvl;
}

function getTime() {
    return baoBlessings.time.lvl;
}

function getTruePower() {
    if (getTime() === 0) return;
    return getPower() + (getTime() / 2);
}

function resetBlessings() {
    for (let blessing in baoBlessings) {
        baoBlessings[blessing].lvl = 0;
    }
}


////////////////////////////////////////////////////////////////////////////////
// BLESSINGS DISPLAY
////////////////////////////////////////////////////////////////////////////////
let shouldShowBlessings = false;
let blessingText = '';

////////////////////////////////////////////////////////////////////////////////
// REG: STEP
////////////////////////////////////////////////////////////////////////////////
register('step', timeThis("registerStep blessings", () => {
    if (!getInSkyblock() || !World.isLoaded() || !getInDungeon()) return;
    const tabInfo = TabList.getFooter().removeFormatting();
    for (let blessing in baoBlessings) {
        let match = tabInfo.match(baoBlessings[blessing].regex);
        if (match) {
            shouldShowBlessings = true;
            baoBlessings[blessing].lvl = romanToNumeral(match[1]);
            // console.log(baoBlessings[blessing].display, baoBlessings[blessing].lvl)
        }
    }
    
    if (shouldShowBlessings) {
        blessingText = '';
        baoBlessings.draggable = '';
        if (baoBlessings.power.lvl > 0) { 
            let truePower = isNaN(getTruePower()) ? '0' : getTruePower();
            baoBlessings.time.lvl > 0 ? blessingText += `\n${baoBlessings.power.display}: &b${baoBlessings.power.lvl} &7(&cTP: &7${truePower})` : blessingText += `\n${baoBlessings.power.display}: &b${baoBlessings.power.lvl}`;
            baoBlessings.draggable += `\n${baoBlessings.power.drag}`;
        }
        if (baoBlessings.time.lvl > 0) { 
            blessingText += `\n${baoBlessings.time.display}: &b${baoBlessings.time.lvl}`;
            baoBlessings.draggable += `\n${baoBlessings.time.drag}`;
        }
        
        if (baoBlessings.life.lvl > 0) { 
            blessingText += `\n${baoBlessings.life.display}: &b${baoBlessings.life.lvl}`;
            baoBlessings.draggable += `\n${baoBlessings.life.drag}`;
        }
        
        if (baoBlessings.wisdom.lvl > 0) { 
            blessingText += `\n${baoBlessings.wisdom.display}: &b${baoBlessings.wisdom.lvl}`;
            baoBlessings.draggable += `\n${baoBlessings.wisdom.drag}`;
        }
        
        if (baoBlessings.stone.lvl > 0) { 
            blessingText += `\n${baoBlessings.stone.display}: &b${baoBlessings.stone.lvl}`;
            baoBlessings.draggable += `\n${baoBlessings.stone.drag}`;
        }
        // console.log(blessingText)
    } else {
        blessingText = '';
        baoBlessings.draggable = '';
    }
})).setFps(1);


////////////////////////////////////////////////////////////////////////////////
// REG: WORLD UNLOAD
////////////////////////////////////////////////////////////////////////////////
register('worldUnload', timeThis("registerWorldUnload reset blessings", (event) => {
    resetBlessings();
    shouldShowBlessings = false;
}));



////////////////////////////////////////////////////////////////////////////////
// REG: DRAGGED
////////////////////////////////////////////////////////////////////////////////
register('dragged', timeThis("registerDragged moveblessingscounter", (dx, dy, x, y) => {
    if (!getInSkyblock() || !World.isLoaded()) return;
    if (moveblessingscounter.isOpen()) {
        blessingsDisplay.x = constrainX(x, 3, baoBlessings.draggable);
        blessingsDisplay.y = constrainY(y, 3, baoBlessings.draggable);
    }
    blessingsDisplay.save();
}));


////////////////////////////////////////////////////////////////////////////////
// REG: OVERLAY
////////////////////////////////////////////////////////////////////////////////
registerWhen('renderOverlay', timeThis("renderOverlay blessingText", () => {
    Renderer.drawStringWithShadow(`${blessingText}`, blessingsDisplay.x, blessingsDisplay.y);
}), () => Settings.showBlessingsDisplay && getInDungeon() && getInSkyblock() && World.isLoaded());

registerWhen('renderOverlay', timeThis("renderOverlay blessingText draggable", () => {
    renderGuiPosition(moveblessingscounter, blessingsDisplay, baoBlessings.draggable);
}), () => getInSkyblock() && World.isLoaded());



////////////////////////////////////////////////////////////////////////////////
// DEBUGS
////////////////////////////////////////////////////////////////////////////////
register('command', () => {
    ChatLib.chat(`Wisdom: ${baoBlessings.wisdom.lvl}`)
    ChatLib.chat(`Life: ${baoBlessings.life.lvl}`)
    ChatLib.chat(`Power: ${baoBlessings.power.lvl}`)
    ChatLib.chat(`Stone: ${baoBlessings.stone.lvl}`)
    ChatLib.chat(`Time: ${baoBlessings.time.lvl}`)
}).setName('currbless');
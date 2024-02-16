/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />

import Settings from '../settings.js';
import PogObject from 'PogData';

import { registerWhen, timeThis } from '../utils/utils.js';
import { checkLSRange } from '../utils/functions.js';
import { createGuiCommand, renderGuiPosition } from '../utils/functions.js'; // gui
import { constrainX, constrainY } from '../utils/functions.js' // padding
import { getInSkyblock } from '../utils/functions.js'; // sb, area


////////////////////////////////////////////////////////////////////////////////
// SETUP CONSTS
////////////////////////////////////////////////////////////////////////////////
const entityArmorStand = Java.type("net.minecraft.entity.item.EntityArmorStand");
const moveHpDisplay = new Gui(); // display hp of mobs
createGuiCommand(moveHpDisplay, 'movehp', 'mhp');

let inLSRange = false;
let mobInfos = [];
let specifiedMobs = [];
let hpDisplayText = '';
const hpDraggable = '[Lv000] SomeMobName 10M/10M ❤ -- [✖]';

export const displayHPCounter = new PogObject("bao-dev", {
    "x": 400, 
    "y": 40,
}, '/data/displayHPCounter.json');
displayHPCounter.autosave(5);


let mobSettings = [
    { condition: Settings.vanq_hp, mob: 'Vanquisher' },
    { condition: Settings.rein_hp, mob: 'Reindrake' },
    { condition: Settings.yeti_hp, mob: 'Yeti' },
    { condition: Settings.gwshark_hp, mob: 'Great White Shark' },
    { condition: Settings.carrotking_hp, mob: 'Carrot King' },
    { condition: Settings.waterhydra_hp, mob: 'Water Hydra' },
    { condition: Settings.sea_emp_hp, mob: 'Sea Emperor' },
    { condition: Settings.reaper_hp, mob: 'Grim Reaper' },
    { condition: Settings.phantom_fisher_hp, mob: 'Phantom Fisher' },
    { condition: Settings.rein_hp, mob: 'Reindrake' },
    { condition: Settings.jawbus_hp, mob: 'Jawbus' }, 
    { condition: Settings.thunder_hp, mob: 'Thunder' }
];


////////////////////////////////////////////////////////////////////////////////
// FUNCTIONS
////////////////////////////////////////////////////////////////////////////////
function distCheck(entity, player, maxDistance) {
    return entity.distanceTo(player) < maxDistance;
}

register('command', () => {
    Settings.master_displayHP = true;
    Settings.vanq_hp = true;
    Settings.mythosMobHP = true;
    Settings.rein_hp = true;
    Settings.yeti_hp = true;
    Settings.jawbus_hp = true;
    Settings.thunder_hp = true;
    Settings.gwshark_hp = true;
    Settings.carrotking_hp = true;
    Settings.waterhydra_hp = true;
    Settings.sea_emp_hp = true;
    Settings.reaper_hp = true;
    Settings.phantom_fisher_hp = true;
}).setName('toggleAllDisplayHP');

////////////////////////////////////////////////////////////////////////////////
// SETUP LIST OF TOGGLED MOBS FOR HP
////////////////////////////////////////////////////////////////////////////////
register('step', timeThis("registerStep pushing settings for specifiedMobs", () => {
    if (!getInSkyblock() || !World.isLoaded() || !Settings.master_displayHP) return;
    // mobSettings = [];
    specifiedMobs = []; // init empty list to remove duplicates
    
    if (Settings.toggle_debug) {
        mobSettings.push(
            { condition: true, mobs: ['Magma Slug', 'Pyroclastic Worm', 'Moogma', 'Lava Leech', 'Fire Eel', 'Lava Flame', 'Taurus'] }
        );
    }

    if (Settings.mythos_hp) {
        mobSettings.push(
            { condition: true, mobs: ['Exalted Minos Hunter', 'Bagheera', 'Exalted Minotaur', 'Exalted Gaia Construct', 'Exalted Minos Champion', 'Exalted Minos Inquisitor'] }
        );
    }

    mobSettings.forEach(({ condition, mob, mobs }) => {
        if (condition) specifiedMobs.push(...(mobs || [mob]));
    });
})).setFps(1);


register('step', timeThis("registerStep update mobInfos", () => {
    if (!getInSkyblock() || !World.isLoaded()) return;
    mobInfos = World.getAllEntitiesOfType(entityArmorStand)
        .filter(mobEntity => distCheck(mobEntity, Player.getPlayer(), 31))
        .map((mobEntity) => {
            const entityName = mobEntity.getName().removeFormatting();
            inLSRange = checkLSRange(mobEntity) < 31;
            const inRangeText = inLSRange ? '&a✓' : '&c✖';
            if (entityName.includes('Jawbus')) {
                const jawbusRegex = /﴾ \[Lv600] Lord Jawbus (.+)[?Mk]\/100M❤ ﴿/
                const matchJawbus = entityName.match(jawbusRegex);
                if (matchJawbus) return `${mobEntity.getName()} &r-- [${inRangeText}&r]`;

            } else if (entityName.includes('Thunder')) {
                const thunderRegex = /﴾ \[Lv400] Thunder (.+)[?Mk]\/35M❤ ﴿/;
                const matchThunder = entityName.match(thunderRegex);
                if (matchThunder) return `${mobEntity.getName()} &r-- [${inRangeText}&r]`;

            } else {
                const allowedMobPatterns = specifiedMobs.join('|');
                const mobRegex = new RegExp(`\\[Lv\\d+\\] (aCorrupted\\s?)?(${allowedMobPatterns})(a)? (\\d+(\\.\\d*)?[kM]?)\\/(\\d+(\\.\\d+)?[kM]?)❤`);
                const matchMobPattern = entityName.match(mobRegex);
                if (matchMobPattern) return `${mobEntity.getName()} &r-- [${inRangeText}&r]`;
            }
        })
        .filter(Boolean); // Remove undefined entries

    hpDisplayText = mobInfos.join('\n');
})).setFps(5);

register('dragged', timeThis("registerDragged moveHpDisplay", (dx, dy, x, y) => {
    if (!getInSkyblock() || !World.isLoaded()) return;
    if (moveHpDisplay.isOpen()) {
        displayHPCounter.x = constrainX(x, 3, hpDraggable);
        displayHPCounter.y = constrainY(y, 3, hpDraggable);
    };
    displayHPCounter.save();
}));

registerWhen('renderOverlay', timeThis("renderOverlay displayHPText", () => {
    Renderer.drawStringWithShadow(hpDisplayText, displayHPCounter.x, displayHPCounter.y);
}), () => Settings.master_displayHP && getInSkyblock() && World.isLoaded());

registerWhen('renderOverlay', timeThis("renderOverlay displayHPText draggable", () => {
    renderGuiPosition(moveHpDisplay, displayHPCounter, hpDraggable);
}), () => Settings.master_displayHP && getInSkyblock() && World.isLoaded());

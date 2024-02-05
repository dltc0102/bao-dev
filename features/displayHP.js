import Settings from '../settings.js';
import PogObject from 'PogData';

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

// pogObject
export const baoDisplayHP = new PogObject("bao-dev", {
    "inLSRange": false,
    "specifiedMobs": [],
    "mobInfos": [],
    "displayText": '',
    "draggableText": '[Lv000] SomeMobName 10M/10M ❤ -- [✖]',
    "x": 400,
    "y": 40,
}, '/data/baoDisplayHP.json');
baoDisplayHP.autosave(5);

////////////////////////////////////////////////////////////////////////////////
// SETUP LIST OF TOGGLED MOBS FOR HP
////////////////////////////////////////////////////////////////////////////////
register('tick', () => {
    if (Settings.master_displayHP) {
        baoDisplayHP.specifiedMobs = []; // init empty list to remove duplicates
        const mobSettings = [
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
        ];
    
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
            if (condition) {
                baoDisplayHP.specifiedMobs.push(...(mobs || [mob]));
            }
        });
    
        baoDisplayHP.save();
    }
});


function distCheck(entity, player, maxDistance) {
    return entity.distanceTo(player) < maxDistance;
}

register('step', () => {
    if (!getInSkyblock() || !World.isLoaded()) return;

    baoDisplayHP.mobInfos = World.getAllEntitiesOfType(entityArmorStand)
        .filter(mobEntity => distCheck(mobEntity, Player.getPlayer(), 31))
        .map((mobEntity) => {
            const entityName = mobEntity.getName().removeFormatting();
            baoDisplayHP.inLSRange = checkLSRange(mobEntity) < 31;

            const allowedMobPatterns = baoDisplayHP.specifiedMobs.join('|');
            const mobRegex = new RegExp(`\\[Lv\\d+\\] (aCorrupted\\s?)?(${allowedMobPatterns})(a)? (\\d+(\\.\\d*)?[kM]?)\\/(\\d+(\\.\\d+)?[kM]?)❤`);
            const matchMobPattern = entityName.match(mobRegex);

            if (matchMobPattern) {
                const inRangeText = baoDisplayHP.inLSRange ? '&a✓' : '&c✖';
                return `${mobEntity.getName()} &r-- [${inRangeText}&r]`;
            }
        })
        .filter(Boolean); // Remove undefined entries

    baoDisplayHP.displayText = baoDisplayHP.mobInfos.join('\n');
    baoDisplayHP.save();
}).setFps(10);

register('dragged', (dx, dy, x, y) => {
    if (!getInSkyblock() || !World.isLoaded()) return;
    if (moveHpDisplay.isOpen()) {
        baoDisplayHP.x = constrainX(x, 3, baoDisplayHP.draggableText);
        baoDisplayHP.y = constrainY(y, 3, baoDisplayHP.draggableText);
    };
    baoDisplayHP.save();
})

register('renderOverlay', () => {
    if (!getInSkyblock() || !World.isLoaded()) return;
    if (Settings.master_displayHP) {
        Renderer.drawStringWithShadow(baoDisplayHP.displayText, baoDisplayHP.x, baoDisplayHP.y);
    }
    renderGuiPosition(moveHpDisplay, baoDisplayHP, baoDisplayHP.draggableText);
    baoDisplayHP.save();
});

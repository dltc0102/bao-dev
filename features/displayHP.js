import Settings from '../settings.js';
import PogObject from 'PogData';

import { checkLSRange, constrainX, constrainY, createGuiCommand, renderGuiPosition } from '../utils/functions.js';
import { getInSkyblock } from '../utils/functions.js'; // sb, area
import { baoUtils } from '../utils/utils.js';

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
    "draggableText": '[Lv000] SomeMobMonster 10M/10M ❤ -- [✖]',
    "x": 400,
    "y": 40,
}, '/data/baoDisplayHP.json');
baoDisplayHP.autosave(5);


if (Settings.master_displayHP) {
    // baoDisplayHP.specifiedMobs = ['Magma Slug', 'Pyroclastic Worm', 'Moogma', 'Lava Leech', 'Fire Eel', 'Lava Flame'];
    if (Settings.vanq_hp) baoDisplayHP.specifiedMobs.push('Vanquisher');
    if (Settings.rein_hp) baoDisplayHP.specifiedMobs.push('Reindrake');
    if (Settings.yeti_hp) baoDisplayHP.specifiedMobs.push('Yeti');
    if (Settings.gwshark_hp) baoDisplayHP.specifiedMobs.push('Great White Shark');
    if (Settings.carrotking_hp) baoDisplayHP.specifiedMobs.push('Carrot King');
    if (Settings.waterhydra_hp) baoDisplayHP.specifiedMobs.push('Water Hydra');
    if (Settings.sea_emp_hp) baoDisplayHP.specifiedMobs.push('Sea Emperor');
    if (Settings.reaper_hp) baoDisplayHP.specifiedMobs.push('Grim Reaper');
    if (Settings.phantom_fisher_hp) baoDisplayHP.specifiedMobs.push('Phantom Fisher');
    if (Settings.mythosMobHP) {
        baoDisplayHP.specifiedMobs.push('Exalted Minos Hunter');
        baoDisplayHP.specifiedMobs.push('Bagheera'); 
        baoDisplayHP.specifiedMobs.push('Exalted Minotaur');
        baoDisplayHP.specifiedMobs.push('Exalted Gaia Construct');
        baoDisplayHP.specifiedMobs.push('Exalted Minos Champion');
        baoDisplayHP.specifiedMobs.push('Exalted Minos Inquisitor');
    }
    baoDisplayHP.save();
}

register('step', () => {
    if (!getInSkyblock() || !World.isLoaded()) return;

    baoDisplayHP.mobInfos = [];
    nearbyMobs = World.getAllEntitiesOfType(entityArmorStand)
        .filter(dist => dist.distanceTo(Player.getPlayer()) < 31)
        .filter(mobEntity => {
            let entityName = mobEntity.getName().removeFormatting();
            baoDisplayHP.inLSRange = checkLSRange(mobEntity) < 31; // returns dist

            let allowedMobPatterns = baoDisplayHP.specifiedMobs.join('|');
            let mobRegex = new RegExp(`\\[Lv\\d+\\] (aCorrupted\\s?)?(${allowedMobPatterns})(a)? (\\d+(\\.\\d*)?[kM]?)\\/(\\d+(\\.\\d+)?[kM]?)❤`);
            let matchMobPattern = entityName.match(mobRegex);
            
            if (matchMobPattern) {
                inRangeText = baoDisplayHP.inLSRange ? '&a✓' : '&c✖'
                displayedHP = `${mobEntity.getName()} &r-- [${inRangeText}&r]` 
                baoDisplayHP.mobInfos.push(displayedHP); 
            }
        })
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
    if (!Settings.master_displayHP) return;
    Renderer.drawStringWithShadow(baoDisplayHP.displayText, baoDisplayHP.x, baoDisplayHP.y);
    renderGuiPosition(moveHpDisplay, baoDisplayHP, baoDisplayHP.draggableText);
    baoDisplayHP.save();
});

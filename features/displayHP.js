import Settings from '../settings.js';
import { data } from '../utils/data.js';
import { checkLSRange, constrainX, constrainY, createGuiCommand, renderGuiPosition } from '../utils/functions.js';

if (Settings.master_displayHP) {
    // data.hpDisplayInfo.specifiedMobs = ['Magma Slug', 'Pyroclastic Worm', 'Moogma', 'Lava Leech', 'Fire Eel'];
    if (Settings.vanq_hp) data.hpDisplayInfo.specifiedMobs.push('Vanquisher');
    if (Settings.inq_hp) data.hpDisplayInfo.specifiedMobs.push('Exalted Minos Inquisitor');
    if (Settings.champ_hp) data.hpDisplayInfo.specifiedMobs.push('Exalted Minos Champion');
    if (Settings.rein_hp) data.hpDisplayInfo.specifiedMobs.push('Reindrake');
    if (Settings.yeti_hp) data.hpDisplayInfo.specifiedMobs.push('Yeti');
    if (Settings.gwshark_hp) data.hpDisplayInfo.specifiedMobs.push('Great White Shark');
    if (Settings.carrotking_hp) data.hpDisplayInfo.specifiedMobs.push('Carrot King');
    if (Settings.waterhydra_hp) data.hpDisplayInfo.specifiedMobs.push('Water Hydra');
    if (Settings.sea_emp_hp) data.hpDisplayInfo.specifiedMobs.push('Sea Emperor');
    if (Settings.reaper_hp) data.hpDisplayInfo.specifiedMobs.push('Grim Reaper');
    if (Settings.phantom_fisher_hp) data.hpDisplayInfo.specifiedMobs.push('Phantom Fisher');
}

data.hpDisplayInfo.moveHpDisplay = new Gui(); // display hp of mobs
createGuiCommand(data.hpDisplayInfo.moveHpDisplay, 'movehp', 'mhp')

register('step', () => {
    data.hpDisplayInfo.mobInfos = [];
    nearbyMobs = World.getAllEntitiesOfType(data.entities.entityArmorStand)
        .filter(dist => dist.distanceTo(Player.getPlayer()) < 31)
        .filter(mobEntity => {
            let entityName = mobEntity.getName().removeFormatting();
            data.hpDisplayInfo.inLSRange = checkLSRange(mobEntity) < 31; // returns dist

            let allowedMobPatterns = data.hpDisplayInfo.specifiedMobs.join('|');
            let mobRegex = new RegExp(`\\[Lv\\d+\\] (aCorrupted\\s?)?(${allowedMobPatterns})(a)? (\\d+(\\.\\d*)?[kM]?)\\/(\\d+(\\.\\d+)?[kM]?)❤`);
            let matchMobPattern = entityName.match(mobRegex);
            
            if (matchMobPattern) {
                inRangeText = data.hpDisplayInfo.inLSRange ? '&a✓' : '&c✖'
                displayedHP = `${mobEntity.getName()} &r-- [${inRangeText}&r]` 
                data.hpDisplayInfo.mobInfos.push(displayedHP); 
            }
        })
    data.hpDisplayInfo.displayText = data.hpDisplayInfo.mobInfos.join('\n')
}).setFps(10);

register('dragged', (dx, dy, x, y) => {
    if (!data.inSkyblock) return;
    if (data.hpDisplayInfo.moveHpDisplay.isOpen()) {
        data.HPCount.x = constrainX(x, 3, data.hpDisplayInfo.displayText);
        data.HPCount.y = constrainY(y, 3, data.hpDisplayInfo.displayText);
    }
})

register('renderOverlay', () => {
    if (!World.isLoaded()) return;
    if (!data.inSkyblock) return;
    if (!Settings.master_displayHP) return;
    Renderer.drawString(data.hpDisplayInfo.displayText, data.HPCount.x, data.HPCount.y);
    renderGuiPosition(data.hpDisplayInfo.moveHpDisplay, data.HPCount, '[Lv000] SomeMobMonster 10M/10M ❤ -- [✖]')
});



import Settings from '../settings.js'
import { data } from '../utils/data.js'
import { checkLSRange } from '../utils/functions.js'
import { createGuiCommand, renderGuiPosition } from '../utils/functions.js'
let EntityArmorStand = Java.type("net.minecraft.entity.item.EntityArmorStand");

let specifiedMobs = [];

if (Settings.master_displayHP) {
    if (Settings.vanq_hp) specifiedMobs.push('Vanquisher');
    if (Settings.inq_hp) specifiedMobs.push('Exalted Minos Inquisitor');
    if (Settings.champ_hp) specifiedMobs.push('Exalted Minos Champion');
    if (Settings.rein_hp) specifiedMobs.push('Reindrake');
    if (Settings.yeti_hp) specifiedMobs.push('Yeti');
    if (Settings.gwshark_hp) specifiedMobs.push('Great White Shark');
    if (Settings.carrotking_hp) specifiedMobs.push('Carrot King');
    if (Settings.waterhydra_hp) specifiedMobs.push('Water Hydra');
    if (Settings.sea_emp_hp) specifiedMobs.push('Sea Emperor');
    if (Settings.reaper_hp) specifiedMobs.push('Grim Reaper');
    if (Settings.phantom_fisher_hp) specifiedMobs.push('Phantom Fisher');
}

// Gui Stuff
var movehp = new Gui(); // display hp of mobs
createGuiCommand(movehp, 'movehp', 'mhp')

let mobInfos = [];
let inEntityLSRange = false;
let displayMobInfos = '';

register('dragged', (dx, dy, x, y) => {
    if (!data.inSkyblock) return;
    if (movehp.isOpen()) {
        data.HPCount.x = x;
        data.HPCount.y = y;
    }
})

register('step', () => {
    mobInfos = [];
    nearbyMobs = World.getAllEntitiesOfType(EntityArmorStand)
        .filter(dist => dist.distanceTo(Player.getPlayer()) < 61)
        .filter(mobEntity => {
            let entityName = mobEntity.getName().removeFormatting();
            inEntityLSRange = checkLSRange(mobEntity) < 31; // returns dist

            let allowedMobPatterns = specifiedMobs.join('|');
            let regexPattern = '\\[Lv\\d+\\] (' + allowedMobPatterns + ') (\\d+(\\.\\d*)?[kM]?)\\/(\\d+(\\.\\d+)?[kM]?)❤';
            let matchMobPattern = entityName.match(regexPattern);
            
            if (matchMobPattern) {
                inRangeText = inEntityLSRange ? '&a✓' : '&c✖'
                displayedHP = `${mobEntity.getName()} &r-- [${inRangeText}&r]` 
                mobInfos.push(displayedHP); 
            }
        })
    displayMobInfos = mobInfos.join('\n')
}).setFps(10);

register('renderOverlay', () => {
    if (!World.isLoaded()) return;
    if (!data.inSkyblock) return;
    if (!Settings.master_displayHP) return;
    Renderer.drawString(displayMobInfos, data.HPCount.x, data.HPCount.y);
    renderGuiPosition(movehp, data.HPCount, '[Lv000] SomeMobMonster 10M/10M ❤ -- [✖]')
});

// debug
// register('command', () => {
//     ChatLib.chat(`master display hp toggle is: ${Settings.master_displayHP ? "ON": "OFF"}`)
// }).setName('checkhp');

// register('command', () => {
//     console.log(`Mobs to Detect: ${specifiedMobs}`)
// }).setName('listmobs');



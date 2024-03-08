import Settings from '../config1/settings.js';
import PogObject from 'PogData';

import { baoUtils, registerWhen, timeThis } from '../utils/utils.js';
import { checkLSRange, getHealth } from '../utils/functions.js';
import { createGuiCommand, renderGuiPosition } from '../utils/functions.js'; // gui
import { constrainX, constrainY } from '../utils/functions.js' // padding
import { getInSkyblock, getInCI } from '../utils/functions.js'; // sb, area

////////////////////////////////////////////////////////////////////////////////
// SETUP CONSTS
////////////////////////////////////////////////////////////////////////////////
const entityArmorStand = Java.type("net.minecraft.entity.item.EntityArmorStand");

const moveHpDisplay = new Gui(); // display hp of mobs
createGuiCommand(moveHpDisplay, 'movehp', 'mhp');
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
let specifiedMobs = [];
register('step', timeThis("registerStep pushing settings for specifiedMobs", () => {
    if (!getInSkyblock() || !World.isLoaded() || !Settings.master_displayHP) return;
    // mobSettings = [];
    specifiedMobs = []; // init empty list to remove duplicates
    
    mobSettings.push(
        { condition: true, mobs: ['Bladesoul', 'Mage Outlaw', 'Barbarian Duke X', 'Ashfang'] }
    );


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


let hpDisplayText = '';
register('step', timeThis("registerStep update mobInfos", () => {
    if (!getInSkyblock() || !World.isLoaded()) return;
    let mobInfos = World.getAllEntitiesOfType(entityArmorStand)
        .filter(mobEntity => distCheck(mobEntity, Player.getPlayer(), 31))
        .map((mobEntity) => {
            const entityName = mobEntity.getName().removeFormatting();
            let inLSRange = checkLSRange(mobEntity) < 31;
            const inRangeText = inLSRange ? '&a✓' : '&c✖';
            if (entityName.includes('Jawbus')) {
                const jawbusRegex = /﴾ \[Lv600] Lord Jawbus (.+)[?Mk]\/100M❤ ﴿/
                const matchJawbus = entityName.match(jawbusRegex);
                if (matchJawbus) return `${mobEntity.getName()} &r-- [${inRangeText}&r]`;

            } else if (entityName.includes('Thunder')) {
                const thunderRegex = /﴾ \[Lv400] Thunder (.+)[?Mk]\/35M❤ ﴿/;
                const matchThunder = entityName.match(thunderRegex);
                if (matchThunder) return `${mobEntity.getName()} &r-- [${inRangeText}&r]`;

            } else if (entityName.includes('Bladesoul')) {
                const bladesoulRegex = /﴾ \[Lv200] Bladesoul (.+)[?Mk]\/62M❤ ﴿/;
                const matchBladesoul = entityName.match(bladesoulRegex);
                if (matchBladesoul) return `${mobEntity.getName()} &r-- [${inRangeText}&r]`;

            } else if (entityName.includes('Mage Outlaw')) {
                const outlawRegex = /﴾ \[Lv200] .+Mage Outlaw.+ (.+)[?Mk]\/70M❤ ﴿/;
                const matchOutlaw = entityName.match(outlawRegex);
                if (matchOutlaw) return `${mobEntity.getName()} &r-- [${inRangeText}&r]`;

            } else if (entityName.includes('Barbarian Duke X')) {
                const barbXRegex = /﴾ \[Lv200] Barbarian Duke X (.+)[?Mk]\/70M❤ ﴿/;
                const matchBarbX = entityName.match(barbXRegex);
                if (matchBarbX) return `${mobEntity.getName()} &r-- [${inRangeText}&r]`;

            } else if (entityName.includes('Ashfang')) {
                const ashfangRegex = /﴾ \[Lv200] Ashfang§r (.+)[?Mk]\/50M❤ ﴿/;
                const matchAshfang = entityName.match(ashfangRegex);
                if (matchAshfang) return `${mobEntity.getName()} &r-- [${inRangeText}&r]`;

            } else {
                const allowedMobPatterns = specifiedMobs.join('|');
                const mobRegex = new RegExp(`\\[Lv\\d+] (aCorrupted\\s?)?(${allowedMobPatterns})(a)? (\\d+(\\.\\d*)?[kM])/(\\d+(\\.\\d+)?[kM])❤`);
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
    // for item in hpDisplayLines, if idx is even, text is idx-1
    Renderer.drawStringWithShadow(hpDisplayText, displayHPCounter.x, displayHPCounter.y);
}), () => Settings.master_displayHP && getInSkyblock() && World.isLoaded());

registerWhen('renderOverlay', timeThis("renderOverlay displayHPText draggable", () => {
    renderGuiPosition(moveHpDisplay, displayHPCounter, hpDraggable);
}), () => Settings.master_displayHP && getInSkyblock() && World.isLoaded());



// function getHpPx(currhp, maxhp, length) {
//     return (currhp / maxhp) * length;
// }

// function drawHPBar(x, y, currhp, maxhp, type) {
//     let currentHP = getHealth(currhp);
//     let totalHP = getHealth(maxhp);
//     let maxLength = Renderer.screen.getWidth() / 6;
    
//     let currLength = getHpPx(currentHP, totalHP, maxLength);
    
//     const levelName = '&7[Lv600]&r';
//     const mobName = '&c&lLord Jawbus&r';
//     const inLSRange = '&f[&a✓&f]&r';
//     // const mobName = '&b&lThunder&r'
//     const numFollowers = 2;
//     const displayName = `${levelName} ${mobName}`;
//     const heartIcon = '&c❤&r';
//     let hpText = `${currhp}/${maxhp}${heartIcon}`;
//     let displayString = `&7[Lv600] &c&lLord Jawbus &r&f${currhp}/${maxhp}&c❤`;
//     // let displayString = `&7[Lv600] &b&lThunder&r &f${currhp}/${maxhp}&c❤`;
//     let stringW = Renderer.getStringWidth(displayString);
//     x = Renderer.screen.getWidth()/2 - maxLength/2;
    
//     let hpW = Renderer.getStringWidth(hpText);
//     const mobNameW = Renderer.getStringWidth(mobName);
//     const displayNameW = Renderer.getStringWidth(displayName);
//     let hpNameText = `${mobName} ${hpText}`;
//     let hpNameW = Renderer.getStringWidth(hpNameText);

//     if (type > 7) type = 0;
//     if (type === 0) {
//         let lsDisplayString = `${displayString} -- ${inLSRange}`;
//         Renderer.drawStringWithShadow(lsDisplayString, x, y);
//     }
//     if (type !== 0 && type < 4) {
//         Renderer.drawRect(Renderer.DARK_GRAY, x, y, maxLength, 5);
//         Renderer.drawRect(Renderer.DARK_GREEN, x, y, currLength, 5);
        
//         if (type === 1) {
//             let lsDisplayString = `${displayString} -- ${inLSRange}`;
//             let displayW = Renderer.getStringWidth(lsDisplayString);
//             Renderer.drawStringWithShadow(lsDisplayString, x+(maxLength/2)-(displayW/2), y-10);
//         }
//         if (type === 2) {
//             let mobLSText = `${mobName} -- ${inLSRange}`;
//             let mobLSW = Renderer.getStringWidth(mobLSText);
//             Renderer.drawStringWithShadow(hpText, x-hpW-3, y-1.5); // hp on the side of the bar
//             Renderer.drawStringWithShadow(mobLSText, x+(maxLength/2)-(mobLSW/2), y-10); // name on top of bar
//         }
//         if (type === 3) {
//             let hpLSText = `${hpText} -- ${inLSRange}`;
//             let hpLSTextW = Renderer.getStringWidth(hpLSText);
//             Renderer.drawStringWithShadow(mobName, x-(mobNameW*1.12), y-2); // name on the side of the bar
//             Renderer.drawStringWithShadow(hpLSText, x+(maxLength/2)-(hpLSTextW/2), y-10); // hp on top of bar
//         }
//         if (mobName.includes('Jawbus')) {
//             let barPad = 3; // pixels
//             let followerLength = (maxLength/numFollowers) - (barPad*(numFollowers - 1));
//             for (let idx = 0; idx < numFollowers; idx++) {
//                 let followerX = x + (idx * barPad) + (followerLength * idx);
//                 Renderer.drawRect(Renderer.RED, followerX, y+10, followerLength, 3);
//             }
//         }
//     }
//     if (type > 3 && type < 7) {
//         Renderer.drawRect(Renderer.DARK_GRAY, x, y, maxLength, 10);
//         Renderer.drawRect(Renderer.DARK_GREEN, x, y, currLength, 10);
        
//         let mobLSText = `${mobName} ${inLSRange}`;
//         let mobLSTextW = Renderer.getStringWidth(mobLSText);
//         Renderer.drawStringWithShadow(mobLSText, x+(maxLength/2)-(mobLSTextW/2), y-10);
        
//         if (type === 4) {
//             Renderer.drawStringWithShadow(hpText, x+3, y+1); // inline left
//         }
//         if (type === 5) {
//             Renderer.drawStringWithShadow(hpText, x+(maxLength/2)-(hpW/2), y+1); // inline center
//         }
//         if (type === 6) { 
//             Renderer.drawStringWithShadow(hpText, x+maxLength-hpW-3, y+1); // inline right
//         }
//         if (mobName.includes('Jawbus')) {
//             let barPad = 3;
//             let followerLength = maxLength/numFollowers - (barPad*(numFollowers - 1));
//             for (let idx = 0; idx < numFollowers; idx++) {
//                 let followerX = x + (idx * barPad) + (followerLength * idx);
//                 Renderer.drawRect(Renderer.RED, followerX, y+13, followerLength, 3);
//             }
//         }
//         // if (type === 0) Renderer.drawStringWithShadow(displayString, x+(maxLength/2)-(stringW/2), y-10); // top center of bar
//         // if (type === 1) Renderer.drawStringWithShadow(displayString, x+3, y+1); // inline left of bar
//         // if (type === 2) Renderer.drawStringWithShadow(displayString, x+(maxLength/2)-(stringW/2), y+1); // inline center of bar
//         // if (type === 3) Renderer.drawStringWithShadow(displayString, x+maxLength-stringW-3, y+1); // inline right of bar
//         // if (type === 4) Renderer.drawStringWithShadow(displayString, x+3, y-10);// top left of bar
//         // if (type === 5) Renderer.drawStringWithShadow(displayString, x+maxLength-stringW-3, y-10); // top right of bar
//         // if (type === 6) Renderer.drawStringWithShadow(displayString, x-stringW-3, y-1.5); // left side of bar
//     }
//     if (type > 6) {
//         Renderer.drawRect(Renderer.DARK_GRAY, x, y, maxLength, 10);
//         Renderer.drawRect(Renderer.DARK_GREEN, x, y, currLength, 10);
//         if (type === 7) {
//             let lsW = Renderer.getStringWidth(inLSRange);
//             Renderer.drawStringWithShadow(hpNameText, x+(maxLength/2)-(hpNameW/2), y-2.5); // inline center
//             Renderer.drawStringWithShadow(inLSRange, x+maxLength+(lsW/2), y-2.5)
//         }
//         if (mobName.includes('Jawbus')) {
//             let barPad = 3;
//             let followerLength = maxLength/numFollowers - (barPad*(numFollowers - 1));
//             for (let idx = 0; idx < numFollowers; idx++) {
//                 let followerX = x + (idx * barPad) + (followerLength * idx);
//                 Renderer.drawRect(Renderer.RED, followerX, y+13, followerLength, 3);
//             }
//         }
        
//     }
// }
// // draw hp bar
// let showBar = false;
// register('command', () => {
//     if (showBar) {
//         showBar = false;
//         ChatLib.chat(`${baoUtils.modPrefix} showBar: &cOFF`);
//     } else if (!showBar) {
//         showBar = true;
//         ChatLib.chat(`${baoUtils.modPrefix} showBar: &aON`);
//     }
// }).setName('showbar');

// let currhp = '4.5M';
// let maxhp = '5M';
// let barType = 0;
// register('command', (...args) => {
//     currhp = args[0];
//     maxhp = args[1];
// }).setName('setbar');

// register('command', (...args) => {
//     barType = parseInt(args);
// }).setName('setbartype');

// let displayBarInfo = {
//     'x': 0, 
//     'y': 30,
// }
// const numMobs = 2;
// let mobOne = {
//     level: '&7[Lv600]&r',
//     name: '&c&lLord Jawbus&r',
//     ls: '&f[&a✓&f]&r',
//     currhp: '67M',
//     totalhp: '100M',
//     fullText: '&7[Lv600]&r &c&lLord Jawbus&r &f67M/100M&r&c❤&r',
// };

// let mobTwo = {
//     level: '&7[Lv400]&r',
//     name: '&b&lThunder&r',
//     ls: '&f[&a✓&f]&r',
//     currhp: '28.7M',
//     totalhp: '35M',
//     fullText: '&7[Lv400]&r &b&lThunder&r &f28.7M/35M&r&c❤&r',
// };


// let barInfos = [mobOne, mobTwo]
// registerWhen('renderOverlay', timeThis('registerOverlay - experimental - show hp bar', () => {
//     for (let idx = 0; idx < numMobs; idx++) {
//         drawHPBar(displayBarInfo, barInfos[idx]);
//     }
//     drawHPBar(200, 50, currhp, maxhp, barType);
//     drawHPBar(200, 80, currhp, maxhp, barType);
// }), () => showBar && getInCI() && getInSkyblock() && World.isLoaded());

// // register('gameLoad', () => { 
// //     ChatLib.command('baoeverything', true)
// //     // ChatLib.command('showbar', true)
// // });
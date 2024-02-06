import Settings from '../settings.js';
import Audio from '../utils/audio.js';
import PogObject from 'PogData';

import { sendMessage } from '../utils/party.js';
import { baoUtils, dungeonClasses } from '../utils/utils.js';
import { debug, showAlert } from '../utils/utils.js';
import { createGuiCommand, renderGuiPosition } from '../utils/functions.js'; // gui
import { constrainX, constrainY } from '../utils/functions.js' // padding
import { getInSkyblock } from '../utils/functions.js';
import { getInDungeon, getInDHub } from '../utils/functions.js';
import { romanToNumeral } from '../utils/functions.js';

////////////////////////////////////////////////////////////////////////////////
// SETUP CONSTS
////////////////////////////////////////////////////////////////////////////////
const dungeonAudio = new Audio();
const movesecretcounter = new Gui();
createGuiCommand(movesecretcounter, 'movesecretcounter', 'msc');
const secretCounterDraggable = `&7Runs: 0 | Secrets: 0 | Avg: 0/run`;

const moveblessingscounter = new Gui();
createGuiCommand(moveblessingscounter, 'moveblessingscounter', 'mbless');

const typesOfBlessings = ['wisdom', 'power', 'life', 'stone', 'time'];

// pogObject
export const baoDungeons = new PogObject("bao-dev", {
    "sentMelody": false, 
    "deathStats": 0, 
    "secretStats": 0, 
    "totalSecretStats": 0,
    "numRunsStats": 0, 
    "secretOverviewText": '',
    "secretCounter": {
        "x": 400, // arbituary random number, replaced by padding function 
        "y": 40,
    }, 
    "blessings": {
        "wisdom": 0, 
        "power": 0, 
        "life": 0, 
        "stone": 0, 
        "time": 0,
        "text": '',
        "draggable": '',
        "x": 400, 
        "y": 400,
    }, 
}, '/data/baoDungeons.json');
baoDungeons.autosave(5);

// take out extraStatsFlag from pogobject
function getPower() {
    return baoDungeons.blessings.power;
}

function getTime() {
    return baoDungeons.blessings.time;
}

function getTruePower() {
    if (getTime() === 0) return;
    return getPower() + (getTime() / 2);
}

// drag priorities
function getPlayerClass() {
    if (!getInDungeon()) return;
    let tabInfo = TabList.getNames();
    for (let i = 0; i < tabInfo.length; i++) {
        let tabName = tabInfo[i].removeFormatting();
        // console.log(tabName)
        let playerRegex = /\[\d+\] (\w+)\s?(\S+)? \(([^)]+) .+\)/;
        let tabLineMatch = tabName.match(playerRegex);
        if (tabLineMatch && tabLineMatch[1].includes(Player.getName())) {
            return tabLineMatch[3].trim();
        }
    }
}

////////////////////////////////////////////////////////////////////////////////
// MELODY DETECTOR 
////////////////////////////////////////////////////////////////////////////////
register('guiOpened', () => {
    if (!getInSkyblock() || !World.isLoaded()) return;
    if (!getInDungeon()) return;
    if (!Settings.alert_melody) return;
    if (baoDungeons.sentMelody) return;
    setTimeout(() => {
        if (Player.getContainer().getName() === 'Click the button on time!') {
            sendMessage('melody');  
            baoDungeons.sentMelody = true;
            debug(`sentMelody:  ${baoDungeons.sentMelody}`);
        }
    }, 1);
    baoDungeons.save();
})

register('chat', (playerName, curr, total, event) => {
    if (!getInDungeon()) return;
    if (playerName !== Player.getName()) return;
    baoDungeons.sentMelody = false;
    baoDungeons.save();
    debug(`baoDungeons.sentMelody:  ${baoDungeons.sentMelody}`);
}).setCriteria('${playerName} activated a terminal! (${curr}/${total})');

// gameload
register('gameLoad', () => {
    baoDungeons.sentMelody = false;
    baoDungeons.save();
    debug(`baoDungeons.sentMelody:  ${baoDungeons.sentMelody}`);
});


////////////////////////////////////////////////////////////////////////////////
// Secrets - Per Run - Counter for Average Secrets Per Session
////////////////////////////////////////////////////////////////////////////////
let extraStatsFlag = false;
register('chat', (event) => {
    if (!getInDungeon()) return;
    if (extraStatsFlag) return;

    baoDungeons.numRunStats += 1;
    setTimeout(() => {
        ChatLib.command('showextrastats');
        extraStatsFlag = true;
    }, 1000);
    baoDungeons.save();

    debug(`numRunStats: ${baoDungeons.numRunStats} | extraStatsFlag: ${extraStatsFlag}`);
}).setCriteria('> EXTRA STATS <').setContains();

register('chat', (playerDeaths, event) => {
    if (!getInDungeon()) return;
    baoDungeons.deathStats += Number(playerDeaths);
    baoDungeons.save();

    debug(`deathStats: ${baoDungeons.deathStats} | ${typeof baoDungeons.deathStats}`);
}).setCriteria('Deaths: ${playerDeaths}').setContains();

register('chat', (secretCount, event) => {
    if (!getInDungeon()) return;
    baoDungeons.secretStats += Number(secretCount);
    baoDungeons.totalSecretStats += Number(secretCount);
    baoDungeons.save();
    
    debug(typeof Number(secretCount));
    debug(`secretStats: ${baoDungeons.secretStats} | ${typeof baoDungeons.secretStats}`);
}).setCriteria('Secrets Found: ${secretCount}').setContains();

register('chat', (cataType, floor, event) => {
    if (!getInDungeon()) return;
    baoDungeons.numRunsStats += 1;
    setTimeout(() => {
        ChatLib.chat(`${baoUtils.modPrefix} &3${Player.getName()} &7Secrets: &b${baoDungeons.secretStats}&7, Deaths: &b${baoDungeons.deathStats}`)
    }, 1000)
    baoDungeons.save();
}).setCriteria('${cataType} Catacombs - Floor ${floor} Stats').setContains();

register('chat', (leader, catacombType, floorNum, event) => {
    // ChatLib.chat('criteria received.')
    baoDungeons.deathStats = 0;
    baoDungeons.secretStats = 0;
    extraStatsFlag = false;
    baoDungeons.powerLvl = 0;
    baoDungeons.save();
}).setCriteria('${leader} entered ${catacombType} Catacombs, Floor ${floorNum}!').setContains();

register('chat', (event) => {
    if (!getInSkyblock() || !World.isLoaded()) return;
    baoDungeons.blessings.wisdom = 0;
    baoDungeons.blessings.power = 0;
    baoDungeons.blessings.life = 0;
    baoDungeons.blessings.stone = 0;
    baoDungeons.blessings.time = 0;

    baoDungeons.save();
}).setCriteria(/.+ is now ready!/);

// reset secret counter command
register('command', () => {
    baoDungeons.deathStats = 0;
    baoDungeons.totalSecretStats = 0;
    baoDungeons.numRunsStats = 0;
    baoDungeons.save();
}).setName('resetsecretcounter');

// party finder shortener
register('chat', (message, event) => {
    if (Settings.betterPFMessages) {
        cancel(event);
        ChatLib.chat(`&d&lPF &r> &a${message}`)
    }
}).setCriteria('Party Finder > ${message}');

// professor m3 fire freeze
register('chat', (event) => {
    if (!getInDungeon()) return;
    setTimeout(() => {
        dungeonAudio.playDefaultSound();
        ChatLib.chat(`${baoUtils.modPrefix} &c&lFIRE FREEZE NOW`)
        showAlert('&c&lFIRE FREEZE');
    }, 5000)
}).setCriteria("[BOSS] The Professor: Oh? You found my Guardians' one weakness?");

register('chat', (event) => {
    if (!getInDungeon()) return;
    showAlert('&c&lFIRE FREEZE');
}).setCriteria('[Bao] FIRE FREEZE NOW');

// class level up pings
register('chat', (className, lvl1, lvl2, event) => {
    if (!Settings.cataLevelUpPing) return;
    if (dungeonClasses.includes(className)) {
        ChatLib.chat(`CLASS LEVEL UP ${className} ${lvl1}➜${lvl2}`);
    }
}).setCriteria(' CLASS LEVEL UP ${className} ${lvl1}➜${lvl2}');

// dungoen level up
register('chat', (lvl1, lvl2, event) => {
    if (!Settings.cataLevelUpPing) return;
    ChatLib.chat(`DUNGEON LEVEL UP The Catacombs ${lvl1}➜${lvl2}`);
}).setCriteria(' DUNGEON LEVEL UP The Catacombs ${lvl1}➜${lvl2}');

function getTabDungeonBuffs(blessingsList) {
    let dungeonBuffsIdx = blessingsList.indexOf('Dungeon Buffs');
    return blessingsList.slice(dungeonBuffsIdx + 1, -2);
}

function getBlessings(blessings, blessingsObj) {
    blessingsObj.text = '';
    blessingsObj.draggable = '';
    let blessingsAvailable = [];
    let draggableEntries = [];
    blessings.forEach(blessing => {
        // console.log(blessing);
        // console.log(`input before func romantonumerals: ${blessing}`)
        let powerRegex = /^Blessing of (Wisdom|Power|Life|Stone|Time) ([IVX]+)$/;
        let powerMatch = blessing.match(powerRegex);
        if (powerMatch) {
            let powerType = powerMatch[1];
            // console.log(`match[2] before func: ${JSON.stringify(powerMatch[2])}`)
            let powerLevel = romanToNumeral(powerMatch[2]);
            // console.log(`func: getBlessings: ${powerType}: ${powerLevel}`)
            blessingsAvailable.push(powerType);

            if (powerType === 'Wisdom') {
                blessingsObj.wisdom = 0;
                blessingsObj.wisdom = powerLevel;
            } else if (powerType === 'Life') {
                blessingsObj.life = 0;
                blessingsObj.life = powerLevel;
            } else if (powerType === 'Stone') {
                blessingsObj.stone = 0;
                blessingsObj.stone = powerLevel;
            } else if (powerType === 'Power') {
                blessingsObj.power = 0;
                blessingsObj.power = powerLevel;
            } else if (powerType === 'Time') {
                blessingsObj.time = 0;
                blessingsObj.time = powerLevel;
            }
        }
    })

    blessingsAvailable = [... new Set(blessingsAvailable)];
    blessingsAvailable.forEach(blessing => {
        draggableEntries.push(`&7&l[Blessing] ${blessing}: 0`)
    })
    // console.log(blessingsAvailable);
    // console.log(draggableEntries);
    blessingsObj.draggable = draggableEntries.join('\n');
    
    return Object.entries(blessingsObj)
        .filter(([type, level]) => level !== 0 && typesOfBlessings.includes(type.toLowerCase()) && type !== 'draggable' && type !== 'text')
        .sort((a, b) => b[1] - a[1])
        .map(([type, level]) => `&6&l[&r&lBlessing&6&l] ${type.charAt(0).toUpperCase() + type.slice(1)}: &b&l${level}`)
        .join('\n');
}

function isPlayerInvFull() {
    return !Player.getInventory().getItems().includes(null);
}


// reg step
register('step', () => {
    if (!getInSkyblock() || !World.isLoaded()) return;
    if (getInDungeon() || getInDHub()) {
        let { numRunsStats, totalSecretStats } = baoDungeons;
        baoDungeons.secretOverviewText = `Runs: &b${numRunsStats}&r | Secrets: &b${totalSecretStats}&r | Avg: &b${(totalSecretStats / numRunsStats).toFixed(2)}&r/&brun`
    } 

    if (getInDungeon()) {
        let blessings = TabList.getFooter().removeFormatting().split('\n');
        // console.log(blessings);
        // console.log('');
        let hasBlessings = blessings.includes('Dungeon Buffs');
        if (hasBlessings) {
            // console.log(`hasBlessings: ${hasBlessings}`)
            blessings = getTabDungeonBuffs(blessings);
            // console.log(`redefined blessings:\n${blessings}`)
            baoDungeons.blessings.text = getBlessings(blessings, baoDungeons.blessings);
        }

        if (Settings.fullInventoryAlert && isPlayerInvFull()) {
            showAlert('&4&lFull Inv');
            dungeonAudio.playDefaultSound();
        }
    }
    baoDungeons.save();
}).setFps(1);

register('dragged', (dx, dy, x, y) => {
    if (!getInSkyblock() || !World.isLoaded()) return;
    if (movesecretcounter.isOpen()) {
        baoDungeons.secretCounter.x = constrainX(x, 3, secretCounterDraggable);
        baoDungeons.secretCounter.y = constrainY(y, 3, secretCounterDraggable);
    };
    if (moveblessingscounter.isOpen()) {
        baoDungeons.blessings.x = constrainX(x, 3, baoDungeons.blessings.draggable);
        baoDungeons.blessings.y = constrainY(y, 3, baoDungeons.blessings.draggable);
    }
    baoDungeons.save();
});

register('renderOverlay', () => {
    if (!getInSkyblock() || !World.isLoaded()) return;

    if (Settings.secretsPerSession && (getInDungeon() || getInDHub())) {
        Renderer.drawStringWithShadow(baoDungeons.secretOverviewText, baoDungeons.secretCounter.x, baoDungeons.secretCounter.y);
    }
    if (getInDungeon()) {
        Renderer.drawStringWithShadow(baoDungeons.blessings.text, baoDungeons.blessings.x, baoDungeons.blessings.y);
    }
    
    renderGuiPosition(movesecretcounter, baoDungeons.secretCounter, secretCounterDraggable);
    renderGuiPosition(moveblessingscounter, baoDungeons.blessings, baoDungeons.blessings.draggable)
})

register('chat', (name, message, event) => {
    if (!getInSkyblock() || !World.isLoaded() || !getInDungeon()) return;
    if (getPlayerClass() !== 'Healer') return;
    if (message.toLowerCase().includes('wish')) {
        showAlert('&f&lWISH!');
        dungeonAudio.playDefaultSound();
    }
}).setCriteria('Party > ${name}: ${message}');
register('command', () => {
    ChatLib.chat(`Wisdom: ${baoDungeons.blessings.wisdom}`)
    ChatLib.chat(`Life: ${baoDungeons.blessings.life}`)
    ChatLib.chat(`Power: ${baoDungeons.blessings.power}`)
    ChatLib.chat(`Stone: ${baoDungeons.blessings.stone}`)
    ChatLib.chat(`Time: ${baoDungeons.blessings.time}`)
}).setName('currbless');
// dungeon routes saver
// settings to start at p3 for 1/2/3/4/devs
// starts recording line
// records item held in hand and key pressed - m1/m2/jump
// saves action of said item as label
// reference to srock's 'Step Recorder' -- https://www.chattriggers.com/modules/v/StepRecorder

// dungeon run counter
// set counter for floor
// reset floor data
// set floor goal

// accurate bloodcamp helper
// track skull moving around
// drawskullbox
// bloodcamp timer

// drag prio
// archer team w/ tank -- pbrgo
// bers team w/ healer -- ogrbp
// difficulty of dragons from highest diff -> lowest diff :: blue > red > green > orange
// p1/p5 remove armorstand and falling blocks


// join dungeon commands
const wordToNumber = {
    '1': 'one', 
    '2': 'two', 
    '3': 'three', 
    '4': 'four', 
    '5': 'five', 
    '6': 'six', 
    '7': 'seven'
}
register('chat', (name, cataType, floorNum, event) => {
    let floorLevel = wordToNumber[floorNum];
    if (cataType.toLowerCase() === 'f') {
        ChatLib.command(`joininstance catacombs_floor_${floorLevel}`)
    }
    if (cataType.toLowerCase() === 'm') {
        ChatLib.command(`joininstance mastermode_floor_${floorLevel}`)
    }
}).setCriteria('Party > ${name}: #${cataType}${floorNum}');

// healer specific pings
register('chat', (event) => {
    if (!getInSkyblock() || !World.isLoaded() || !getInDungeon()) return;
    if (getPlayerClass() === 'Healer') {
        showAlert(`&f&lWISH`);
        dungeonAudio.playDefaultSound();
    }
}).setCriteria('⚠ Maxor is enraged! ⚠').setContains();

register('chat', (event) => {
    if (!getInSkyblock() || !World.isLoaded() || !getInDungeon()) return;
    if (getPlayerClass() === 'Healer') {
        showAlert(`&f&lWISH`);
        dungeonAudio.playDefaultSound();
    }
}).setCriteria("[BOSS] Goldor: You can't damage me, you can barely slow me down!");

// bers specific pings for m7
// mage specific pings for m7
// archer specific pings for m7
// tank specific pings for m7

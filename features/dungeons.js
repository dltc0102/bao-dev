// dungeon cleaning
// import './dungeons/dungeonIntEles.js';
// import './dungeons/dungeonMsgQOL.js';
// import './dungeons/dungeonPlayerActions.js';
// import './dungeons/dungeonSysNotis.js';

// dungeon qol


import Settings from '../settings.js';
import Audio from '../utils/audio.js';
import PogObject from 'PogData';

import { sendMessage } from '../utils/party.js';
import { baoUtils, dungeonClasses, renderWhen } from '../utils/utils.js';
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

// export const baoDungeons = new PogObject("bao-dev", {?
const blessingAddOn = '&6&l[&f&lBlessings&6&l]&r';
export const baoBlessings = {
    power: {
        display: `${blessingAddOn} &6&lPower`,
        regex: /Blessing of Power (.+)/,
        lvl: 0,
    },
    time: {
        display: `${blessingAddOn} &6&lTime`,
        regex: /Blessing of Time (.+)/,
        lvl: 0,
    },
    life: {
        display: `${blessingAddOn} &6&lLife`,
        regex: /Blessing of Life (.+)/,
        lvl: 0,
    },
    wisdom: {
        display: `${blessingAddOn} &6&lWisdom`,
        regex: /Blessing of Wisdom (.+)/,
        lvl: 0,
    },
    stone: {
        display: `${blessingAddOn} &6&lStone`,
        regex: /Blessing of Stone (.+)/,
        lvl: 0,
    },
    
}

export const baoDungeons = {
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
        "draggable": '',
        "x": 400, 
        "y": 400,
    }, 
};
// }, '/data/baoDungeons.json');
// baoDungeons.autosave(5);

////////////////////////////////////////////////////////////////////////////////
// FUNCTIONS
////////////////////////////////////////////////////////////////////////////////
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

function resetBlessings() {
    for (let blessing in baoBlessings) {
        baoBlessings[blessing].lvl = 0;
    }
}

function isPlayerInvFull() {
    return !Player.getInventory().getItems().includes(null);
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
    // baoDungeons.save();
})

register('chat', (playerName, curr, total, event) => {
    if (!getInDungeon()) return;
    if (playerName !== Player.getName()) return;
    baoDungeons.sentMelody = false;
    // baoDungeons.save();
    debug(`baoDungeons.sentMelody:  ${baoDungeons.sentMelody}`);
}).setCriteria('${playerName} activated a terminal! (${curr}/${total})');

// gameload
register('gameLoad', () => {
    baoDungeons.sentMelody = false;
    // baoDungeons.save();
    debug(`baoDungeons.sentMelody:  ${baoDungeons.sentMelody}`);
});


////////////////////////////////////////////////////////////////////////////////
// Secrets - Per Run - Counter for Average Secrets Per Session
////////////////////////////////////////////////////////////////////////////////
let extraStatsFlag = false;
register('chat', (event) => {
    if (!getInDungeon()) return;
    if (extraStatsFlag) return;

    baoDungeons.numRunsStats += 1;
    setTimeout(() => {
        ChatLib.command('showextrastats');
        extraStatsFlag = true;
    }, 1000);
    // baoDungeons.save();

    debug(`numRunsStats: ${baoDungeons.numRunsStats} | extraStatsFlag: ${extraStatsFlag}`);
}).setCriteria('> EXTRA STATS <').setContains();

register('chat', (playerDeaths, event) => {
    if (!getInDungeon()) return;
    baoDungeons.deathStats += Number(playerDeaths);
    // baoDungeons.save();

    debug(`deathStats: ${baoDungeons.deathStats} | ${typeof baoDungeons.deathStats}`);
}).setCriteria('Deaths: ${playerDeaths}').setContains();

register('chat', (secretCount, event) => {
    if (!getInDungeon()) return;
    baoDungeons.secretStats += Number(secretCount);
    baoDungeons.totalSecretStats += Number(secretCount);
    // baoDungeons.save();
    
    debug(typeof Number(secretCount));
    debug(`secretStats: ${baoDungeons.secretStats} | ${typeof baoDungeons.secretStats}`);
}).setCriteria('Secrets Found: ${secretCount}').setContains();

register('chat', (cataType, floor, event) => {
    if (!getInDungeon()) return;
    baoDungeons.numRunsStats += 1;
    setTimeout(() => {
        ChatLib.chat(`${baoUtils.modPrefix} &3${Player.getName()} &7Secrets: &b${baoDungeons.secretStats}&7, Deaths: &b${baoDungeons.deathStats}`)
    }, 1000)
    // baoDungeons.save();
}).setCriteria('${cataType} Catacombs - Floor ${floor} Stats').setContains();

register('chat', (leader, catacombType, floorNum, event) => {
    // ChatLib.chat('criteria received.')
    baoDungeons.deathStats = 0;
    baoDungeons.secretStats = 0;
    extraStatsFlag = false;
    baoDungeons.powerLvl = 0;
    // baoDungeons.save();
}).setCriteria('${leader} entered ${catacombType} Catacombs, Floor ${floorNum}!').setContains();

// reset secret counter command
register('command', () => {
    baoDungeons.deathStats = 0;
    baoDungeons.totalSecretStats = 0;
    baoDungeons.numRunsStats = 0;
    // baoDungeons.save();
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

// blessings display
let shouldShowBlessings = false;
register('step', () => {
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
}).setFps(1);

register('worldUnload', (event) => {
    resetBlessings();
    shouldShowBlessings = false;
});

// reg step
let blessingText = '';
register('step', () => {
    if (!getInSkyblock() || !World.isLoaded()) return;
    if (getInDungeon() || getInDHub()) {
        let { numRunsStats, totalSecretStats } = baoDungeons;
        baoDungeons.secretOverviewText = `Runs: &b${numRunsStats}&r | Secrets: &b${totalSecretStats}&r | Avg: &b${(totalSecretStats / numRunsStats).toFixed(2)}&r/&brun`
    } 

    if (getInDungeon()) {
        if (shouldShowBlessings) {
            blessingText = '';
            if (baoBlessings.power.lvl > 0) blessingText += `\n${baoBlessings.power.display}: &b${baoBlessings.power.lvl}`
            
            if (baoBlessings.time.lvl > 0) blessingText += `\n${baoBlessings.time.display}: &b${baoBlessings.time.lvl}`
            
            if (baoBlessings.life.lvl > 0) blessingText += `\n${baoBlessings.life.display}: &b${baoBlessings.life.lvl}`
            
            if (baoBlessings.wisdom.lvl > 0) blessingText += `\n${baoBlessings.wisdom.display}: &b${baoBlessings.wisdom.lvl}`
            
            if (baoBlessings.stone.lvl > 0) blessingText += `\n${baoBlessings.stone.display}: &b${baoBlessings.stone.lvl}`
            // console.log(blessingText)
        } else {
            blessingText = '';
        }

        if (Settings.fullInventoryAlert && isPlayerInvFull()) {
            showAlert('&4&lFull Inv');
            dungeonAudio.playDefaultSound();
        }
    }
    // baoDungeons.save();
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
    // baoDungeons.save();
});

renderWhen(register('renderOverlay', () => {
    Renderer.drawStringWithShadow(baoDungeons.secretOverviewText, baoDungeons.secretCounter.x, baoDungeons.secretCounter.y);
}), () => Settings.secretsPerSession && (getInDungeon() || getInDHub()) && getInSkyblock() && World.isLoaded());

renderWhen(register('renderOverlay', () => {
    Renderer.drawStringWithShadow(`${blessingText}`, baoDungeons.blessings.x, baoDungeons.blessings.y);
}), () => Settings.showBlessingsDisplay && getInDungeon() && getInSkyblock() && World.isLoaded());

renderWhen(register('renderOverlay', () => {
    renderGuiPosition(movesecretcounter, baoDungeons.secretCounter, secretCounterDraggable);
    renderGuiPosition(moveblessingscounter, baoDungeons.blessings, baoDungeons.blessings.draggable);
}), () => getInSkyblock() && World.isLoaded());


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

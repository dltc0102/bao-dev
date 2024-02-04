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
import { romanToNumber } from '../utils/functions.js';

////////////////////////////////////////////////////////////////////////////////
// SETUP CONSTS
////////////////////////////////////////////////////////////////////////////////
const dungeonAudio = new Audio();
const movesecretcounter = new Gui();
createGuiCommand(movesecretcounter, 'movesecretcounter', 'msc');

// pogObject
export const baoDungeons = new PogObject("bao-dev", {
    "sentMelody": false, 
    "extraStatsFlag": false,
    "deathStats": 0, 
    "secretStats": 0, 
    "totalSecretStats": 0,
    "numRunsStats": 0, 
    "secretOverviewText": '',
    "draggableText": `&7Runs: 0 | Secrets: 0 | Avg: 0/run`,
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
    }, 
}, '/data/baoDungeons.json');
baoDungeons.autosave(5);

// take out extraStatsFlag from pogobject

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
register('chat', (event) => {
    if (!getInDungeon()) return;
    if (baoDungeons.extraStatsFlag) return;

    baoDungeons.numRunStats += 1;
    setTimeout(() => {
        ChatLib.command('showextrastats');
        baoDungeons.extraStatsFlag = true;
    }, 1000);
    baoDungeons.save();

    debug(`numRunStats: ${baoDungeons.numRunStats} | extraStatsFlag: ${baoDungeons.extraStatsFlag}`);
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
    if (!getInDungeon()) return;
    baoDungeons.deathStats = 0;
    baoDungeons.secretStats = 0;
    baoDungeons.extraStatsFlag = false;
    baoDungeons.powerLvl = 0;
    baoDungeons.save();
}).setCriteria('${leader} entered ${catacombType} Catacombs, Floor ${floorNum}!').setContains();

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

// reg step
register('step', () => {
    if (!getInSkyblock() || !World.isLoaded()) return;

    baoDungeons.secretOverviewText = `Runs: &b${baoDungeons.numRunsStats}&r | Secrets: &b${baoDungeons.totalSecretStats}&r | Avg: &b${(baoDungeons.totalSecretStats / baoDungeons.numRunsStats).toFixed(2)}&r/&brun`

    if (getInDungeon()) {
        let powerList = [];
        baoDungeons.blessings.text = '';
    
        powerList = TabList.getFooter().removeFormatting().split('\n');
        let dungeonBuffIdx = powerList.indexOf('Dungeon Buffs');
        powerList = powerList.slice(dungeonBuffIdx + 1, -2);
        powerList.forEach(powerName => {
            const powerRegex = /^Blessing of (Wisdom|Power|Life|Stone|Time) ([IVX]+)$/
            let powerMatch = powerName.match(powerRegex);
            if (powerMatch) {
                let powerType = powerMatch[1];
                let powerLevel = powerMatch[2];
                if (powerType === 'Wisdom') baoDungeons.blessings.wisdom = romanToNumber(powerLevel);
                if (powerType === 'Power') baoDungeons.blessings.power = romanToNumber(powerLevel);
                if (powerType === 'Life') baoDungeons.blessings.life = romanToNumber(powerLevel);
                if (powerType === 'Stone') baoDungeons.blessings.stone = romanToNumber(powerLevel);
                if (powerType === 'Time') baoDungeons.blessings.time = romanToNumber(powerLevel);
            }
        })
        baoDungeons.blessings.text = Object.entries(baoDungeons.blessings)
            .filter(([type, level]) => level !== 0)
            .map(([type, level]) => `&6&l[&r&lBlessing&6&l] ${type.charAt(0).toUpperCase() + type.slice(1)}: &b&l${level}`)
            .slice(0, -1)
            .join('\n');

        
        let playerInv = Player.getInventory().getItems();
        if (Settings.fullInventoryAlert && !playerInv.includes(null)) {
            showAlert('&4&lFull Inv');
            dungeonAudio.playDefaultSound();
        }
    }
    baoDungeons.save();

}).setFps(1);

register('dragged', (dx, dy, x, y) => {
    if (!getInSkyblock() || !World.isLoaded()) return;
    if (movesecretcounter.isOpen()) {
        // baoDungeons.secretCounter.x = (baoUtils.screenW - Renderer.getStringWidth(baoDungeons.secretOverviewText)) / 2;
        baoDungeons.secretCounter.x = constrainX(x, 3, baoDungeons.draggableText);
        baoDungeons.secretCounter.y = constrainY(y, 3, baoDungeons.draggableText);
    };
    baoDungeons.save();
});

register('renderOverlay', () => {
    if (!getInSkyblock() || !World.isLoaded()) return;
    if (Settings.secretsPerSession && (getInDungeon() || getInDHub())) {
        Renderer.drawStringWithShadow(baoDungeons.secretOverviewText, baoDungeons.secretCounter.x, baoDungeons.secretCounter.y);
    }
    if (/* Settings.showBlessings && */ getInDungeon()) {
        Renderer.drawStringWithShadow(baoDungeons.blessings.text, 500, 600);
    }
    
    renderGuiPosition(movesecretcounter, baoDungeons.secretCounter, baoDungeons.draggableText);
    baoDungeons.save();
})

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


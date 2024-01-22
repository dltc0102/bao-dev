import Settings from '../settings.js';
import Audio from '../utils/audio.js';
import PogObject from 'PogData';

import { baoUtils } from '../utils/utils.js';
import { centerCoordinates, constrainY, createGuiCommand, drawBonzoBox, playSound, renderGuiPosition } from '../utils/functions.js';
import { sendMessage } from '../utils/party.js';
import { debug, showAlert } from '../utils/utils.js';
import { getInSkyblock, getCurrArea } from '../utils/functions.js';

////////////////////////////////////////////////////////////////////////////////
// SETUP CONSTS
////////////////////////////////////////////////////////////////////////////////
const entityArmorStand = Java.type("net.minecraft.entity.item.EntityArmorStand");
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
}, '/data/baoDungeons.json');
baoDungeons.autosave(5);

////////////////////////////////////////////////////////////////////////////////
// MELODY DETECTOR 
////////////////////////////////////////////////////////////////////////////////
register('guiOpened', () => {
    if (!getInSkyblock() || !World.isLoaded()) return;
    if (getCurrArea() === 'Catacombs') return;
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
    if (playerName !== Player.getName()) return;
    baoDungeons.sentMelody = false;
    baoDungeons.save();
    debug(`baoDungeons.sentMelody:  ${baoDungeons.sentMelody}`);
}).setCriteria('${playerName} activated a terminal! (${curr}/${total})');

register('gameLoad', () => {
    baoDungeons.sentMelody = false;
    baoDungeons.save();
    debug(`baoDungeons.sentMelody:  ${baoDungeons.sentMelody}`);
});


////////////////////////////////////////////////////////////////////////////////
// Secrets - Per Run - Counter for Average Secrets Per Session
////////////////////////////////////////////////////////////////////////////////
register('chat', (event) => {
    if (!getInSkyblock() || !World.isLoaded()) return;
    if (getCurrArea() !== 'Catacombs') { debug(`currArea: ${getCurrArea()} -- not in Catacombs`); return; }
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
    if (!getInSkyblock() || !World.isLoaded()) return;
    if (getCurrArea() !== 'Catacombs') { debug(`currArea: ${getCurrArea()} -- not in Catacombs`); return; }
    baoDungeons.deathStats += Number(playerDeaths);
    baoDungeons.save();

    debug(`deathStats: ${baoDungeons.deathStats} | ${typeof baoDungeons.deathStats}`);
}).setCriteria('Deaths: ${playerDeaths}').setContains();

register('chat', (secretCount, event) => {
    if (!getInSkyblock() || !World.isLoaded()) return;
    if (getCurrArea() !== 'Catacombs') { debug(`currArea: ${getCurrArea()} -- not in Catacombs`); return; }
    baoDungeons.secretStats += Number(secretCount);
    baoDungeons.totalSecretStats += Number(secretCount);
    baoDungeons.save();
    
    debug(typeof Number(secretCount));
    debug(`secretStats: ${baoDungeons.secretStats} | ${typeof baoDungeons.secretStats}`);
}).setCriteria('Secrets Found: ${secretCount}').setContains();

register('chat', (cataType, floor, event) => {
    if (!getInSkyblock() || !World.isLoaded()) return;
    if (getCurrArea() !== 'Catacombs') { debug(`currArea: ${getCurrArea()} -- not in Catacombs`); return; }
    baoDungeons.numRunsStats += 1;
    setTimeout(() => {
        ChatLib.chat(`${baoUtils.modPrefix} &3${Player.getName()} &7Secrets: &b${baoDungeons.secretStats}&7, Deaths: &b${baoDungeons.deathStats}`)
    }, 3000);
    baoDungeons.save();
}).setCriteria('${cataType} Catacombs - Floor ${floor} Stats').setContains();

register('step', () => {
    if (!getInSkyblock() || !World.isLoaded()) return;
    baoDungeons.secretOverviewText = `Runs: &b${baoDungeons.numRunsStats}&r | Secrets: &b${baoDungeons.totalSecretStats}&r | Avg: &b${(baoDungeons.totalSecretStats / baoDungeons.numRunsStats).toFixed(2)}&r/&brun`
    baoDungeons.save();
}).setFps(1);

register('dragged', (dx, dy, x, y) => {
    if (!getInSkyblock() || !World.isLoaded()) return;
    if (movesecretcounter.isOpen()) {
        baoDungeons.secretCounter.x = (baoUtils.screenW - Renderer.getStringWidth(baoDungeons.secretOverviewText)) / 2;
        baoDungeons.secretCounter.y = constrainY(y, 3, baoDungeons.draggableText);
    };
    baoDungeons.save();
});

register('renderOverlay', () => {
    if (!getInSkyblock() || !World.isLoaded()) return;
    if (!Settings.secretsPerSession) return;
    if (getCurrArea() === 'Catacombs' || getCurrArea() === 'Dungeon Hub') {
        Renderer.drawStringWithShadow(baoDungeons.secretOverviewText, baoDungeons.secretCounter.x, baoDungeons.secretCounter.y);
    }
    renderGuiPosition(movesecretcounter, baoDungeons.secretCounter, baoDungeons.draggableText);
    baoDungeons.save();
})

register('chat', (leader, catacombType, floorNum, event) => {
    baoDungeons.deathStats = 0;
    baoDungeons.secretStats = 0;
    baoDungeons.extraStatsFlag = false;
    baoDungeons.save();
}).setCriteria('${leader} entered ${catacombType} Catacombs, Floor ${floorNum}!').setContains();

register('command', () => {
    baoDungeons.deathStats = 0;
    baoDungeons.totalSecretStats = 0;
    baoDungeons.numRunsStats = 0;
    baoDungeons.save();
}).setName('resetsecretcounter');

// ice spray wand ping
register('chat', (player, reforge, event) => {
    showAlert('&3[!] &fIce Spray Wand &3[!]');
    playSound();
    setTimeout(() => {
        sendMessage(`${player} has obtained ${reforge} Ice Spray Wand!`)
    }, 1)
}).setCriteria('${player} has obtained ${reforge} Ice Spray Wand!');

register('step', () => {
    if (!getInSkyblock() || !World.isLoaded()) return;
    if (getCurrArea() !== 'Catacombs') return;
    let playerInv = Player.getInventory().getItems();
    if (Settings.fullInventoryAlert) {
        if (!playerInv.includes(null)) {
            showAlert('&4&lFull Inv');
            dungeonAudio.playDefaultSound();
        }
    }
}).setFps(1);

register('command', () => {
    let nearbyEntities = World.getAllEntitiesOfType(entityArmorStand).filter(mobEntity => {
        const mobName = mobEntity.getName().removeFormatting();
        console.log(mobName);
    })
}).setName('detectas');

// party finder shortener
register('chat', (message, event) => {
    if (!getInSkyblock() || !World.isLoaded()) return;
    if (Settings.betterPFMessages) {
        cancel(event);
        ChatLib.chat(`&d&lPF &r> &a${message}`)
    }
}).setCriteria('Party Finder > ${message}');




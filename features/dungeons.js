import Settings from '../settings.js';
import { data } from '../utils/data.js';
import { constrainY, createGuiCommand, renderGuiPosition, playSound } from '../utils/functions.js';
import { sendMessage } from '../utils/party.js';
import { debug } from '../utils/utils.js';
import { showAlert } from '../utils/utils.js'


////////////////////////////////////////////////////////////////////////////////
// MELODY DETECTOR -------------------------------------------------------------
////////////////////////////////////////////////////////////////////////////////
register('guiOpened', () => {
    if (!World.isLoaded()) return;
    if (!data.inSkyblock) return;
    if (data.currArea !== 'Private Island') return;
    if (!Settings.alert_melody) return;
    if (data.dungeons.sentMelody) return;
    setTimeout(() => {
        if (Player.getContainer().getName() === 'Click the button on time!') {
            sendMessage('melody');  
            data.dungeons.sentMelody = true;
            debug(`sentMelody:  ${data.dungeons.sentMelody}`);
        }
    }, 1)
})

register('chat', (player, curr, total, event) => {
    if (player !== Player.getName()) return;
    data.dungeons.sentMelody = false;
    debug(`data.dungeons.sentMelody:  ${data.dungeons.sentMelody}`);
}).setCriteria('${player} activated a terminal! (${curr}/${total})');

register('gameLoad', () => {
    data.dungeons.sentMelody = false;
    debug(`data.dungeons.sentMelody:  ${data.dungeons.sentMelody}`);
});


////////////////////////////////////////////////////////////////////////////////
// secrets per run
////////////////////////////////////////////////////////////////////////////////
data.dungeons.movesecretcounter = new Gui();
register('dragged', (dx, dy, x, y) => {
    if (!data.inSkyblock) return;
    if (data.dungeons.movesecretcounter.isOpen()) {
        data.SecretCount.y = constrainY(y, 3, data.dungeons.secretOverviewText);
    }
})

createGuiCommand(data.dungeons.movesecretcounter, 'movesecretcounter', 'msc')

register('chat', (event) => {
    if (!data.inSkyblock) return;
    if (data.dungeons.extraStatsFlag) return;
    // if (data.currArea !== 'Catacombs') return;
    data.dungeons.numRunStats += 1;
    setTimeout(() => {
        ChatLib.command('showextrastats');
        data.dungeons.extraStatsFlag = true;
    }, 500)

    debug(`numRunStats: ${data.dungeons.numRunStats} | extraStatsFlag: ${data.dungeons.extraStatsFlag}`);
}).setCriteria('> EXTRA STATS <').setContains();

register('chat', (playerDeaths, event) => {
    if (!data.inSkyblock) return;
    // if (data.currArea !== 'Catacombs') return;
    data.dungeons.deathStats += Number(playerDeaths);

    debug(`deathStats: ${data.dungeons.deathStats} | ${typeof data.dungeons.deathStats}`);
}).setCriteria('Deaths: ${playerDeaths}').setContains();

register('chat', (secretCount, event) => {
    if (!data.inSkyblock) return;
    // if (data.currArea !== 'Catacombs') return;
    debug(typeof Number(secretCount))
    data.dungeons.secretStats += Number(secretCount);

    debug(`secretStats: ${data.dungeons.secretStats} | ${typeof data.dungeons.secretStats}`);
}).setCriteria('Secrets Found: ${secretCount}').setContains();

register('chat', (cataType, floor, event) => {
    if (!data.inSkyblock) return;
    setTimeout(() => {
        ChatLib.chat(`${data.modPrefix} &3${Player.getName()} &7Secrets: &b${data.dungeons.secretStats}&7, Deaths: &b${data.dungeons.deathStats}`)
    }, 3000)
    debug(`extraStatsFlag: ${data.dungeons.extraStatsFlag}`);
}).setCriteria('${cataType} Catacombs - Floor ${floor} Stats').setContains();

register('step', () => {
    if (!data.inSkyblock) return;
    data.dungeons.secretOverviewText = `Runs: &b${data.dungeons.numRunsStats}&r | Secrets: &b${data.dungeons.secretStats}&r | Avg: &b${(data.dungeons.secretStats / data.dungeons.numRunStats).toFixed(2)}&r/&brun`
}).setFps(1);

register('dragged', (dx, dy, x, y) => {
    if (!data.inSkyblock) return;
    if (data.dungeons.movesecretcounter.isOpen()) {
        data.dungeons.secretCounter.x = data.screenW / 2 - (Renderer.getStringWidth(data.dungeons.secretOverviewText) / 2);
        data.dungeons.secretCounter.y = y;
    };
});

register('renderOverlay', () => {
    if (!data.inSkyblock) return;
    if (!Settings.secretsPerSession) return;
    if (data.currArea === 'Catacombs' || data.currArea === 'Dungeon Hub') {
        Renderer.drawStringWithShadow(data.dungeons.secretOverviewText, data.dungeons.secretCounter.x, data.dungeons.secretCounter.y)
        renderGuiPosition(data.dungeons.movesecretcounter, data.dungeons.secretCounter, `Runs: 0 | Secrets: 0 | Avg: 0/run`)
    }
})

register('chat', (leader, catacombType, floorNum, event) => {
    let isMM = catacombType === 'MM' ? "Mastermode" : "Normalmode";
    let match = leader.match(/\[MVP\+\]\s+(\S+)/);
    let username = match ? match[1] : null;
    // ChatLib.chat(`leader: ${username}, catacombType: ${isMM}, floor: ${floorNum}`);

    data.dungeons.secretStats = 0;
    data.dungeons.deathStats = 0;
}).setCriteria('${leader} entered ${catacombType} Catacombs, Floor ${floorNum}!').setContains();

register('command', () => {
    data.dungeons.numRunStats = 0;
}).setName('resetsecretcounter');

// scarf fire freeze timer
// professor fire freeze timer

// auto dodge

// ice spray wand ping
register('chat', (player, reforge, event) => {
    showAlert('&3[!] &fIce Spray Wand &3[!]');
    playSound();
    setTimeout(() => {
        sendMessage(`${player} has obtained ${reforge} Ice Spray Wand!`)
    }, 1)
}).setCriteria('${player} has obtained ${reforge} Ice Spray Wand!');


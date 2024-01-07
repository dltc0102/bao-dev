import Settings from '../settings.js'
import { data } from '../utils/data.js'
// import { showAlert } from '../utils/utils.js'
import { createGuiCommand, renderGuiPosition } from '../utils/functions.js'
import { sendMessage } from '../utils/party.js'
// import { drawBonzoBox, drawLine, drawBeacon, colorToRgb, centerCoordinates } from '../utils/functions.js'

////////////////////////////////////////////////////////////////////////////////
// MELODY DETECTOR -------------------------------------------------------------
////////////////////////////////////////////////////////////////////////////////
let sentMelody = false;
register('guiOpened', () => {
    if (!data.inSkyblock) return;
    if (data.currArea !== 'Catacombs') return;
    if (!Settings.alert_melody) return;
    if (sentMelody) return;
    setTimeout(() => {
        if (Player.getContainer().getName() !== 'Experimentation Table') return
        sendMessage('melody');  
        sentMelody = true;
    }, 1)
})

register('chat', (player, event) => {
    if (player !== Player.getName()) return;
    sentMelody = false;
}).setCriteria('${player} activated a terminal!');

register('chat', (player, event) => {
    if (player !== Player.getName()) return;
    sentMelody = false;
}).setCriteria('${player} completed a terminal!');

register('gameLoad', () => {
    sentMelody = false;
});


////////////////////////////////////////////////////////////////////////////////
// secrets per run
////////////////////////////////////////////////////////////////////////////////
let statsCommandRun = false;
let deathStats = 0;
let secretStats = 0;
let numRunsStats = 0;
var movesecretcounter = new Gui();

register('dragged', (dx, dy, x, y) => {
    if (!data.inSkyblock) return;
    if (movesecretcounter.isOpen()) {
        data.SecretCount.x = x;
        data.SecretCount.y = y;
    }
})

createGuiCommand(movesecretcounter, 'movesecretcounter', 'msc')

register('chat', (event) => {
    if (!data.inSkyblock) return;
    if (data.currArea !== 'Catacombs') return;
    numRunsStats += 1;
    ChatLib.command('showextrastats');
    statsCommandRun = true;
}).setCriteria('> EXTRA STATS <').setContains();

register('chat', (playerDeaths, event) => {
    if (!data.inSkyblock) return;
    if (data.currArea !== 'Catacombs') return;
    deathStats += Number(playerDeaths);
}).setCriteria('Deaths: ${playerDeaths}').setContains();

register('chat', (secretCount, event) => {
    if (!data.inSkyblock) return;
    if (data.currArea !== 'Catacombs') return;
    secretStats += Number(secretCount);
}).setCriteria('Secrets Found: ${secretCount}').setContains();

register('chat', (event) => {
    setTimeout(() => {
        ChatLib.chat(`${data.modPrefix} &3${Player.getName()} &7Secrets: &b${secretStats}&7, Deaths: &b${deathStats}`)
    }, 1000)
}).setCriteria('CLICK HERE to re-queue into The Catacombs!').setContains();

let secretOverviewText = '';
register('step', () => {
    secretOverviewText = `Runs: &b${numRunsStats}&r | Secrets: &b${secretStats}&r | Avg: &b${(secretStats / numRunsStats).toFixed(2)}&r/&brun`
}).setFps(1);

register('renderOverlay', () => {
    if (!data.inSkyblock) return;
    if (!Settings.secretsPerSession) return;
    let screenW = Renderer.screen.getWidth();
    Renderer.drawStringWithShadow(secretOverviewText, screenW / 2 - (Renderer.getStringWidth(secretOverviewText) / 2), 30)
    renderGuiPosition(movesecretcounter, data.SecretCount, `Runs: 0 | Secrets: 0 | Avg: 0/run`)
})

register('command', () => {
    secretStats = 0;
    numRunsStats = 0;
}).setName('resetsecretcounter');

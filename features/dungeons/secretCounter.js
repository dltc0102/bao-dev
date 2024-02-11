import Settings from "../../settings";

import { baoUtils } from "../../utils/utils";
import { getInSkyblock, getInDHub, getInDungeon } from "../../utils/functions";
import { registerWhen } from "../../utils/utils";
import { createGuiCommand, renderGuiPosition } from '../../utils/functions.js'; // gui
import { constrainX, constrainY } from '../../utils/functions.js' // padding

////////////////////////////////////////////////////////////////////////////////
// CONSTS
////////////////////////////////////////////////////////////////////////////////
const movesecretcounter = new Gui();
createGuiCommand(movesecretcounter, 'movesecretcounter', 'msc');
const secretCounterDraggable = `&7Runs: 0 | Secrets: 0 | Avg: 0/run`;

export const baoSecretCounter = {
    "deathStats": 0, 
    "secretStats": 0, 
    "totalSecretStats": 0,
    "numRunsStats": 0, 
    "secretOverviewText": '',
    "secretCounter": {
        "x": 400, // arbituary random number, replaced by padding function 
        "y": 40,
    }, 
};


////////////////////////////////////////////////////////////////////////////////
// FUNCTIONS
////////////////////////////////////////////////////////////////////////////////
function shouldHandleDungeonCreditsMsgs() {
    return getInDungeon() && getInSkyblock() && World.isLoaded();
}

function shouldHandleRenderCounter() {
    return (getInDungeon() || getInDHub()) && getInSkyblock() && World.isLoaded();
}



////////////////////////////////////////////////////////////////////////////////
// REG: CHAT
////////////////////////////////////////////////////////////////////////////////
let extraStatsFlag = false;
registerWhen('chat', (event) => {
    baoSecretCounter.numRunsStats += 1;
    setTimeout(() => {
        ChatLib.command('showextrastats');
        extraStatsFlag = true;
    }, 1000);
}, () => !extraStatsFlag && shouldHandleDungeonCreditsMsgs()).setCriteria('> EXTRA STATS <').setContains();

registerWhen('chat', (playerDeaths, event) => {
    baoSecretCounter.deathStats += Number(playerDeaths);
}, () => shouldHandleDungeonCreditsMsgs()).setCriteria('Deaths: ${playerDeaths}').setContains();

registerWhen('chat', (secretCount, event) => {
    baoSecretCounter.secretStats += Number(secretCount);
    baoSecretCounter.totalSecretStats += Number(secretCount);
}, () => shouldHandleDungeonCreditsMsgs()).setCriteria('Secrets Found: ${secretCount}').setContains();

registerWhen('chat', (cataType, floor, event) => {
    baoSecretCounter.numRunsStats += 1;
    setTimeout(() => {
        ChatLib.chat(`${baoUtils.modPrefix} &3${Player.getName()} &7Secrets: &b${baoSecretCounter.secretStats}&7, Deaths: &b${baoSecretCounter.deathStats}`)
    }, 1000)
}, () => shouldHandleDungeonCreditsMsgs()).setCriteria('${cataType} Catacombs - Floor ${floor} Stats').setContains();

registerWhen('chat', (leader, catacombType, floorNum, event) => {
    baoSecretCounter.deathStats = 0;
    baoSecretCounter.secretStats = 0;
    extraStatsFlag = false;
}, () => shouldHandleDungeonCreditsMsgs()).setCriteria('${leader} entered ${catacombType} Catacombs, Floor ${floorNum}!').setContains();


////////////////////////////////////////////////////////////////////////////////
// REG: STEP
////////////////////////////////////////////////////////////////////////////////
register('step', () => {
    if (!(shouldHandleRenderCounter())) return;
    let { numRunsStats, totalSecretStats } = baoSecretCounter;
    baoSecretCounter.secretOverviewText = `Runs: &b${numRunsStats}&r | Secrets: &b${totalSecretStats}&r | Avg: &b${(totalSecretStats / numRunsStats).toFixed(2)}&r/&brun`
}).setFps(1);


////////////////////////////////////////////////////////////////////////////////
// REG: DRAG
////////////////////////////////////////////////////////////////////////////////
register('dragged', (dx, dy, x, y) => {
    if (!getInSkyblock() || !World.isLoaded()) return;
    if (movesecretcounter.isOpen()) {
        baoSecretCounter.secretCounter.x = constrainX(x, 3, secretCounterDraggable);
        baoSecretCounter.secretCounter.y = constrainY(y, 3, secretCounterDraggable);
    }
});


////////////////////////////////////////////////////////////////////////////////
// REG: OVERLAY
////////////////////////////////////////////////////////////////////////////////
registerWhen('renderOverlay', () => {
    Renderer.drawStringWithShadow(baoSecretCounter.secretOverviewText, baoSecretCounter.secretCounter.x, baoSecretCounter.secretCounter.y);
}, () => Settings.secretsPerSession && shouldHandleRenderCounter());

registerWhen('renderOverlay', () => {
    renderGuiPosition(movesecretcounter, baoSecretCounter.secretCounter, secretCounterDraggable);
}, () => getInSkyblock() && World.isLoaded());


////////////////////////////////////////////////////////////////////////////////
// DEBUG
////////////////////////////////////////////////////////////////////////////////
register('command', () => {
    baoSecretCounter.deathStats = 0;
    baoSecretCounter.totalSecretStats = 0;
    baoSecretCounter.numRunsStats = 0;
    // baoSecretCounter.save();
}).setName('resetsecretcounter');
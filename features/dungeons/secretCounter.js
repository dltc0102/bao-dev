import Settings from "../../settings";
import PogObject from 'PogData';

import { baoUtils, timeThis } from "../../utils/utils";
import { getInSkyblock, getInDHub, getInDungeon } from "../../utils/functions";
import { registerWhen, timeThis } from "../../utils/utils";
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
};

export const secretCounterDisplay = new PogObject("bao-dev", {
    "x": 400, // arbituary random number, replaced by padding function 
    "y": 40,
}, '/data/secretCounterDisplay.json');
secretCounterDisplay.autosave(5);


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
registerWhen('chat', timeThis("registerChat extra stats command", (event) => {
    baoSecretCounter.numRunsStats += 1;
    setTimeout(() => {
        ChatLib.command('showextrastats');
        extraStatsFlag = true;
    }, 1000);
}), () => !extraStatsFlag && shouldHandleDungeonCreditsMsgs()).setCriteria('> EXTRA STATS <').setContains();

registerWhen('chat', timeThis("registerChat get player death stats", (playerDeaths, event) => {
    baoSecretCounter.deathStats += Number(playerDeaths);
}), () => shouldHandleDungeonCreditsMsgs()).setCriteria('Deaths: ${playerDeaths}').setContains();

registerWhen('chat', timeThis("registerChat get player secret stats", (secretCount, event) => {
    baoSecretCounter.secretStats += Number(secretCount);
    baoSecretCounter.totalSecretStats += Number(secretCount);
}), () => shouldHandleDungeonCreditsMsgs()).setCriteria('Secrets Found: ${secretCount}').setContains();

registerWhen('chat', timeThis("registerChat get player individual run secret/death stats", (cataType, floor, event) => {
    baoSecretCounter.numRunsStats += 1;
    setTimeout(() => {
        ChatLib.chat(`${baoUtils.modPrefix} &3${Player.getName()} &7Secrets: &b${baoSecretCounter.secretStats}&7, Deaths: &b${baoSecretCounter.deathStats}`)
    }, 1000);
}), () => shouldHandleDungeonCreditsMsgs()).setCriteria('${cataType} Catacombs - Floor ${floor} Stats').setContains();

registerWhen('chat', timeThis("registerChat leader entered new dungeon floor", (leader, catacombType, floorNum, event) => {
    baoSecretCounter.deathStats = 0;
    baoSecretCounter.secretStats = 0;
    extraStatsFlag = false;
}), () => shouldHandleDungeonCreditsMsgs()).setCriteria('${leader} entered ${catacombType} Catacombs, Floor ${floorNum}!').setContains();


////////////////////////////////////////////////////////////////////////////////
// REG: STEP
////////////////////////////////////////////////////////////////////////////////
register('step', timeThis("registerStep update secretOverviewText", () => {
    if (!(shouldHandleRenderCounter())) return;
    let { numRunsStats, totalSecretStats } = baoSecretCounter;
    baoSecretCounter.secretOverviewText = `Runs: &b${numRunsStats}&r | Secrets: &b${totalSecretStats}&r | Avg: &b${(totalSecretStats / numRunsStats).toFixed(2)}&r/&brun`;
})).setFps(1);


////////////////////////////////////////////////////////////////////////////////
// REG: DRAG
////////////////////////////////////////////////////////////////////////////////
register('dragged', timeThis("registerDragged update secretCounterDisplay position", (dx, dy, x, y) => {
    if (!getInSkyblock() || !World.isLoaded()) return;
    if (movesecretcounter.isOpen()) {
        secretCounterDisplay.x = constrainX(x, 3, secretCounterDraggable);
        secretCounterDisplay.y = constrainY(y, 3, secretCounterDraggable);
    }
    secretCounterDisplay.save();
}));


////////////////////////////////////////////////////////////////////////////////
// REG: OVERLAY
////////////////////////////////////////////////////////////////////////////////
registerWhen('renderOverlay', timeThis("renderOverlay secretOverviewText", () => {
    Renderer.drawStringWithShadow(baoSecretCounter.secretOverviewText, secretCounterDisplay.x, secretCounterDisplay.y);
}), () => Settings.secretsPerSession && shouldHandleRenderCounter());


registerWhen('renderOverlay', timeThis("renderOverlay secretOverviewText draggable", () => {
    renderGuiPosition(movesecretcounter, secretCounterDisplay, secretCounterDraggable);
}), () => getInSkyblock() && World.isLoaded());


////////////////////////////////////////////////////////////////////////////////
// DEBUG
////////////////////////////////////////////////////////////////////////////////
register('command', () => {
    baoSecretCounter.deathStats = 0;
    baoSecretCounter.totalSecretStats = 0;
    baoSecretCounter.numRunsStats = 0;
    baoSecretCounter.save();
}).setName('resetsecretcounter');
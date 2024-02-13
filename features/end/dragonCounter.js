import Settings from '../../settings.js';
import PogObject from 'PogData';

import { baoUtils, registerWhen, timeThis } from '../../utils/utils.js'
import { getInSkyblock, getInEnd } from '../../utils/functions.js';
import { createGuiCommand, renderGuiPosition } from '../../utils/functions.js'; // gui
import { constrainX, constrainY } from '../../utils/functions.js' // padding
import { filterSeparators } from '../../utils/functions.js';
import { baoEnd } from './endStats.js';


////////////////////////////////////////////////////////////////////////////////
// CONSTS
////////////////////////////////////////////////////////////////////////////////
const Instant = Java.type('java.time.Instant');

const moveDragonCounter = new Gui();
createGuiCommand(moveDragonCounter, 'movedragoncounter', 'mdrag');
const dragonDraggable = `&7||| Dragons |||\n&7${baoUtils.thickSep}\n&7||| Protector: 0\n&7||| Old: 0\n&7||| Strong: 0\n&7||| Unstable: 0\n&7||| Wise: 0\n&7||| Young: 0\n&7||| Superior: 0\n&7${baoUtils.thinSep}\n&7||| Drags Since Sup: 0\n&7||| Crystals Broken: 0`;

const dragThick = `&9${baoUtils.thickSep}`;
const dragThin = `&9${baoUtils.thinSep}`;

const protectorDragLine = `&5|&d|&5| &7Protector: &b${baoEnd.counter.protector}`;
const oldDragLine = `&5|&d|&5| &7Old: &b${baoEnd.counter.old}`;
const strongDragLine = `&5|&d|&5| &7Strong: &b${baoEnd.counter.strong}`;
const unstableDragLine = `&5|&d|&5| &7Unstable: &b${baoEnd.counter.unstable}`;
const wiseDragLine = `&5|&d|&5| &7Wise: &b${baoEnd.counter.wise}`;
const youngDragLine = `&5|&d|&5| &7Young: &b${baoEnd.counter.young}`;
const superiorDragLine = `&5|&d|&5| &6Superior: &b${baoEnd.counter.superior}`;

const dragsSinceSupLine = `&5|&d|&5| &7Drags Since Sup: &b${baoEnd.counter.dragsSinceSuperior}`;
const crystalsBrokenLine = `&5|&d|&5| &7Crystals Broken: &b${baoEnd.crystalsBroken}`;
let displayText = '';

export const dragonCounter = new PogObject("bao-dev", {
    "x": 3, 
    "y": 100,
}, '/data/dragonCounter.json');
dragonCounter.autosave(5);


////////////////////////////////////////////////////////////////////////////////
// REG: STEP
////////////////////////////////////////////////////////////////////////////////
register('step', () => {
    if (!getInSkyblock() || !World.isLoaded() || !getInEnd()) return;
    if (!Settings.showDragonCounter) return;
    const dragTitle = Settings.dragCounterSpawns || Settings.dragCounterTrackers ? `&5|&d|&5| &6Dragons &5|&d|&5|\n${dragThick}` : '';

    const showDragSpawns = Settings.dragCounterSpawns ? [protectorDragLine, oldDragLine, strongDragLine, unstableDragLine, wiseDragLine, youngDragLine, superiorDragLine, dragThin].join('\n') : '';

    const showDragTrackers = Settings.dragCounterTrackers ? [dragsSinceSupLine, crystalsBrokenLine, dragThin].join('\n') : '';

    const dragDisplayRaw = [dragTitle, showDragSpawns, showDragTrackers].join('\n').replace(/\n{6,}/g, '\n');
    
    displayText = filterSeparators(dragDisplayRaw, dragThin);
}).setFps(1);


////////////////////////////////////////////////////////////////////////////////
// REG: DRAG
////////////////////////////////////////////////////////////////////////////////
register('dragged', (dx, dy, x, y) => {
    if (!getInSkyblock() || !World.isLoaded()) return;
    if (moveDragonCounter.isOpen()) {
        dragonCounter.x = constrainX(x, 3, dragonDraggable);
        dragonCounter.y = constrainY(y, 3, dragonDraggable);
    };
    dragonCounter.save();
}); 


////////////////////////////////////////////////////////////////////////////////
// REG: OVERLAY
////////////////////////////////////////////////////////////////////////////////
registerWhen('renderOverlay', timeThis("renderOverlay dragonCounter displayText", () => {
    Renderer.drawStringWithShadow(displayText, dragonCounter.x, dragonCounter.y);
}), () => Settings.showDragonCounter && getInEnd() && getInSkyblock() && World.isLoaded());

registerWhen('renderOverlay', timeThis("renderOverlay dragonCounter draggable", () => {
    renderGuiPosition(moveDragonCounter, dragonCounter, dragonDraggable);
}), () => getInSkyblock() && World.isLoaded());

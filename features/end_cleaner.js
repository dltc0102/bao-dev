import Settings from '../settings.js';
import PogObject from 'PogData';

import { sendMessage } from '../utils/party.js';
import { getInSkyblock, getCurrArea } from '../utils/functions.js'; // sb, area
import { baoUtils } from '../utils/utils.js';
import { createGuiCommand, renderGuiPosition } from '../utils/functions.js'; // gui


////////////////////////////////////////////////////////////////////////////////
// SETUP CONSTS
////////////////////////////////////////////////////////////////////////////////
const moveDragonCounter = new Gui();
createGuiCommand(moveDragonCounter, 'movedragoncounter', 'mdrag');
const dragonDraggable = `&7||| Dragons |||\n&7${baoUtils.thickSep}\n&7||| Old: 0\n&7||| Protector: 0\n&7||| Strong: 0\n&7||| Unstable: 0\n&7||| Wise: 0\n&7||| Young: 0\n&7||| Superior: 0\n&7${baoUtils.thinSep}\n&7||| Drags Since Sup: 0\n&7||| Crystals Broken: 0`;

export const baoDragons = new PogObject("bao-dev", {
    "eyesPlaced": 0,
    "crystalsBroken": 0, 
    "supWeight": 0, 
    "counter": {
        "old": 0, 
        "protector": 0, 
        "strong": 0,
        "unstable": 0, 
        "wise": 0, 
        "young": 0, 
        "superior": 0,
        "dragsSinceSuperior": 0,
        "x": 3, 
        "y": 100,
    },
    "displayText": '',
}, '/data/baoDragons.json');
baoDragons.autosave(5);

////////////////////////////////////////////////////////////////////////////////
// BETTER END MESSAGES
////////////////////////////////////////////////////////////////////////////////
register('chat', (name, num, event) => {
    if (getCurrArea() !== 'The End') return;
    if (Settings.betterEndMessages) cancel(event);
    if (name === Player.getName()) baoDragons.eyesPlaced++;
    baoDragons.save();
}).setCriteria('☬ ${name} placed a Summoning Eye! (${num}/8)');

register('chat', (drag, event) => {
    if (getCurrArea() !== 'The End') return;
    baoDragons.eyesPlaced = 0;
    baoDragons.save();
}).setCriteria('☬ The Dragon Egg has spawned!');

register('chat', (event) => {
    if (getCurrArea() !== 'The End') return;
    if (Settings.betterEndMessages) cancel(event);
}).setCriteria('Your Sleeping Eyes have been awoken by the magic of the Dragon. They are now Remnants of the Eye!');

register('chat', (drag, event) => {
    if (getCurrArea() !== 'The End') return;
    if (Settings.betterEndMessages) {
        cancel(event);
        if (drag === 'Old') baoDragons.counter.old += 1; baoDragons.counterdragsSinceSuperior += 1;
        if (drag === 'Protector') baoDragons.counter.protector += 1; baoDragons.counterdragsSinceSuperior += 1;
        if (drag === 'Strong') baoDragons.counter.strong += 1; baoDragons.counterdragsSinceSuperior += 1;
        if (drag === 'Unstable') baoDragons.counter.unstable += 1; baoDragons.counterdragsSinceSuperior += 1;
        if (drag === 'Wise') baoDragons.counter.wise += 1; baoDragons.counterdragsSinceSuperior += 1;
        if (drag === 'Young') baoDragons.counter.young += 1; baoDragons.counterdragsSinceSuperior += 1;
        if (drag === 'Superior') baoDragons.counter.superior += 1; baoDragons.counterdragsSinceSuperior = 0;
        baoDragons.counter.dragsSinceSuperior += 1;
    };
    baoDragons.save();
}).setCriteria('☬ The ${drag} Dragon has spawned!');

register('chat', (player, event) => {
    if (getCurrArea() !== 'The End') return;
    if (Settings.betterEndMessages) {
        cancel(event);
        if (player === Player.getName()) baoDragons.crystalsBroken += 1;
    }
}).setCriteria('☬ ${player} destroyed an Ender Crystal!');

register('chat', (phase, event) => {
    if (getCurrArea() !== 'The End') return;
    if (Settings.betterEndMessages) cancel(event);
}).setCriteria("☬ The Dragon's Gate is ${phase}!");

register('chat', (dragType, ability, damage, event) => {
    if (getCurrArea() !== 'The End') return;
    if (Settings.betterEndMessages) cancel(event);
}).setCriteria('☬ ${dragType} Dragon used ${ability} on you for ${damage} damage.');

register('chat', (player, dragType, event) => {
    if (getCurrArea() !== 'The End') return;
    if (Settings.betterEndMessages) cancel(event);
}).setCriteria(' ☠ ${player} was killed by ${dragType} Dragon.');

// zealots
register('chat', (event) => {
    if (getCurrArea() !== 'The End') return;
    if (Settings.sendZealotPing) sendMessage('A special Zealot has spawned nearby!');
}).setCriteria('A special Zealot has spawned nearby!');

// dragon counter
register('step', () => {
    if (!getInSkyblock() || !World.isLoaded()) return;
    if (getCurrArea() !== 'The End') return;
    const dragThick = `&9${baoUtils.thickSep}`;
    const dragThin = `&9${baoUtils.thinSep}`

    const dragTitle = Settings.dragCounterSpawns || Settings.dragCounterTrackers ? `&5|&d|&5| &6Dragons &5|&d|&5|\n${dragThick}` : '';

    // spawns
    let protectorDragLine = `&5|&d|&5| &7Protector: &b${baoDragons.counter.protector}`;
    let oldDragLine = `&5|&d|&5| &7Old: &b${baoDragons.counter.old}`;
    let strongDragLine = `&5|&d|&5| &7Strong: &b${baoDragons.counter.strong}`;
    let unstableDragLine = `&5|&d|&5| &7Unstable: &b${baoDragons.counter.unstable}`;
    let wiseDragLine = `&5|&d|&5| &7Wise: &b${baoDragons.counter.wise}`;
    let youngDragLine = `&5|&d|&5| &7Young: &b${baoDragons.counter.young}`;
    let superiorDragLine = `&5|&d|&5| &6Superior: &b${baoDragons.counter.superior}`;

    // trackers
    let dragsSinceSupLine = `&5|&d|&5| &7Drags Since Sup: &b${baoDragons.counter.dragsSinceSuperior}`;
    let crystalsBrokenLine = `&5|&d|&5| &7Crystals Broken: &b${baoDragons.crystalsBroken}`;

    const showDragSpawns = Settings.dragCounterSpawns ? [protectorDragLine, oldDragLine, strongDragLine, unstableDragLine, wiseDragLine, youngDragLine, superiorDragLine, dragThin].join('\n') : '';

    const showDragTrackers = Settings.dragCounterTrackers ? [dragsSinceSupLine, crystalsBrokenLine, dragThin].join('\n') : '';

    const dragDisplayRaw = [dragTitle, showDragSpawns, showDragTrackers].join('\n').replace(/\n{6,}/g, '\n');
    let dragDisplayFilter = dragDisplayRaw.replace(/\n{2,}/g, '\n');

    let phraseArray = dragDisplayFilter.split('\n');
    let lastIdx = -1;
    for (let i = phraseArray.length - 1; i >= 0; i--) {
        if (phraseArray[i].includes(dragThin)) {
            lastIdx = i;
            break;
        }
    }

    if (lastIdx !== -1) {
        phraseArray.splice(lastIdx, 1);
    }
    baoDragons.displayText = phraseArray.join('\n');
    baoDragons.save();
}).setFps(1);

register('dragged', (dx, dy, x, y) => {
    if (!getInSkyblock() || !World.isLoaded()) return;
    if (moveDragonCounter.isOpen()) {
        baoDragons.counter.x = constrainX(x, 3, dragonDraggable);
        baoDragons.counter.y = constrainY(y, 3, dragonDraggable);
    };
    baoDragons.save();
}); 

register('renderOverlay', () => {
    if (!getInSkyblock() || !World.isLoaded()) return;
    if (!Settings.showDragonCounter) return;
    if (getCurrArea() !== 'The End') return;
    Renderer.drawStringWithShadow(baoDragons.displayText, baoDragons.counter.x, baoDragons.counter.y);
    renderGuiPosition(moveDragonCounter, baoDragons.counter, dragonDraggable);
});

